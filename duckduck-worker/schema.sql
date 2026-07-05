CREATE TABLE IF NOT EXISTS work_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT UNIQUE NOT NULL,
    raw_text TEXT NOT NULL,
    received_at TEXT NOT NULL DEFAULT (datetime('now')),
    scheduled_date TEXT,
    time_slot TEXT,
    address TEXT,
    contact_name TEXT,
    contact_phone TEXT,
    total_amount REAL,
    payment_method TEXT,
    payment_status TEXT DEFAULT '未付',
    status TEXT DEFAULT '待處理',
    notes TEXT
);

CREATE TABLE IF NOT EXISTS work_order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_order_id INTEGER NOT NULL,
    seq INTEGER NOT NULL,
    description TEXT NOT NULL,
    quantity REAL DEFAULT 1,
    unit_price REAL,
    item_total REAL,
    FOREIGN KEY (work_order_id) REFERENCES work_orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT UNIQUE,
    address TEXT,
    last_order_at TEXT
);
