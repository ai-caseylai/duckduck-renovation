"""DUCKDUCK 裝修 Web 介面 — Flask 應用"""

import os
import sys
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from .database import (
    get_db, insert_work_order, get_work_orders, get_work_order,
    update_status, delete_work_order, get_contacts, get_revenue_summary,
    get_category_summary, get_contact_summary, get_price_stats,
)
from .parser import parse_work_order, parse_multi_orders
from .analysis import upcoming_schedule

app = Flask(__name__)
app.secret_key = 'duckduck-renovation-2026'

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "duckduck.db")


def get_conn():
    conn = get_db()
    return conn


# ═══════════════════════════════════════════════════════════
#   Dashboard
# ═══════════════════════════════════════════════════════════

@app.route("/")
def dashboard():
    conn = get_conn()
    try:
        revenue = get_revenue_summary(conn)
        categories = get_category_summary(conn)
        today = datetime.now().strftime("%Y-%m-%d")
        today_orders = get_work_orders(conn, date_from=today, date_to=today, limit=20)
        week_orders = upcoming_schedule(conn, days=7)
        recent = get_work_orders(conn, limit=5)

        # Stats
        stats = {
            "total_orders": revenue["total_orders"],
            "total_revenue": revenue["total_revenue"],
            "paid": revenue["paid_amount"],
            "unpaid": revenue["unpaid_amount"],
            "today_count": len(today_orders),
            "week_count": len(week_orders),
        }

        return render_template(
            "dashboard.html",
            stats=stats,
            today_orders=today_orders,
            week_orders=week_orders,
            recent=recent,
            categories=categories,
            by_month=revenue.get("by_month", []),
            active="dashboard",
        )
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Work Orders List
# ═══════════════════════════════════════════════════════════

@app.route("/orders")
def orders():
    conn = get_conn()
    try:
        status_filter = request.args.get("status", "")
        search = request.args.get("search", "").strip()
        date_from = request.args.get("date_from", "")
        date_to = request.args.get("date_to", "")

        all_orders = get_work_orders(
            conn,
            status=status_filter or None,
            date_from=date_from or None,
            date_to=date_to or None,
            limit=200,
        )

        # Client-side search
        if search:
            q = search.lower()
            all_orders = [
                o for o in all_orders
                if q in (o.get("project_id") or "").lower()
                or q in (o.get("contact_name") or "").lower()
                or q in (o.get("address") or "").lower()
                or q in (o.get("contact_phone") or "")
            ]

        total_amount = sum(o.get("total_amount", 0) or 0 for o in all_orders)
        unpaid_amount = sum(o.get("total_amount", 0) or 0 for o in all_orders if o.get("payment_status") == "未付")

        return render_template(
            "orders.html",
            orders=all_orders,
            status=status_filter,
            search=search,
            date_from=date_from,
            date_to=date_to,
            total_amount=total_amount,
            unpaid_amount=unpaid_amount,
            active="orders",
        )
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Order Detail
# ═══════════════════════════════════════════════════════════

@app.route("/orders/<project_id>")
def order_detail(project_id):
    conn = get_conn()
    try:
        wo = get_work_order(conn, project_id)
        if not wo:
            flash("找不到工單", "error")
            return redirect(url_for("orders"))
        return render_template("detail.html", wo=wo, active="orders")
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Status Update (AJAX)
# ═══════════════════════════════════════════════════════════

@app.route("/orders/<project_id>/status", methods=["POST"])
def order_status(project_id):
    data = request.get_json()
    new_status = data.get("status", "")
    payment = data.get("payment", "")
    conn = get_conn()
    try:
        update_status(conn, project_id, new_status, payment or None)
        return jsonify({"ok": True})
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Delete Order
# ═══════════════════════════════════════════════════════════

@app.route("/orders/<project_id>/delete", methods=["POST"])
def order_delete(project_id):
    conn = get_conn()
    try:
        delete_work_order(conn, project_id)
        flash(f"已刪除 {project_id}", "success")
        return redirect(url_for("orders"))
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Parse New Orders
# ═══════════════════════════════════════════════════════════

@app.route("/parse", methods=["GET", "POST"])
def parse_page():
    if request.method == "POST":
        text = request.form.get("text", "").strip()
        file = request.files.get("file")

        if file and file.filename:
            text = file.read().decode("utf-8", errors="replace")

        if not text:
            flash("請貼上工單文字或上傳檔案", "error")
            return render_template("parse.html", active="parse")

        orders = parse_multi_orders(text)
        if not orders:
            order = parse_work_order(text)
            if order.get("project_id"):
                orders = [order]

        if not orders:
            flash("無法解析工單，請確認格式是否正確", "error")
            return render_template("parse.html", active="parse", text=text)

        conn = get_conn()
        try:
            results = []
            for order in orders:
                wo_id = insert_work_order(conn, order)
                results.append(order)
            flash(f"成功匯入 {len(results)} 張工單！", "success")
        finally:
            conn.close()

        return render_template(
            "parse.html",
            active="parse",
            results=results,
            count=len(results),
        )

    return render_template("parse.html", active="parse")


# ═══════════════════════════════════════════════════════════
#   Analysis
# ═══════════════════════════════════════════════════════════

@app.route("/analysis")
def analysis():
    conn = get_conn()
    try:
        revenue = get_revenue_summary(conn)
        categories = get_category_summary(conn)
        contacts = get_contact_summary(conn)
        prices = get_price_stats(conn)

        return render_template(
            "analysis.html",
            revenue=revenue,
            categories=categories,
            contacts=contacts,
            prices=prices,
            by_month=revenue.get("by_month", []),
            active="analysis",
        )
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Contacts
# ═══════════════════════════════════════════════════════════

@app.route("/contacts")
def contacts_page():
    conn = get_conn()
    try:
        contacts = get_contacts(conn)
        contact_summary = get_contact_summary(conn)

        # Merge
        summary_map = {c["phone"]: c for c in contact_summary}
        merged = []
        for c in contacts:
            s = summary_map.get(c.get("phone"), {})
            merged.append({
                **c,
                "order_count": s.get("order_count", 0),
                "total_spent": s.get("total_spent", 0),
            })

        return render_template("contacts.html", contacts=merged, active="contacts")
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   Schedule
# ═══════════════════════════════════════════════════════════

@app.route("/schedule")
def schedule_page():
    conn = get_conn()
    try:
        days = int(request.args.get("days", 7))
        rows = upcoming_schedule(conn, days)
        return render_template("schedule.html", schedule=rows, days=days, active="schedule")
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════
#   API: Revenue Chart Data
# ═══════════════════════════════════════════════════════════

@app.route("/api/revenue-chart")
def api_revenue_chart():
    conn = get_conn()
    try:
        revenue = get_revenue_summary(conn)
        months = [m["month"] for m in revenue.get("by_month", [])]
        values = [m["total"] for m in revenue.get("by_month", [])]
        counts = [m["cnt"] for m in revenue.get("by_month", [])]
        return jsonify({"months": months, "values": values, "counts": counts})
    finally:
        conn.close()


if __name__ == "__main__":
    print("🏗️  DUCKDUCK 裝修 Web 啟動: http://localhost:5050")
    app.run(debug=True, host="0.0.0.0", port=5050)
