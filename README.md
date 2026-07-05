# 🏗️ DUCKDUCK 裝修 — 工單追蹤系統

一個完整的工作訂單管理、報價分析與 WhatsApp 自動化系統。

## 架構

```
DuckDuck裝修/
├── wo_tracker/           # 核心 Python 套件
│   ├── cli.py            # CLI 命令 (Click + Rich)
│   ├── parser.py         # WhatsApp 訊息解析器
│   ├── database.py       # SQLite 資料庫 (6 個表)
│   ├── analysis.py       # 報價分析模組
│   ├── automation.py     # WhatsApp 自動化 (via wuzapi-cli)
│   └── __init__.py
├── wo-tracker            # Shell 入口腳本
├── duckduck.db           # SQLite 資料庫 (自動建立)
└── README.md
```

## 快速開始

```bash
# 安裝依賴
pip install click rich

# 設定 alias (可選)
alias wo='python3 -m wo_tracker'
cd ~/Documents/DuckDuck裝修
```

## 命令清單

### 📥 解析工單

```bash
# 從文字解析
wo parse "DUCKDUCK維修工程
項目編號:C020260704001
時間:明早(4/7)星期六9:00-10:00到
..."

# 從檔案解析
wo parse -f work_orders.txt

# 解析並自動發 WhatsApp 確認回覆
wo parse -f work_orders.txt --confirm
```

### 📋 查看工單

```bash
wo list                          # 全部工單
wo list --status 待處理           # 依狀態篩選
wo list --today                  # 今天排程
wo list --week                   # 本週排程

wo show C020260704001            # 查看單筆詳情
```

### 🔄 更新狀態

```bash
wo status C020260704001 已完成 -p 已付              # 標記完成+已付款
wo status A20260704002 已確認 --notify               # 更新並發 WhatsApp 通知
```

### 📊 報價分析

```bash
wo analyze                        # 完整分析報告
wo analyze --compare 掛扇         # 比較特定項目歷史報價
wo analyze --anomalies            # 偵測異常報價
```

### 📅 排程管理

```bash
wo schedule                       # 未來 7 天排程
wo schedule -d 14                 # 未來 14 天
wo schedule --remind              # 發送排程提醒給客戶
```

### 👥 聯絡人

```bash
wo contacts                       # 列出所有客戶
```

### 📲 WhatsApp 通知

```bash
wo notify C020260704001                          # 發確認回覆
wo notify C020260704001 -t status -s 已完成       # 發狀態更新
wo notify C020260704001 -t remind                 # 發排程提醒
```

## 資料庫結構

| 表 | 用途 |
|---|---|
| `work_orders` | 工單主表（編號、日期、地址、費用、狀態） |
| `work_order_items` | 維修項目明細（描述、數量、單價） |
| `contacts` | 客戶聯絡人（自動累積） |
| `message_log` | WhatsApp 通訊記錄 |
| `price_history` | 歷史報價（供分析比較） |

## 訊息格式支援

系統能自動解析 Michael Chan 的標準格式：

- ✅ 項目編號 (C/A + 數字)
- ✅ 日期 (明早/今天/指定日期)
- ✅ 時間 (9:00-10:00 / 10:00返工即做 / 暫定4:00)
- ✅ 地址
- ✅ 聯絡人 + 電話
- ✅ 維修項目 (編號 + 描述 + 價格，支援 `$xxx/數量` 格式)
- ✅ 備註
- ✅ 費用 (已付/未付)
- ✅ 付款方式

## WhatsApp 自動化依賴

WhatsApp 發送功能依賴 `wuzapi-cli` (`~/WorkBuddy/20260414091025/wuzapi-cli/`)。
需確保 wuzapi 服務運行中且有活躍登入。

## 分析報告範例

```
============================================================
  🏗️  DUCKDUCK 裝修 — 報價分析報告
  產生時間: 2026-07-05 11:06
============================================================

📊 營收摘要
----------------------------------------
  總工單數: 3 張
  總營收:   $5,410
  已收款:   $0
  未收款:   $5,410

📅 月度營收趨勢
----------------------------------------
  2026-07    3單  $   5,410

🔧 維修類別分析
----------------------------------------
  風扇類        2次  $   3,300  (61.0%)
  燈具類        1次  $     500  (9.2%)
  水喉類        1次  $     380  (7.0%)
  五金配件      3次  $     380  (7.0%)
  電器搬運      1次  $     500  (9.2%)

👥 客戶統計
----------------------------------------
  郭小姐        1單  $   4,600
  李太          1單  $     460
  陳生          1單  $     350
```
