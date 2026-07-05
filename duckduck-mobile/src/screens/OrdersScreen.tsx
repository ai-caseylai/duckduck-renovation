import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { BASE_URL } from '../config';

export default function OrdersScreen({ navigation }: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      if (search) params.set('search', search);
      const qs = params.toString();
      const r = await fetch(BASE_URL + '/api/mobile/orders' + (qs ? '?' + qs : ''));
      setOrders(await r.json());
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [status]);

  const statuses = ['', '待處理', '已確認', '已完成', '已取消'];
  const total = orders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TextInput style={styles.search} placeholder="搜尋編號/客戶/地址..." value={search} onChangeText={setSearch} onSubmitEditing={load} />
        <View style={styles.filterRow}>
          {statuses.map(s => (
            <TouchableOpacity key={s} style={[styles.filterBtn, status === s && styles.filterActive]} onPress={() => setStatus(s)}>
              <Text style={[styles.filterText, status === s && styles.filterTextActive]}>{s || '全部'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={styles.summary}>共 {orders.length} 單 · 總 ${total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>

      <FlatList
        data={orders}
        keyExtractor={(item: any) => item.project_id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }: any) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderDetail', { projectId: item.project_id })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pid}>{item.project_id}</Text>
              <Text style={styles.sub}>{item.contact_name || '-'} · {item.scheduled_date || ''} {item.time_slot || ''}</Text>
              <Text style={styles.addr} numberOfLines={1}>{item.address || ''}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amount}>{item.total_amount ? '$' + item.total_amount.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-'}</Text>
              <Badge label={item.payment_status} />
              <Badge label={item.status} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function Badge({ label }: any) {
  const colors: any = { '待處理': '#92400e', '已確認': '#1e40af', '已完成': '#166534', '已取消': '#991b1b', '已付': '#166534', '未付': '#991b1b' };
  const bgs: any = { '待處理': '#fef3c7', '已確認': '#dbeafe', '已完成': '#dcfce7', '已取消': '#fee2e2', '已付': '#dcfce7', '未付': '#fee2e2' };
  return (
    <View style={[styles.badge, { backgroundColor: bgs[label] || '#f1f5f9' }]}>
      <Text style={[styles.badgeText, { color: colors[label] || '#64748b' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  toolbar: { padding: 12, backgroundColor: '#fff' },
  search: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 10, fontSize: 14, backgroundColor: '#f8fafc' },
  filterRow: { flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f1f5f9' },
  filterActive: { backgroundColor: '#2563eb' },
  filterText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  summary: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 13, color: '#64748b' },
  card: { backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 8, padding: 14, borderRadius: 12, flexDirection: 'row' },
  pid: { fontWeight: '700', fontSize: 14, color: '#2563eb' },
  sub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  addr: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  amount: { fontWeight: '700', fontSize: 15 },
  badge: { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8, marginTop: 2 },
  badgeText: { fontSize: 10, fontWeight: '600' },
});
