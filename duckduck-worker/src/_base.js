
// DUCKDUCK 裝修 — Cloudflare Worker + D1

function html(title, body, active) {
  return new Response(layout(title, body, active || 'dashboard'), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function fmt(n) { return n != null ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-'; }

function badge(status) {
  const m = { '待處理': 'badge-pending', '已確認': 'badge-confirm', '已完成': 'badge-done', '已取消': 'badge-cancel', '已付': 'badge-paid', '未付': 'badge-unpaid' };
  return '<span class="badge ' + (m[status]||'badge-pending') + '">' + status + '</span>';
}


async function handleAPI(req, env, url) {
  const path = url.pathname;
  if (path.endsWith('/status') && req.method === 'POST') {
    const id = path.split('/')[3];
    const body = await req.json();
    if (body.status) await env.DB.prepare('UPDATE work_orders SET status=? WHERE project_id=?').bind(body.status, id).run();
    if (body.payment) await env.DB.prepare('UPDATE work_orders SET payment_status=? WHERE project_id=?').bind(body.payment, id).run();
    return Response.json({ok:true});
  }
  if (path.endsWith('/delete') && req.method === 'POST') {
    const id = path.split('/')[3];
    await env.DB.prepare('DELETE FROM work_orders WHERE project_id=?').bind(id).run();
    return Response.redirect('/orders', 302);
  }
  return Response.json({error:'Not found'}, {status:404});
}


function extractBlock(text, startPat, endPat) {
  const s = text.search(startPat);
  if (s === -1) return '';
  const startIdx = s + text.match(startPat)[0].length;
  let endIdx = text.length;
  if (endPat) {
    const sub = text.substring(startIdx);
    const e = sub.search(endPat);
    if (e !== -1) endIdx = startIdx + e;
  }
  return text.substring(startIdx, endIdx).trim();
}

function extractPrice(item, text) {
  let m = text.match(/\$([\d,]+)\s*\/\s*(\d+)/);
  if (m) { const t=parseFloat(m[1].replace(/,/g,'')); item.quantity=parseInt(m[2]); item.unit_price=Math.round(t/item.quantity*100)/100; item.item_total=t; return; }
  m = text.match(/共\s*\$([\d,]+)/);
  if (m) { item.item_total=parseFloat(m[1].replace(/,/g,'')); return; }
  m = text.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/);
  if (m) item.item_total=parseFloat(m[1].replace(/,/g,''));
}

function parseItems(block) {
  const items = [];
  const lines = block.trim().split('\n');
  let current = null, seq = 0;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^(\d+)[.、．，]\s*(.*)/);
    if (m) {
      if (current) items.push(current);
      seq = parseInt(m[1]);
      current = {seq, description:m[2].trim(), quantity:1, unit_price:null, item_total:null};
      extractPrice(current, m[2]);
    } else if (current) {
      if (/^\$[\d,]+/.test(t)) extractPrice(current, t);
      else current.description += ' ' + t;
    }
  }
  if (current) items.push(current);
  if (items.length === 0) items.push({seq:1, description: block.trim().replace(/\n/g,' '), quantity:1, unit_price:null, item_total:null});
  for (const item of items) {
    if (item.item_total !== null) continue;
    const d = item.description;
    let m = d.match(/共\s*\$([\d,]+)/);
    if (m) { item.item_total=parseFloat(m[1].replace(/,/g,'')); continue; }
    m = d.match(/\$([\d,]+)\s*\/\s*(\d+)/);
    if (m) { const t=parseFloat(m[1].replace(/,/g,'')); item.quantity=parseInt(m[2]); item.unit_price=Math.round(t/item.quantity*100)/100; item.item_total=t; continue; }
    m = d.match(/(?:^|[^\/\d])\$([\d,]+)(?:\s|$|，|。|（|\()/);
    if (m) item.item_total=parseFloat(m[1].replace(/,/g,''));
  }
  return items;
}

function parseWorkOrder(text) {
  const r = {project_id:'',raw_text:text.trim(),scheduled_date:null,time_slot:null,address:'',contact_name:'',contact_phone:'',total_amount:null,payment_method:'',payment_status:'未付',status:'待處理',notes:'',item_list:[]};
  const pm = text.match(/項目編號[：:]\s*([A-Z]?\d+)/);
  if (pm) r.project_id = pm[1].trim();
  const tb = extractBlock(text, /時間[：:]/, /地址[：:]/);
  if (tb) {
    const dm = tb.match(/\((\d+)\/(\d+)\)/);
    if (dm) { const y=new Date().getFullYear(); r.scheduled_date=y+'-'+dm[2].padStart(2,'0')+'-'+dm[1].padStart(2,'0'); }
    else r.scheduled_date = new Date().toISOString().split('T')[0];
    const tm = tb.match(/(\d{1,2}:\d{2})\s*[-~至到]\s*(\d{1,2}:\d{2})/);
    if (tm) r.time_slot = tm[1]+'-'+tm[2];
    else { const s=tb.match(/(\d{1,2}:\d{2})/); if(s) r.time_slot=s[1]; }
  }
  const addr = extractBlock(text, /地址[：:]/, /聯絡[：:]/);
  if (addr) r.address = addr.replace(/\n/g,'').trim();
  const cb = extractBlock(text, /聯絡[：:]/, /維修項目[：:]/);
  if (cb) {
    const ph = cb.match(/(\d{4}\s*\d{4})/);
    if (ph) { r.contact_phone=ph[1].replace(/\s/g,''); r.contact_name=cb.substring(0,ph.index).trim(); }
  }
  const ib = extractBlock(text, /維修項目[：:]/, /備註[：:]/);
  if (ib) r.item_list = parseItems(ib);
  const nb = extractBlock(text, /備註[：:]/, /費用[：:]/);
  if (nb) r.notes = nb.trim();
  const fb = extractBlock(text, /費用[：:]/, /付款方式[：:]/);
  if (fb) {
    if (fb.includes('未付')) r.payment_status='未付';
    if (fb.includes('已付')) r.payment_status='已付';
    const am = fb.match(/\$([\d,]+\.?\d*)/);
    if (am) r.total_amount=parseFloat(am[1].replace(/,/g,''));
  }
  const pb = extractBlock(text, /付款方式[：:]/, null);
  if (pb) { const ls=pb.trim().split('\n').filter(l=>l.trim()); r.payment_method=ls.slice(0,2).join(' / '); }
  if (r.total_amount===null && r.item_list.length>0) r.total_amount=r.item_list.reduce((s,i)=>s+(i.item_total||0),0);
  return r;
}

function parseMultiOrders(text) {
  return text.split(/DUCKDUCK維修工程/).map(p=>p.trim()).filter(Boolean).map(p=>parseWorkOrder('DUCKDUCK維修工程\n'+p)).filter(o=>o.project_id);
}


async function insertWO(env, data) {
  const ex = await env.DB.prepare('SELECT id FROM work_orders WHERE project_id=?').bind(data.project_id).first();
  let woId;
  if (ex) {
    woId = ex.id;
    await env.DB.prepare('UPDATE work_orders SET raw_text=?,scheduled_date=?,time_slot=?,address=?,contact_name=?,contact_phone=?,total_amount=?,payment_method=?,payment_status=?,status=?,notes=? WHERE project_id=?').bind(data.raw_text,data.scheduled_date,data.time_slot,data.address,data.contact_name,data.contact_phone,data.total_amount,data.payment_method,data.payment_status,data.status,data.notes,data.project_id).run();
    await env.DB.prepare('DELETE FROM work_order_items WHERE work_order_id=?').bind(woId).run();
  } else {
    const r = await env.DB.prepare('INSERT INTO work_orders(project_id,raw_text,scheduled_date,time_slot,address,contact_name,contact_phone,total_amount,payment_method,payment_status,status,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(data.project_id,data.raw_text,data.scheduled_date,data.time_slot,data.address,data.contact_name,data.contact_phone,data.total_amount,data.payment_method,data.payment_status,data.status,data.notes).run();
    woId = r.meta.last_row_id;
  }
  for (const item of (data.item_list||[])) {
    await env.DB.prepare('INSERT INTO work_order_items(work_order_id,seq,description,quantity,unit_price,item_total) VALUES(?,?,?,?,?,?)').bind(woId,item.seq,item.description,item.quantity||1,item.unit_price,item.item_total).run();
  }
  if (data.contact_phone) {
    await env.DB.prepare("INSERT INTO contacts(name,phone,address,last_order_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(phone) DO UPDATE SET name=excluded.name,address=excluded.address,last_order_at=datetime('now')").bind(data.contact_name,data.contact_phone,data.address).run();
  }
  return woId;
}
