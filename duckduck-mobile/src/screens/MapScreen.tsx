import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { BASE_URL } from '../config';

export default function MapScreen() {
  const [markers, setMarkers] = useState<any[]>([]);
  const [region, setRegion] = useState({
    latitude: 22.3193, longitude: 114.1694, latitudeDelta: 0.1, longitudeDelta: 0.1,
  });

  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async (from?: string, to?: string) => {
    try {
      let url = BASE_URL + '/api/mobile/map';
      if (from) url += '?from=' + from + (to ? '&to=' + to : '');
      const r = await fetch(url);
      const data = await r.json();
      setMarkers(data);
      if (data.length > 0) {
        const lats = data.map((m: any) => m.lat);
        const lons = data.map((m: any) => m.lon);
        setRegion({
          latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
          longitude: (Math.min(...lons) + Math.max(...lons)) / 2,
          latitudeDelta: (Math.max(...lats) - Math.min(...lats)) * 1.5 || 0.05,
          longitudeDelta: (Math.max(...lons) - Math.min(...lons)) * 1.5 || 0.05,
        });
      }
    } catch (e) { console.log(e); }
  };

  const handleDatePress = (date: string) => loadMarkers(date);

  // Group by date
  const byDate: Record<string, any[]> = {};
  markers.forEach(m => {
    const d = m.scheduled_date || 'unknown';
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(m);
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {markers.map((m, i) => (
          <Marker key={i} coordinate={{ latitude: m.lat, longitude: m.lon }} pinColor="#e74c3c">
            <Callout>
              <View style={{ padding: 4, maxWidth: 200 }}>
                <Text style={{ fontWeight: '700', fontSize: 13 }}>{m.project_id}</Text>
                <Text style={{ fontSize: 12 }}>{m.contact_name} 📞{m.contact_phone}</Text>
                <Text style={{ fontSize: 11, color: '#64748b' }}>{m.address}</Text>
                <Text style={{ fontWeight: '600' }}>${(m.total_amount || 0).toLocaleString()}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.datePanel}>
        <ScrollView>
          {Object.keys(byDate).sort().map(date => (
            <TouchableOpacity key={date} style={styles.dateRow} onPress={() => handleDatePress(date)}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.dateCount}>{byDate[date].length} 單</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  datePanel: { position: 'absolute', top: 8, right: 8, width: 140, maxHeight: 300, backgroundColor: '#fff', borderRadius: 10, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  dateRow: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  dateText: { fontSize: 12, fontWeight: '600' },
  dateCount: { fontSize: 10, color: '#64748b' },
});
