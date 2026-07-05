"""WhatsApp 自動化模組 — 確認回覆、狀態通知、排程提醒"""

import subprocess
import sys
from .database import get_db, get_work_order, log_message

WUZAPI_CLI_PATH = "/Users/perry/WorkBuddy/20260414091025/wuzapi-cli"
MICHAEL_CHAN_PHONE = None  # 從聯絡人查找或設定


def _run_wuzapi(*args) -> tuple[bool, str]:
    """執行 wuzapi CLI 命令"""
    cmd = [
        sys.executable,
        f"{WUZAPI_CLI_PATH}/cli.py",
        *args
    ]
    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=30,
            env={**__import__('os').environ, "WUZAPI_CLI_PATH": WUZAPI_CLI_PATH}
        )
        return result.returncode == 0, result.stdout.strip()
    except Exception as e:
        return False, str(e)


def send_confirmation(project_id: str, to_phone: str = None) -> bool:
    """發送工單確認回覆給 Michael Chan"""
    conn = get_db()
    try:
        wo = get_work_order(conn, project_id)
        if not wo:
            return False

        if not to_phone:
            to_phone = _get_michael_phone()

        items_text = ""
        for item in wo.get("items", []):
            price = f"${item['item_total']:,.0f}" if item.get("item_total") else ""
            items_text += f"  {item['seq']}. {item['description']} {price}\n"

        msg = (
            f"✅ 收到工單 {project_id}\n\n"
            f"📅 {wo.get('scheduled_date', '')} {wo.get('time_slot', '')}\n"
            f"📍 {wo.get('address', '')}\n"
            f"👤 {wo.get('contact_name', '')} {wo.get('contact_phone', '')}\n\n"
            f"項目:\n{items_text}\n"
            f"💰 總費用: ${wo.get('total_amount', 0):,.0f}\n"
            f"📌 狀態: 已確認接收"
        )

        ok, output = _run_wuzapi("send", "text", to_phone, msg)
        if ok:
            log_message(conn, wo["id"], "out", msg)
            print(f"  ✅ 已發送確認訊息給 {to_phone}")
        else:
            print(f"  ❌ 發送失敗: {output}")

        return ok
    finally:
        conn.close()


def send_status_update(project_id: str, status: str, to_client: bool = True) -> bool:
    """發送狀態更新（如完成通知）"""
    conn = get_db()
    try:
        wo = get_work_order(conn, project_id)
        if not wo:
            return False

        status_map = {
            "已完成": "✅ 工單已完成",
            "處理中": "🔧 正在處理中",
            "已確認": "📋 工單已確認",
        }
        header = status_map.get(status, f"📌 {status}")

        msg = (
            f"{header}\n"
            f"項目編號: {project_id}\n"
            f"地址: {wo.get('address', '')}\n"
            f"聯絡: {wo.get('contact_name', '')} {wo.get('contact_phone', '')}\n"
            f"費用: ${wo.get('total_amount', 0):,.0f} ({wo.get('payment_status', '')})"
        )

        # 發給 Michael Chan
        michael = _get_michael_phone()
        ok1, out1 = _run_wuzapi("send", "text", michael, msg)

        # 可選發給客戶
        ok2 = True
        if to_client and wo.get("contact_phone"):
            client_msg = (
                f"DUCKDUCK維修工程通知\n"
                f"項目編號: {project_id}\n"
                f"狀態: {status}\n"
                f"如有疑問請聯絡我們。"
            )
            ok2, out2 = _run_wuzapi("send", "text", wo["contact_phone"], client_msg)

        if ok1:
            log_message(conn, wo["id"], "out", msg)
        return ok1 and ok2
    finally:
        conn.close()


def send_reminder(project_id: str) -> bool:
    """發送排程提醒給客戶"""
    conn = get_db()
    try:
        wo = get_work_order(conn, project_id)
        if not wo or not wo.get("contact_phone"):
            return False

        msg = (
            f"🔔 DUCKDUCK維修工程提醒\n\n"
            f"項目編號: {project_id}\n"
            f"📅 日期: {wo.get('scheduled_date', '')}\n"
            f"🕐 時間: {wo.get('time_slot', '')}\n"
            f"📍 地址: {wo.get('address', '')}\n\n"
            f"我們將準時到達，如有任何變動請聯絡我們。謝謝！"
        )

        ok, output = _run_wuzapi("send", "text", wo["contact_phone"], msg)
        if ok:
            log_message(conn, wo["id"], "out", msg)
            print(f"  ✅ 已發送提醒給 {wo['contact_name']} ({wo['contact_phone']})")
        return ok
    finally:
        conn.close()


def _get_michael_phone() -> str:
    """取得 Michael Chan 的 WhatsApp 號碼"""
    # 嘗試從 wuzapi contacts 查找
    ok, out = _run_wuzapi("contacts", "list")
    if ok:
        for line in out.split('\n'):
            if 'michael' in line.lower() or 'duck' in line.lower():
                # 嘗試提取電話號碼
                import re
                m = re.search(r'(\d{8,})', line)
                if m:
                    return m.group(1) + "@s.whatsapp.net"

    # Fallback: 從工單中的付款資訊推測
    # 90195352 是 Michael Chan 的轉數快號碼
    return "85290195352@s.whatsapp.net"
