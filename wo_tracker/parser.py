"""WhatsApp 工單訊息解析器 — 將 Michael Chan 的格式轉為結構化資料"""

import re
from datetime import datetime, date
from typing import Optional


def parse_work_order(text: str) -> dict:
    """解析一則工單訊息，回傳結構化 dict

    支援兩種格式：
    - 格式 A：項目編號在第一行（DUCKDUCK維修工程）
    - 格式 B：連續多則訊息（合併處理）
    """
    result = {
        "project_id": "",
        "raw_text": text.strip(),
        "scheduled_date": None,
        "time_slot": None,
        "address": "",
        "contact_name": "",
        "contact_phone": "",
        "total_amount": None,
        "payment_method": "",
        "payment_status": "未付",
        "status": "待處理",
        "notes": "",
        "item_list": [],
    }

    # ── 項目編號 ──
    m = re.search(r'項目編號[：:]\s*([A-Z]?\d+)', text)
    if m:
        result["project_id"] = m.group(1).strip()

    # ── 時間/日期 ──
    # 格式: "明早(4/7)星期六9:00-10:00到" / "下午2:00後可以(暫定4:00)"
    # 格式: "10:00返工即做"
    time_block = _extract_block(text, r'時間[：:]', r'地址[：:]')

    if time_block:
        # 嘗試解析日期
        date_m = re.search(r'\((\d+)/(\d+)\)', time_block)
        if date_m:
            d, m_num = int(date_m.group(1)), int(date_m.group(2))
            year = datetime.now().year
            result["scheduled_date"] = f"{year}-{m_num:02d}-{d:02d}"
        else:
            # 嘗試 "明早" / "今天" / 沒有日期就用今天
            if '明早' in time_block or '明天' in time_block:
                d = date.today()
                # 假設明天
                from datetime import timedelta
                d = d + timedelta(days=1)
                result["scheduled_date"] = d.strftime("%Y-%m-%d")
            else:
                result["scheduled_date"] = date.today().strftime("%Y-%m-%d")

        # 時間區間
        time_m = re.search(r'(\d{1,2}:\d{2})\s*[-~至到]\s*(\d{1,2}:\d{2})', time_block)
        if time_m:
            result["time_slot"] = f"{time_m.group(1)}-{time_m.group(2)}"
        else:
            # "10:00返工即做"
            single_time = re.search(r'(\d{1,2}:\d{2})', time_block)
            if single_time:
                result["time_slot"] = single_time.group(1)

    # ── 地址 ──
    addr = _extract_block(text, r'地址[：:]', r'聯絡[：:]')
    if addr:
        result["address"] = addr.replace('\n', '').strip()

    # ── 聯絡人 ──
    contact_block = _extract_block(text, r'聯絡[：:]', r'維修項目[：:]')
    if contact_block:
        # 格式: "郭小姐 9033 3920" / "李太 9648 6241"
        contact_block = contact_block.strip()
        phone_m = re.search(r'(\d{4}\s*\d{4})', contact_block)
        if phone_m:
            result["contact_phone"] = phone_m.group(1).replace(' ', '')
            result["contact_name"] = contact_block[:phone_m.start()].strip()

    # ── 維修項目 ──
    items_block = _extract_block(text, r'維修項目[：:]', r'備註[：:]')
    if items_block:
        result["item_list"] = _parse_items(items_block)

    # ── 備註 ──
    notes = _extract_block(text, r'備註[：:]', r'費用[：:]')
    if notes:
        result["notes"] = notes.strip()

    # ── 費用 ──
    fee_block = _extract_block(text, r'費用[：:]', r'付款方式[：:]')
    if fee_block:
        fee_block = fee_block.strip()
        # 可能是 "(未付)" 或 "$460(未付)" 或 "$1,800"
        if '未付' in fee_block:
            result["payment_status"] = "未付"
        elif '已付' in fee_block:
            result["payment_status"] = "已付"
        # 提取金額
        amount_m = re.search(r'\$[\d,]+\.?\d*', fee_block)
        if amount_m:
            amt = amount_m.group().replace('$', '').replace(',', '')
            result["total_amount"] = float(amt)

    # ── 付款方式 ──
    pay_block = _extract_block(text, r'付款方式[：:]', None)
    if pay_block:
        pay_lines = [l.strip() for l in pay_block.strip().split('\n') if l.strip()]
        result["payment_method"] = ' / '.join(pay_lines[:2])

    # 如果總費用沒從費用區塊抓到，從項目加總
    if result["total_amount"] is None and result["item_list"]:
        total = sum(item.get("item_total", 0) or 0 for item in result["item_list"])
        if total > 0:
            result["total_amount"] = total

    return result


def _extract_block(text: str, start_pattern: str, end_pattern: Optional[str]) -> str:
    """提取兩個標籤之間的區塊"""
    start_m = re.search(start_pattern, text)
    if not start_m:
        return ""
    start = start_m.end()

    if end_pattern:
        end_m = re.search(end_pattern, text[start:])
        if end_m:
            end = start + end_m.start()
        else:
            end = len(text)
    else:
        end = len(text)

    return text[start:end].strip()


def _parse_items(block: str) -> list[dict]:
    """解析維修項目區塊

    支援格式:
    1.
    門後掛勾，8勾款*4條共$240(我們公司款式)
    2.
    兩間睡房掛扇(大廳不庄掛扇了)
    $1800/2台12寸KDK掛牆扇(連工包風扇)

    規則：
    - 以數字+句號開頭的行為新項目
    - 價格可能在同一行（共$xxx）或下一行（$xxx/數量 描述）
    - 括號內為備註
    """
    items = []
    # 分割成獨立行
    lines = block.strip().split('\n')

    current_item = None
    seq = 0

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # 檢查是否為新項目（以數字+句號或數字+、開頭）
        m = re.match(r'^(\d+)[.、．，]\s*(.*)', line)
        if m:
            # 儲存上一個項目
            if current_item:
                items.append(current_item)

            seq = int(m.group(1))
            rest = m.group(2).strip()

            current_item = {
                "seq": seq,
                "description": rest,
                "quantity": 1,
                "unit_price": None,
                "item_total": None,
            }

            # 提取行內價格
            _extract_prices_inline(current_item, rest)
        elif current_item:
            # 續行 — 可能是價格行或補充描述
            if re.match(r'^\$[\d,]+', line):
                # 價格行: "$1800/2台12寸KDK掛牆扇(連工包風扇)"
                _extract_prices_inline(current_item, line)
            else:
                # 補充描述
                current_item["description"] += " " + line

    # 單項工單（無編號）
    if not items and not current_item:
        text = block.strip().replace('\n', ' ')
        if text:
            current_item = {
                "seq": 1,
                "description": text,
                "quantity": 1,
                "unit_price": None,
                "item_total": None,
            }

    # 最後一個項目
    if current_item:
        items.append(current_item)

    # 後處理：從描述提取價格
    for item in items:
        desc = item["description"]
        # 共$xxx
        m = re.search(r'共\s*\$([\d,]+)', desc)
        if m:
            item["item_total"] = float(m.group(1).replace(',', ''))
        # $xxx/數量
        m = re.search(r'\$([\d,]+)\s*/\s*(\d+)', desc)
        if m:
            total_price = float(m.group(1).replace(',', ''))
            qty = int(m.group(2))
            item["quantity"] = qty
            item["unit_price"] = round(total_price / qty, 2)
            if item["item_total"] is None:
                item["item_total"] = total_price
        # 單獨 $xxx（不含數量的）
        elif item["item_total"] is None:
            m = re.search(r'\$([\d,]+)(?:\s|$|（|\()', desc)
            if m:
                item["item_total"] = float(m.group(1).replace(',', ''))

    return items


def _extract_prices_inline(item: dict, text: str):
    """從文字中提取價格資訊"""
    # $1800/2台 → total=1800, qty=2, unit=900
    m = re.search(r'\$([\d,]+)\s*/\s*(\d+)', text)
    if m:
        total = float(m.group(1).replace(',', ''))
        qty = int(m.group(2))
        item["quantity"] = qty
        item["unit_price"] = round(total / qty, 2)
        item["item_total"] = total
        return

    # 共$240
    m = re.search(r'共\s*\$([\d,]+)', text)
    if m:
        item["item_total"] = float(m.group(1).replace(',', ''))
        return

    # 純 $500
    m = re.search(r'(?:^|[^/\d])\$([\d,]+)(?:\s|$|，|。|（|\()', text)
    if m:
        item["item_total"] = float(m.group(1).replace(',', ''))


def parse_multi_orders(text: str) -> list[dict]:
    """解析含多則工單的訊息（用日期分隔）"""
    # 用 "DUCKDUCK維修工程" 分割
    parts = re.split(r'DUCKDUCK維修工程', text)
    orders = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        # 加上前綴以便 parser 辨識
        full = "DUCKDUCK維修工程\n" + part
        try:
            order = parse_work_order(full)
            if order["project_id"]:
                orders.append(order)
        except Exception:
            continue
    return orders
