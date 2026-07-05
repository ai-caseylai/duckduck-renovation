import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BASE_URL } from '../config';

export default function CalendarScreen({ navigation }: any) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => { load(); }, [year, month]);

  const load = async () => {
    try {
      const r = await fetch(BASE_URL + '/api/mobile/calendar?year=' + year + '&month=' + month);
      const d = await r.json();
      setOrders(d.orders || []);
    } catch (e) { console.log(e); }
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const today = now.toISOString().split('T')[0];

  const byDate: Record<string, any[]> = {};
  orders.forEach(o => {
    if (!byDate[o.scheduled_date]) byDate[o.scheduled_date] = [];
    byDate[o.scheduled_date].push(o);
  });

  const days: any[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ day: d, date: ds, orders: byDate[ds] || [], isToday: ds === today });
  }

  const prevM = () => { if (month === 1) { setYear(y => y - 1); setMonth(12); } else setMonth(m => m - 1); };
  const nextM = () => { if (month === 12) { setYear(y => y + 1); setMonth(1); } else setMonth(m => m + 1); };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={prevM}><Text style={styles.navBtn}>◀</Text></TouchableOpacity>
        <Text style={styles.navTitle}>{year}年 {month}月</Text>
        <TouchableOpacity onPress={nextM}><Text style={styles.navBtn}>▶</Text></TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {['日', '一', '二', '三', '四', '五', '六'].map(d => <Text key={d} style={styles.weekDay}>{d}</Text>)}
      </View>

      <View style={styles.grid}>
        {days.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.day, d?.isToday && styles.today]}
            onPress={() => {
              if (d?.orders?.length) {
                const names = d.orders.map((o: any) => `${o.project_id} ${o.contact_name || ''}`).join('\n');
                alert(d.date + '\n' + (names || '無工單'));
              }
            }}
          >
            {d ? (
              <>
                <Text style={[styles.dayNum, d.isToday && styles.todayText]}>{d.day}</Text>
                {d.orders.length > 0 && <View style={styles.dot} />}
                {d.orders.length > 0 && <Text style={styles.dayCount}>{d.orders.length}單</Text>}
              </>
            ) : <Text />}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 12 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  navBtn: { fontSize: 18, padding: 8 },
  navTitle: { fontSize: 18, fontWeight: '700' },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekDay: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: '#94a3b8' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  day: { width: '14.28%', aspectRatio: 1, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 4, alignItems: 'center', justifyContent: 'center' },
  today: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  dayNum: { fontSize: 13, fontWeight: '600' },
  todayText: { color: '#2563eb' },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#2563eb', marginTop: 2 },
  dayCount: { fontSize: 9, color: '#2563eb', marginTop: 1 },
});
