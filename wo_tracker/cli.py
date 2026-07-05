#!/usr/bin/env python3
"""DUCKDUCK 裝修 — 工單追蹤、報價分析、自動化 CLI"""

import sys
import os
import click
from datetime import datetime, timedelta
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich import print as rprint

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from .database import (
    get_db, insert_work_order, get_work_orders, get_work_order,
    update_status, delete_work_order, get_contacts, get_revenue_summary,
    get_category_summary,
)
from .parser import parse_work_order, parse_multi_orders
from .analysis import full_report, compare_prices, detect_anomalies, upcoming_schedule
from .automation import send_confirmation, send_status_update, send_reminder

console = Console()


@click.group()
@click.pass_context
def cli(ctx):
    """🏗️  DUCKDUCK 裝修 — 工單追蹤與報價分析系統"""
    ctx.ensure_object(dict)


# ════════════════════════════════════════════════════════════
#  解析 (parse)
# ════════════════════════════════════════════════════════════

@cli.command("parse")
@click.argument("text", required=False)
@click.option("--file", "-f", help="從檔案讀取")
@click.option("--confirm/--no-confirm", default=False, help="解析後自動發確認回覆")
@click.pass_context
def parse_cmd(ctx, text, file, confirm):
    """解析工單訊息並存入資料庫

    \b
    用法:
      wo parse "DUCKDUCK維修工程\\n項目編號:..."
      wo parse -f work_order.txt
      wo parse "..." --confirm   # 同時發確認回覆
    """
    if file:
        with open(file, "r", encoding="utf-8") as f:
            text = f.read()

    if not text:
        console.print("[red]請提供工單文字或 --file[/red]")
        return

    orders = parse_multi_orders(text)
    if not orders:
        console.print("[yellow]未偵測到工單，嘗試單則解析...[/yellow]")
        order = parse_work_order(text)
        if order["project_id"]:
            orders = [order]

    if not orders:
        console.print("[red]無法解析工單，請確認格式[/red]")
        return

    conn = get_db()
    try:
        for order in orders:
            wo_id = insert_work_order(conn, order)
            console.print(Panel.fit(
                f"[bold cyan]項目編號:[/bold cyan] {order['project_id']}\n"
                f"[bold]日期:[/bold] {order.get('scheduled_date', 'N/A')} {order.get('time_slot', '')}\n"
                f"[bold]地址:[/bold] {order.get('address', 'N/A')}\n"
                f"[bold]聯絡:[/bold] {order.get('contact_name', '')} {order.get('contact_phone', '')}\n"
                f"[bold]項目數:[/bold] {len(order.get('items', []))} 項\n"
                f"[bold]費用:[/bold] ${order.get('total_amount', 0):,.0f}\n"
                f"[bold]付款:[/bold] {order.get('payment_status', '未付')}",
                title=f"✅ 工單已儲存 (ID: {wo_id})",
                border_style="green"
            ))

            if confirm:
                send_confirmation(order["project_id"])

        console.print(f"\n[green]共解析 {len(orders)} 張工單[/green]")
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  列表 (list)
# ════════════════════════════════════════════════════════════

@cli.command("list")
@click.option("--status", "-s", help="狀態篩選: 待處理/已確認/已完成/已取消")
@click.option("--today", "filter_today", is_flag=True, help="只顯示今天")
@click.option("--week", "filter_week", is_flag=True, help="只顯示本週")
@click.option("--limit", "-n", default=50, help="顯示筆數")
@click.pass_context
def list_cmd(ctx, status, filter_today, filter_week, limit):
    """列出工單"""
    conn = get_db()
    try:
        date_from = None
        date_to = None
        today = datetime.now().strftime("%Y-%m-%d")
        if filter_today:
            date_from = today
            date_to = today
        elif filter_week:
            date_from = today
            date_to = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")

        orders = get_work_orders(conn, status=status, date_from=date_from,
                                 date_to=date_to, limit=limit)

        if not orders:
            console.print("[yellow]沒有符合條件的工單[/yellow]")
            return

        table = Table(title=f"工單列表 ({len(orders)} 張)")
        table.add_column("項目編號", style="cyan", width=18)
        table.add_column("日期", width=12)
        table.add_column("客戶", width=12)
        table.add_column("地址", width=22)
        table.add_column("費用", justify="right", width=10)
        table.add_column("付款", width=6)
        table.add_column("狀態", width=8)

        for o in orders:
            status_style = {
                "待處理": "yellow",
                "已確認": "cyan",
                "已完成": "green",
                "已取消": "red dim",
            }.get(o.get("status", ""), "white")

            table.add_row(
                o.get("project_id", "")[:18],
                (o.get("scheduled_date") or "")[:12],
                (o.get("contact_name") or "")[:12],
                (o.get("address") or "")[:22],
                f"${o.get('total_amount', 0):,.0f}" if o.get("total_amount") else "-",
                o.get("payment_status", "")[:6],
                f"[{status_style}]{o.get('status', '')}[/{status_style}]",
            )

        console.print(table)

        # 彙總
        total = sum(o.get("total_amount", 0) or 0 for o in orders)
        unpaid = sum(o.get("total_amount", 0) or 0 for o in orders if o.get("payment_status") == "未付")
        console.print(f"[dim]總費用: ${total:,.0f}  |  未收: ${unpaid:,.0f}[/dim]")
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  詳情 (show)
# ════════════════════════════════════════════════════════════

@cli.command("show")
@click.argument("project_id")
@click.pass_context
def show_cmd(ctx, project_id):
    """顯示工單詳細內容"""
    conn = get_db()
    try:
        wo = get_work_order(conn, project_id)
        if not wo:
            console.print(f"[red]找不到工單: {project_id}[/red]")
            return

        items_text = ""
        for item in wo.get("items", []):
            price = f"${item['item_total']:,.0f}" if item.get("item_total") else "-"
            qty = f" x{item['quantity']}" if item.get("quantity", 1) > 1 else ""
            items_text += f"  {item['seq']}. {item['description']}{qty}  {price}\n"

        console.print(Panel(
            f"[bold cyan]項目編號:[/bold cyan] {wo['project_id']}\n"
            f"[bold]日期:[/bold] {wo.get('scheduled_date', 'N/A')}  {wo.get('time_slot', '')}\n"
            f"[bold]地址:[/bold] {wo.get('address', 'N/A')}\n"
            f"[bold]聯絡:[/bold] {wo.get('contact_name', 'N/A')}  📞 {wo.get('contact_phone', 'N/A')}\n\n"
            f"[bold]維修項目:[/bold]\n{items_text}\n"
            f"[bold]備註:[/bold] {wo.get('notes', '無')}\n"
            f"[bold]費用:[/bold] ${wo.get('total_amount', 0):,.0f}\n"
            f"[bold]付款:[/bold] {wo.get('payment_method', 'N/A')}\n"
            f"[bold]付款狀態:[/bold] {wo.get('payment_status', 'N/A')}\n"
            f"[bold]狀態:[/bold] {wo.get('status', 'N/A')}\n"
            f"[dim]接收時間: {wo.get('received_at', 'N/A')}[/dim]",
            title=f"📋 {project_id}",
            border_style="blue"
        ))
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  狀態管理 (status)
# ════════════════════════════════════════════════════════════

@cli.command("status")
@click.argument("project_id")
@click.argument("new_status")
@click.option("--payment", "-p", help="付款狀態: 未付/已付")
@click.option("--notify/--no-notify", default=False, help="是否發送 WhatsApp 通知")
@click.pass_context
def status_cmd(ctx, project_id, new_status, payment, notify):
    """更新工單狀態

    \b
    狀態: 待處理 / 已確認 / 處理中 / 已完成 / 已取消
    範例:
      wo status C020260704001 已完成 -p 已付
      wo status A20260704002 已確認 --notify
    """
    conn = get_db()
    try:
        update_status(conn, project_id, new_status, payment)
        console.print(f"[green]✅ {project_id} → {new_status}[/green]")

        if notify:
            send_status_update(project_id, new_status)
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  刪除 (delete)
# ════════════════════════════════════════════════════════════

@cli.command("delete")
@click.argument("project_id")
@click.option("--force", "-f", is_flag=True, help="強制刪除不確認")
@click.pass_context
def delete_cmd(ctx, project_id, force):
    """刪除工單"""
    if not force:
        ok = click.confirm(f"確定刪除 {project_id}？")
        if not ok:
            return
    conn = get_db()
    try:
        delete_work_order(conn, project_id)
        console.print(f"[red]🗑️  已刪除 {project_id}[/red]")
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  分析 (analyze)
# ════════════════════════════════════════════════════════════

@cli.command("analyze")
@click.option("--compare", "-c", help="比較特定關鍵詞的歷史報價")
@click.option("--anomalies", "-a", is_flag=True, help="偵測異常報價")
@click.pass_context
def analyze_cmd(ctx, compare, anomalies):
    """報價分析與報告"""
    conn = get_db()
    try:
        if compare:
            rows = compare_prices(conn, compare)
            if not rows:
                console.print(f"[yellow]找不到 '{compare}' 相關的價格記錄[/yellow]")
                return
            table = Table(title=f"價格比較: {compare}")
            table.add_column("日期", width=12)
            table.add_column("項目", width=30)
            table.add_column("單價", justify="right", width=10)
            table.add_column("客戶", width=12)
            table.add_column("工單", width=18)
            for r in rows:
                table.add_row(
                    (r.get("scheduled_date") or "")[:12],
                    (r.get("description") or "")[:30],
                    f"${r.get('unit_price', 0):,.0f}",
                    (r.get("contact_name") or "")[:12],
                    (r.get("project_id") or "")[:18],
                )
            console.print(table)

        elif anomalies:
            rows = detect_anomalies(conn)
            if not rows:
                console.print("[green]沒有偵測到異常報價[/green]")
                return
            table = Table(title="⚠️ 異常報價偵測")
            table.add_column("項目", width=25)
            table.add_column("報價", justify="right", width=10)
            table.add_column("均價", justify="right", width=10)
            table.add_column("偏差", justify="right", width=8)
            table.add_column("工單", width=18)
            for r in rows:
                table.add_row(
                    (r.get("description") or "")[:25],
                    f"${r.get('unit_price', 0):,.0f}",
                    f"${r.get('avg_price', 0):,.0f}",
                    f"[red]{r.get('deviation_pct', 0):.0f}%[/red]",
                    (r.get("project_id") or "")[:18],
                )
            console.print(table)

        else:
            # 完整報告
            report = full_report(conn)
            console.print(report)

    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  排程 (schedule)
# ════════════════════════════════════════════════════════════

@cli.command("schedule")
@click.option("--days", "-d", default=7, help="未來 N 天 (預設 7)")
@click.option("--remind", "-r", is_flag=True, help="發送提醒給客戶")
@click.pass_context
def schedule_cmd(ctx, days, remind):
    """查看/管理排程"""
    conn = get_db()
    try:
        rows = upcoming_schedule(conn, days)
        if not rows:
            console.print(f"[yellow]未來 {days} 天沒有排程[/yellow]")
            return

        table = Table(title=f"📅 未來 {days} 天排程 ({len(rows)} 張工單)")
        table.add_column("日期", width=12)
        table.add_column("時間", width=10)
        table.add_column("項目編號", style="cyan", width=18)
        table.add_column("客戶", width=12)
        table.add_column("地址", width=25)

        for r in rows:
            table.add_row(
                (r.get("scheduled_date") or "")[:12],
                (r.get("time_slot") or "")[:10],
                (r.get("project_id") or "")[:18],
                (r.get("contact_name") or "")[:12],
                (r.get("address") or "")[:25],
            )

        console.print(table)

        if remind:
            for r in rows:
                send_reminder(r["project_id"])
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  聯絡人 (contacts)
# ════════════════════════════════════════════════════════════

@cli.command("contacts")
@click.pass_context
def contacts_cmd(ctx):
    """列出所有客戶聯絡人"""
    conn = get_db()
    try:
        contacts = get_contacts(conn)
        if not contacts:
            console.print("[yellow]沒有聯絡人記錄[/yellow]")
            return

        table = Table(title=f"客戶聯絡人 ({len(contacts)} 位)")
        table.add_column("姓名", width=15)
        table.add_column("電話", width=14)
        table.add_column("地址", width=30)
        table.add_column("最後工單", width=12)

        for c in contacts:
            table.add_row(
                (c.get("name") or "未知")[:15],
                (c.get("phone") or "")[:14],
                (c.get("address") or "")[:30],
                (c.get("last_order_at") or "")[:12],
            )

        console.print(table)
    finally:
        conn.close()


# ════════════════════════════════════════════════════════════
#  確認/通知 (notify)
# ════════════════════════════════════════════════════════════

@cli.command("notify")
@click.argument("project_id")
@click.option("--type", "-t", "notify_type",
              type=click.Choice(["confirm", "status", "remind"]),
              default="confirm", help="通知類型")
@click.option("--status", "-s", "notify_status",
              help="狀態（僅 --type status）")
@click.pass_context
def notify_cmd(ctx, project_id, notify_type, notify_status):
    """發送 WhatsApp 通知

    \b
    範例:
      wo notify C020260704001                     # 發確認回覆
      wo notify C020260704001 -t status -s 已完成   # 發狀態更新
      wo notify C020260704001 -t remind            # 發排程提醒
    """
    if notify_type == "confirm":
        send_confirmation(project_id)
    elif notify_type == "status":
        if not notify_status:
            console.print("[red]請提供 --status[/red]")
            return
        send_status_update(project_id, notify_status)
    elif notify_type == "remind":
        send_reminder(project_id)


if __name__ == "__main__":
    cli()
