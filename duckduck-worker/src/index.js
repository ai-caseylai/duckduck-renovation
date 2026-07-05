// DUCKDUCK 裝修 - Cloudflare Worker + D1

const CSS = `:root{--bg:#f5f7fa;--sidebar-bg:#1a1d23;--card-bg:#fff;--primary:#2563eb;--success:#16a34a;--warning:#f59e0b;--danger:#dc2626;--text:#1e293b;--text-muted:#64748b;--border:#e2e8f0;--radius:12px;--shadow:0 1px 3px rgba(0,0,0,.08)}*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);display:flex;min-height:100vh}.sidebar{width:220px;background:var(--sidebar-bg);color:#e2e8f0;display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100}.sidebar-brand{padding:20px 18px;font-size:18px;font-weight:700;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:8px}.sidebar-brand .icon{font-size:24px}.sidebar-nav{flex:1;padding:12px 0}.sidebar-nav a{display:flex;align-items:center;gap:10px;padding:10px 18px;color:#94a3b8;text-decoration:none;font-size:14px;transition:all .15s;border-left:3px solid transparent}.sidebar-nav a:hover{color:#e2e8f0;background:rgba(255,255,255,.05)}.sidebar-nav a.active{color:#fff;background:rgba(37,99,235,.2);border-left-color:var(--primary);font-weight:600}.sidebar-nav .nav-icon{font-size:16px;width:20px;text-align:center}.main{margin-left:220px;flex:1;padding:24px 28px;max-width:calc(100% - 220px);width:calc(100% - 220px)}.page-header{margin-bottom:24px}.page-header h1{font-size:24px;font-weight:700}.page-header p{color:var(--text-muted);font-size:14px;margin-top:4px}.card{background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:20px;margin-bottom:20px}.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.card-header h2{font-size:16px;font-weight:600}.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px}.stat-card{background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px;display:flex;align-items:center;gap:14px}.stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px}.stat-icon.blue{background:#dbeafe;color:#2563eb}.stat-icon.green{background:#dcfce7;color:#16a34a}.stat-icon.amber{background:#fef3c7;color:#d97706}.stat-icon.red{background:#fee2e2;color:#dc2626}.stat-icon.purple{background:#ede9fe;color:#7c3aed}.stat-value{font-size:24px;font-weight:700}.stat-label{font-size:12px;color:var(--text-muted)}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;padding:10px 12px;font-weight:600;color:var(--text-muted);font-size:11px;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid var(--border)}td{padding:10px 12px;border-bottom:1px solid var(--border)}tr:hover{background:#f8fafc}.badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}.badge-pending{background:#fef3c7;color:#92400e}.badge-done{background:#dcfce7;color:#166534}.badge-cancel{background:#fee2e2;color:#991b1b}.badge-confirm{background:#dbeafe;color:#1e40af}.badge-paid{background:#dcfce7;color:#166534}.badge-unpaid{background:#fee2e2;color:#991b1b}.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:none;text-decoration:none;transition:all .15s}.btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:#1d4ed8}.btn-outline{background:#fff;color:var(--text);border:1px solid var(--border)}.btn-outline:hover{background:#f8fafc}.btn-sm{padding:5px 10px;font-size:12px}.btn-danger{background:#fff;color:var(--danger);border:1px solid #fecaca}.btn-danger:hover{background:#fef2f2}.btn-group{display:flex;gap:6px;flex-wrap:wrap}.form-group{margin-bottom:16px}.form-group label{display:block;font-size:13px;font-weight:500;margin-bottom:6px}input,textarea,select{width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit}textarea{min-height:280px;resize:vertical;font-family:'SF Mono',Menlo,monospace;font-size:12px;line-height:1.5}input:focus,textarea:focus,select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.1)}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}@media(max-width:768px){
  body{flex-direction:column;-webkit-tap-highlight-color:transparent}
  .sidebar{width:100%;height:60px;flex-direction:row;position:fixed;bottom:0;top:auto;z-index:100;overflow-x:auto;background:#fff;border-top:1px solid #e2e8f0;box-shadow:0 -2px 10px rgba(0,0,0,.08);padding-bottom:env(safe-area-inset-bottom)}
  .sidebar-brand{display:none}
  .sidebar-nav{display:flex;flex-direction:row;padding:0 2px;overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%;justify-content:space-around;height:100%}
  .sidebar-nav a{flex-shrink:0;padding:4px 6px 2px;font-size:10px;font-weight:500;border-left:none;border-top:2px solid transparent;flex-direction:column;gap:1px;min-width:48px;text-align:center;color:#94a3b8;border-radius:0;justify-content:center;height:100%}
  .sidebar-nav a .nav-icon{font-size:20px;width:auto;display:block;line-height:1}
  .sidebar-nav a span{font-size:10px;display:block;line-height:1.2}
  .sidebar-nav a.active{color:#2563eb;border-left-color:transparent;border-top-color:#2563eb;background:transparent;font-weight:600}
  .sidebar-nav a:hover{background:transparent}
  .main{margin-left:0;margin-bottom:64px;width:100%;max-width:100%;padding:10px 8px}
  .grid-2,.grid-3{grid-template-columns:1fr;gap:8px}
  .stat-grid{grid-template-columns:repeat(2,1fr);gap:6px}
  .stat-card{padding:10px 8px;gap:6px;border-radius:10px}
  .stat-icon{width:32px;height:32px;font-size:15px;border-radius:8px;flex-shrink:0}
  .stat-value{font-size:18px}
  .stat-label{font-size:10px}
  .card{padding:10px;margin-bottom:8px;border-radius:8px}
  .page-header{margin-bottom:10px}
  .page-header h1{font-size:17px}
  .page-header p{font-size:11px}
  
  
  
  
  
  th,td{padding:5px 4px}
  th{font-size:9px}
  .btn{padding:7px 12px;font-size:13px;min-height:36px}
  .btn-sm{padding:5px 8px;font-size:11px;min-height:30px}
  textarea{min-height:150px}
  input,textarea,select{font-size:16px!important;padding:10px 10px}
  .calendar-day{min-height:38px;padding:1px;border-radius:6px;font-size:9px}
  .calendar-day .day-num{font-size:10px}
  .calendar-nav h2{font-size:14px}
  .calendar-nav button{padding:6px 10px;font-size:13px;min-height:36px}
  .toolbar{flex-direction:column;gap:5px}
  .toolbar select,.toolbar input{width:100%;padding:9px 10px}
  .badge{padding:2px 6px;font-size:10px;border-radius:12px}
  .result-card{padding:10px}
  .chart-container{height:200px}
  .chat-header{font-size:14px;padding:12px}
  .chat-messages{padding:10px;gap:8px}
  .chat-msg{font-size:13px;padding:8px 10px}
  .chat-input-area{padding:8px 10px;gap:6px}
  .chat-input-area input{padding:8px 12px;font-size:14px!important}
  .chat-input-area button{width:34px;height:34px;font-size:13px}
  .marker-popup{font-size:11px}
  .marker-popup b{font-size:12px}
  .calendar-grid{gap:2px}
  .calendar-day-header{font-size:9px;padding:4px 0}
  .summary-bar{flex-direction:column;gap:6px;font-size:11px}.section-block{margin-bottom:14px}.section-title{font-size:12px;margin-bottom:8px}.quick-actions{grid-template-columns:repeat(2,1fr);gap:8px}.quick-action-card{padding:12px 8px}.qa-icon{font-size:24px}.qa-label{font-size:11px}.qa-desc{font-size:10px}.order-row{flex-direction:column;align-items:flex-start;padding:6px 0;gap:4px}.or-left,.or-right{width:100%;justify-content:space-between}.or-addr{max-width:none}.order-card{padding:10px;border-radius:8px}.oc-top{flex-wrap:wrap;gap:6px}.oc-amount{font-size:14px}.oc-mid{font-size:12px}.oc-bottom{flex-direction:column;align-items:flex-start;gap:4px}.oc-addr{max-width:100%}
  .empty{padding:24px}
  .empty .icon{font-size:32px}
  .form-group{margin-bottom:10px}
  .form-group label{font-size:12px}
  

  .chat-full{height:calc(100vh - 160px)}
  .chat-full .chat-input-area input{font-size:16px!important}
  .map-layout{flex-direction:column;height:auto;gap:8px}
  .map-card{height:50vh;min-height:250px}
  .date-sidebar{width:100%;max-height:200px;flex-shrink:1}
}@media(min-width:769px){input,textarea,select,button{font-size:13px!important}}
@media(max-width:768px){.grid-2,.grid-3{grid-template-columns:1fr}}.section-block{margin-bottom:24px}.section-title{font-size:14px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--border);display:flex;align-items:center;gap:6px}.quick-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.quick-action-card{background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px;text-align:center;text-decoration:none;color:var(--text);transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer}.quick-action-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:var(--primary)}.qa-icon{font-size:28px;line-height:1}.qa-label{font-weight:600;font-size:13px}.qa-desc{font-size:11px;color:var(--text-muted)}.order-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;gap:8px}.order-row:last-child{border-bottom:none}.or-left{display:flex;align-items:center;gap:8px;flex-shrink:0}.or-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}.or-time{font-size:11px;color:var(--text-muted);background:#f1f5f9;padding:1px 6px;border-radius:4px}.or-date{font-size:11px;color:var(--text-muted)}.or-contact{font-weight:500}.or-addr{font-size:11px;color:var(--text-muted);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.or-status{flex-shrink:0}.empty{text-align:center;padding:40px;color:var(--text-muted)}.empty .icon{font-size:40px;margin-bottom:12px}.result-card{border:1px solid #bbf7d0;border-radius:var(--radius);padding:16px;margin-bottom:12px;background:#f0fdf4}.result-card h3{font-size:14px;color:#166534;margin-bottom:8px}.chart-container{position:relative;height:280px}.link{color:var(--primary);text-decoration:none;font-weight:500}.link:hover{text-decoration:underline}.toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px}.toolbar select,.toolbar input{width:auto}.chat-header{background:var(--primary);color:#fff;padding:16px;font-weight:600;font-size:15px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}.chat-header button{background:none;border:none;color:#fff;cursor:pointer;font-size:18px;padding:4px 8px;border-radius:6px}.chat-header button:hover{background:rgba(255,255,255,.15)}.chat-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}.chat-msg{max-width:90%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.5;word-break:break-word}.chat-msg.user{align-self:flex-end;background:var(--primary);color:#fff;border-bottom-right-radius:3px}.chat-msg.bot{align-self:flex-start;background:#f1f5f9;color:var(--text);border-bottom-left-radius:3px}.chat-input-area{display:flex;padding:10px 12px;border-top:1px solid var(--border);gap:8px;flex-shrink:0}.chat-input-area input{flex:1;border:1px solid var(--border);border-radius:18px;padding:8px 14px;font-size:13px;width:auto;background:#f8fafc}.chat-input-area button{width:36px;height:36px;border-radius:50%;background:var(--primary);color:#fff;border:none;cursor:pointer;font-size:14px;flex-shrink:0}.chat-page{display:flex;flex-direction:column;height:calc(100vh - 160px);background:#e5ded4;overflow:hidden}
.chat-page-header{background:#075e54;color:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.chat-page-header .cp-avatar{width:40px;height:40px;border-radius:50%;background:#128c7e;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.chat-page-header .cp-info{flex:1}
.chat-page-header .cp-name{font-weight:600;font-size:15px}
.chat-page-header .cp-status{font-size:11px;opacity:.8}
.chat-page-body{flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:6px;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cdc4' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")"}
.chat-page-body .date-divider{text-align:center;margin:8px 0}
.chat-page-body .date-divider span{background:#e1f3fb;color:#4a7c96;font-size:11px;padding:3px 10px;border-radius:8px}
.wa-msg{max-width:75%;padding:7px 10px 6px;border-radius:8px;font-size:13.5px;line-height:1.45;position:relative;word-break:break-word;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.wa-msg.out{align-self:flex-end;background:#dcf8c6;border-radius:8px 0 8px 8px}
.wa-msg.in{align-self:flex-start;background:#fff;border-radius:0 8px 8px 8px}
.wa-msg .wa-time{font-size:10px;color:#667781;text-align:right;margin-top:2px;margin-right:-4px;margin-bottom:-2px}
.wa-msg.out .wa-time{color:#6b8e6b}
.wa-typing{align-self:flex-start;background:#fff;padding:8px 12px;border-radius:8px;font-size:12px;color:#667781;display:flex;gap:3px}
.wa-typing span{width:6px;height:6px;border-radius:50%;background:#bcc1c5;animation:wa-bounce 1.2s infinite}
.wa-typing span:nth-child(2){animation-delay:.2s}
.wa-typing span:nth-child(3){animation-delay:.4s}
@keyframes wa-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.chat-page-input{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0f2f5;flex-shrink:0;border-top:1px solid #e0e0e0}
.chat-page-input input{flex:1;border:none;border-radius:20px;padding:10px 16px;font-size:14px;background:#fff;outline:none;box-shadow:0 0 0 1px #e0e0e0}
.chat-page-input input:focus{box-shadow:0 0 0 2px #25d366}
.chat-page-input button{width:42px;height:42px;border-radius:50%;background:#075e54;color:#fff;border:none;cursor:pointer;font-size:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.chat-page-input button:hover{background:#128c7e}.map-layout{display:flex;gap:16px;height:calc(100vh - 180px);overflow:hidden}.map-card{flex:1;padding:0!important;overflow:hidden;min-height:300px}.date-sidebar{width:240px;overflow-y:auto;padding:0!important;flex-shrink:0}.chat-typing{align-self:flex-start;color:var(--text-muted);font-size:12px;padding:4px 12px}.marker-popup{font-size:12px;line-height:1.5}.marker-popup b{font-size:13px}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.calendar-day-header{text-align:center;font-size:11px;font-weight:600;color:var(--text-muted);padding:8px 0}.calendar-day{min-height:80px;border:1px solid #cbd5e1;border-radius:8px;padding:6px;font-size:12px;cursor:pointer;transition:all .15s;position:relative}.calendar-day:hover{background:#f0f7ff}.calendar-day.today{border-color:var(--primary);background:#eff6ff}.calendar-day.other-month{opacity:.3}.calendar-day .day-num{font-weight:600;font-size:13px}.calendar-day .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--primary);margin:2px 1px 0 0;vertical-align:middle}.calendar-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.calendar-nav button{background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;font-size:14px}.calendar-nav h2{font-size:18px}
@media(max-width:768px){.ptr-hint{display:none}}@media(max-width:768px){.ptr-hint{display:block;text-align:center;color:var(--text-muted);font-size:11px;padding:4px 0}}.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}.summary-bar{display:flex;gap:20px;padding:12px 0;font-size:13px;color:var(--text-muted);border-top:1px solid var(--border);margin-top:12px}.teardrop-marker{width:32px;height:42px;position:relative;cursor:pointer}.teardrop-marker::before{content:'';position:absolute;top:0;left:0;width:28px;height:28px;border-radius:50% 50% 50% 0;background:var(--c,#e74c3c);transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid #fff}.teardrop-marker .marker-dot{position:absolute;top:8px;left:8px;width:12px;height:12px;border-radius:50%;background:#fff;z-index:1}.teardrop-marker .marker-label{position:absolute;top:6px;left:0;width:28px;text-align:center;font-size:11px;font-weight:700;color:#fff;z-index:2;text-shadow:0 1px 2px rgba(0,0,0,.3)}`;

const NAV = [
  ['/', '📊', '儀表板', 'dashboard'],
  ['/orders', '📋', '工單', 'orders'],
  ['/calendar', '📅', '日曆', 'calendar'],
  ['/map', '🗺️', '地圖', 'map'],
  ['/chat', '💬', 'AI助手', 'chat'],
  ['/contacts', '👥', '客戶', 'contacts'],
];
function layout(title, body, active) {
  const navHTML = NAV.map(([h, i, l, k]) =>
    `<a href="${h}" class="${active === k ? 'active' : ''}"><span class="nav-icon">${i}</span><span>${l}</span></a>`
  ).join('');
  return `<!DOCTYPE html><html lang="zh-HK"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title} — DUCKDUCK 裝修</title><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script><style>${CSS}</style></head><body><aside class="sidebar"><div class="sidebar-brand"><span class="icon">🏗️</span><span>DUCKDUCK</span></div><nav class="sidebar-nav">${navHTML}</nav></aside><main class="main">${body}
</main><script>
<\/script>
</body></html>`;
}

function html(title, body, active) {
  return new Response(layout(title, body, active || 'dashboard'), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function fmt(n) { return n != null ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-'; }

function badge(s) {
  const m = { '待處理': 'badge-pending', '已確認': 'badge-confirm', '已完成': 'badge-done', '已取消': 'badge-cancel', '已付': 'badge-paid', '未付': 'badge-unpaid' };
  return `<span class="badge ${m[s] || 'badge-pending'}">${s}</span>`;
}

// ─── API Handler ──────────────────────────────────────────────────────────
async function handleAPI(req, env, url) {
  const p = url.pathname, parts = p.split('/');
  if (p.endsWith('/status') && req.method === 'POST') {
    const id = parts[3], b = await req.json();
    if (b.status) await env.DB.prepare('UPDATE work_orders SET status=? WHERE project_id=?').bind(b.status, id).run();
    if (b.payment) await env.DB.prepare('UPDATE work_orders SET payment_status=? WHERE project_id=?').bind(b.payment, id).run();
    return Response.json({ ok: true });
  }
  if (p.endsWith('/delete') && req.method === 'POST') {
    await env.DB.prepare('DELETE FROM work_orders WHERE project_id=?').bind(parts[3]).run();
    return Response.redirect('/orders', 302);
  }
  return Response.json({ error: 'Not found' }, { status: 404 });
}

// ─── WhatsApp Parser ───────────────────────────────────────────────────────
function extractBlock(text, startPat, endPat) {
  const s = text.search(startPat); if (s === -1) return '';
  const si = s + text.match(startPat)[0].length;
  let ei = text.length;
  if (endPat) { const sub = text.substring(si); const e = sub.search(endPat); if (e !== -1) ei = si + e; }
  return text.substring(si, ei).trim();
}

function extractPrice(item, text) {
  let m = text.match(/\$([\d,]+)\s*\/\s*(\d+)/);
  if (m) { const t = parseFloat(m[1].replace(/,/g,'')); item.quantity = parseInt(m[2]); item.unit_price = Math.round(t/item.quantity*100)/100; item.item_total = t; return; }
  m = text.match(/共\s*\$([\d,]+)/); if (m) { item.item_total = parseFloat(m[1].replace(/,/g,'')); return; }
  m = text.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/); if (m) item.item_total = parseFloat(m[1].replace(/,/g,''));
}

function parseItems(block) {
  const items = [], lines = block.trim().split('\n');
  let cur = null, seq = 0;
  for (const line of lines) {
    const t = line.trim(); if (!t) continue;
    const m = t.match(/^(\d+)[.、．，]\s*(.*)/);
    if (m) {
      if (cur) items.push(cur);
      seq = parseInt(m[1]); cur = { seq, description: m[2].trim(), quantity: 1, unit_price: null, item_total: null };
      extractPrice(cur, m[2]);
    } else if (cur) {
      if (/^\$[\d,]+/.test(t)) extractPrice(cur, t); else cur.description += ' ' + t;
    }
  }
  if (cur) items.push(cur);
  if (!items.length) items.push({ seq: 1, description: block.trim().replace(/\n/g,' '), quantity: 1, unit_price: null, item_total: null });
  for (const item of items) {
    if (item.item_total !== null) continue;
    const d = item.description;
    let m = d.match(/共\s*\$([\d,]+)/); if (m) { item.item_total = parseFloat(m[1].replace(/,/g,'')); continue; }
    m = d.match(/\$([\d,]+)\s*\/\s*(\d+)/);
    if (m) { const t = parseFloat(m[1].replace(/,/g,'')); item.quantity = parseInt(m[2]); item.unit_price = Math.round(t/item.quantity*100)/100; item.item_total = t; continue; }
    m = d.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/); if (m) item.item_total = parseFloat(m[1].replace(/,/g,''));
  }
  return items;
}

function parseWorkOrder(text) {
  const r = { project_id:'', raw_text:text.trim(), scheduled_date:null, time_slot:null, address:'', contact_name:'', contact_phone:'', total_amount:null, payment_method:'', payment_status:'未付', status:'待處理', notes:'', item_list:[] };
  const pm = text.match(/項目編號[：:]\s*([A-Z]?\d+)/); if (pm) r.project_id = pm[1].trim();
  const tb = extractBlock(text, /時間[：:]/, /地址[：:]/);
  if (tb) {
    const dm = tb.match(/\((\d+)\/(\d+)\)/);
    if (dm) { const y = new Date().getFullYear(); r.scheduled_date = `${y}-${dm[2].padStart(2,'0')}-${dm[1].padStart(2,'0')}`; }
    else r.scheduled_date = new Date().toISOString().split('T')[0];
    const tm = tb.match(/(\d{1,2}:\d{2})\s*[-~至到]\s*(\d{1,2}:\d{2})/);
    if (tm) r.time_slot = `${tm[1]}-${tm[2]}`;
    else { const sm = tb.match(/(\d{1,2}:\d{2})/); if (sm) r.time_slot = sm[1]; }
  }
  const addr = extractBlock(text, /地址[：:]/, /聯絡[：:]/); if (addr) r.address = addr.replace(/\n/g,'').trim();
  const cb = extractBlock(text, /聯絡[：:]/, /維修項目[：:]/);
  if (cb) { const ph = cb.match(/(\d{4}\s*\d{4})/); if (ph) { r.contact_phone = ph[1].replace(/\s/g,''); r.contact_name = cb.substring(0, ph.index).trim(); } }
  const ib = extractBlock(text, /維修項目[：:]/, /備註[：:]/); if (ib) r.item_list = parseItems(ib);
  const nb = extractBlock(text, /備註[：:]/, /費用[：:]/); if (nb) r.notes = nb.trim();
  const fb = extractBlock(text, /費用[：:]/, /付款方式[：:]/);
  if (fb) { if (fb.includes('已付')) r.payment_status = '已付'; const am = fb.match(/\$([\d,]+\.?\d*)/); if (am) r.total_amount = parseFloat(am[1].replace(/,/g,'')); }
  const pb = extractBlock(text, /付款方式[：:]/, null);
  if (pb) { const ls = pb.trim().split('\n').filter(l => l.trim()); r.payment_method = ls.slice(0,2).join(' / '); }
  if (r.total_amount === null && r.item_list.length) r.total_amount = r.item_list.reduce((s, i) => s + (i.item_total || 0), 0);
  return r;
}

function parseMultiOrders(text) {
  return text.split(/DUCKDUCK維修工程/).map(p => p.trim()).filter(Boolean).map(p => parseWorkOrder('DUCKDUCK維修工程\n' + p)).filter(o => o.project_id);
}

// ─── DB Helpers ────────────────────────────────────────────────────────────
async function insertWO(env, data) {
  const ex = await env.DB.prepare('SELECT id FROM work_orders WHERE project_id=?').bind(data.project_id).first();
  let woId;
  if (ex) {
    woId = ex.id;
    await env.DB.prepare('UPDATE work_orders SET raw_text=?,scheduled_date=?,time_slot=?,address=?,contact_name=?,contact_phone=?,total_amount=?,payment_method=?,payment_status=?,status=?,notes=? WHERE project_id=?')
      .bind(data.raw_text, data.scheduled_date, data.time_slot, data.address, data.contact_name, data.contact_phone, data.total_amount, data.payment_method, data.payment_status, data.status, data.notes, data.project_id).run();
    await env.DB.prepare('DELETE FROM work_order_items WHERE work_order_id=?').bind(woId).run();
  } else {
    const r = await env.DB.prepare('INSERT INTO work_orders(project_id,raw_text,scheduled_date,time_slot,address,contact_name,contact_phone,total_amount,payment_method,payment_status,status,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)')
      .bind(data.project_id, data.raw_text, data.scheduled_date, data.time_slot, data.address, data.contact_name, data.contact_phone, data.total_amount, data.payment_method, data.payment_status, data.status, data.notes).run();
    woId = r.meta.last_row_id;
  }
  for (const item of (data.item_list || [])) {
    await env.DB.prepare('INSERT INTO work_order_items(work_order_id,seq,description,quantity,unit_price,item_total) VALUES(?,?,?,?,?,?)')
      .bind(woId, item.seq, item.description, item.quantity || 1, item.unit_price, item.item_total).run();
  }
  if (data.contact_phone) {
    await env.DB.prepare("INSERT INTO contacts(name,phone,address,last_order_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(phone) DO UPDATE SET name=excluded.name,address=excluded.address,last_order_at=datetime('now')")
      .bind(data.contact_name, data.contact_phone, data.address).run();
  }
  return woId;
}

// ─── Page: Dashboard ───────────────────────────────────────────────────────
async function dashboard(env) {
  const s = await env.DB.prepare('SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders').first();
  const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='已付'").first();
  const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='未付'").first();
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = await env.DB.prepare('SELECT * FROM work_orders WHERE scheduled_date=? ORDER BY time_slot LIMIT 20').bind(today).all();
  const we = new Date(Date.now() + 7*86400000).toISOString().split('T')[0];
  const weekOrders = await env.DB.prepare('SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot LIMIT 20').bind(today, we).all();
  const recent = await env.DB.prepare('SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 5').all();
  const cats = await env.DB.prepare(`SELECT CASE WHEN description LIKE '%掛扇%' OR description LIKE '%風扇%' OR description LIKE '%抽氣%' THEN '風扇類' WHEN description LIKE '%龍頭%' OR description LIKE '%水龍頭%' THEN '水喉類' WHEN description LIKE '%燈%' THEN '燈具類' WHEN description LIKE '%掛勾%' OR description LIKE '%紙巾架%' OR description LIKE '%裝鉸%' THEN '五金配件' WHEN description LIKE '%電視%' THEN '電器搬運' ELSE '其他' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC`).all();

  const body = `<div class="page-header"><h1>📊 儀表板</h1><p>DUCKDUCK 維修工程管理系統</p></div>

<!-- 區塊一：快速概覽 -->
<div class="section-block">
  <div class="section-title">📈 營運概覽</div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon blue">📋</div><div><div class="stat-value">${s.cnt}</div><div class="stat-label">總工單數</div></div></div>
    <div class="stat-card"><div class="stat-icon green">💰</div><div><div class="stat-value">${fmt(s.total)}</div><div class="stat-label">總營收</div></div></div>
    <div class="stat-card"><div class="stat-icon amber">⚠️</div><div><div class="stat-value">${fmt(ur.u)}</div><div class="stat-label">未收款</div></div></div>
    <div class="stat-card"><div class="stat-icon purple">📅</div><div><div class="stat-value">${weekOrders.results.length}</div><div class="stat-label">本週排程</div></div></div>
  </div>
</div>

<!-- 區塊二：快捷操作 -->
<div class="section-block">
  <div class="section-title">⚡ 常用功能</div>
  <div class="quick-actions">
    <a href="/parse" class="quick-action-card">
      <div class="qa-icon">📥</div>
      <div class="qa-label">匯入工單</div>
      <div class="qa-desc">貼上 WhatsApp 訊息</div>
    </a>
    <a href="/orders" class="quick-action-card">
      <div class="qa-icon">📋</div>
      <div class="qa-label">查看工單</div>
      <div class="qa-desc">管理所有工單</div>
    </a>
    <a href="/chat" class="quick-action-card">
      <div class="qa-icon">💬</div>
      <div class="qa-label">AI 助手</div>
      <div class="qa-desc">智能查詢分析</div>
    </a>
    <a href="/map" class="quick-action-card">
      <div class="qa-icon">🗺️</div>
      <div class="qa-label">地圖檢視</div>
      <div class="qa-desc">工單位置分佈</div>
    </a>
  </div>
</div>

<!-- 區塊三：排程一覽 -->
<div class="section-block">
  <div class="section-title">📅 排程一覽</div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><h2>🔴 今日排程 (${today})</h2></div>
      ${todayOrders.results.length ? todayOrders.results.map(o => `<div class="order-row"><div class="or-left"><a href="/orders/${o.project_id}" class="link">${o.project_id}</a><span class="or-time">${o.time_slot||''}</span></div><div class="or-right"><span class="or-contact">${o.contact_name||'-'}</span><span class="or-addr">${(o.address||'').substring(0,15)}</span><span class="or-status">${badge(o.status)}</span></div></div>`).join('') : '<div class="empty"><div class="icon">🎉</div>今日無排程</div>'}
    </div>
    <div class="card"><div class="card-header"><h2>🟡 本週排程</h2></div>
      ${weekOrders.results.length ? weekOrders.results.slice(0,8).map(o => `<div class="order-row"><div class="or-left"><span class="or-date">${o.scheduled_date||''}</span><span class="or-time">${o.time_slot||''}</span></div><div class="or-right"><span class="or-contact">${o.contact_name||'-'}</span><span class="or-addr">${(o.address||'').substring(0,15)}</span></div></div>`).join('') : '<div class="empty">暫無排程</div>'}
    </div>
  </div>
</div>

<!-- 區塊四：分析 -->
<div class="section-block">
  <div class="section-title">📊 數據分析</div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><h2>🔧 維修類別分佈</h2></div>
      ${cats.results.length ? '<div class="chart-container" style="height:240px"><canvas id="catChart"></canvas></div>' : '<div class="empty">尚無數據</div>'}
    </div>
    <div class="card"><div class="card-header"><h2>🕐 最近工單</h2><a href="/orders" class="link">全部 →</a></div>
      ${recent.results.map(o => `<div class="order-row"><div class="or-left"><a href="/orders/${o.project_id}" class="link">${o.project_id}</a></div><div class="or-right"><span>${o.contact_name||'-'}</span><span style="font-weight:600">${fmt(o.total_amount)}</span><span>${badge(o.status)}</span></div></div>`).join('')}
    </div>
  </div>
</div>

${cats.results.length ? `<script>new Chart(document.getElementById('catChart'),{type:'doughnut',data:{labels:[${cats.results.map(c=>`'${c.category}'`).join(',')}],datasets:[{data:[${cats.results.map(c=>c.total_revenue).join(',')}],backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#7c3aed','#06b6d4','#ec4899']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:12,font:{size:11}}}}}});</script>` : ''}`;return html('儀表板', body);
}

// ─── Page: Orders List ─────────────────────────────────────────────────────
async function ordersPage(env, url) {
  const status = url.searchParams.get('status') || '';
  const search = url.searchParams.get('search') || '';
  const dbOrders = await env.DB.prepare('SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 200').all();
  let rows = dbOrders.results;
  if (status) rows = rows.filter(o => o.status === status);
  if (search) { const q = search.toLowerCase(); rows = rows.filter(o => (o.project_id||'').toLowerCase().includes(q) || (o.contact_name||'').toLowerCase().includes(q) || (o.address||'').toLowerCase().includes(q) || (o.contact_phone||'').includes(q)); }
  const total = rows.reduce((s,o) => s + (o.total_amount||0), 0);
  const unpaid = rows.filter(o => o.payment_status === '未付').reduce((s,o) => s + (o.total_amount||0), 0);

  const statusOpts = ['','待處理','已確認','已完成','已取消'].map(v => `<option value="${v}" ${status===v?'selected':''}>${v||'全部狀態'}</option>`).join('');

  let body = `<div class="page-header"><h1>📋 工單列表</h1><p>共 ${rows.length} 張 · 總 ${fmt(total)} · 未收 ${fmt(unpaid)}</p></div>

<div class="section-block">
  <div class="section-title">🔍 搜尋與篩選</div>
  <div class="card">
    <div class="toolbar">
      <select onchange="location.href='?status='+this.value+'&search=${search}'">${statusOpts}</select>
      <form method="get" style="display:flex;gap:10px"><input type="hidden" name="status" value="${status}"><input type="text" name="search" value="${search}" placeholder="搜尋編號/客戶/地址." style="width:200px"><button class="btn btn-outline btn-sm">搜尋</button></form>
    </div>
  </div>
</div>

<div class="section-block">
  <div class="section-title">📊 狀態摘要</div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-icon blue">📋</div><div><div class="stat-value">${rows.length}</div><div class="stat-label">全部工單</div></div></div>
    <div class="stat-card"><div class="stat-icon amber">⏳</div><div><div class="stat-value">${rows.filter(o=>o.status==='待處理').length}</div><div class="stat-label">待處理</div></div></div>
    <div class="stat-card"><div class="stat-icon green">✅</div><div><div class="stat-value">${rows.filter(o=>o.status==='已完成').length}</div><div class="stat-label">已完成</div></div></div>
    <div class="stat-card"><div class="stat-icon red">💰</div><div><div class="stat-value">${fmt(unpaid)}</div><div class="stat-label">未收款</div></div></div>
  </div>
</div>

<div class="section-block">
  <div class="section-title">📋 工單紀錄</div>
  ${rows.length ? (() => {
    // Group by scheduled date
    const grouped = {};
    const noDate = [];
    for (const o of rows) {
      const d = o.scheduled_date || '未排程';
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(o);
    }
    const sortedDates = Object.keys(grouped).sort((a,b) => {
      if (a === '未排程') return 1;
      if (b === '未排程') return -1;
      return a.localeCompare(b);
    });
    const dowMap = ['日','一','二','三','四','五','六'];
    let html = '';
    for (const date of sortedDates) {
      const dayOrders = grouped[date];
      const isDate = date !== '未排程';
      const dow = isDate ? dowMap[new Date(date + 'T00:00:00').getDay()] : '';
      const dateLabel = isDate ? date + ' 週' + dow + ' · ' + dayOrders.length + '單' : '📅 未排程 · ' + dayOrders.length + '單';
      html += '<div class="order-group"><div class="order-group-header">' + dateLabel + '</div>';
      for (const o of dayOrders) {
        const stBadge = badge(o.status);
        const payBadge = badge(o.payment_status);
        html += '<div class="order-card" onclick="location.href=\'/orders/' + o.project_id + '\'">' +
          '<div class="oc-top">' +
            '<a href="/orders/' + o.project_id + '" class="link oc-id">' + o.project_id + '</a>' +
            '<span class="oc-time">' + (o.time_slot||'') + '</span>' +
            '<span class="oc-amount">' + fmt(o.total_amount) + '</span>' +
          '</div>' +
          '<div class="oc-mid">' +
            '<span class="oc-contact">' + (o.contact_name||'-') + '</span>' +
            '<span class="oc-phone">📞' + (o.contact_phone||'') + '</span>' +
          '</div>' +
          '<div class="oc-bottom">' +
            '<span class="oc-addr">📍' + ((o.address||'').substring(0,30)) + '</span>' +
            '<span class="oc-badges">' + stBadge + ' ' + payBadge + '</span>' +
          '</div>' +
        '</div>';
      }
      html += '</div>';
    }
    return html;
  })() : '<div class="card"><div class="empty"><div class="icon">📭</div>沒有符合條件的工單</div></div>'}
</div>`;
  // Add order card styles
  body += '<style>' +
    '.order-group{margin-bottom:16px}' +
    '.order-group-header{font-size:13px;font-weight:600;color:#64748b;padding:8px 0;border-bottom:2px solid #e2e8f0;margin-bottom:8px}' +
    '.order-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:8px;cursor:pointer;transition:all .15s;display:block}' +
    '.order-card:hover{background:#f8fafc;border-color:#cbd5e1;box-shadow:0 1px 3px rgba(0,0,0,.06)}' +
    '.oc-top{display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap}' +
    '.oc-id{font-weight:600;font-size:14px}' +
    '.oc-time{font-size:11px;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:4px}' +
    '.oc-amount{font-weight:700;font-size:15px;margin-left:auto}' +
    '.oc-mid{display:flex;align-items:center;gap:10px;margin-bottom:4px;font-size:13px}' +
    '.oc-contact{font-weight:500}' +
    '.oc-phone{color:#64748b;font-size:12px}' +
    '.oc-bottom{display:flex;align-items:center;gap:10px;font-size:12px;flex-wrap:wrap;justify-content:space-between}' +
    '.oc-addr{color:#64748b}' +
    '.oc-badges{display:flex;gap:4px;flex-shrink:0}' +
    '@media(max-width:768px){.order-card{padding:10px 12px}.oc-amount{font-size:14px}.oc-bottom{flex-direction:column;align-items:flex-start;gap:4px}}' +
    '</style>';" + "
  return html('工單列表', body, 'orders');
}

// ─── Page: Order Detail ────────────────────────────────────────────────────
async function orderDetail(env, id) {
  const wo = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(id).first();
  if (!wo) return html('404', '<h1>找不到工單</h1><a href="/orders">返回</a>');
  const items = await env.DB.prepare('SELECT * FROM work_order_items WHERE work_order_id=? ORDER BY seq').bind(wo.id).all();

  const itemsRows = items.results.length ? items.results.map(i =>
    `<tr><td>${i.seq}</td><td>${i.description}</td><td style="text-align:center">${i.quantity!==1?i.quantity:'-'}</td><td style="text-align:right;font-weight:600">${fmt(i.item_total)}</td></tr>`
  ).join('') : '<tr><td colspan="4">無明細</td></tr>';

  const body = `<div class="page-header"><div style="display:flex;justify-content:space-between"><div><h1>📋 ${wo.project_id}</h1><p>${wo.received_at}</p></div>
  <form method="post" action="/api/orders/${wo.project_id}/delete" onsubmit="return confirm('確定刪除？')"><button class="btn btn-danger btn-sm">🗑️ 刪除</button></form></div></div>
<div class="grid-2">
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">📌 基本資料</h2>
    <table style="font-size:14px">
      <tr><td style="width:80px;color:#64748b;padding:6px 0">日期</td><td>${wo.scheduled_date||'-'} ${wo.time_slot||''}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">地址</td><td>${wo.address||'-'}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">聯絡</td><td>${wo.contact_name||'-'} 📞 ${wo.contact_phone||'-'}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">費用</td><td style="font-size:18px;font-weight:700;color:#2563eb">${fmt(wo.total_amount)}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">付款</td><td>${wo.payment_method||'-'}</td></tr>
      <tr><td style="color:#64748b;padding:6px 0">狀態</td><td>${badge(wo.status)} ${badge(wo.payment_status)}</td></tr>
    </table>
    <div style="margin-top:16px"><label style="font-size:13px;font-weight:500">快速更新</label>
      <div class="btn-group">
        <button onclick="qu('${wo.project_id}','已完成','已付')" class="btn btn-primary btn-sm">✅ 完成+已付</button>
        <button onclick="qu('${wo.project_id}','已完成','')" class="btn btn-outline btn-sm">✅ 完成</button>
        <button onclick="qu('${wo.project_id}','已取消','')" class="btn btn-outline btn-sm">❌ 取消</button>
      </div>
    </div>
  </div>
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">🔧 維修項目</h2>
    <table class="contacts-table"><thead><tr><th style="width:30px">#</th><th>項目</th><th style="width:50px;text-align:center">數量</th><th style="width:80px;text-align:right">金額</th></tr></thead><tbody>${itemsRows}</tbody></table>
  </div>
</div>
${wo.notes ? `<div class="card"><h2 style="font-size:16px;margin-bottom:8px">📝 備註</h2><p style="color:#64748b">${wo.notes}</p></div>` : ''}
<div class="card"><h2 style="font-size:16px;margin-bottom:8px">📄 原始訊息</h2><pre style="background:#f8fafc;padding:16px;border-radius:8px;font-size:12px;line-height:1.6;white-space:pre-wrap">${wo.raw_text}</pre></div>
<script>async function qu(id,st,pm){const b={status:st};if(pm)b.payment=pm;await fetch('/api/orders/'+id+'/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});location.reload();}</script>`;
  return html(wo.project_id, body, 'orders');
}

// ─── Page: Parse ───────────────────────────────────────────────────────────
async function parsePage(env) {
  const body = `<div class="page-header"><h1>📥 匯入工單</h1><p>貼上 Michael Chan 的 WhatsApp 訊息</p></div>
<div class="grid-2">
  <div class="card"><h2 style="font-size:16px;margin-bottom:16px">📝 貼上訊息</h2>
    <form method="post"><div class="form-group"><textarea name="text" placeholder="DUCKDUCK維修工程&#10;項目編號:C20260706001&#10;."></textarea></div>
    <button class="btn btn-primary">🔍 解析並匯入</button></form>
  </div>
  <div class="card"><h2 style="font-size:16px;margin-bottom:12px">📋 格式說明</h2>
    <div style="font-size:13px;color:#64748b;line-height:1.8">
      <p>支援標準工單格式：</p><ul style="padding-left:20px;margin-top:8px">
        <li>✅ 項目編號 (C/A + 數字)</li><li>✅ 日期時間 (4/7 / 明早 / 10:00)</li>
        <li>✅ 地址</li><li>✅ 聯絡人 + 電話</li><li>✅ 維修項目 (1. / 1， / $xxx/數量)</li>
        <li>✅ 備註</li><li>✅ 費用 + 付款狀態</li></ul>
      <p style="margin-top:12px">⚠️ 可一次貼多張（以 DUCKDUCK維修工程 分隔）</p>
    </div>
  </div>
</div>`;
  return html('匯入工單', body, 'parse');
}

async function parseSubmit(req, env) {
  const form = await req.formData();
  const text = (form.get('text') || '').trim();
  if (!text) return html('錯誤', '<p>請輸入工單文字</p><a href="/parse">返回</a>');
  const orders = parseMultiOrders(text);
  if (!orders.length) { const s = parseWorkOrder(text); if (s.project_id) orders.push(s); }
  if (!orders.length) return html('錯誤', '<p>無法解析工單</p><a href="/parse">返回</a>');
  const results = [];
  for (const o of orders) { await insertWO(env, o); results.push(o); }

  const body = `<div class="page-header"><h1>📥 匯入結果</h1></div>
<div class="card"><h2 style="font-size:16px;color:#166534;margin-bottom:12px">✅ 成功匯入 ${results.length} 張工單</h2>
${results.map(o => `<div class="result-card"><h3><a href="/orders/${o.project_id}" class="link">${o.project_id}</a></h3><div style="font-size:13px">📅 ${o.scheduled_date||'-'} ${o.time_slot||''} · 📍 ${o.address||'-'}</div><div style="font-size:13px">👤 ${o.contact_name||'-'} 📞 ${o.contact_phone||'-'}</div><div style="font-size:12px;color:#64748b">${o.item_list.map(i=>i.seq+'.'+i.description.substring(0,20)).join(' · ')}</div><div style="font-weight:600;margin-top:4px">💰 ${fmt(o.total_amount)}</div></div>`).join('')}
<a href="/orders" class="btn btn-outline btn-sm" style="margin-top:12px">📋 查看列表</a></div>`;
  return html('匯入結果', body, 'parse');
}

// ─── Page: Analysis ────────────────────────────────────────────────────────
async function analysisPage(env) {
  const s = await env.DB.prepare('SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders').first();
  const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='已付'").first();
  const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='未付'").first();
  const cats = await env.DB.prepare(`SELECT CASE WHEN description LIKE '%掛扇%' OR description LIKE '%風扇%' OR description LIKE '%抽氣%' THEN '風扇類' WHEN description LIKE '%龍頭%' OR description LIKE '%水龍頭%' THEN '水喉類' WHEN description LIKE '%燈%' THEN '燈具類' WHEN description LIKE '%掛勾%' OR description LIKE '%紙巾架%' OR description LIKE '%裝鉸%' THEN '五金配件' WHEN description LIKE '%電視%' THEN '電器搬運' ELSE '其他' END as category, COUNT(*) as cnt, COALESCE(SUM(item_total),0) as total_revenue FROM work_order_items GROUP BY category ORDER BY total_revenue DESC`).all();
  const contacts = await env.DB.prepare('SELECT c.name, c.phone, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY total_spent DESC LIMIT 10').all();

  const rate = s.total > 0 ? Math.round(pr.p / s.total * 100) : 0;

  const body = `<div class="page-header"><h1>📈 報價分析</h1></div>
<div class="stat-grid">
  <div class="stat-card"><div class="stat-icon blue">📋</div><div><div class="stat-value">${s.cnt}</div><div class="stat-label">總工單數</div></div></div>
  <div class="stat-card"><div class="stat-icon green">💰</div><div><div class="stat-value">${fmt(s.total)}</div><div class="stat-label">總營收</div></div></div>
  <div class="stat-card"><div class="stat-icon amber">⚠️</div><div><div class="stat-value">${fmt(ur.u)}</div><div class="stat-label">未收款</div></div></div>
  <div class="stat-card"><div class="stat-icon purple">📊</div><div><div class="stat-value">${rate}%</div><div class="stat-label">收款率</div></div></div>
</div>
<div class="grid-2">
  <div class="card"><div class="card-header"><h2>🔧 類別明細</h2></div>
    <table class="contacts-table"><thead><tr><th>類別</th><th style="text-align:center">次數</th><th style="text-align:right">營收</th><th style="text-align:right">佔比</th></tr></thead><tbody>
    ${cats.results.map(c => `<tr><td>${c.category}</td><td style="text-align:center">${c.cnt}</td><td style="text-align:right;font-weight:600">${fmt(c.total_revenue)}</td><td style="text-align:right">${s.total>0?Math.round(c.total_revenue/s.total*100):0}%</td></tr>`).join('')}
    </tbody></table>
  </div>
  <div class="card"><div class="card-header"><h2>👥 客戶貢獻</h2></div>
    <table class="contacts-table"><thead><tr><th>客戶</th><th style="text-align:center">單數</th><th style="text-align:right">總消費</th></tr></thead><tbody>
    ${contacts.results.map(c => `<tr><td>${c.name||'未知'}</td><td data-label="工單數" style="text-align:center">${c.order_count}</td><td data-label="總消費" style="text-align:right;font-weight:600">${fmt(c.total_spent)}</td></tr>`).join('')}
    </tbody></table>
  </div>
</div>
${cats.results.length ? `<div class="card"><div class="card-header"><h2>📊 類別分佈</h2></div><div class="chart-container" style="height:260px"><canvas id="catChart2"></canvas></div></div><script>new Chart(document.getElementById('catChart2'),{type:'doughnut',data:{labels:[${cats.results.map(c=>`'${c.category}'`).join(',')}],datasets:[{data:[${cats.results.map(c=>c.total_revenue).join(',')}],backgroundColor:['#2563eb','#16a34a','#f59e0b','#dc2626','#7c3aed','#06b6d4','#ec4899']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{boxWidth:12,padding:12,font:{size:11}}}}}});</script>` : ''}`;
  return html('報價分析', body, 'analysis');
}

// ─── Page: Schedule ────────────────────────────────────────────────────────
async function schedulePage(env, url) {
  const days = parseInt(url.searchParams.get('days') || '7');
  const today = new Date().toISOString().split('T')[0];
  const end = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
  const rows = await env.DB.prepare('SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot').bind(today, end).all();
  const dayOpts = [1,3,7,14,30].map(d => `<option value="${d}" ${days===d?'selected':''}>${d}</option>`).join('');

  const body = `<div class="page-header"><h1>📅 排程管理</h1><p>未來 <select onchange="location.href='?days='+this.value" style="width:auto;display:inline">${dayOpts}</select> 天 · ${rows.results.length} 張工單</p></div>
<div class="card"><table class="contacts-table"><thead><tr><th>日期</th><th>時間</th><th>編號</th><th>客戶</th><th>電話</th><th>地址</th><th style="text-align:right">費用</th><th>狀態</th></tr></thead><tbody>
${rows.results.length ? rows.results.map(s => `<tr><td><b>${s.scheduled_date}</b></td><td>${s.time_slot||'-'}</td><td><a href="/orders/${s.project_id}" class="link">${s.project_id}</a></td><td>${s.contact_name||'-'}</td><td style="font-size:12px;color:#64748b">${s.contact_phone||'-'}</td><td>${(s.address||'').substring(0,22)}</td><td style="text-align:right;font-weight:600">${fmt(s.total_amount)}</td><td>${badge(s.status)}</td></tr>`).join('') : '<tr><td colspan="8"><div class="empty"><div class="icon">🎉</div>沒有排程</div></td></tr>'}
</tbody></table></div>`;
  return html('排程', body, 'schedule');
}

// ─── Page: Contacts ────────────────────────────────────────────────────────
async function contactsPage(env) {
  const rows = await env.DB.prepare('SELECT c.*, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY c.last_order_at DESC').all();

  const body = `<style>@media(max-width:768px){.contacts-table thead{display:none}.contacts-table,.contacts-table tbody,.contacts-table tr,.contacts-table td{display:block;width:100%}.contacts-table tr{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;background:#fff}.contacts-table td{padding:4px 0;border:none;text-align:left;display:flex;gap:8px}.contacts-table td:before{content:attr(data-label);font-weight:600;color:#64748b;min-width:60px;flex-shrink:0}.contacts-table .empty-cell{display:block;padding:20px}.contacts-table .empty-cell:before{display:none}}</style><div class="page-header"><h1>👥 客戶聯絡人</h1><p>共 ${rows.results.length} 位</p></div>

<div class="section-block">
  <div class="section-title">📇 客戶名單</div>
  <div class="card" style="padding:0">
    <div class="table-wrap">
<div class="card"><table class="contacts-table"><thead><tr><th>姓名</th><th>電話</th><th>地址</th><th style="text-align:center">工單數</th><th style="text-align:right">總消費</th><th>最後工單</th></tr></thead><tbody>
${rows.results.length ? rows.results.map(c => `<tr><td data-label="姓名"><b>${c.name||'未知'}</b></td><td data-label="電話">${c.phone||'-'}</td><td data-label="地址">${(c.address||'').substring(0,25)}</td><td data-label="工單數" style="text-align:center">${c.order_count}</td><td data-label="總消費" style="text-align:right;font-weight:600">${fmt(c.total_spent)}</td><td data-label="最後工單" style="font-size:12px;color:#64748b">${c.last_order_at||'-'}</td></tr>`).join('') : '<tr><td colspan="6" class="empty-cell"><div class="empty">尚無客戶記錄</div></td></tr>'}
</tbody></table></div>`;
  return html('客戶', body, 'contacts');
}


// ─── API: Chat (Qwen3) ────────────────────────────────────────────────────
async function chatAPI(req, env) {
  const { message } = await req.json();
  if (!message || !message.trim()) return Response.json({ reply: '請輸入問題' });

  const msg = message.trim();
  const today = new Date().toISOString().split('T')[0];

  // ─── Intent detection ─────────────────────────────────────────────────
  let extraContext = '';
  let handled = false;
  let directReply = '';

  // Helper: extract project ID from message
  const pidMatch = msg.match(/[A-Z]\d{10,12}/);
  const projectId = pidMatch ? pidMatch[0] : null;

  // Helper: extract client name
  const clientMatch = msg.match(/[郭李陳張黃何林吳劉王]{1,2}(小姐|太|生|先生)/);
  const clientName = clientMatch ? clientMatch[0] : null;

  // Helper: extract date
  const dateMatch = msg.match(/(\d{4}-\d{2}-\d{2})/);
  const dateStr = dateMatch ? dateMatch[1] : null;

  // ─── Execute tools based on intent ────────────────────────────────────

  // Order detail lookup
  if (projectId && (msg.includes('詳情') || msg.includes('搵') || msg.includes('查') || msg.includes('status') || msg.includes('狀態'))) {
    const result = await executeTool(env, 'get_order_detail', { project_id: projectId });
    extraContext = '工單詳情：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Write operations (must be before status/other queries)
  if (projectId && msg.includes('已完成') && (msg.includes('標記') || msg.includes('改為') || msg.includes('設為') || msg.includes('將'))) {
    await env.DB.prepare('UPDATE work_orders SET status=? WHERE project_id=?').bind('已完成', projectId).run();
    const updated = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(projectId).first();
    extraContext = '已更新工單：\n' + JSON.stringify(updated, null, 2);
    handled = true;
  }
  else if (projectId && msg.includes('已確認') && (msg.includes('標記') || msg.includes('改為') || msg.includes('設為') || msg.includes('將'))) {
    await env.DB.prepare('UPDATE work_orders SET status=? WHERE project_id=?').bind('已確認', projectId).run();
    const updated = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(projectId).first();
    extraContext = '已更新工單：\n' + JSON.stringify(updated, null, 2);
    handled = true;
  }
  else if (projectId && msg.includes('已取消') && (msg.includes('標記') || msg.includes('改為') || msg.includes('設為') || msg.includes('將'))) {
    await env.DB.prepare('UPDATE work_orders SET status=? WHERE project_id=?').bind('已取消', projectId).run();
    const updated = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(projectId).first();
    extraContext = '已更新工單：\n' + JSON.stringify(updated, null, 2);
    handled = true;
  }
  else if (projectId && msg.includes('已付') && (msg.includes('標記') || msg.includes('改為') || msg.includes('設為') || msg.includes('將'))) {
    await env.DB.prepare('UPDATE work_orders SET payment_status=? WHERE project_id=?').bind('已付', projectId).run();
    const updated = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(projectId).first();
    extraContext = '已更新工單：\n' + JSON.stringify(updated, null, 2);
    handled = true;
  }
  else if (projectId && (msg.includes('delete') || msg.includes('刪除') || msg.includes('移除'))) {
    if (msg.includes('確認') || msg.includes('yes') || msg.includes('係')) {
      await env.DB.prepare('DELETE FROM work_orders WHERE project_id=?').bind(projectId).run();
      extraContext = '已刪除工單 ' + projectId + '。';
    } else {
      directReply = '⚠️ 確定要刪除 ' + projectId + '？此操作無法復原。請回覆「確認刪除 ' + projectId + '」來確認。';
    }
    handled = true;
  }
  else if (msg.includes('標記') || msg.includes('改為') || msg.includes('更新') || msg.includes('delete') || msg.includes('刪除')) {
    directReply = '要更新工單狀態，請提供工單編號同新狀態。例如：「將 C020260704001 標記為已完成」或「將 A20260704002 改為已付款」。';
    handled = true;
  }

  // Client summary
  else if (clientName && (msg.includes('消費') || msg.includes('總共') || msg.includes('電話') || msg.includes('地址') || msg.includes('俾錢') || msg.includes('付款'))) {
    const result = await executeTool(env, 'get_client_summary', { name: clientName });
    extraContext = '客戶摘要：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Client orders
  else if (clientName && (msg.includes('工單') || msg.includes('單'))) {
    const result = await executeTool(env, 'get_orders_by_client', { name: clientName });
    extraContext = '客戶工單：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Unpaid / payment queries
  else if (msg.includes('未收') || msg.includes('未付') || msg.includes('爭最多錢') || msg.includes('欠')) {
    const result = await executeTool(env, 'get_unpaid_orders', {});
    extraContext = '未收款工單：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Schedule for a specific date
  else if (dateStr && (msg.includes('行程') || msg.includes('工單') || msg.includes('排程'))) {
    const result = await executeTool(env, 'get_orders_by_date', { date: dateStr });
    extraContext = '日期工單：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Upcoming schedule
  else if (msg.includes('聽日') || msg.includes('未來') || msg.includes('排程') || msg.includes('行程') || msg.includes('星期') || msg.includes('禮拜')) {
    let days = 7;
    if (msg.includes('14') || msg.includes('兩週') || msg.includes('兩周')) days = 14;
    if (msg.includes('30') || msg.includes('一個月')) days = 30;
    const result = await executeTool(env, 'get_upcoming_orders', { days });
    extraContext = '未來排程：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Revenue analysis
  else if (msg.includes('營收') || msg.includes('收入') || msg.includes('賺') || msg.includes('月度') || msg.includes('本月') && (msg.includes('分析') || msg.includes('報告'))) {
    const result = await executeTool(env, 'get_category_analysis', {});
    const rev = await executeTool(env, 'get_revenue_by_month', {});
    extraContext = '營收分析：\n類別：' + JSON.stringify(result, null, 2) + '\n月度：' + JSON.stringify(rev, null, 2);
    handled = true;
  }

  // Comparison
  else if (msg.includes('比較')) {
    const clients = await executeTool(env, 'get_client_list', {});
    extraContext = '客戶比較數據：\n' + JSON.stringify(clients, null, 2);
    handled = true;
  }
  // Trends / predictions
  else if (msg.includes('趨勢') || msg.includes('增長') || msg.includes('預測')) {
    const monthly = await executeTool(env, 'get_revenue_by_month', {});
    extraContext = '月度趨勢：\n' + JSON.stringify(monthly, null, 2);
    handled = true;
  }
  // Averages
  else if (msg.includes('平均')) {
    const s = await env.DB.prepare('SELECT COUNT(*) as cnt, COALESCE(AVG(total_amount),0) as avg, COALESCE(MAX(total_amount),0) as max, COALESCE(MIN(total_amount),0) as min FROM work_orders').first();
    extraContext = '統計：\n' + JSON.stringify(s, null, 2);
    handled = true;
  }
  // Busiest day
  else if ((msg.includes('邊日') || msg.includes('幾時')) && (msg.includes('最多') || msg.includes('最忙'))) {
    const rows = await env.DB.prepare("SELECT scheduled_date, COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders WHERE scheduled_date IS NOT NULL GROUP BY scheduled_date ORDER BY cnt DESC LIMIT 10").all();
    extraContext = '最忙日子：\n' + JSON.stringify(rows.results, null, 2);
    handled = true;
  }
  // Price adjustment impact
  else if (msg.includes('折扣') || msg.includes('加價') || msg.includes('調價')) {
    const topClients = await executeTool(env, 'get_client_list', {});
    extraContext = '客戶消費數據：\n' + JSON.stringify(topClients, null, 2);
    handled = true;
  }
  // Lost/inactive clients
  else if (msg.includes('流失') || msg.includes('最近冇') || msg.includes('冇幫襯')) {
    const clients = await executeTool(env, 'get_client_list', {});
    extraContext = '客戶活躍度：\n' + JSON.stringify(clients, null, 2);
    handled = true;
  }

  // Category analysis
  else if (msg.includes('類別') || msg.includes('維修') && (msg.includes('賺') || msg.includes('多') || msg.includes('分析'))) {
    const result = await executeTool(env, 'get_category_analysis', {});
    extraContext = '類別分析：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Client list
  else if (msg.includes('客戶') && (msg.includes('名單') || msg.includes('幾多個') || msg.includes('列表') || msg.includes('邊個'))) {
    const result = await executeTool(env, 'get_client_list', {});
    extraContext = '客戶名單：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Search by address
  else if (msg.includes('南昌街') || msg.includes('成林') || msg.includes('青衣') || msg.includes('南山') || msg.includes('石硤尾')) {
    const kw = msg.match(/(南昌街|成林|灝景灣|青衣|南山邨|石硤尾|南安)/);
    if (kw) {
      const result = await executeTool(env, 'get_orders_by_address', { keyword: kw[0] });
      extraContext = '地址工單：\n' + JSON.stringify(result, null, 2);
      handled = true;
    }
  }

  // High value
  else if (msg.includes('最高') || msg.includes('最大') || msg.includes('金額最高')) {
    const result = await executeTool(env, 'get_high_value_orders', { limit: 5 });
    extraContext = '高額工單：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }

  // Order by status
  else if (msg.includes('待處理') || msg.includes('已確認') || msg.includes('已完成') || msg.includes('已取消')) {
    const st = msg.match(/(待處理|已確認|已完成|已取消)/);
    if (st) {
      const result = await executeTool(env, 'get_order_by_status', { status: st[0] });
      extraContext = '狀態工單：\n' + JSON.stringify(result, null, 2);
      handled = true;
    }
  }

  // General search
  else if (msg.includes('搵') || msg.includes('搜') || msg.includes('找')) {
    const result = await executeTool(env, 'search_orders', { query: msg.replace(/搵|搜|找|幫我/g, '').trim().substring(0, 30) });
    extraContext = '搜尋結果：\n' + JSON.stringify(result, null, 2);
    handled = true;
  }



  // ─── Get base stats context ───────────────────────────────────────────
  const stats = await env.DB.prepare('SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders').first();
  const unpaid = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='未付'").first();
  const todayOrders = await env.DB.prepare("SELECT project_id, contact_name, address, time_slot, total_amount FROM work_orders WHERE scheduled_date=? LIMIT 10").bind(today).all();

  if (directReply) {
    return Response.json({ reply: directReply });
  }

  // ─── Build context and call AI ────────────────────────────────────────
  let context = `你係 DUCKDUCK 裝修工程嘅 AI 助手。請用繁體中文回答，語氣友善專業，簡潔實用。

基本數據：
- 總工單：${stats.cnt} 張 | 總營收：$${Number(stats.total).toLocaleString()} | 未收款：$${Number(unpaid.u).toLocaleString()}
- 今日日期：${today}
${todayOrders.results.length ? '- 今日工單：' + todayOrders.results.map(o => `${o.project_id} ${o.contact_name} ${o.time_slot||''} $${o.total_amount}`).join('; ') : '- 今日無工單'}
`;

  if (extraContext) {
    // Truncate long results to prevent context overflow
    if (extraContext.length > 3000) {
      extraContext = extraContext.substring(0, 3000) + '\n...(truncated)';
    }
    context += '\n=== 數據庫查詢結果 ===\n' + extraContext + '\n\n請根據以上查詢結果回答用戶問題。';
  }

  try {
    const response = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: message }
      ],
      max_tokens: 600,
    });

    // Extract text from response (Qwen returns choices[0].message.content, may be null if reasoning)
    let reply = response?.response || response?.choices?.[0]?.message?.content || '';
    if (!reply && typeof response === 'string') reply = response;
    if (!reply) reply = JSON.stringify(response);

    return Response.json({ reply: reply || '抱歉，我暫時無法回答' });
  } catch (e) {
    return Response.json({ reply: 'AI Error: ' + (e.message || String(e)) });
  }
}

// ─── Tool Execution ───// ─── Tool Execution ──────────────────────────────────────────────────────
async function executeTool(env, tool, params) {
  const db = env.DB;
  try {
    switch (tool) {
      case 'get_stats': {
        const s = await db.prepare('SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders').first();
        const u = await db.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='未付'").first();
        const p = await db.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='已付'").first();
        const pending = await db.prepare("SELECT COUNT(*) as c FROM work_orders WHERE status='待處理'").first();
        const done = await db.prepare("SELECT COUNT(*) as c FROM work_orders WHERE status='已完成'").first();
        return { total_orders: s.cnt, total_revenue: s.total, unpaid: u.u, paid: p.p, pending: pending.c, completed: done.c };
      }
      case 'get_order_detail': {
        const pid = params.project_id;
        if (!pid) return { error: '請提供工單編號' };
        const o = await db.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(pid).first();
        if (!o) return { error: '找不到工單 ' + pid };
        const items = await db.prepare('SELECT * FROM work_order_items WHERE work_order_id=? ORDER BY seq').bind(o.id).all();
        return { ...o, items: items.results };
      }
      case 'get_orders_by_date': {
        const date = params.date;
        if (!date) return { error: '請提供日期' };
        const rows = await db.prepare('SELECT project_id, contact_name, contact_phone, address, time_slot, total_amount, status, payment_status FROM work_orders WHERE scheduled_date=?').bind(date).all();
        return { date, count: rows.results.length, orders: rows.results };
      }
      case 'get_orders_by_date_range': {
        const { from, to } = params;
        if (!from || !to) return { error: '請提供日期範圍' };
        const rows = await db.prepare('SELECT project_id, contact_name, contact_phone, address, time_slot, scheduled_date, total_amount, status, payment_status FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date').bind(from, to).all();
        return { from, to, count: rows.results.length, orders: rows.results };
      }
      case 'get_upcoming_orders': {
        const days = parseInt(params.days) || 7;
        const today = new Date().toISOString().split('T')[0];
        const end = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
        const rows = await db.prepare('SELECT project_id, contact_name, contact_phone, address, time_slot, scheduled_date, total_amount, status, payment_status FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date, time_slot').bind(today, end).all();
        return { days, from: today, to: end, count: rows.results.length, orders: rows.results };
      }
      case 'get_orders_by_client': {
        const name = params.name;
        if (!name) return { error: '請提供客戶姓名' };
        const rows = await db.prepare('SELECT * FROM work_orders WHERE contact_name LIKE ? ORDER BY scheduled_date DESC').bind('%' + name + '%').all();
        const total = rows.results.reduce((s,o) => s + (o.total_amount||0), 0);
        return { client: name, count: rows.results.length, total_spent: total, orders: rows.results };
      }
      case 'get_orders_by_address': {
        const kw = params.keyword;
        if (!kw) return { error: '請提供地址關鍵字' };
        const rows = await db.prepare('SELECT project_id, contact_name, address, time_slot, scheduled_date, total_amount, status FROM work_orders WHERE address LIKE ? ORDER BY scheduled_date DESC').bind('%' + kw + '%').all();
        return { keyword: kw, count: rows.results.length, orders: rows.results };
      }
      case 'get_unpaid_orders': {
        const rows = await db.prepare("SELECT project_id, contact_name, contact_phone, address, scheduled_date, total_amount, status FROM work_orders WHERE payment_status='未付' ORDER BY scheduled_date DESC").all();
        const total = rows.results.reduce((s,o) => s + (o.total_amount||0), 0);
        return { count: rows.results.length, total_unpaid: total, orders: rows.results };
      }
      case 'get_client_list': {
        const rows = await db.prepare("SELECT c.*, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY total_spent DESC").all();
        return { count: rows.results.length, clients: rows.results };
      }
      case 'get_client_summary': {
        const name = params.name;
        if (!name) return { error: '請提供客戶姓名' };
        const c = await db.prepare('SELECT * FROM contacts WHERE name LIKE ?').bind('%' + name + '%').first();
        if (!c) return { error: '找不到客戶: ' + name };
        const orders = await db.prepare('SELECT project_id, scheduled_date, total_amount, status, payment_status FROM work_orders WHERE contact_phone=? ORDER BY scheduled_date DESC').bind(c.phone).all();
        const total = orders.results.reduce((s,o) => s + (o.total_amount||0), 0);
        const unpaid = orders.results.filter(o => o.payment_status === '未付').reduce((s,o) => s + (o.total_amount||0), 0);
        return { client: c, order_count: orders.results.length, total_spent: total, unpaid: unpaid, orders: orders.results };
      }
      case 'get_revenue_by_month': {
        const rows = await db.prepare("SELECT SUBSTR(scheduled_date,1,7) as month, COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders WHERE scheduled_date IS NOT NULL GROUP BY month ORDER BY month DESC LIMIT 12").all();
        return { months: rows.results };
      }
      case 'get_category_analysis': {
        const rows = await db.prepare("SELECT COALESCE(ii.description,'其他') as category, COUNT(DISTINCT wo.id) as cnt, COALESCE(SUM(ii.item_total),0) as total_revenue FROM work_order_items ii JOIN work_orders wo ON ii.work_order_id=wo.id GROUP BY category ORDER BY total_revenue DESC").all();
        const grandTotal = rows.results.reduce((s,r) => s + r.total_revenue, 0);
        const withPct = rows.results.map(r => ({ ...r, pct: grandTotal > 0 ? Math.round(r.total_revenue / grandTotal * 100) : 0 }));
        return { total: grandTotal, categories: withPct };
      }
      case 'get_order_by_status': {
        const status = params.status;
        if (!status) return { error: '請提供狀態' };
        const rows = await db.prepare('SELECT project_id, contact_name, address, scheduled_date, total_amount, payment_status FROM work_orders WHERE status=? ORDER BY scheduled_date DESC').bind(status).all();
        return { status, count: rows.results.length, orders: rows.results };
      }
      case 'get_high_value_orders': {
        const limit = parseInt(params.limit) || 5;
        const rows = await db.prepare('SELECT project_id, contact_name, total_amount, status, payment_status, scheduled_date FROM work_orders ORDER BY total_amount DESC LIMIT ?').bind(limit).all();
        return { limit, orders: rows.results };
      }
      case 'search_orders': {
        const q = params.query;
        if (!q) return { error: '請提供搜尋關鍵字' };
        const like = '%' + q + '%';
        const rows = await db.prepare('SELECT project_id, contact_name, address, total_amount, status, scheduled_date FROM work_orders WHERE project_id LIKE ? OR contact_name LIKE ? OR address LIKE ? OR contact_phone LIKE ? ORDER BY scheduled_date DESC LIMIT 20').bind(like, like, like, like).all();
        return { query: q, count: rows.results.length, orders: rows.results };
      }
      default:
        return { error: '未知工具: ' + tool };
    }
  } catch (e) {
    return { error: '查詢錯誤: ' + (e.message || String(e)) };
  }
}

// ─── Page: Map + Calendar// ─── Page: Map + Calendar ─────────────────────────────────────────────────
async function mapPage(env, url) {
  const dateFrom = url.searchParams.get('from') || '';
  const dateTo = url.searchParams.get('to') || '';
  const today = new Date().toISOString().split('T')[0];

  let query = "SELECT project_id, address, contact_name, contact_phone, total_amount, status, scheduled_date, time_slot FROM work_orders WHERE address IS NOT NULL AND address != ''";
  let params = [];
  if (dateFrom && dateTo) { query += ' AND scheduled_date BETWEEN ? AND ?'; params = [dateFrom, dateTo]; }
  else if (dateFrom) { query += ' AND scheduled_date = ?'; params = [dateFrom]; }
  else { query += ' AND scheduled_date >= ?'; params = [today]; }
  query += ' ORDER BY scheduled_date LIMIT 50';

  let stmt = env.DB.prepare(query);
  if (params.length === 1) stmt = stmt.bind(params[0]);
  else if (params.length === 2) stmt = stmt.bind(params[0], params[1]);
  const orders = await stmt.all();

  // Approximate HK coordinates lookup
  const coordMap = {
    '南昌街': [22.328, 114.166],
    '成林大廈': [22.328, 114.166],
    '灝景灣': [22.358, 114.105],
    '青衣': [22.358, 114.105],
    '南山邨': [22.334, 114.170],
    '石硤尾': [22.334, 114.170],
    '南安樓': [22.334, 114.170],
    'default': [22.3193, 114.1694]
  };

  function getCoords(addr) {
    for (const key of Object.keys(coordMap)) {
      if (addr.includes(key)) return coordMap[key];
    }
    return coordMap['default'];
  }

  const markersData = orders.results.map((o, idx) => {
    const coords = getCoords(o.address || '');
    const addr = (o.address || '').replace(/'/g, "\\'");
    const popup = '<b>' + o.project_id + '</b><br>' + (o.contact_name||'') + ' \ud83d\udcde' + (o.contact_phone||'') + '<br>' + addr + '<br>\ud83d\udcb0' + fmt(o.total_amount) + ' \u00b7 ' + o.status;
    const st = (o.status || '待處理').replace(/'/g, "\\'");
    return {
      addr: o.address,
      coords: coords,
      js: "addMarker(" + coords[0] + ", " + coords[1] + ", '" + popup.replace(/'/g, "\\'") + "', " + (idx+1) + ", '" + st + "');",
      project_id: o.project_id, contact_name: o.contact_name,
      scheduled_date: o.scheduled_date, time_slot: o.time_slot,
      total_amount: o.total_amount, status: o.status, contact_phone: o.contact_phone
    };
  });

  const markers = markersData.map(md => md.js).join('\n');

  // Group by date
  const byDate = {};
  for (const md of markersData) {
    const d = md.scheduled_date || 'unknown';
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(md);
  }

  const sortedDates = Object.keys(byDate).sort();
  const dateList = sortedDates.length ? sortedDates.map(d => {
    const dayOrders = byDate[d];
    const dow = ['日','一','二','三','四','五','六'][new Date(d + 'T00:00:00').getDay()];
    const active = (dateFrom && d === dateFrom) ? ' style="background:#eff6ff;border-left:3px solid var(--primary)"' : '';
    return '<div class="date-row"' + active + ' onclick="filterDate(\'' + d + '\')"><div><b>' + d + '</b> <span style="font-size:11px;color:var(--text-muted)">週' + dow + '</span></div><div style="font-size:11px;color:var(--text-muted)">' + dayOrders.length + ' 單</div>' + dayOrders.map(md => '<div style="font-size:13px;padding:4px 8px;margin:3px 0;color:#2563eb;background:#eff6ff;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (md.time_slot||'') + ' ' + md.project_id + ' ' + (md.contact_name||'') + '</div>').join('') + '</div>';
  }).join('') : '<div class="empty" style="padding:20px">無結果</div>';

  const body = '<div style="background:#1a1d23;color:#0f0;font:11px monospace;padding:8px 12px;margin-bottom:12px;border-radius:8px">📍 Server: ' + orders.results.length + ' orders, ' + markersData.length + ' markers</div>' +
    '<div class="page-header"><h1>🗺️ 工單地圖</h1><p>' + (dateFrom ? dateFrom + (dateTo ? ' ~ ' + dateTo : '') : '今日起') + ' · ' + markersData.length + ' 張工單</p></div>' +
    '<form style="display:flex;gap:8px;align-items:center" onsubmit="filterRange();return false"><input type="date" id="dateFrom" value="' + (dateFrom || today) + '" style="width:140px"><span style="color:var(--text-muted)">~</span><input type="date" id="dateTo" value="' + (dateTo || '') + '" style="width:140px"><button class="btn btn-primary btn-sm">篩選</button><button type="button" class="btn btn-outline btn-sm" onclick="location.href=\'/map\'">清除</button></form></div>' +
    '<div class="map-layout"><div class="card map-card"><div id="map" style="width:100%;height:100%"></div></div><div class="card date-sidebar" style="overflow-y:auto;padding:0;flex-shrink:0"><div style="padding:12px 14px;font-weight:600;font-size:14px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--card-bg);z-index:1">📅 日期列表</div><div style="padding:4px 0">' + dateList + '</div></div></div>' +
    '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" /><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><style>.date-row{padding:12px 14px;border-bottom:1px solid var(--border);cursor:pointer;transition:all .15s;border-left:3px solid transparent;font-size:14px;line-height:1.5}.date-row b{font-size:14px}.date-row:hover{background:#f8fafc}</style>' +
    '<script>const map = L.map(\'map\').setView([22.3193, 114.1694], 12);L.tileLayer(\'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\', {attribution:\'&copy; OpenStreetMap\'}).addTo(map);' +
    'const allMarkers = [];const statusColors = {\'待處理\':\'#f59e0b\',\'已確認\':\'#2563eb\',\'已完成\':\'#16a34a\',\'已取消\':\'#94a3b8\'};' +
    'function createTeardropIcon(num,status){const c=statusColors[status]||\'#e74c3c\';const s=\'<svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 44"><defs><filter id="f\'+num+\'"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/></filter></defs><path d="M17 0 C7.6 0 0 7.6 0 17 C0 28 17 44 17 44 C17 44 34 28 34 17 C34 7.6 26.4 0 17 0Z" fill="\'+c+\'" stroke="#fff" stroke-width="2" filter="url(#f\'+num+\')"/><circle cx="17" cy="15" r="7" fill="#fff" opacity="0.9"/><text x="17" y="19" text-anchor="middle" font-size="11" font-weight="bold" fill="\'+c+\'">\'+num+\'</text></svg>\';return L.icon({iconUrl:\'data:image/svg+xml,\'+encodeURIComponent(s),iconSize:[34,44],iconAnchor:[17,44],popupAnchor:[0,-44]});}' +
    'function addMarker(lat,lon,popup,num,status){const icon=createTeardropIcon(num,status);const m=L.marker([lat,lon],{icon:icon}).addTo(map).bindPopup(popup);allMarkers.push(m);}' +
    'async function loadMarkers(){' + markers + 'if(allMarkers.length){const g=new L.featureGroup(allMarkers);map.fitBounds(g.getBounds().pad(0.1));}}' +
    'function filterDate(d){location.href=\'/map?from=\'+d;}function filterRange(){const f=document.getElementById(\'dateFrom\').value;const t=document.getElementById(\'dateTo\').value;let u=\'/map?from=\'+f;if(t)u+=\'&to=\'+t;location.href=u;}' +
    'loadMarkers();<\/script>';
  return html('地圖', body, 'map');
}
function chatPage(env) {
  const body = '<style>' +
    '.chat-page-input{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:8px!important;padding:10px 12px!important;background:#f0f2f5!important;flex-shrink:0!important;border-top:1px solid #e0e0e0!important;width:100%!important;box-sizing:border-box!important}' +
    '.chat-page-input input{flex:1!important;min-width:0!important;width:auto!important;border:none!important;border-radius:20px!important;padding:10px 16px!important;font-size:14px!important;background:#fff!important;outline:none!important;box-shadow:0 0 0 1px #e0e0e0!important}' +
    '.chat-page-input button{width:42px!important;height:42px!important;min-width:42px!important;border-radius:50%!important;background:#075e54!important;color:#fff!important;border:none!important;cursor:pointer!important;font-size:18px!important;flex-shrink:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;line-height:1!important}' +
    '</style>' +
    '<div class="chat-page">' +
    '<div class="chat-page-header">' +
      '<div class="cp-avatar">🤖</div>' +
      '<div class="cp-info"><div class="cp-name">DUCKDUCK AI 助手</div><div class="cp-status">在線 · 即時回覆</div></div>' +
    '</div>' +
    '<div class="chat-page-body" id="chatMessages">' +
      '<div class="date-divider"><span>今天</span></div>' +
      '<div class="wa-msg in">你好！我係 DUCKDUCK 維修助手 🙋<div class="wa-time">剛剛</div></div>' +
      '<div class="wa-msg in">可以問我：<br>• 今日有咩工單？<br>• 未收款有幾多？<br>• 分析本月營收<div class="wa-time">剛剛</div></div>' +
    '</div>' +
    '<div class="chat-page-input">' +
      '<input id="chatInput" placeholder="輸入訊息..." autofocus>' +
      '<button id="chatSendBtn">▶</button>' +
    '</div>' +
  '</div>' +
  '<script>' +
  'function getTime(){var d=new Date();return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0")}' +
  'async function sendChat(){var i=document.getElementById("chatInput"),t=i.value.trim();if(!t)return;addMsg("out",t);i.value="";var typing=addTyping();try{var r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t})});var d=await r.json();typing.remove();if(d&&d.reply){addMsg("in",d.reply)}else{addMsg("in","Sorry, no response")}}catch(e){typing.remove();addMsg("in","Network error, please retry")}}' +
  'function addMsg(type,text){var m=document.getElementById("chatMessages");var d=document.createElement("div");d.classList.add("wa-msg");d.classList.add(type);var s=document.createElement("span");s.className="wa-time";s.textContent=getTime();d.textContent=text;d.appendChild(s);m.appendChild(d);m.scrollTop=m.scrollHeight}' +
  'function addTyping(){var m=document.getElementById("chatMessages");var d=document.createElement("div");d.classList.add("wa-typing");for(var i=0;i<3;i++){var s=document.createElement("span");d.appendChild(s)}m.appendChild(d);m.scrollTop=m.scrollHeight;return d}' +
  'document.getElementById("chatInput").addEventListener("keypress",function(e){if(e.key==="Enter")sendChat()});document.getElementById("chatSendBtn").addEventListener("click",sendChat)' +
  '<\/script>'
  return html('AI助手', body, 'chat');
}

async function calendarPage(env, url) {
  const now = new Date();
  const year = parseInt(url.searchParams.get('year')) || now.getFullYear();
  const month = parseInt(url.searchParams.get('month')) || (now.getMonth() + 1);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startPad = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const dateFrom = `${year}-${String(month).padStart(2,'0')}-01`;
  const dateTo = `${year}-${String(month).padStart(2,'0')}-${String(daysInMonth).padStart(2,'0')}`;
  const orders = await env.DB.prepare('SELECT project_id, scheduled_date, time_slot, contact_name, contact_phone, address, total_amount, status, payment_status FROM work_orders WHERE scheduled_date BETWEEN ? AND ?').bind(dateFrom, dateTo).all();

  const lookup = {};
  for (const o of orders.results) {
    if (!lookup[o.scheduled_date]) lookup[o.scheduled_date] = [];
    lookup[o.scheduled_date].push(o);
  }

  const today = now.toISOString().split('T')[0];
  const dayHeaders = ['日','一','二','三','四','五','六'].map(d => `<div class="calendar-day-header">${d}</div>`).join('');

  let daysHTML = '';
  for (let i = 0; i < startPad; i++) daysHTML += '<div class="calendar-day other-month"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = ds === today;
    const dayOrders = lookup[ds] || [];
    const dots = dayOrders.map(o => `<span class="dot" title="${o.project_id} ${o.contact_name||''}"></span>`).join('');
    const ordersJSON = JSON.stringify(dayOrders).replace(/&/g,"&amp;").replace(/"/g,"&quot;");
    daysHTML += `<div class="calendar-day${isToday?' today':''}${dayOrders.length?' has-orders':''}" data-date="${ds}" data-orders="${ordersJSON}" onclick="showDayOrders(this)"><div class="day-num">${d}</div><div>${dots}</div>${dayOrders.length ? '<div style="font-size:13px;padding:4px 8px;margin:3px 0;color:#2563eb;background:#eff6ff;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">'+dayOrders.length+'單</div>' : ''}</div>`;
  }

  const prevM = month === 1 ? 12 : month - 1;
  const prevY = month === 1 ? year - 1 : year;
  const nextM = month === 12 ? 1 : month + 1;
  const nextY = month === 12 ? year + 1 : year;

  // Build order data as JS object for client-side lookup
  const allOrdersJSON = JSON.stringify(orders.results).replace(/&/g,'&amp;').replace(/"/g,'&quot;');

  const body = `<div class="page-header"><h1>📆 工單日曆</h1><p>${year}年${month}月 · ${orders.results.length} 張工單</p></div>
<div class="section-block">
  <div class="section-title">📅 ${year}年${month}月</div>
  <div class="card">
    <div class="calendar-nav">
      <button onclick="location.href='?year=${prevY}&month=${prevM}'">◀ 上月</button>
      <h2>${year}年 ${month}月</h2>
      <button onclick="location.href='?year=${nextY}&month=${nextM}'">下月 ▶</button>
    </div>
    <div class="calendar-grid">${dayHeaders}${daysHTML}</div>
  </div>
</div>
<div class="section-block" id="dayDetail" style="display:none">
  <div class="section-title" id="dayDetailTitle">📋 工單詳情</div>
  <div class="card" id="dayDetailContent"></div>
</div>
<script>
function showDayOrders(el){
  var date = el.getAttribute('data-date');
  var ordersStr = el.getAttribute('data-orders');
  var orders = JSON.parse(ordersStr);
  var panel = document.getElementById('dayDetail');
  var title = document.getElementById('dayDetailTitle');
  var content = document.getElementById('dayDetailContent');
  var dow = ['日','一','二','三','四','五','六'];
  var day = new Date(date + 'T00:00:00').getDay();
  title.textContent = '📋 ' + date + ' 週' + dow[day] + ' · ' + orders.length + ' 張工單';
  if (!orders.length) {
    content.innerHTML = '<div class="empty"><div class="icon">🎉</div>當日無工單</div>';
  } else {
    content.innerHTML = orders.map(function(o){
      return '<a href="/orders/'+o.project_id+'" class="day-order-link"><div class="order-row"><div class="or-left"><span class="link">'+o.project_id+'</span><span class="or-time">'+(o.time_slot||'')+'</span></div><div class="or-right"><span class="or-contact">'+(o.contact_name||'-')+' 📞'+(o.contact_phone||'')+'</span><span style="font-weight:600">'+o.total_amount+'</span><span>'+o.status+'</span></div></div></a>';
    }).join('');
  }
  panel.style.display = 'block';
  panel.scrollIntoView({behavior:'smooth'});
}
<\/script>


<style>
.page-header{display:flex!important;justify-content:space-between!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important}
.page-header h1{font-size:24px!important;font-weight:700!important}
.page-header p{color:#64748b!important;font-size:14px!important;margin-top:4px!important;white-space:nowrap!important}
.map-layout{display:flex!important;gap:16px!important;height:calc(100vh - 180px)!important;overflow:hidden!important}
.map-card{flex:1!important;padding:0!important;overflow:hidden!important;min-height:300px!important}
.date-sidebar{width:240px!important;overflow-y:auto!important;padding:0!important;flex-shrink:0!important}
.date-row{padding:12px 14px!important;border-bottom:1px solid #e2e8f0!important;cursor:pointer!important;transition:all .15s!important;border-left:3px solid transparent!important;font-size:14px!important;line-height:1.5!important}.date-row b{font-size:14px!important}.date-row>div{margin-bottom:2px!important}
.date-row:hover{background:#f8fafc!important}
@media(max-width:768px){
.page-header{display:block!important;margin-bottom:16px!important}
.page-header h1{font-size:20px!important;margin-bottom:2px!important}
.page-header p{font-size:13px!important;margin-top:0!important}
.map-layout{flex-direction:column!important;height:auto!important;gap:8px!important}
.map-card{height:50vh!important;min-height:250px!important}
.date-sidebar{width:100%!important;max-height:none!important;flex-shrink:1!important}
}
.chat-page-input{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:8px!important;padding:10px 12px!important;background:#f0f2f5!important;flex-shrink:0!important;border-top:1px solid #e0e0e0!important;width:100%!important;box-sizing:border-box!important}
.chat-page-input input{flex:1!important;min-width:0!important;width:auto!important;border:none!important;border-radius:20px!important;padding:10px 16px!important;font-size:14px!important;background:#fff!important;outline:none!important;box-shadow:0 0 0 1px #e0e0e0!important}
.chat-page-input button{width:42px!important;height:42px!important;border-radius:50%!important;background:#075e54!important;color:#fff!important;border:none!important;cursor:pointer!important;font-size:18px!important;flex-shrink:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;line-height:1!important}
.chat-page-input button:hover{background:#128c7e!important}
.sidebar-nav a{display:flex!important;align-items:center!important;gap:10px!important;padding:10px 18px!important;font-size:14px!important;line-height:1.4!important}
.sidebar-nav .nav-icon{font-size:16px!important;width:20px!important;text-align:center!important;flex-shrink:0!important;line-height:1!important}
@media(max-width:768px){
.sidebar-nav a{padding:4px 6px 2px!important;font-size:10px!important;gap:4px!important}
.sidebar-nav .nav-icon{font-size:14px!important;width:16px!important}
}
.order-group{margin-bottom:16px!important}
.order-group-header{font-size:13px!important;font-weight:600!important;color:#64748b!important;padding:8px 0!important;border-bottom:2px solid #e2e8f0!important;margin-bottom:8px!important}
.order-card{background:#fff!important;border:1px solid #e2e8f0!important;border-radius:8px!important;padding:14px 16px!important;margin-bottom:8px!important;cursor:pointer!important;transition:all .15s!important;display:block!important}
.order-card:hover{background:#f8fafc!important;border-color:#cbd5e1!important;box-shadow:0 1px 3px rgba(0,0,0,.06)!important}
.oc-top{display:flex!important;align-items:center!important;gap:10px!important;margin-bottom:6px!important;flex-wrap:wrap!important}
.oc-id{font-weight:600!important;font-size:14px!important}
.oc-time{font-size:11px!important;color:#64748b!important;background:#f1f5f9!important;padding:2px 8px!important;border-radius:4px!important}
.oc-amount{font-weight:700!important;font-size:15px!important;margin-left:auto!important}
.oc-mid{display:flex!important;align-items:center!important;gap:10px!important;margin-bottom:4px!important;font-size:13px!important}
.oc-contact{font-weight:500!important}
.oc-phone{color:#64748b!important;font-size:12px!important}
.oc-bottom{display:flex!important;align-items:center!important;gap:10px!important;font-size:12px!important;flex-wrap:wrap!important;justify-content:space-between!important}
.oc-addr{color:#64748b!important}
.oc-badges{display:flex!important;gap:4px!important;flex-shrink:0!important}
@media(max-width:768px){
.order-card{padding:10px 12px!important}
.oc-top{gap:6px!important}
.oc-amount{font-size:14px!important}
.oc-bottom{flex-direction:column!important;align-items:flex-start!important;gap:4px!important}
}
.calendar-grid{display:grid!important;grid-template-columns:repeat(7,1fr)!important;gap:4px!important}
.calendar-day-header{text-align:center;font-size:11px;font-weight:600;color:#64748b;padding:8px 0}
.calendar-day{min-height:80px;border:1px solid #cbd5e1;border-radius:8px;padding:6px;font-size:12px;cursor:pointer;transition:all .15s;position:relative;background:#fff}
.calendar-day:hover{background:#f0f7ff}
.calendar-day.today{border-color:#2563eb;background:#eff6ff}
.calendar-day.other-month{opacity:.3}
.calendar-day .day-num{font-weight:600;font-size:13px}
.calendar-day .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#2563eb;margin:2px 1px 0 0;vertical-align:middle}
.calendar-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.calendar-nav button{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:14px}
.calendar-nav h2{font-size:18px}
@media(max-width:768px){
.calendar-day{min-height:38px;padding:1px;border-radius:6px;font-size:9px}
.calendar-day .day-num{font-size:10px}
.calendar-nav h2{font-size:14px}
.calendar-nav button{padding:6px 10px;font-size:13px;min-height:36px}
.calendar-grid{gap:2px}
.calendar-day-header{font-size:9px;padding:4px 0}
}
.day-order-link{text-decoration:none;color:inherit;display:block}
.day-order-link .order-row{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;margin-bottom:8px;border:1px solid #e2e8f0;border-radius:8px;background:#fff;font-size:13px;gap:8px;transition:all .15s}
.day-order-link .order-row:hover{background:#f8fafc;border-color:#cbd5e1;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.day-order-link .order-row:last-child{margin-bottom:0}
.day-order-link .or-left{display:flex;align-items:center;gap:8px;flex-shrink:0}
.day-order-link .or-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}
.day-order-link .or-time{font-size:11px;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:4px}
.day-order-link .or-contact{font-weight:500}
.day-order-link .link{color:#2563eb;text-decoration:none;font-weight:600}
@media(max-width:768px){
.day-order-link .order-row{flex-direction:column;align-items:flex-start;padding:8px 10px;gap:6px}
.day-order-link .or-left,.day-order-link .or-right{width:100%;justify-content:space-between}
}
</style>
`;
  return html('日曆', body, 'calendar');
}

// ─── Mobile API (JSON) ─────────────────────────────────────────────────────
async function mobileAPI(env, url) {
  const sub = url.pathname.replace('/api/mobile', '') || '/';

  if (sub === '/dashboard') {
    const s = await env.DB.prepare('SELECT COUNT(*) as cnt, COALESCE(SUM(total_amount),0) as total FROM work_orders').first();
    const pr = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as p FROM work_orders WHERE payment_status='已付'").first();
    const ur = await env.DB.prepare("SELECT COALESCE(SUM(total_amount),0) as u FROM work_orders WHERE payment_status='未付'").first();
    const recent = await env.DB.prepare('SELECT * FROM work_orders ORDER BY received_at DESC LIMIT 10').all();
    const cats = await env.DB.prepare("SELECT COALESCE(ii.description,'其他') as category, COUNT(DISTINCT wo.id) as cnt, COALESCE(SUM(ii.item_total),0) as total_revenue FROM work_order_items ii JOIN work_orders wo ON ii.work_order_id=wo.id GROUP BY category ORDER BY total_revenue DESC").all();
    return Response.json({ stats: s, paid: pr.p, unpaid: ur.u, recent: recent.results, categories: cats.results });
  }

  if (sub === '/orders') {
    const status = url.searchParams.get('status') || '';
    const search = url.searchParams.get('search') || '';
    let query = 'SELECT * FROM work_orders';
    const conditions = [];
    const params = [];
    if (status) { conditions.push('status=?'); params.push(status); }
    if (search) { conditions.push('(project_id LIKE ? OR contact_name LIKE ? OR address LIKE ?)'); params.push('%'+search+'%', '%'+search+'%', '%'+search+'%'); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY scheduled_date DESC, received_at DESC';
    let stmt = env.DB.prepare(query);
    for (let i = 0; i < params.length; i++) stmt = stmt.bind(params[i]);
    const rows = await stmt.all();
    return Response.json(rows.results);
  }

  if (sub.startsWith('/orders/')) {
    const id = sub.split('/')[2];
    const row = await env.DB.prepare('SELECT * FROM work_orders WHERE project_id=?').bind(id).first();
    if (!row) return Response.json({ error: 'Not found' }, { status: 404 });
    const items = await env.DB.prepare('SELECT * FROM work_order_items WHERE work_order_id=? ORDER BY seq').bind(row.id).all();
    return Response.json({ ...row, items: items.results });
  }

  if (sub === '/schedule') {
    const days = parseInt(url.searchParams.get('days')) || 7;
    const today = new Date().toISOString().split('T')[0];
    const end = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];
    const rows = await env.DB.prepare('SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ? ORDER BY scheduled_date,time_slot').bind(today, end).all();
    return Response.json(rows.results);
  }

  if (sub === '/contacts') {
    const rows = await env.DB.prepare('SELECT c.*, COUNT(wo.id) as order_count, COALESCE(SUM(wo.total_amount),0) as total_spent FROM contacts c LEFT JOIN work_orders wo ON c.phone=wo.contact_phone GROUP BY c.phone ORDER BY c.last_order_at DESC').all();
    return Response.json(rows.results);
  }

  if (sub === '/calendar') {
    const year = parseInt(url.searchParams.get('year')) || new Date().getFullYear();
    const month = parseInt(url.searchParams.get('month')) || (new Date().getMonth() + 1);
    const lastDay = new Date(year, month, 0).getDate();
    const dateFrom = year + '-' + String(month).padStart(2,'0') + '-01';
    const dateTo = year + '-' + String(month).padStart(2,'0') + '-' + String(lastDay).padStart(2,'0');
    const rows = await env.DB.prepare('SELECT * FROM work_orders WHERE scheduled_date BETWEEN ? AND ?').bind(dateFrom, dateTo).all();
    return Response.json({ year, month, orders: rows.results });
  }

  if (sub === '/map') {
    const dateFrom = url.searchParams.get('from') || '';
    const dateTo = url.searchParams.get('to') || '';
    const today = new Date().toISOString().split('T')[0];
    let query = "SELECT project_id, address, contact_name, contact_phone, total_amount, status, scheduled_date, time_slot FROM work_orders WHERE address IS NOT NULL AND address != ''";
    let params = [];
    if (dateFrom && dateTo) { query += ' AND scheduled_date BETWEEN ? AND ?'; params = [dateFrom, dateTo]; }
    else if (dateFrom) { query += ' AND scheduled_date = ?'; params = [dateFrom]; }
    else { query += ' AND scheduled_date >= ?'; params = [today]; }
    query += ' ORDER BY scheduled_date LIMIT 50';
    let stmt = env.DB.prepare(query);
    if (params.length === 1) stmt = stmt.bind(params[0]);
    else if (params.length === 2) stmt = stmt.bind(params[0], params[1]);
    const rows = await stmt.all();
    const coordMap = { '南昌街':[22.328,114.166], '成林':[22.328,114.166], '灝景灣':[22.358,114.105], '青衣':[22.358,114.105], '南山邨':[22.334,114.170], '石硤尾':[22.334,114.170], '南安':[22.334,114.170], 'default':[22.3193,114.1694] };
    const results = rows.results.map(o => {
      let coords = coordMap['default'];
      for (const k of Object.keys(coordMap)) { if ((o.address||'').includes(k)) { coords = coordMap[k]; break; } }
      return { ...o, lat: coords[0], lon: coords[1] };
    });
    return Response.json(results);
  }

  return Response.json({ error: 'Unknown endpoint' }, { status: 404 });
}

// ─── Main Router ───────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname.replace(/\/+$/, '') || '/';
    try {
      if (path === '/api/chat') return chatAPI(request, env);
      if (path.startsWith('/api/mobile')) return mobileAPI(env, url);
      if (path.startsWith('/api/')) return handleAPI(request, env, url);
      if (path === '/') return dashboard(env);
      if (path === '/orders') return ordersPage(env, url);
      if (path.startsWith('/orders/')) return orderDetail(env, path.split('/')[2]);
      if (path === '/parse') return request.method === 'POST' ? parseSubmit(request, env) : parsePage(env);
      if (path === '/analysis') return analysisPage(env);
      if (path === '/schedule') return schedulePage(env, url);
      if (path === '/contacts') return contactsPage(env);
      if (path === '/chat') return chatPage(env);
      if (path === '/map') return mapPage(env, url);
      if (path === '/calendar') return calendarPage(env, url);
      if (path === '/api/chat') return chatAPI(request, env);
      return html('404', '<h1>404</h1><a href="/">回首頁</a>');
    } catch (e) {
      return new Response(e.stack || e.message, { status: 500 });
    }
  }
};
