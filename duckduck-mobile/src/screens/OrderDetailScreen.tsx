import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BASE_URL } from '../config';

export default function OrderDetailScreen({ route, navigation }: any) {
  const { projectId } = route.params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [projectId]);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(BASE_URL + '/api/mobile/orders/' + projectId);
      setOrder(await r.json());
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  const updateStatus = async (status: string, payment?: string) => {
    const body: any = { status };
    if (payment) body.payment = payment;
    await fetch(BASE_URL + '/api/orders/' + projectId + '/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    load();
  };

  const deleteOrder = () => {
    Alert.alert('確定刪除？', projectId, [
      { text: '取消' },
      { text: '刪除', style: 'destructive', onPress: async () => {
        await fetch(BASE_URL + '/api/orders/' + projectId + '/delete', { method: 'POST' });
        navigation.goBack();
      }},
    ]);
  };

  if (!order) return <View style={styles.container}><Text>載入中...</Text></View>;

  const fmt = (n: number) => n != null ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>日期</Text>
          <Text style={styles.value}>{order.scheduled_date || '-'} {order.time_slot || ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>地址</Text>
          <Text style={styles.value}>{order.address || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>聯絡</Text>
          <Text style={styles.value}>{order.contact_name || '-'} 📞 {order.contact_phone || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>費用</Text>
          <Text style={styles.amount}>{fmt(order.total_amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>付款</Text>
          <Text style={styles.value}>{order.payment_method || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>狀態</Text>
          <Badge label={order.status} /> <Badge label={order.payment_status} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔧 維修項目</Text>
        {(order.item_list || []).map((item: any) => (
          <View key={item.seq} style={styles.itemRow}>
            <Text style={styles.itemSeq}>{item.seq}.</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>{fmt(item.item_total)}</Text>
          </View>
        ))}
      </View>

      {order.notes ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 備註</Text>
          <Text style={{ color: '#64748b', lineHeight: 20 }}>{order.notes}</Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => updateStatus('已完成', '已付')}>
          <Text style={styles.btnText}>✅ 完成+已付</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => updateStatus('已完成')}>
          <Text style={styles.btnOutlineText}>✅ 完成</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDanger} onPress={() => updateStatus('已取消')}>
          <Text style={styles.btnDangerText}>❌ 取消</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={deleteOrder}>
          <Text style={styles.btnDeleteText}>🗑️ 刪除</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, alignItems: 'center' },
  label: { fontSize: 13, color: '#64748b', width: 50 },
  value: { fontSize: 13, fontWeight: '500', flex: 1 },
  amount: { fontSize: 20, fontWeight: '700', color: '#2563eb' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  itemRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  itemSeq: { width: 25, fontSize: 13, color: '#64748b' },
  itemDesc: { flex: 1, fontSize: 13 },
  itemPrice: { fontWeight: '600', fontSize: 13 },
  actions: { gap: 8, marginTop: 4, marginBottom: 30 },
  btnPrimary: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  btnOutline: { backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  btnOutlineText: { fontWeight: '600', fontSize: 15 },
  btnDanger: { backgroundColor: '#fff', padding: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#fecaca' },
  btnDangerText: { color: '#dc2626', fontWeight: '600', fontSize: 15 },
  btnDelete: { padding: 14, alignItems: 'center' },
  btnDeleteText: { color: '#94a3b8' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginLeft: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});
