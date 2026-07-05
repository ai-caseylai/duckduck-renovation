import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../config';

export default function DashboardScreen({ navigation }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(BASE_URL + '/api/mobile/dashboard');
      const d = await r.json();
      setData(d);
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const fmt = (n: number) => n != null ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-';
  const stats = data?.stats || { cnt: 0, total: 0 };
  const todayOrders = data?.todayOrders || [];
  const recent = data?.recent || [];

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}>
      <View style={styles.statGrid}>
        <StatCard icon="document-text" label="總工單" value={stats.cnt} color="#dbeafe" iconColor="#2563eb" />
        <StatCard icon="cash" label="總營收" value={fmt(stats.total)} color="#dcfce7" iconColor="#16a34a" />
        <StatCard icon="warning" label="未收款" value={fmt(data?.unpaid || 0)} color="#fef3c7" iconColor="#d97706" />
        <StatCard icon="today" label="今日" value={todayOrders.length} color="#fee2e2" iconColor="#dc2626" />
      </View>

      <Section title="📅 今日排程" onMore={() => navigation.navigate('Orders')}>
        {todayOrders.length ? todayOrders.map((o: any, i: number) => (
          <OrderRow key={i} order={o} onPress={() => navigation.navigate('Orders', { screen: 'OrderDetail', params: { projectId: o.project_id } })} />
        )) : <Text style={styles.empty}>🎉 今日無排程</Text>}
      </Section>

      <Section title="🕐 最近工單" onMore={() => navigation.navigate('Orders')}>
        {recent.map((o: any, i: number) => (
          <OrderRow key={i} order={o} showStatus onPress={() => navigation.navigate('Orders', { screen: 'OrderDetail', params: { projectId: o.project_id } })} />
        ))}
      </Section>
    </ScrollView>
  );
}

function StatCard({ icon, label, value, color, iconColor }: any) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children, onMore }: any) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onMore && <TouchableOpacity onPress={onMore}><Text style={styles.more}>全部 →</Text></TouchableOpacity>}
      </View>
      {children}
    </View>
  );
}

function OrderRow({ order, showStatus, onPress }: any) {
  return (
    <TouchableOpacity style={styles.orderRow} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderId}>{order.project_id}</Text>
        <Text style={styles.orderSub}>{order.contact_name || '-'} · {order.time_slot || ''}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.orderAmount}>{order.total_amount ? '$' + order.total_amount.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-'}</Text>
        {showStatus && <StatusBadge status={order.status} />}
      </View>
    </TouchableOpacity>
  );
}

function StatusBadge({ status }: any) {
  const colors: any = { '待處理': '#92400e', '已確認': '#1e40af', '已完成': '#166534', '已取消': '#991b1b' };
  const bgs: any = { '待處理': '#fef3c7', '已確認': '#dbeafe', '已完成': '#dcfce7', '已取消': '#fee2e2' };
  return (
    <View style={[styles.badge, { backgroundColor: bgs[status] || '#f1f5f9' }]}>
      <Text style={[styles.badgeText, { color: colors[status] || '#64748b' }]}>{status}</Text>
    </View>
  );
}

export { StatusBadge };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 12, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
  section: { backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 12, borderRadius: 12, padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  more: { color: '#2563eb', fontSize: 13, fontWeight: '500' },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  orderId: { fontWeight: '600', fontSize: 14, color: '#2563eb' },
  orderSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  orderAmount: { fontWeight: '700', fontSize: 14 },
  empty: { color: '#94a3b8', textAlign: 'center', padding: 20 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginTop: 2 },
  badgeText: { fontSize: 10, fontWeight: '600' },
});
