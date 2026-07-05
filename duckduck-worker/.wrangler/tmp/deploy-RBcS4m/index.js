var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var CSS = `:root{--bg:#f5f7fa;--sidebar-bg:#1a1d23;--card-bg:#fff;--primary:#2563eb;--success:#16a34a;--warning:#f59e0b;--danger:#dc2626;--text:#1e293b;--text-muted:#64748b;--border:#e2e8f0;--radius:12px;--shadow:0 1px 3px rgba(0,0,0,.08)}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);display:flex;min-height:100vh}.sidebar{width:220px;background:var(--sidebar-bg);color:#e2e8f0;display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100}.sidebar-brand{padding:20px 18px;font-size:18px;font-weight:700;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:8px}.sidebar-brand .icon{font-size:24px}.sidebar-nav{flex:1;padding:12px 0}.sidebar-nav a{display:flex;align-items:center;gap:10px;padding:10px 18px;color:#94a3b8;text-decoration:none;font-size:14px;transition:all .15s;border-left:3px solid transparent}.sidebar-nav a:hover{color:#e2e8f0;background:rgba(255,255,255,.05)}.sidebar-nav a.active{color:#fff;background:rgba(37,99,235,.2);border-left-color:var(--primary);font-weight:600}.sidebar-nav .nav-icon{font-size:16px;width:20px;text-align:center}.main{margin-left:220px;flex:1;padding:24px 28px;max-width:calc(100% - 540px);width:calc(100% - 540px)}.page-header{margin-bottom:24px}.page-header h1{font-size:24px;font-weight:700}.page-header p{color:var(--text-muted);font-size:14px;margin-top:4px}.card{background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:20px;margin-bottom:20px}.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.card-header h2{font-size:16px;font-weight:600}.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px}.stat-card{background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px;display:flex;align-items:center;gap:14px}.stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px}.stat-icon.blue{background:#dbeafe;color:#2563eb}.stat-icon.green{background:#dcfce7;color:#16a34a}.stat-icon.amber{background:#fef3c7;color:#d97706}.stat-icon.red{background:#fee2e2;color:#dc2626}.stat-icon.purple{background:#ede9fe;color:#7c3aed}.stat-value{font-size:24px;font-weight:700}.stat-label{font-size:12px;color:var(--text-muted)}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;padding:10px 12px;font-weight:600;color:var(--text-muted);font-size:11px;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid var(--border)}td{padding:10px 12px;border-bottom:1px solid var(--border)}tr:hover{background:#f8fafc}.badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}.badge-pending{background:#fef3c7;color:#92400e}.badge-done{background:#dcfce7;color:#166534}.badge-cancel{background:#fee2e2;color:#991b1b}.badge-confirm{background:#dbeafe;color:#1e40af}.badge-paid{background:#dcfce7;color:#166534}.badge-unpaid{background:#fee2e2;color:#991b1b}.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:none;text-decoration:none;transition:all .15s}.btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:#1d4ed8}.btn-outline{background:#fff;color:var(--text);border:1px solid var(--border)}.btn-outline:hover{background:#f8fafc}.btn-sm{padding:5px 10px;font-size:12px}.btn-danger{background:#fff;color:var(--danger);border:1px solid #fecaca}.btn-danger:hover{background:#fef2f2}.btn-group{display:flex;gap:6px;flex-wrap:wrap}.form-group{margin-bottom:16px}.form-group label{display:block;font-size:13px;font-weight:500;margin-bottom:6px}input,textarea,select{width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit}textarea{min-height:280px;resize:vertical;font-family:'SF Mono',Menlo,monospace;font-size:12px;line-height:1.5}input:focus,textarea:focus,select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.1)}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}@media(max-width:768px){.grid-2,.grid-3{grid-template-columns:1fr}.sidebar{width:60px}.sidebar-brand span,.sidebar-nav a span{display:none}.main{margin-left:60px;width:calc(100% - 60px)}}.empty{text-align:center;padding:40px;color:var(--text-muted)}.empty .icon{font-size:40px;margin-bottom:12px}.result-card{border:1px solid #bbf7d0;border-radius:var(--radius);padding:16px;margin-bottom:12px;background:#f0fdf4}.result-card h3{font-size:14px;color:#166534;margin-bottom:8px}.chart-container{position:relative;height:280px}.link{color:var(--primary);text-decoration:none;font-weight:500}.link:hover{text-decoration:underline}.toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px}.toolbar select,.toolbar input{width:auto}.chat-panel{width:320px;background:var(--card-bg);border-left:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;right:0;bottom:0;z-index:50}.chat-header{background:var(--primary);color:#fff;padding:16px;font-weight:600;font-size:15px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}.chat-header button{background:none;border:none;color:#fff;cursor:pointer;font-size:18px;padding:4px 8px;border-radius:6px}.chat-header button:hover{background:rgba(255,255,255,.15)}.chat-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}.chat-msg{max-width:90%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.5;word-break:break-word}.chat-msg.user{align-self:flex-end;background:var(--primary);color:#fff;border-bottom-right-radius:3px}.chat-msg.bot{align-self:flex-start;background:#f1f5f9;color:var(--text);border-bottom-left-radius:3px}.chat-input-area{display:flex;padding:10px 12px;border-top:1px solid var(--border);gap:8px;flex-shrink:0}.chat-input-area input{flex:1;border:1px solid var(--border);border-radius:18px;padding:8px 14px;font-size:13px;width:auto;background:#f8fafc}.chat-input-area button{width:36px;height:36px;border-radius:50%;background:var(--primary);color:#fff;border:none;cursor:pointer;font-size:14px;flex-shrink:0}.chat-typing{align-self:flex-start;color:var(--text-muted);font-size:12px;padding:4px 12px}.marker-popup{font-size:12px;line-height:1.5}.marker-popup b{font-size:13px}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.calendar-day-header{text-align:center;font-size:11px;font-weight:600;color:var(--text-muted);padding:8px 0}.calendar-day{min-height:80px;border:1px solid var(--border);border-radius:8px;padding:6px;font-size:12px;cursor:pointer;transition:all .15s;position:relative}.calendar-day:hover{background:#f0f7ff}.calendar-day.today{border-color:var(--primary);background:#eff6ff}.calendar-day.other-month{opacity:.3}.calendar-day .day-num{font-weight:600;font-size:13px}.calendar-day .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--primary);margin:2px 1px 0 0;vertical-align:middle}.calendar-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.calendar-nav button{background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;font-size:14px}.calendar-nav h2{font-size:18px}@media(max-width:768px){.chat-panel{width:calc(100vw - 40px);right:20px;height:60vh}}.summary-bar{display:flex;gap:20px;padding:12px 0;font-size:13px;color:var(--text-muted);border-top:1px solid var(--border);margin-top:12px}.teardrop-marker{width:32px;height:42px;position:relative;cursor:pointer}.teardrop-marker::before{content:'';position:absolute;top:0;left:0;width:28px;height:28px;border-radius:50% 50% 50% 0;background:var(--c,#e74c3c);transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid #fff}.teardrop-marker .marker-dot{position:absolute;top:8px;left:8px;width:12px;height:12px;border-radius:50%;background:#fff;z-index:1}.teardrop-marker .marker-label{position:absolute;top:6px;left:0;width:28px;text-align:center;font-size:11px;font-weight:700;color:#fff;z-index:2;text-shadow:0 1px 2px rgba(0,0,0,.3)}`;
var NAV = [
  ["/", "\u{1F4CA}", "\u5100\u8868\u677F", "dashboard"],
  ["/orders", "\u{1F4CB}", "\u5DE5\u55AE\u5217\u8868", "orders"],
  ["/parse", "\u{1F4E5}", "\u532F\u5165\u5DE5\u55AE", "parse"],
  ["/schedule", "\u{1F4C5}", "\u6392\u7A0B", "schedule"],
  ["/analysis", "\u{1F4C8}", "\u5831\u50F9\u5206\u6790", "analysis"],
  ["/contacts", "\u{1F465}", "\u5BA2\u6236", "contacts"],
  ["/map", "\u{1F5FA}\uFE0F", "\u5730\u5716", "map"],
  ["/calendar", "\u{1F4C6}", "\u65E5\u66C6", "calendar"]
];
function layout(title, body, active) {
  const navHTML = NAV.map(
    ([h, i, l, k]) => `<a href="${h}" class="${active === k ? "active" : ""}"><span class="nav-icon">${i}</span><span>${l}</span></a>`
  ).join("");
  return `<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title} \u2014 DUCKDUCK \u88DD\u4FEE</title><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script><style>${CSS}</style></head><body><aside class="sidebar"><div class="sidebar-brand"><span class="icon">\u{1F3D7}\uFE0F</span><span>DUCKDUCK</span></div><nav class="sidebar-nav">${navHTML}</nav></aside><main class="main">${body}<div class="chat-panel" id="chatPanel"><div class="chat-header"><span>\u{1F916} AI \u52A9\u624B (Qwen3)</span></div><div class="chat-messages" id="chatMessages"><div class="chat-msg bot">\u4F60\u597D\uFF01\u6211\u4FC2 DUCKDUCK \u7DAD\u4FEE\u52A9\u624B\u3002\u53EF\u4EE5\u554F\u6211\u5DE5\u55AE\u8CC7\u6599\u3001\u6392\u7A0B\u3001\u5831\u50F9\u5206\u6790\u7B49\u554F\u984C \u{1F64B}</div></div><div class="chat-input-area"><input id="chatInput" placeholder="\u8F38\u5165\u554F\u984C..." onkeypress="if(event.key==='Enter')sendChat()"><button onclick="sendChat()">\u27A4</button></div></div>
</main><script>
async function sendChat(){const i=document.getElementById('chatInput'),t=i.value.trim();if(!t)return;addMsg('user',t);i.value='';const typing=addMsg('bot','...',true);try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t})});const d=await r.json();typing.remove();addMsg('bot',d.reply||'Sorry, error');}catch(e){typing.remove();addMsg('bot','\u7DB2\u7D61\u932F\u8AA4\uFF0C\u8ACB\u91CD\u8A66');}}
function addMsg(role,text,isTyping){const m=document.getElementById('chatMessages'),d=document.createElement('div');d.className='chat-msg '+role;d.textContent=text;if(isTyping)d.className='chat-typing';m.appendChild(d);m.scrollTop=m.scrollHeight;return d;}
<\/script>
</body></html>`;
}
__name(layout, "layout");
function html(title, body, active) {
  return new Response(layout(title, body, active || "dashboard"), {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(html, "html");
function fmt(n) {
  return n != null ? "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "-";
}
__name(fmt, "fmt");
function badge(s) {
  const m = { "\u5F85\u8655\u7406": "badge-pending", "\u5DF2\u78BA\u8A8D": "badge-confirm", "\u5DF2\u5B8C\u6210": "badge-done", "\u5DF2\u53D6\u6D88": "badge-cancel", "\u5DF2\u4ED8": "badge-paid", "\u672A\u4ED8": "badge-unpaid" };
  return `<span class="badge ${m[s] || "badge-pending"}">${s}</span>`;
}
__name(badge, "badge");
async function handleAPI(req, env, url) {
  const p = url.pathname, parts = p.split("/");
  if (p.endsWith("/status") && req.method === "POST") {
    const id = parts[3], b = await req.json();
    if (b.status) await env.DB.prepare("UPDATE work_orders SET status=? WHERE project_id=?").bind(b.status, id).run();
    if (b.payment) await env.DB.prepare("UPDATE work_orders SET payment_status=? WHERE project_id=?").bind(b.payment, id).run();
    return Response.json({ ok: true });
  }
  if (p.endsWith("/delete") && req.method === "POST") {
    await env.DB.prepare("DELETE FROM work_orders WHERE project_id=?").bind(parts[3]).run();
    return Response.redirect("/orders", 302);
  }
  return Response.json({ error: "Not found" }, { status: 404 });
}
__name(handleAPI, "handleAPI");
function extractBlock(text, startPat, endPat) {
  const s = text.search(startPat);
  if (s === -1) return "";
  const si = s + text.match(startPat)[0].length;
  let ei = text.length;
  if (endPat) {
    const sub = text.substring(si);
    const e = sub.search(endPat);
    if (e !== -1) ei = si + e;
  }
  return text.substring(si, ei).trim();
}
__name(extractBlock, "extractBlock");
function extractPrice(item, text) {
  let m = text.match(/\$([\d,]+)\s*\/\s*(\d+)/);
  if (m) {
    const t = parseFloat(m[1].replace(/,/g, ""));
    item.quantity = parseInt(m[2]);
    item.unit_price = Math.round(t / item.quantity * 100) / 100;
    item.item_total = t;
    return;
  }
  m = text.match(/共\s*\$([\d,]+)/);
  if (m) {
    item.item_total = parseFloat(m[1].replace(/,/g, ""));
    return;
  }
  m = text.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/);
  if (m) item.item_total = parseFloat(m[1].replace(/,/g, ""));
}
__name(extractPrice, "extractPrice");
function parseItems(block) {
  const items = [], lines = block.trim().split("\n");
  let cur = null, seq = 0;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^(\d+)[.、．，]\s*(.*)/);
    if (m) {
      if (cur) items.push(cur);
      seq = parseInt(m[1]);
      cur = { seq, description: m[2].trim(), quantity: 1, unit_price: null, item_total: null };
      extractPrice(cur, m[2]);
    } else if (cur) {
      if (/^\$[\d,]+/.test(t)) extractPrice(cur, t);
      else cur.description += " " + t;
    }
  }
  if (cur) items.push(cur);
  if (!items.length) items.push({ seq: 1, description: block.trim().replace(/\n/g, " "), quantity: 1, unit_price: null, item_total: null });
  for (const item of items) {
    if (item.item_total !== null) continue;
    const d = item.description;
    let m = d.match(/共\s*\$([\d,]+)/);
    if (m) {
      item.item_total = parseFloat(m[1].replace(/,/g, ""));
      continue;
    }
    m = d.match(/\$([\d,]+)\s*\/\s*(\d+)/);
    if (m) {
      const t = parseFloat(m[1].replace(/,/g, ""));
      item.quantity = parseInt(m[2]);
      item.unit_price = Math.round(t / item.quantity * 100) / 100;
      item.item_total = t;
      continue;
    }
    m = d.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/);
    if (m) item.item_total = parseFloat(m[1].replace(/,/g, ""));
  }
  return items;
}
__name(parseItems, "parseItems");
function parseWorkOrder(text) {
  const r = { project_id: "", raw_text: text.trim(), scheduled_date: null, time_slot: null, address: "", contact_name: "", contact_phone: "", total_amount: null, payment_method: "", payment_status: "\u672A\u4ED8", status: "\u5F85\u8655\u7406", notes: "", item_list: [] };
  const pm = text.match(/項目編號[：:]\s*([A-Z]?\d+)/);
  if (pm) r.project_id = pm[1].trim();
  const tb = extractBlock(text, /時間[：:]/, /地址[：:]/);
  if (tb) {
    const dm = tb.match(/\((\d+)\/(\d+)\)/);
    if (dm) {
      const y = (/* @__PURE__ */ new Date()).getFullYear();
      r.scheduled_date = `${y}-${dm[2].padStart(2, "0")}-${dm[1].padStart(2, "0")}`;
    } else r.scheduled_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const tm = tb.match(/(\d{1,2}:\d{2})\s*[-~至到]\s*(\d{1,2}:\d{2})/);
    if (tm) r.time_slot = `${tm[1]}-${tm[2]}`;
    else {
      const sm = tb.match(/(\d{1,2}:\d{2})/);
      if (sm) r.time_slot = sm[1];
    }
  }
  const addr = extractBlock(text, /地址[：:]/, /聯絡[：:]/);
  if (addr) r.address = addr.replace(/\n/g, "").trim();
  const cb = extractBlock(text, /聯絡[：:]/, /維修項目[：:]/);
  if (cb) {
    const ph = cb.match(/(\d{4}\s*\d{4})/);
    if (ph) {
      r.contact_phone = ph[1].replace(/\s/g, "");
      r.contact_name = cb.substring(0, ph.index).trim();
    }
  }
  const ib = extractBlock(text, /維修項目[：:]/, /備註[：:]/);
  if (ib) r.item_list = parseItems(ib);
  const nb = extractBlock(text, /備註[：:]/, /費用[：:]/);
  if (nb) r.notes = nb.trim();
  const fb = extractBlock(text, /費用[：:]/, /付款方式[：:]/);
  if (fb) {
    if (fb.includes("\u5DF2\u4ED8")) r.payment_status = "\u5DF2\u4ED8";
    const am = fb.match(/\$([\d,]+\.?\d*)/);
    if (am) r.total_amount = parseFloat(am[1].replace(/,/g, ""));
  }
  const pb = extractBlock(text, /付款方式[：:]/, null);
  if (pb) {
    const ls = pb.trim().split("\n").filter((l) => l.trim());
    r.payment_method = ls.slice(0, 2).join(" / ");
  }
  if (r.total_amount === null && r.item_list.length) r.total_amount = r.item_list.reduce((s, i) => s + (i.item_total || 0), 0);
  return r;
}
__name(parseWorkOrder, "parseWorkOrder");
function parseMultiOrders(text) {
  return text.split(/DUCKDUCK維修工程/).map((p) => p.trim()).filter(Boolean).map((p) => parseWorkOrder("DUCKDUCK\u7DAD\u4FEE\u5DE5\u7A0B\n" + p)).filter((o) => o.project_id);
}
__name(parseMultiOrders, "parseMultiOrders");
async function insertWO(env, data) {
  const ex = await env.DB.prepare("SELECT id FROM work_orders WHERE project_id=?").bind(data.project_id).first();
  let woId;
  if (ex) {
    woId = ex.id;
    await env.DB.prepare("UPDATE work_orders SET raw_text=?,scheduled_date=?,time_slot=?,address=?,contact_name=?,contact_phone=?,total_amount=?,payment_method=?,payment_status=?,status=?,notes=? WHERE project_id=?").bind(data.raw_text, data.scheduled_date, data.time_slot, data.address, data.contact_name, data.contact_phone, data.total_amount, data.payment_method, data.payment_status, data.status, data.notes, data.project_id).run();
    await env.DB.prepare("DELETE FROM work_order_items WHERE work_order_id=?").bind(woId).run();
  } else {
    const r = await env.DB.prepare("INSERT INTO work_orders(project_id,raw_text,scheduled_date,time_slot,address,contact_name,contact_phone,total_amount,payment_method,payment_status,status,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)").bind(data.project_id, data.raw_text, data.scheduled_date, data.time_slot, data.address, data.contact_name, data.contact_phone, data.total_amount, data.payment_method, data.payment_status, data.status, data.notes).run();
    woId = r.meta.last_row_id;
  }
  for (const item of data.item_list || []) {
    await env.DB.prepare("INSERT INTO work_order_items(work_order_id,seq,description,quantity,unit_price,item_total) VALUES(?,?,?,?,?,?)").bind(woId, item.seq, item.description, item.quantity || 1, item.unit_price, item.item_total).run();
  }
  if (data.contact_phone) {
    await env.DB.prepare("INSERT INTO contacts(name,phone,address,last_order_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(phone) DO UPDATE SET name=excluded.name,address=excluded.address,last_order_at=datetime('now')").bind(data.contact_name, data.contact_phone, data.address).run();
  }
  return woId;
}
__name(insertWO, "insertWO");
async function dashboard(env) {
  const s = await env.DB.prepare("SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders").first();
  const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='\u5DF2\u4ED8'").first();
  const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='\u672A\u4ED8'").first();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const todayOrders = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date=? ORDER BY time_slot LIMIT 20").bind(today).all();
  const we = new Date(Date.now() + 7 * 864e5).toISOString().split("T")[0];
  const weekOrders = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot LIMIT 20").bind(today, we).all();
  const recent = await env.DB.prepare("SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 5").all();
  const cats = await env.DB.prepare(`SELECT CASE WHEN description LIKE '%\u639B\u6247%' OR description LIKE '%\u98A8\u6247%' OR description LIKE '%\u62BD\u6C23%' THEN '\u98A8\u6247\u985E' WHEN description LIKE '%\u9F8D\u982D%' OR description LIKE '%\u6C34\u9F8D\u982D%' THEN '\u6C34\u5589\u985E' WHEN description LIKE '%\u71C8%' THEN '\u71C8\u5177\u985E' WHEN description LIKE '%\u639B\u52FE%' OR description LIKE '%\u7D19\u5DFE\u67B6%' OR description LIKE '%\u88DD\u9278%' THEN '\u4E94\u91D1\u914D\u4EF6' WHEN description LIKE '%\u96FB\u8996%' THEN '\u96FB\u5668\u642C\u904B' ELSE '\u5176\u4ED6' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC`).all();
  let debugInfo = '<div style="background:#1a1d23;color:#0f0;font:11px monospace;padding:12px;margin-bottom:16px;border-radius:8px">';
  debugInfo += "<b>Server Debug:</b> Orders=" + orders.results.length + " Markers=" + markersData.length + " | ";
  for (const md of markersData) {
    debugInfo += md.project_id + ":" + (md.coords ? "OK" : "FAIL") + " ";
  }
  debugInfo += "</div>";
  const body = debugInfo + `<div class="page-header"><h1>\u{1F4CA} \u5100\u8868\u677F</h1></div>
<div class="stat-grid">
  <div class="stat-card"><div class="stat-icon blue">\u{1F4CB}</div><div><div class="stat-value">${s.cnt}</div><div class="stat-label">\u7E3D\u5DE5\u55AE\u6578</div></div></div>
  <div class="stat-card"><div class="stat-icon green">\u{1F4B0}</div><div><div class="stat-value">${fmt(s.total)}</div><div class="stat-label">\u7E3D\u71DF\u6536</div></div></div>
  <div class="stat-card"><div class="stat-icon amber">\u26A0\uFE0F</div><div><div class="stat-value">${fmt(ur.u)}</div><div class="stat-label">\u672A\u6536\u6B3E</div></div></div>
  <div class="stat-card"><div class="stat-icon red">\u{1F4C5}</div><div><div class="stat-value">${todayOrders.results.length}</div><div class="stat-label">\u4ECA\u65E5\u5DE5\u55AE</div></div></div>
  <div class="stat-card"><div class="stat-icon purple">\u{1F5D3}\uFE0F</div><div><div class="stat-value">${weekOrders.results.length}</div><div class="stat-label">\u672C\u9031\u6392\u7A0B</div></div></div>
</div>
<div class="grid-2">
  <div class="card"><div class="card-header"><h2>\u{1F4C5} \u4ECA\u65E5\u6392\u7A0B</h2></div>
    ${todayOrders.results.length ? todayOrders.results.map((o) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><div><a href="/orders/${o.project_id}" class="link">${o.project_id}</a> ${o.time_slot || ""}</div><div>${o.contact_name || "-"}</div><div style="color:var(--text-muted)">${(o.address || "").substring(0, 12)}</div></div>`).join("") : '<div class="empty"><div class="icon">\u{1F389}</div>\u4ECA\u65E5\u7121\u6392\u7A0B</div>'}
  </div>
  <div class="card"><div class="card-header"><h2>\u{1F5D3}\uFE0F \u672C\u9031\u6392\u7A0B</h2></div>
    ${weekOrders.results.length ? weekOrders.results.slice(0, 8).map((o) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><div>${o.scheduled_date || ""} ${o.time_slot || ""}</div><div>${o.contact_name || "-"}</div><div style="color:var(--text-muted)">${(o.address || "").substring(0, 12)}</div></div>`).join("") : '<div class="empty">\u66AB\u7121\u6392\u7A0B</div>'}
  </div>
</div>
<div class="grid-2">
  <div class="card"><div class="card-header"><h2>\u{1F527} \u7DAD\u4FEE\u985E\u5225</h2></div>
    ${cats.results.length ? '<div class="chart-container" style="height:240px"><canvas id="catChart"></canvas></div>' : '<div class="empty">\u5C1A\u7121\u6578\u64DA</div>'}
  </div>
  <div class="card"><div class="card-header"><h2>\u{1F550} \u6700\u8FD1\u5DE5\u55AE</h2><a href="/orders" class="link">\u5168\u90E8 \u2192</a></div>
    ${recent.results.map((o) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><div><a href="/orders/${o.project_id}" class="link">${o.project_id}</a></div><div>${o.contact_name || "-"}</div><div style="font-weight:600">${fmt(o.total_amount)}</div><div>${badge(o.status)}</div></div>`).join("")}
  </div>
</div>
${cats.results.length ? `<script>new Chart(document.getElementById('catChart'),{type:'doughnut',data:{labels:[${cats.results.map((c) => `'${c.category}'`).join(",")}],datasets:[{data:[${cats.results.map((c) => c.total_revenue).join(",")}],backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#7c3aed','#06b6d4','#ec4899']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:12,font:{size:11}}}}}});<\/script>` : ""}`;
  return html("\u5100\u8868\u677F", body);
}
__name(dashboard, "dashboard");
async function ordersPage(env, url) {
  const status = url.searchParams.get("status") || "";
  const search = url.searchParams.get("search") || "";
  const dbOrders = await env.DB.prepare("SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 200").all();
  let rows = dbOrders.results;
  if (status) rows = rows.filter((o) => o.status === status);
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((o) => (o.project_id || "").toLowerCase().includes(q) || (o.contact_name || "").toLowerCase().includes(q) || (o.address || "").toLowerCase().includes(q) || (o.contact_phone || "").includes(q));
  }
  const total = rows.reduce((s, o) => s + (o.total_amount || 0), 0);
  const unpaid = rows.filter((o) => o.payment_status === "\u672A\u4ED8").reduce((s, o) => s + (o.total_amount || 0), 0);
  const statusOpts = ["", "\u5F85\u8655\u7406", "\u5DF2\u78BA\u8A8D", "\u5DF2\u5B8C\u6210", "\u5DF2\u53D6\u6D88"].map((v) => `<option value="${v}" ${status === v ? "selected" : ""}>${v || "\u5168\u90E8\u72C0\u614B"}</option>`).join("");
  const body = `<div class="page-header"><h1>\u{1F4CB} \u5DE5\u55AE\u5217\u8868</h1><p>\u5171 ${rows.length} \u5F35 \xB7 \u7E3D ${fmt(total)} \xB7 \u672A\u6536 ${fmt(unpaid)}</p></div>
<div class="card">
  <div class="toolbar">
    <select onchange="location.href='?status='+this.value+'&search=${search}'">${statusOpts}</select>
    <form method="get" style="display:flex;gap:10px"><input type="hidden" name="status" value="${status}"><input type="text" name="search" value="${search}" placeholder="\u641C\u5C0B\u7DE8\u865F/\u5BA2\u6236/\u5730\u5740..." style="width:200px"><button class="btn btn-outline btn-sm">\u641C\u5C0B</button></form>
  </div>
  <table><thead><tr><th>\u7DE8\u865F</th><th>\u65E5\u671F</th><th>\u6642\u9593</th><th>\u5BA2\u6236</th><th>\u5730\u5740</th><th style="text-align:right">\u8CBB\u7528</th><th>\u4ED8\u6B3E</th><th>\u72C0\u614B</th></tr></thead><tbody>
    ${rows.length ? rows.map((o) => `<tr><td><a href="/orders/${o.project_id}" class="link">${o.project_id}</a></td><td>${o.scheduled_date || "-"}</td><td>${o.time_slot || "-"}</td><td>${o.contact_name || "-"}</td><td>${(o.address || "").substring(0, 22)}</td><td style="text-align:right;font-weight:600">${fmt(o.total_amount)}</td><td>${badge(o.payment_status)}</td><td>${badge(o.status)}</td></tr>`).join("") : '<tr><td colspan="8"><div class="empty">\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u5DE5\u55AE</div></td></tr>'}
  </tbody></table>
</div>`;
  return html("\u5DE5\u55AE\u5217\u8868", body, "orders");
}
__name(ordersPage, "ordersPage");
async function orderDetail(env, id) {
  const wo = await env.DB.prepare("SELECT * FROM work_orders WHERE project_id=?").bind(id).first();
  if (!wo) return html("404", '<h1>\u627E\u4E0D\u5230\u5DE5\u55AE</h1><a href="/orders">\u8FD4\u56DE</a>');
  const items = await env.DB.prepare("SELECT * FROM work_order_items WHERE work_order_id=? ORDER BY seq").bind(wo.id).all();
  const itemsRows = items.results.length ? items.results.map(
    (i) => `<tr><td>${i.seq}</td><td>${i.description}</td><td style="text-align:center">${i.quantity !== 1 ? i.quantity : "-"}</td><td style="text-align:right;font-weight:600">${fmt(i.item_total)}</td></tr>`
  ).join("") : '<tr><td colspan="4">\u7121\u660E\u7D30</td></tr>';
  const body = `<div class="page-header"><div style="display:flex;justify-content:space-between"><div><h1>\u{1F4CB} ${wo.project_id}</h1><p>${wo.received_at}</p></div>
  <form method="post" action="/api/orders/${wo.project_id}/delete" onsubmit="return confirm('\u78BA\u5B9A\u522A\u9664\uFF1F')"><button class="btn btn-danger btn-sm">\u{1F5D1}\uFE0F \u522A\u9664</button></form></div></div>
<div class="grid-2">
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">\u{1F4CC} \u57FA\u672C\u8CC7\u6599</h2>
    <table style="font-size:14px">
      <tr><td style="width:80px;color:#64748b;padding:6px 0">\u65E5\u671F</td><td>${wo.scheduled_date || "-"} ${wo.time_slot || ""}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">\u5730\u5740</td><td>${wo.address || "-"}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">\u806F\u7D61</td><td>${wo.contact_name || "-"} \u{1F4DE} ${wo.contact_phone || "-"}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">\u8CBB\u7528</td><td style="font-size:18px;font-weight:700;color:#2563eb">${fmt(wo.total_amount)}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">\u4ED8\u6B3E</td><td>${wo.payment_method || "-"}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">\u72C0\u614B</td><td>${badge(wo.status)} ${badge(wo.payment_status)}</td></tr>
    </table>
    <div style="margin-top:16px"><label style="font-size:13px;font-weight:500">\u5FEB\u901F\u66F4\u65B0</label>
      <div class="btn-group">
        <button onclick="qu('${wo.project_id}','\u5DF2\u5B8C\u6210','\u5DF2\u4ED8')" class="btn btn-primary btn-sm">\u2705 \u5B8C\u6210+\u5DF2\u4ED8</button>
        <button onclick="qu('${wo.project_id}','\u5DF2\u5B8C\u6210','')" class="btn btn-outline btn-sm">\u2705 \u5B8C\u6210</button>
        <button onclick="qu('${wo.project_id}','\u5DF2\u53D6\u6D88','')" class="btn btn-outline btn-sm">\u274C \u53D6\u6D88</button>
      </div>
    </div>
  </div>
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">\u{1F527} \u7DAD\u4FEE\u9805\u76EE</h2>
    <table><thead><tr><th style="width:30px">#</th><th>\u9805\u76EE</th><th style="width:50px;text-align:center">\u6578\u91CF</th><th style="width:80px;text-align:right">\u91D1\u984D</th></tr></thead><tbody>${itemsRows}</tbody></table>
  </div>
</div>
${wo.notes ? `<div class="card"><h2 style="font-size:16px;margin-bottom:8px">\u{1F4DD} \u5099\u8A3B</h2><p style="color:#64748b">${wo.notes}</p></div>` : ""}
<div class="card"><h2 style="font-size:16px;margin-bottom:8px">\u{1F4C4} \u539F\u59CB\u8A0A\u606F</h2><pre style="background:#f8fafc;padding:16px;border-radius:8px;font-size:12px;line-height:1.6;white-space:pre-wrap">${wo.raw_text}</pre></div>
<script>async function qu(id,st,pm){const b={status:st};if(pm)b.payment=pm;await fetch('/api/orders/'+id+'/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});location.reload();}<\/script>`;
  return html(wo.project_id, body, "orders");
}
__name(orderDetail, "orderDetail");
async function parsePage(env) {
  const body = `<div class="page-header"><h1>\u{1F4E5} \u532F\u5165\u5DE5\u55AE</h1><p>\u8CBC\u4E0A Michael Chan \u7684 WhatsApp \u8A0A\u606F</p></div>
<div class="grid-2">
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">\u{1F4DD} \u8CBC\u4E0A\u8A0A\u606F</h2>
    <form method="post"><div class="form-group"><textarea name="text" placeholder="DUCKDUCK\u7DAD\u4FEE\u5DE5\u7A0B&#10;\u9805\u76EE\u7DE8\u865F:C20260706001&#10;..."></textarea></div>
    <button class="btn btn-primary">\u{1F50D} \u89E3\u6790\u4E26\u532F\u5165</button></form>
  </div>
  <div class="card"><h2 style="font-size:16px;margin-bottom:12px">\u{1F4CB} \u683C\u5F0F\u8AAA\u660E</h2>
    <div style="font-size:13px;color:#64748b;line-height:1.8">
      <p>\u652F\u63F4\u6A19\u6E96\u5DE5\u55AE\u683C\u5F0F\uFF1A</p><ul style="padding-left:20px;margin-top:8px">
        <li>\u2705 \u9805\u76EE\u7DE8\u865F (C/A + \u6578\u5B57)</li><li>\u2705 \u65E5\u671F\u6642\u9593 (4/7 / \u660E\u65E9 / 10:00)</li>
        <li>\u2705 \u5730\u5740</li><li>\u2705 \u806F\u7D61\u4EBA + \u96FB\u8A71</li><li>\u2705 \u7DAD\u4FEE\u9805\u76EE (1. / 1\uFF0C / $xxx/\u6578\u91CF)</li>
        <li>\u2705 \u5099\u8A3B</li><li>\u2705 \u8CBB\u7528 + \u4ED8\u6B3E\u72C0\u614B</li></ul>
      <p style="margin-top:12px">\u26A0\uFE0F \u53EF\u4E00\u6B21\u8CBC\u591A\u5F35\uFF08\u4EE5 DUCKDUCK\u7DAD\u4FEE\u5DE5\u7A0B \u5206\u9694\uFF09</p>
    </div>
  </div>
</div>`;
  return html("\u532F\u5165\u5DE5\u55AE", body, "parse");
}
__name(parsePage, "parsePage");
async function parseSubmit(req, env) {
  const form = await req.formData();
  const text = (form.get("text") || "").trim();
  if (!text) return html("\u932F\u8AA4", '<p>\u8ACB\u8F38\u5165\u5DE5\u55AE\u6587\u5B57</p><a href="/parse">\u8FD4\u56DE</a>');
  const orders2 = parseMultiOrders(text);
  if (!orders2.length) {
    const s = parseWorkOrder(text);
    if (s.project_id) orders2.push(s);
  }
  if (!orders2.length) return html("\u932F\u8AA4", '<p>\u7121\u6CD5\u89E3\u6790\u5DE5\u55AE</p><a href="/parse">\u8FD4\u56DE</a>');
  const results = [];
  for (const o of orders2) {
    await insertWO(env, o);
    results.push(o);
  }
  const body = `<div class="page-header"><h1>\u{1F4E5} \u532F\u5165\u7D50\u679C</h1></div>
<div class="card"><h2 style="font-size:16px;color:#166534;margin-bottom:12px">\u2705 \u6210\u529F\u532F\u5165 ${results.length} \u5F35\u5DE5\u55AE</h2>
${results.map((o) => `<div class="result-card"><h3><a href="/orders/${o.project_id}" class="link">${o.project_id}</a></h3><div style="font-size:13px">\u{1F4C5} ${o.scheduled_date || "-"} ${o.time_slot || ""} \xB7 \u{1F4CD} ${o.address || "-"}</div><div style="font-size:13px">\u{1F464} ${o.contact_name || "-"} \u{1F4DE} ${o.contact_phone || "-"}</div><div style="font-size:12px;color:#64748b">${o.item_list.map((i) => i.seq + "." + i.description.substring(0, 20)).join(" \xB7 ")}</div><div style="font-weight:600;margin-top:4px">\u{1F4B0} ${fmt(o.total_amount)}</div></div>`).join("")}
<a href="/orders" class="btn btn-outline btn-sm" style="margin-top:12px">\u{1F4CB} \u67E5\u770B\u5217\u8868</a></div>`;
  return html("\u532F\u5165\u7D50\u679C", body, "parse");
}
__name(parseSubmit, "parseSubmit");
async function analysisPage(env) {
  const s = await env.DB.prepare("SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders").first();
  const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='\u5DF2\u4ED8'").first();
  const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='\u672A\u4ED8'").first();
  const cats = await env.DB.prepare(`SELECT CASE WHEN description LIKE '%\u639B\u6247%' OR description LIKE '%\u98A8\u6247%' OR description LIKE '%\u62BD\u6C23%' THEN '\u98A8\u6247\u985E' WHEN description LIKE '%\u9F8D\u982D%' OR description LIKE '%\u6C34\u9F8D\u982D%' THEN '\u6C34\u5589\u985E' WHEN description LIKE '%\u71C8%' THEN '\u71C8\u5177\u985E' WHEN description LIKE '%\u639B\u52FE%' OR description LIKE '%\u7D19\u5DFE\u67B6%' OR description LIKE '%\u88DD\u9278%' THEN '\u4E94\u91D1\u914D\u4EF6' WHEN description LIKE '%\u96FB\u8996%' THEN '\u96FB\u5668\u642C\u904B' ELSE '\u5176\u4ED6' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC`).all();
  const contacts = await env.DB.prepare("SELECT c.name, c.phone, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY total_spent DESC LIMIT 10").all();
  const rate = s.total > 0 ? Math.round(pr.p / s.total * 100) : 0;
  const body = `<div class="page-header"><h1>\u{1F4C8} \u5831\u50F9\u5206\u6790</h1></div>
<div class="stat-grid">
  <div class="stat-card"><div class="stat-icon blue">\u{1F4CB}</div><div><div class="stat-value">${s.cnt}</div><div class="stat-label">\u7E3D\u5DE5\u55AE\u6578</div></div></div>
  <div class="stat-card"><div class="stat-icon green">\u{1F4B0}</div><div><div class="stat-value">${fmt(s.total)}</div><div class="stat-label">\u7E3D\u71DF\u6536</div></div></div>
  <div class="stat-card"><div class="stat-icon amber">\u26A0\uFE0F</div><div><div class="stat-value">${fmt(ur.u)}</div><div class="stat-label">\u672A\u6536\u6B3E</div></div></div>
  <div class="stat-card"><div class="stat-icon purple">\u{1F4CA}</div><div><div class="stat-value">${rate}%</div><div class="stat-label">\u6536\u6B3E\u7387</div></div></div>
</div>
<div class="grid-2">
  <div class="card"><div class="card-header"><h2>\u{1F527} \u985E\u5225\u660E\u7D30</h2></div>
    <table><thead><tr><th>\u985E\u5225</th><th style="text-align:center">\u6B21\u6578</th><th style="text-align:right">\u71DF\u6536</th><th style="text-align:right">\u4F54\u6BD4</th></tr></thead><tbody>
    ${cats.results.map((c) => `<tr><td>${c.category}</td><td style="text-align:center">${c.cnt}</td><td style="text-align:right;font-weight:600">${fmt(c.total_revenue)}</td><td style="text-align:right">${s.total > 0 ? Math.round(c.total_revenue / s.total * 100) : 0}%</td></tr>`).join("")}
    </tbody></table>
  </div>
  <div class="card"><div class="card-header"><h2>\u{1F465} \u5BA2\u6236\u8CA2\u737B</h2></div>
    <table><thead><tr><th>\u5BA2\u6236</th><th style="text-align:center">\u55AE\u6578</th><th style="text-align:right">\u7E3D\u6D88\u8CBB</th></tr></thead><tbody>
    ${contacts.results.map((c) => `<tr><td>${c.name || "\u672A\u77E5"}</td><td style="text-align:center">${c.order_count}</td><td style="text-align:right;font-weight:600">${fmt(c.total_spent)}</td></tr>`).join("")}
    </tbody></table>
  </div>
</div>
${cats.results.length ? `<div class="card"><div class="card-header"><h2>\u{1F4CA} \u985E\u5225\u5206\u4F48</h2></div><div class="chart-container" style="height:260px"><canvas id="catChart2"></canvas></div></div><script>new Chart(document.getElementById('catChart2'),{type:'doughnut',data:{labels:[${cats.results.map((c) => `'${c.category}'`).join(",")}],datasets:[{data:[${cats.results.map((c) => c.total_revenue).join(",")}],backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#7c3aed','#06b6d4','#ec4899']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:12,font:{size:11}}}}}});<\/script>` : ""}`;
  return html("\u5831\u50F9\u5206\u6790", body, "analysis");
}
__name(analysisPage, "analysisPage");
async function schedulePage(env, url) {
  const days = parseInt(url.searchParams.get("days") || "7");
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const end = new Date(Date.now() + days * 864e5).toISOString().split("T")[0];
  const rows = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot").bind(today, end).all();
  const dayOpts = [1, 3, 7, 14, 30].map((d) => `<option value="${d}" ${days === d ? "selected" : ""}>${d}</option>`).join("");
  const body = `<div class="page-header"><h1>\u{1F4C5} \u6392\u7A0B\u7BA1\u7406</h1><p>\u672A\u4F86 <select onchange="location.href='?days='+this.value" style="width:auto;display:inline">${dayOpts}</select> \u5929 \xB7 ${rows.results.length} \u5F35\u5DE5\u55AE</p></div>
<div class="card"><table><thead><tr><th>\u65E5\u671F</th><th>\u6642\u9593</th><th>\u7DE8\u865F</th><th>\u5BA2\u6236</th><th>\u96FB\u8A71</th><th>\u5730\u5740</th><th style="text-align:right">\u8CBB\u7528</th><th>\u72C0\u614B</th></tr></thead><tbody>
${rows.results.length ? rows.results.map((s) => `<tr><td><b>${s.scheduled_date}</b></td><td>${s.time_slot || "-"}</td><td><a href="/orders/${s.project_id}" class="link">${s.project_id}</a></td><td>${s.contact_name || "-"}</td><td style="font-size:12px;color:#64748b">${s.contact_phone || "-"}</td><td>${(s.address || "").substring(0, 22)}</td><td style="text-align:right;font-weight:600">${fmt(s.total_amount)}</td><td>${badge(s.status)}</td></tr>`).join("") : '<tr><td colspan="8"><div class="empty"><div class="icon">\u{1F389}</div>\u6C92\u6709\u6392\u7A0B</div></td></tr>'}
</tbody></table></div>`;
  return html("\u6392\u7A0B", body, "schedule");
}
__name(schedulePage, "schedulePage");
async function contactsPage(env) {
  const rows = await env.DB.prepare("SELECT c.*, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY c.last_order_at DESC").all();
  const body = `<div class="page-header"><h1>\u{1F465} \u5BA2\u6236\u806F\u7D61\u4EBA</h1><p>\u5171 ${rows.results.length} \u4F4D</p></div>
<div class="card"><table><thead><tr><th>\u59D3\u540D</th><th>\u96FB\u8A71</th><th>\u5730\u5740</th><th style="text-align:center">\u5DE5\u55AE\u6578</th><th style="text-align:right">\u7E3D\u6D88\u8CBB</th><th>\u6700\u5F8C\u5DE5\u55AE</th></tr></thead><tbody>
${rows.results.length ? rows.results.map((c) => `<tr><td><b>${c.name || "\u672A\u77E5"}</b></td><td>${c.phone || "-"}</td><td>${(c.address || "").substring(0, 25)}</td><td style="text-align:center">${c.order_count}</td><td style="text-align:right;font-weight:600">${fmt(c.total_spent)}</td><td style="font-size:12px;color:#64748b">${c.last_order_at || "-"}</td></tr>`).join("") : '<tr><td colspan="6"><div class="empty">\u5C1A\u7121\u5BA2\u6236\u8A18\u9304</div></td></tr>'}
</tbody></table></div>`;
  return html("\u5BA2\u6236", body, "contacts");
}
__name(contactsPage, "contactsPage");
async function chatAPI(req, env) {
  const { message } = await req.json();
  if (!message || !message.trim()) return Response.json({ reply: "\u8ACB\u8F38\u5165\u554F\u984C" });
  const stats = await env.DB.prepare("SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders").first();
  const unpaid = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='\u672A\u4ED8'").first();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const todayOrders = await env.DB.prepare("SELECT project_id, contact_name, address, time_slot FROM work_orders WHERE scheduled_date=? LIMIT 5").bind(today).all();
  const upcoming = await env.DB.prepare("SELECT project_id, scheduled_date, time_slot, contact_name, address FROM work_orders WHERE scheduled_date >= ? ORDER BY scheduled_date LIMIT 5").bind(today).all();
  const context = `\u4F60\u4FC2 DUCKDUCK \u88DD\u4FEE\u5DE5\u7A0B\u5605 AI \u52A9\u624B\u3002\u4F60\u670D\u52D9\u5605\u516C\u53F8\u505A\u88DD\u4FEE\u7DAD\u4FEE\u5DE5\u7A0B\u3002\u8ACB\u7528\u7E41\u9AD4\u4E2D\u6587\u56DE\u7B54\uFF0C\u8A9E\u6C23\u53CB\u5584\u5C08\u696D\u3002

\u76EE\u524D\u6578\u64DA\uFF1A
- \u7E3D\u5DE5\u55AE\uFF1A${stats.cnt} \u5F35
- \u7E3D\u71DF\u6536\uFF1A$${stats.total.toLocaleString()}
- \u672A\u6536\u6B3E\uFF1A$${unpaid.u.toLocaleString()}
${todayOrders.results.length ? "- \u4ECA\u65E5\u5DE5\u55AE\uFF1A" + todayOrders.results.map((o) => `${o.project_id} (${o.contact_name}, ${o.address?.substring(0, 10)})`).join("; ") : "- \u4ECA\u65E5\u7121\u5DE5\u55AE"}
${upcoming.results.length ? "- \u5373\u5C07\u5230\u4F86\uFF1A" + upcoming.results.map((o) => `${o.scheduled_date} ${o.project_id} (${o.contact_name})`).join("; ") : ""}

\u8ACB\u6839\u64DA\u4EE5\u4E0A\u6578\u64DA\u56DE\u7B54\u7528\u6236\u554F\u984C\u3002\u56DE\u7B54\u8981\u7C21\u6F54\u5BE6\u7528\u3002`;
  try {
    const response = await env.AI.run("@cf/qwen/qwen3-30b-a3b-fp8", {
      messages: [
        { role: "system", content: context },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });
    return Response.json({ reply: response.response || "\u62B1\u6B49\uFF0C\u6211\u66AB\u6642\u7121\u6CD5\u56DE\u7B54" });
  } catch (e) {
    return Response.json({ reply: "AI Error: " + (e.message || e.stack || JSON.stringify(e)) });
  }
}
__name(chatAPI, "chatAPI");
async function mapPage(env, url) {
  const dateFrom = url.searchParams.get("from") || "";
  const dateTo = url.searchParams.get("to") || "";
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let query = "SELECT project_id, address, contact_name, contact_phone, total_amount, status, scheduled_date, time_slot FROM work_orders WHERE address IS NOT NULL AND address != ''";
  let params = [];
  if (dateFrom && dateTo) {
    query += " AND scheduled_date BETWEEN ? AND ?";
    params = [dateFrom, dateTo];
  } else if (dateFrom) {
    query += " AND scheduled_date = ?";
    params = [dateFrom];
  } else {
    query += " AND scheduled_date >= ?";
    params = [today];
  }
  query += " ORDER BY scheduled_date LIMIT 50";
  let stmt = env.DB.prepare(query);
  if (params.length === 1) stmt = stmt.bind(params[0]);
  else if (params.length === 2) stmt = stmt.bind(params[0], params[1]);
  const orders2 = await stmt.all();
  const coordMap = {
    "\u5357\u660C\u8857": [22.328, 114.166],
    "\u6210\u6797\u5927\u5EC8": [22.328, 114.166],
    "\u705D\u666F\u7063": [22.358, 114.105],
    "\u9752\u8863": [22.358, 114.105],
    "\u5357\u5C71\u90A8": [22.334, 114.17],
    "\u77F3\u7864\u5C3E": [22.334, 114.17],
    "\u5357\u5B89\u6A13": [22.334, 114.17],
    "default": [22.3193, 114.1694]
  };
  function getCoords(addr) {
    for (const key of Object.keys(coordMap)) {
      if (addr.includes(key)) return coordMap[key];
    }
    return coordMap["default"];
  }
  __name(getCoords, "getCoords");
  const markersData2 = orders2.results.map((o, idx) => {
    const coords = getCoords(o.address || "");
    const addr = (o.address || "").replace(/'/g, "\\'");
    const popup = "<b>" + o.project_id + "</b><br>" + (o.contact_name || "") + " \u{1F4DE}" + (o.contact_phone || "") + "<br>" + addr + "<br>\u{1F4B0}" + fmt(o.total_amount) + " \xB7 " + o.status;
    const st = (o.status || "\u5F85\u8655\u7406").replace(/'/g, "\\'");
    return {
      addr: o.address,
      coords,
      js: "addMarker(" + coords[0] + ", " + coords[1] + ", '" + popup.replace(/'/g, "\\'") + "', " + (idx + 1) + ", '" + st + "');",
      project_id: o.project_id,
      contact_name: o.contact_name,
      scheduled_date: o.scheduled_date,
      time_slot: o.time_slot,
      total_amount: o.total_amount,
      status: o.status,
      contact_phone: o.contact_phone
    };
  });
  const markers = markersData2.map((md) => md.js).join("\n");
  const byDate = {};
  for (const md of markersData2) {
    const d = md.scheduled_date || "unknown";
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(md);
  }
  const sortedDates = Object.keys(byDate).sort();
  const dateList = sortedDates.length ? sortedDates.map((d) => {
    const dayOrders = byDate[d];
    const dow = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"][(/* @__PURE__ */ new Date(d + "T00:00:00")).getDay()];
    const active = dateFrom && d === dateFrom ? ' style="background:#eff6ff;border-left:3px solid var(--primary)"' : "";
    return '<div class="date-row"' + active + ` onclick="filterDate('` + d + `')"><div><b>` + d + '</b> <span style="font-size:11px;color:var(--text-muted)">\u9031' + dow + '</span></div><div style="font-size:11px;color:var(--text-muted)">' + dayOrders.length + " \u55AE</div>" + dayOrders.map((md) => '<div style="font-size:10px;padding:2px 0;color:var(--primary)">' + (md.time_slot || "") + " " + md.project_id + " " + (md.contact_name || "") + "</div>").join("") + "</div>";
  }).join("") : '<div class="empty" style="padding:20px">\u7121\u7D50\u679C</div>';
  const body = '<div style="background:#1a1d23;color:#0f0;font:11px monospace;padding:8px 12px;margin-bottom:12px;border-radius:8px">\u{1F4CD} Server: ' + orders2.results.length + " orders, " + markersData2.length + ' markers</div><div class="page-header" style="display:flex;justify-content:space-between;align-items:start"><div><h1>\u{1F5FA}\uFE0F \u5DE5\u55AE\u5730\u5716</h1><p>' + (dateFrom ? dateFrom + (dateTo ? " ~ " + dateTo : "") : "\u4ECA\u65E5\u8D77") + " \xB7 " + markersData2.length + ' \u5F35\u5DE5\u55AE</p></div><form style="display:flex;gap:8px;align-items:center" onsubmit="filterRange();return false"><input type="date" id="dateFrom" value="' + (dateFrom || today) + '" style="width:140px"><span style="color:var(--text-muted)">~</span><input type="date" id="dateTo" value="' + (dateTo || "") + `" style="width:140px"><button class="btn btn-primary btn-sm">\u7BE9\u9078</button><button type="button" class="btn btn-outline btn-sm" onclick="location.href='/map'">\u6E05\u9664</button></form></div><div style="display:flex;gap:16px;height:calc(100vh - 160px)"><div class="card" style="flex:1;padding:0;overflow:hidden"><div id="map" style="width:100%;height:100%"></div></div><div class="card" style="width:240px;overflow-y:auto;padding:0;flex-shrink:0"><div style="padding:12px 14px;font-weight:600;font-size:14px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--card-bg);z-index:1">\u{1F4C5} \u65E5\u671F\u5217\u8868</div><div style="padding:4px 0">` + dateList + `</div></div></div><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" /><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script><style>.date-row{padding:8px 14px;border-bottom:1px solid var(--border);cursor:pointer;transition:all .15s;border-left:3px solid transparent}.date-row:hover{background:#f8fafc}</style><script>const map = L.map('map').setView([22.3193, 114.1694], 12);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:'&copy; OpenStreetMap'}).addTo(map);const allMarkers = [];const statusColors = {'\u5F85\u8655\u7406':'#f59e0b','\u5DF2\u78BA\u8A8D':'#2563eb','\u5DF2\u5B8C\u6210':'#16a34a','\u5DF2\u53D6\u6D88':'#94a3b8'};function createTeardropIcon(num,status){const c=statusColors[status]||'#e74c3c';const s='<svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 44"><defs><filter id="f'+num+'"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/></filter></defs><path d="M17 0 C7.6 0 0 7.6 0 17 C0 28 17 44 17 44 C17 44 34 28 34 17 C34 7.6 26.4 0 17 0Z" fill="'+c+'" stroke="#fff" stroke-width="2" filter="url(#f'+num+')"/><circle cx="17" cy="15" r="7" fill="#fff" opacity="0.9"/><text x="17" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="'+c+'">'+num+'</text></svg>';return L.icon({iconUrl:'data:image/svg+xml,'+encodeURIComponent(s),iconSize:[34,44],iconAnchor:[17,44],popupAnchor:[0,-44]});}function addMarker(lat,lon,popup,num,status){const icon=createTeardropIcon(num,status);const m=L.marker([lat,lon],{icon:icon}).addTo(map).bindPopup(popup);allMarkers.push(m);}async function loadMarkers(){` + markers + "if(allMarkers.length){const g=new L.featureGroup(allMarkers);map.fitBounds(g.getBounds().pad(0.1));}}function filterDate(d){location.href='/map?from='+d;}function filterRange(){const f=document.getElementById('dateFrom').value;const t=document.getElementById('dateTo').value;let u='/map?from='+f;if(t)u+='&to='+t;location.href=u;}loadMarkers();<\/script>";
  return html("\u5730\u5716", body, "map");
}
__name(mapPage, "mapPage");
async function calendarPage(env, url) {
  const now = /* @__PURE__ */ new Date();
  const year = parseInt(url.searchParams.get("year")) || now.getFullYear();
  const month = parseInt(url.searchParams.get("month")) || now.getMonth() + 1;
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startPad = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const dateFrom = `${year}-${String(month).padStart(2, "0")}-01`;
  const dateTo = `${year}-${String(month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
  const orders2 = await env.DB.prepare("SELECT project_id, scheduled_date, contact_name FROM work_orders WHERE scheduled_date BETWEEN ? AND ?").bind(dateFrom, dateTo).all();
  const lookup = {};
  for (const o of orders2.results) {
    if (!lookup[o.scheduled_date]) lookup[o.scheduled_date] = [];
    lookup[o.scheduled_date].push(o);
  }
  const today = now.toISOString().split("T")[0];
  const dayHeaders = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"].map((d) => `<div class="calendar-day-header">${d}</div>`).join("");
  let daysHTML = "";
  for (let i = 0; i < startPad; i++) daysHTML += '<div class="calendar-day other-month"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isToday = ds === today;
    const ordersOnDay = lookup[ds] || [];
    const dots = ordersOnDay.map((o) => `<span class="dot" title="${o.project_id} ${o.contact_name || ""}"></span>`).join("");
    daysHTML += `<div class="calendar-day${isToday ? " today" : ""}" onclick="alert('${ds}: ${ordersOnDay.map((o) => o.project_id + " " + o.contact_name).join(", ") || "\u7121\u5DE5\u55AE"}')"><div class="day-num">${d}</div><div>${dots}</div>${ordersOnDay.length ? '<div style="font-size:10px;color:var(--primary);margin-top:2px">' + ordersOnDay.length + "\u55AE</div>" : ""}</div>`;
  }
  const prevM = month === 1 ? 12 : month - 1;
  const prevY = month === 1 ? year - 1 : year;
  const nextM = month === 12 ? 1 : month + 1;
  const nextY = month === 12 ? year + 1 : year;
  const body = `<div class="page-header"><h1>\u{1F4C6} \u5DE5\u55AE\u65E5\u66C6</h1><p>${year}\u5E74${month}\u6708 \xB7 ${orders2.results.length} \u5F35\u5DE5\u55AE</p></div>
<div class="card">
  <div class="calendar-nav">
    <button onclick="location.href='?year=${prevY}&month=${prevM}'">\u25C0 \u4E0A\u6708</button>
    <h2>${year}\u5E74 ${month}\u6708</h2>
    <button onclick="location.href='?year=${nextY}&month=${nextM}'">\u4E0B\u6708 \u25B6</button>
  </div>
  <div class="calendar-grid">${dayHeaders}${daysHTML}</div>
</div>`;
  return html("\u65E5\u66C6", body, "calendar");
}
__name(calendarPage, "calendarPage");
async function mobileAPI(env, url) {
  const sub = url.pathname.replace("/api/mobile", "") || "/";
  if (sub === "/dashboard") {
    const s = await env.DB.prepare("SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders").first();
    const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='\u5DF2\u4ED8'").first();
    const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='\u672A\u4ED8'").first();
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const we = new Date(Date.now() + 7 * 864e5).toISOString().split("T")[0];
    const todayOrders = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date=? ORDER BY time_slot LIMIT 20").bind(today).all();
    const weekOrders = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot LIMIT 20").bind(today, we).all();
    const recent = await env.DB.prepare("SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 10").all();
    const cats = await env.DB.prepare("SELECT CASE WHEN description LIKE '%\u639B\u6247%' OR description LIKE '%\u98A8\u6247%' OR description LIKE '%\u62BD\u6C23%' THEN '\u98A8\u6247\u985E' WHEN description LIKE '%\u9F8D\u982D%' OR description LIKE '%\u6C34\u9F8D\u982D%' THEN '\u6C34\u5589\u985E' WHEN description LIKE '%\u71C8%' THEN '\u71C8\u5177\u985E' WHEN description LIKE '%\u639B\u52FE%' OR description LIKE '%\u7D19\u5DFE\u67B6%' OR description LIKE '%\u88DD\u9278%' THEN '\u4E94\u91D1\u914D\u4EF6' WHEN description LIKE '%\u96FB\u8996%' THEN '\u96FB\u5668\u642C\u904B' ELSE '\u5176\u4ED6' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC").all();
    return Response.json({ stats: s, todayOrders: todayOrders.results, weekOrders: weekOrders.results, recent: recent.results, categories: cats.results, paid: pr.p, unpaid: ur.u });
  }
  if (sub === "/orders") {
    const status = url.searchParams.get("status") || "";
    const search = (url.searchParams.get("search") || "").toLowerCase();
    let rows = await env.DB.prepare("SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 200").all();
    let orders2 = rows.results;
    if (status) orders2 = orders2.filter((o) => o.status === status);
    if (search) orders2 = orders2.filter((o) => (o.project_id || "").toLowerCase().includes(search) || (o.contact_name || "").toLowerCase().includes(search) || (o.address || "").toLowerCase().includes(search));
    return Response.json(orders2);
  }
  if (sub.startsWith("/orders/")) {
    const id = sub.split("/")[2];
    const wo = await env.DB.prepare("SELECT * FROM work_orders WHERE project_id=?").bind(id).first();
    if (!wo) return Response.json({ error: "Not found" }, { status: 404 });
    const items = await env.DB.prepare("SELECT * FROM work_order_items WHERE work_order_id=? ORDER BY seq").bind(wo.id).all();
    return Response.json({ ...wo, item_list: items.results });
  }
  if (sub === "/analysis") {
    const s = await env.DB.prepare("SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders").first();
    const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='\u5DF2\u4ED8'").first();
    const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='\u672A\u4ED8'").first();
    const cats = await env.DB.prepare("SELECT CASE WHEN description LIKE '%\u639B\u6247%' OR description LIKE '%\u98A8\u6247%' OR description LIKE '%\u62BD\u6C23%' THEN '\u98A8\u6247\u985E' WHEN description LIKE '%\u9F8D\u982D%' OR description LIKE '%\u6C34\u9F8D\u982D%' THEN '\u6C34\u5589\u985E' WHEN description LIKE '%\u71C8%' THEN '\u71C8\u5177\u985E' WHEN description LIKE '%\u639B\u52FE%' OR description LIKE '%\u7D19\u5DFE\u67B6%' OR description LIKE '%\u88DD\u9278%' THEN '\u4E94\u91D1\u914D\u4EF6' WHEN description LIKE '%\u96FB\u8996%' THEN '\u96FB\u5668\u642C\u904B' ELSE '\u5176\u4ED6' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC").all();
    const contacts = await env.DB.prepare("SELECT c.name, c.phone, c.address, c.last_order_at, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY total_spent DESC LIMIT 20").all();
    return Response.json({ stats: s, categories: cats.results, contacts: contacts.results, paid: pr.p, unpaid: ur.u });
  }
  if (sub === "/schedule") {
    const days = parseInt(url.searchParams.get("days") || "7");
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const end = new Date(Date.now() + days * 864e5).toISOString().split("T")[0];
    const rows = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot").bind(today, end).all();
    return Response.json(rows.results);
  }
  if (sub === "/contacts") {
    const rows = await env.DB.prepare("SELECT c.*, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY c.last_order_at DESC").all();
    return Response.json(rows.results);
  }
  if (sub === "/calendar") {
    const year = parseInt(url.searchParams.get("year")) || (/* @__PURE__ */ new Date()).getFullYear();
    const month = parseInt(url.searchParams.get("month")) || (/* @__PURE__ */ new Date()).getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    const dateFrom = year + "-" + String(month).padStart(2, "0") + "-01";
    const dateTo = year + "-" + String(month).padStart(2, "0") + "-" + String(lastDay).padStart(2, "0");
    const rows = await env.DB.prepare("SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ?").bind(dateFrom, dateTo).all();
    return Response.json({ year, month, orders: rows.results });
  }
  if (sub === "/map") {
    const dateFrom = url.searchParams.get("from") || "";
    const dateTo = url.searchParams.get("to") || "";
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let query = "SELECT project_id, address, contact_name, contact_phone, total_amount, status, scheduled_date, time_slot FROM work_orders WHERE address IS NOT NULL AND address != ''";
    let params = [];
    if (dateFrom && dateTo) {
      query += " AND scheduled_date BETWEEN ? AND ?";
      params = [dateFrom, dateTo];
    } else if (dateFrom) {
      query += " AND scheduled_date = ?";
      params = [dateFrom];
    } else {
      query += " AND scheduled_date >= ?";
      params = [today];
    }
    query += " ORDER BY scheduled_date LIMIT 50";
    let stmt = env.DB.prepare(query);
    if (params.length === 1) stmt = stmt.bind(params[0]);
    else if (params.length === 2) stmt = stmt.bind(params[0], params[1]);
    const rows = await stmt.all();
    const coordMap = { "\u5357\u660C\u8857": [22.328, 114.166], "\u6210\u6797": [22.328, 114.166], "\u705D\u666F\u7063": [22.358, 114.105], "\u9752\u8863": [22.358, 114.105], "\u5357\u5C71\u90A8": [22.334, 114.17], "\u77F3\u7864\u5C3E": [22.334, 114.17], "\u5357\u5B89": [22.334, 114.17], "default": [22.3193, 114.1694] };
    const results = rows.results.map((o) => {
      let coords = coordMap["default"];
      for (const k of Object.keys(coordMap)) {
        if ((o.address || "").includes(k)) {
          coords = coordMap[k];
          break;
        }
      }
      return { ...o, lat: coords[0], lon: coords[1] };
    });
    return Response.json(results);
  }
  return Response.json({ error: "Unknown endpoint" }, { status: 404 });
}
__name(mobileAPI, "mobileAPI");
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/\/+$/, "") || "/";
    try {
      if (path === "/api/chat") return chatAPI(request, env);
      if (path.startsWith("/api/mobile")) return mobileAPI(env, url);
      if (path.startsWith("/api/")) return handleAPI(request, env, url);
      if (path === "/") return dashboard(env);
      if (path === "/orders") return ordersPage(env, url);
      if (path.startsWith("/orders/")) return orderDetail(env, path.split("/")[2]);
      if (path === "/parse") return request.method === "POST" ? parseSubmit(request, env) : parsePage(env);
      if (path === "/analysis") return analysisPage(env);
      if (path === "/schedule") return schedulePage(env, url);
      if (path === "/contacts") return contactsPage(env);
      if (path === "/map") return mapPage(env, url);
      if (path === "/calendar") return calendarPage(env, url);
      if (path === "/api/chat") return chatAPI(request, env);
      if (path.startsWith("/api/mobile")) return mobileAPI(env, url);
      return html("404", '<h1>404</h1><a href="/">\u56DE\u9996\u9801</a>');
    } catch (e) {
      return new Response(e.stack || e.message, { status: 500 });
    }
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
