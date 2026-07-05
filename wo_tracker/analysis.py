"""報價分析模組 — 營收統計、價格趨勢、項目比較"""

import sqlite3
from datetime import datetime, timedelta
from .database import (
    get_db, get_revenue_summary, get_category_summary,
    get_contact_summary, get_price_stats, get_work_orders,
)


def full_report(conn: sqlite3.Connection = None) -> str:
    """產生完整分析報告"""
    if conn is None:
        conn = get_db()
        own_conn = True
    else:
        own_conn = False

    try:
        revenue = get_revenue_summary(conn)
        categories = get_category_summary(conn)
        contacts = get_contact_summary(conn)
        prices = get_price_stats(conn)

        lines = []
        lines.append("=" * 60)
        lines.append("  🏗️  DUCKDUCK 裝修 — 報價分析報告")
        lines.append(f"  產生時間: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        lines.append("=" * 60)

        # ── 營收摘要 ──
        lines.append("")
        lines.append("📊 營收摘要")
        lines.append("-" * 40)
        lines.append(f"  總工單數: {revenue['total_orders']} 張")
        lines.append(f"  總營收:   ${revenue['total_revenue']:,.0f}")
        lines.append(f"  已收款:   ${revenue['paid_amount']:,.0f}")
        lines.append(f"  未收款:   ${revenue['unpaid_amount']:,.0f}")

        if revenue["total_revenue"] > 0:
            collection_rate = (revenue["paid_amount"] / revenue["total_revenue"] * 100)
            lines.append(f"  收款率:   {collection_rate:.1f}%")

        # ── 月度趨勢 ──
        if revenue["by_month"]:
            lines.append("")
            lines.append("📅 月度營收趨勢")
            lines.append("-" * 40)
            for m in revenue["by_month"]:
                bar = "█" * min(int(m["total"] / 500), 30)
                lines.append(f"  {m['month']}  {m['cnt']:>3}單  ${m['total']:>8,.0f}  {bar}")

        # ── 類別分析 ──
        if categories:
            lines.append("")
            lines.append("🔧 維修類別分析")
            lines.append("-" * 40)
            for c in categories:
                pct = (c["total_revenue"] / revenue["total_revenue"] * 100) if revenue["total_revenue"] > 0 else 0
                lines.append(f"  {c['category']:<12s}  {c['cnt']:>3}次  ${c['total_revenue']:>8,.0f}  ({pct:.1f}%)")

        # ── 價格參考 ──
        if prices:
            lines.append("")
            lines.append("💰 價格參考（歷史均價）")
            lines.append("-" * 40)
            for p in prices:
                lines.append(
                    f"  {p['category']:<12s}  {p['description'][:30]:<30s}  "
                    f"均${p['avg_price']:>8,.0f}  (${p['min_price']:,.0f}~${p['max_price']:,.0f})  n={p['cnt']}"
                )

        # ── 客戶統計 ──
        if contacts:
            lines.append("")
            lines.append("👥 客戶統計")
            lines.append("-" * 40)
            for c in contacts:
                name = c["name"] or "未知"
                lines.append(
                    f"  {name:<12s}  {c['order_count']:>2}單  ${c['total_spent']:>8,.0f}"
                )

        lines.append("")
        lines.append("=" * 60)
        return "\n".join(lines)

    finally:
        if own_conn:
            conn.close()


def compare_prices(conn: sqlite3.Connection, keyword: str) -> list[dict]:
    """比較特定關鍵詞的歷史報價"""
    rows = conn.execute("""
        SELECT ph.*, wo.scheduled_date, wo.contact_name
        FROM price_history ph
        LEFT JOIN work_orders wo ON ph.project_id = wo.project_id
        WHERE ph.description LIKE ? OR ph.category LIKE ?
        ORDER BY wo.scheduled_date DESC
    """, (f"%{keyword}%", f"%{keyword}%")).fetchall()
    return [dict(r) for r in rows]


def detect_anomalies(conn: sqlite3.Connection, threshold_pct: float = 50) -> list[dict]:
    """偵測異常報價（偏離均價超過 threshold_pct%）"""
    stats = get_price_stats(conn)
    anomalies = []
    for s in stats:
        if s["cnt"] < 2:
            continue
        rows = conn.execute("""
            SELECT ph.*, wo.scheduled_date, wo.contact_name
            FROM price_history ph
            LEFT JOIN work_orders wo ON ph.project_id = wo.project_id
            WHERE ph.description = ?
            ORDER BY wo.scheduled_date DESC
        """, (s["description"],)).fetchall()

        for r in rows:
            dev = abs(r["unit_price"] - s["avg_price"]) / s["avg_price"] * 100
            if dev > threshold_pct:
                anomalies.append({
                    **dict(r),
                    "avg_price": s["avg_price"],
                    "deviation_pct": round(dev, 1)
                })
    return anomalies


def upcoming_schedule(conn: sqlite3.Connection, days: int = 7) -> list[dict]:
    """未來 N 天排程"""
    today = datetime.now().strftime("%Y-%m-%d")
    end = (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")
    rows = conn.execute("""
        SELECT project_id, scheduled_date, time_slot, address,
               contact_name, contact_phone, total_amount, status
        FROM work_orders
        WHERE scheduled_date BETWEEN ? AND ?
        ORDER BY scheduled_date, time_slot
    """, (today, end)).fetchall()
    return [dict(r) for r in rows]
