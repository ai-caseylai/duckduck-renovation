"""SQLite 資料庫 — 工單、項目、聯絡人、排程"""

import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "duckduck.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS work_orders (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id      TEXT UNIQUE NOT NULL,       -- e.g. C020260704001
    raw_text        TEXT NOT NULL,               -- original WhatsApp message
    received_at     TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    scheduled_date  TEXT,                        -- YYYY-MM-DD
    time_slot       TEXT,                        -- e.g. "9:00-10:00"
    address         TEXT,
    contact_name    TEXT,
    contact_phone   TEXT,
    total_amount    REAL,                        -- 總費用
    payment_method  TEXT,                        -- 現金/轉數快
    payment_status  TEXT DEFAULT '未付',         -- 未付/已付
    status          TEXT DEFAULT '待處理',       -- 待處理/已確認/已完成/已取消
    notes           TEXT                         -- 備註
);

CREATE TABLE IF NOT EXISTS work_order_items (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    work_order_id   INTEGER NOT NULL,
    seq             INTEGER NOT NULL,            -- 項目順序
    description     TEXT NOT NULL,
    quantity        REAL DEFAULT 1,
    unit_price      REAL,
    item_total      REAL,
    FOREIGN KEY (work_order_id) REFERENCES work_orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT,
    phone           TEXT UNIQUE,
    address         TEXT,
    last_order_at   TEXT
);

CREATE TABLE IF NOT EXISTS message_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    work_order_id   INTEGER,
    direction       TEXT NOT NULL,               -- in/out
    content         TEXT NOT NULL,
    sent_at         TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (work_order_id) REFERENCES work_orders(id)
);

CREATE TABLE IF NOT EXISTS price_history (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    category        TEXT NOT NULL,               -- 維修類別
    description     TEXT,                         -- 具體描述
    unit_price      REAL,
    recorded_at     TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    project_id      TEXT
);

CREATE INDEX IF NOT EXISTS idx_wo_project ON work_orders(project_id);
CREATE INDEX IF NOT EXISTS idx_wo_status ON work_orders(status);
CREATE INDEX IF NOT EXISTS idx_wo_date ON work_orders(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_items_wo ON work_order_items(work_order_id);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone);
CREATE INDEX IF NOT EXISTS idx_price_category ON price_history(category);
"""


def get_db() -> sqlite3.Connection:
    """取得資料庫連線，自動建立表格"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    conn.executescript(SCHEMA)
    return conn


# ─── Work Orders ───────────────────────────────────────────

def insert_work_order(conn: sqlite3.Connection, data: dict) -> int:
    """插入工單，已存在則更新，回傳 id"""
    existing = conn.execute(
        "SELECT id FROM work_orders WHERE project_id = ?", (data["project_id"],)
    ).fetchone()

    fields = [
        "project_id", "raw_text", "scheduled_date", "time_slot",
        "address", "contact_name", "contact_phone", "total_amount",
        "payment_method", "payment_status", "status", "notes"
    ]
    values = {k: data.get(k) for k in fields}

    if existing:
        set_clause = ", ".join(f"{k} = ?" for k in fields[1:])
        vals = [values[k] for k in fields[1:]] + [data["project_id"]]
        conn.execute(f"UPDATE work_orders SET {set_clause} WHERE project_id = ?", vals)
        wo_id = existing["id"]
        # 清除舊項目重新插入
        conn.execute("DELETE FROM work_order_items WHERE work_order_id = ?", (wo_id,))
    else:
        placeholders = ", ".join("?" for _ in fields)
        cols = ", ".join(fields)
        conn.execute(
            f"INSERT INTO work_orders ({cols}) VALUES ({placeholders})",
            [values[k] for k in fields]
        )
        wo_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]

    # 插入項目
    for item in data.get("item_list", []):
        conn.execute(
            """INSERT INTO work_order_items (work_order_id, seq, description, quantity, unit_price, item_total)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (wo_id, item["seq"], item["description"],
             item.get("quantity", 1), item.get("unit_price"),
             item.get("item_total"))
        )

    # 更新/插入聯絡人
    if data.get("contact_phone"):
        conn.execute(
            """INSERT INTO contacts (name, phone, address, last_order_at)
               VALUES (?, ?, ?, datetime('now','localtime'))
               ON CONFLICT(phone) DO UPDATE SET
               name = excluded.name, address = excluded.address,
               last_order_at = datetime('now','localtime')""",
            (data.get("contact_name"), data["contact_phone"], data.get("address"))
        )

    conn.commit()
    return wo_id


def get_work_orders(conn: sqlite3.Connection, status: str = None,
                    date_from: str = None, date_to: str = None,
                    limit: int = 100) -> list[dict]:
    """查詢工單列表"""
    where = []
    params = []
    if status:
        where.append("status = ?")
        params.append(status)
    if date_from:
        where.append("scheduled_date >= ?")
        params.append(date_from)
    if date_to:
        where.append("scheduled_date <= ?")
        params.append(date_to)
    clause = ("WHERE " + " AND ".join(where)) if where else ""
    rows = conn.execute(
        f"SELECT * FROM work_orders {clause} ORDER BY received_at DESC LIMIT ?",
        params + [limit]
    ).fetchall()
    return [dict(r) for r in rows]


def get_work_order(conn: sqlite3.Connection, project_id: str) -> dict | None:
    """取得單一工單（含項目）"""
    wo = conn.execute(
        "SELECT * FROM work_orders WHERE project_id = ?", (project_id,)
    ).fetchone()
    if not wo:
        return None
    result = dict(wo)
    items = conn.execute(
        "SELECT * FROM work_order_items WHERE work_order_id = ? ORDER BY seq",
        (wo["id"],)
    ).fetchall()
    result["item_list"] = [dict(i) for i in items]
    return result


def update_status(conn: sqlite3.Connection, project_id: str,
                  status: str, payment_status: str = None):
    """更新工單狀態"""
    if payment_status:
        conn.execute(
            "UPDATE work_orders SET status = ?, payment_status = ? WHERE project_id = ?",
            (status, payment_status, project_id)
        )
    else:
        conn.execute(
            "UPDATE work_orders SET status = ? WHERE project_id = ?",
            (status, project_id)
        )
    conn.commit()


def delete_work_order(conn: sqlite3.Connection, project_id: str):
    """刪除工單"""
    conn.execute("DELETE FROM work_orders WHERE project_id = ?", (project_id,))
    conn.commit()


# ─── Contacts ──────────────────────────────────────────────

def get_contacts(conn: sqlite3.Connection) -> list[dict]:
    rows = conn.execute(
        "SELECT * FROM contacts ORDER BY last_order_at DESC"
    ).fetchall()
    return [dict(r) for r in rows]


def get_contact_by_phone(conn: sqlite3.Connection, phone: str) -> dict | None:
    row = conn.execute("SELECT * FROM contacts WHERE phone = ?", (phone,)).fetchone()
    return dict(row) if row else None


# ─── Price History ─────────────────────────────────────────

def insert_price(conn: sqlite3.Connection, category: str, description: str,
                 unit_price: float, project_id: str):
    conn.execute(
        """INSERT INTO price_history (category, description, unit_price, project_id)
           VALUES (?, ?, ?, ?)""",
        (category, description, unit_price, project_id)
    )
    conn.commit()


def get_price_stats(conn: sqlite3.Connection) -> list[dict]:
    """取得各類別價格統計"""
    rows = conn.execute("""
        SELECT category, description,
               COUNT(*) as cnt,
               ROUND(AVG(unit_price), 2) as avg_price,
               MIN(unit_price) as min_price,
               MAX(unit_price) as max_price
        FROM price_history
        GROUP BY category, description
        ORDER BY category, cnt DESC
    """).fetchall()
    return [dict(r) for r in rows]


# ─── Message Log ───────────────────────────────────────────

def log_message(conn: sqlite3.Connection, work_order_id: int,
                direction: str, content: str):
    conn.execute(
        "INSERT INTO message_log (work_order_id, direction, content) VALUES (?, ?, ?)",
        (work_order_id, direction, content)
    )
    conn.commit()


# ─── Analytics ─────────────────────────────────────────────

def get_revenue_summary(conn: sqlite3.Connection) -> dict:
    """營收摘要"""
    total = conn.execute(
        "SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount), 0) as total "
        "FROM work_orders"
    ).fetchone()
    paid = conn.execute(
        "SELECT COALESCE(SUM(total_amount), 0) FROM work_orders WHERE payment_status = '已付'"
    ).fetchone()
    unpaid = conn.execute(
        "SELECT COALESCE(SUM(total_amount), 0) FROM work_orders WHERE payment_status = '未付'"
    ).fetchone()
    by_month = conn.execute("""
        SELECT strftime('%Y-%m', scheduled_date) as month,
               COUNT(*) as cnt,
               COALESCE(SUM(total_amount), 0) as total
        FROM work_orders
        WHERE scheduled_date IS NOT NULL
        GROUP BY month
        ORDER BY month DESC
    """).fetchall()

    return {
        "total_orders": total["cnt"],
        "total_revenue": total["total"],
        "paid_amount": paid[0],
        "unpaid_amount": unpaid[0],
        "by_month": [dict(r) for r in by_month]
    }


def get_category_summary(conn: sqlite3.Connection) -> list[dict]:
    """各類維修項目統計"""
    rows = conn.execute("""
        SELECT
            CASE
                WHEN description LIKE '%掛扇%' OR description LIKE '%風扇%' OR description LIKE '%抽氣%' THEN '風扇類'
                WHEN description LIKE '%龍頭%' OR description LIKE '%水龍頭%' THEN '水喉類'
                WHEN description LIKE '%燈%' THEN '燈具類'
                WHEN description LIKE '%掛勾%' OR description LIKE '%紙巾架%' OR description LIKE '%裝鉸%' THEN '五金配件'
                WHEN description LIKE '%電視%' THEN '電器搬運'
                ELSE '其他'
            END as category,
            COUNT(*) as cnt,
            COALESCE(SUM(item_total), 0) as total_revenue
        FROM work_order_items
        GROUP BY category
        ORDER BY total_revenue DESC
    """).fetchall()
    return [dict(r) for r in rows]


def get_contact_summary(conn: sqlite3.Connection) -> list[dict]:
    """客戶統計"""
    rows = conn.execute("""
        SELECT c.name, c.phone, c.address,
               COUNT(wo.id) as order_count,
               COALESCE(SUM(wo.total_amount), 0) as total_spent
        FROM contacts c
        LEFT JOIN work_orders wo ON c.phone = wo.contact_phone
        GROUP BY c.phone
        ORDER BY total_spent DESC
    """).fetchall()
    return [dict(r) for r in rows]
