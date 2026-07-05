import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { BASE_URL } from '../config';

export default function AnalysisScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(BASE_URL + '/api/mobile/analysis');
      setData(await r.json());
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const fmt = (n: number) => n != null ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '-';
  const s = data?.stats || { cnt: 0, total: 0 };
  const cats = data?.categories || [];
  const contacts = data?.contacts || [];
  const rate = s.total > 0 ? Math.round((data?.paid || 0) / s.total * 100) : 0;

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}>
      <View style={styles.statGrid}>
        <View style={styles.statCard}><Text style={styles.statVal}>{s.cnt}</Text><Text style={styles.statLbl}>總工單</Text></View>
        <View style={styles.statCard}><Text style={styles.statVal}>{fmt(s.total)}</Text><Text style={styles.statLbl}>總營收</Text></View>
        <View style={styles.statCard}><Text style={styles.statVal}>{fmt(data?.unpaid || 0)}</Text><Text style={styles.statLbl}>未收款</Text></View>
        <View style={styles.statCard}><Text style={styles.statVal}>{rate}%</Text><Text style={styles.statLbl}>收款率</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🔧 類別明細</Text>
        {cats.map((c: any, i: number) => (
          <View key={i} style={styles.row}>
            <Text style={{ flex: 1 }}>{c.category}</Text>
            <Text style={{ width: 40, textAlign: 'center', color: '#64748b' }}>{c.cnt}次</Text>
            <Text style={{ fontWeight: '600', width: 80, textAlign: 'right' }}>{fmt(c.total_revenue)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>👥 客戶貢獻</Text>
        {contacts.map((c: any, i: number) => (
          <View key={i} style={styles.row}>
            <Text style={{ flex: 1 }}>{c.name || '未知'}</Text>
            <Text style={{ width: 40, textAlign: 'center', color: '#64748b' }}>{c.order_count}單</Text>
            <Text style={{ fontWeight: '600', width: 80, textAlign: 'right' }}>{fmt(c.total_spent)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 12 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  statCard: { width: '47%', backgroundColor: '#fff', padding: 14, borderRadius: 12, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '700' },
  statLbl: { fontSize: 12, color: '#64748b', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10 },
  title: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
});
