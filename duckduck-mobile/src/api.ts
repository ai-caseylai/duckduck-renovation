// API layer for Cloudflare Worker backend
const BASE = 'https://duckduck-reno.ai-caseylai.workers.dev';

export interface WorkOrder {
  id: number; project_id: string; raw_text: string; received_at: string;
  scheduled_date: string | null; time_slot: string | null; address: string;
  contact_name: string; contact_phone: string; total_amount: number | null;
  payment_method: string; payment_status: string; status: string; notes: string;
  item_list?: WorkOrderItem[];
}

export interface WorkOrderItem {
  id: number; work_order_id: number; seq: number; description: string;
  quantity: number; unit_price: number | null; item_total: number | null;
}

export interface Stats {
  cnt: number; total: number;
}

export interface RevenueSummary {
  total_orders: number; total_revenue: number;
  paid_amount: number; unpaid_amount: number;
  by_month: { month: string; cnt: number; total: number }[];
}

export interface CategorySummary {
  category: string; cnt: number; total_revenue: number;
}

export interface ContactSummary {
  name: string; phone: string; order_count: number; total_spent: number;
  address?: string; last_order_at?: string;
}

async function fetchJSON<T>(path: string): Promise<T> {
  const r = await fetch(BASE + path);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

export async function fetchDashboard(): Promise<{
  stats: Stats;
  todayOrders: WorkOrder[];
  weekOrders: WorkOrder[];
  recent: WorkOrder[];
  categories: CategorySummary[];
}> {
  const res = await fetch(BASE + '/');
  const html = await res.text();
  
  // Parse SSR HTML for data (since Worker serves HTML, not JSON)
  // We'll use the /api endpoints instead
  // For now, return empty data and let screens call individual endpoints
  return { stats: { cnt: 0, total: 0 }, todayOrders: [], weekOrders: [], recent: [], categories: [] };
}

export async function fetchOrders(params?: { status?: string; search?: string }): Promise<WorkOrder[]> {
  let url = BASE + '/orders';
  const sp = new URLSearchParams();
  if (params?.status) sp.set('status', params.status);
  if (params?.search) sp.set('search', params.search);
  const qs = sp.toString();
  if (qs) url += '?' + qs;
  
  const html = await (await fetch(url)).text();
  // Parse HTML to extract order data - for mobile, we'll add API endpoints
  return [];
}

export async function fetchOrderDetail(projectId: string): Promise<WorkOrder | null> {
  const html = await (await fetch(BASE + '/orders/' + projectId)).text();
  return null;
}

export async function updateOrderStatus(projectId: string, status?: string, payment?: string): Promise<void> {
  await fetch(BASE + '/api/orders/' + projectId + '/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, payment }),
  });
}

export async function deleteOrder(projectId: string): Promise<void> {
  await fetch(BASE + '/api/orders/' + projectId + '/delete', { method: 'POST' });
}

export async function parseOrders(text: string): Promise<WorkOrder[]> {
  const form = new FormData();
  form.append('text', text);
  const html = await (await fetch(BASE + '/parse', { method: 'POST', body: form })).text();
  return [];
}

export async function chatWithAI(message: string): Promise<string> {
  const r = await fetch(BASE + '/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const d = await r.json();
  return d.reply || '抱歉，無法回應';
}
