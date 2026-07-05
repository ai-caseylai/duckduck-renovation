import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { BASE_URL } from '../config';

export default function ParseScreen({ navigation }: any) {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const parseText = async () => {
    if (!text.trim()) { Alert.alert('請輸入工單文字'); return; }
    setLoading(true);
    try {
      const form = new FormData();
      form.append('text', text);
      const r = await fetch(BASE_URL + '/parse', { method: 'POST', body: form });
      const html = await r.text();
      // Parse result cards from HTML
      const matches = html.match(/C\d{11}|A\d{11}/g);
      if (matches) {
        setResults(matches.map(id => ({ project_id: id })));
        Alert.alert('成功', `匯入 ${matches.length} 張工單`);
        setText('');
      } else {
        Alert.alert('無法解析', '請確認格式是否正確');
      }
    } catch (e: any) {
      Alert.alert('錯誤', e.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.help}>貼上 Michael Chan 的 WhatsApp 工單訊息</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="DUCKDUCK維修工程&#10;項目編號:C20260706001&#10;..."
        value={text}
        onChangeText={setText}
        textAlignVertical="top"
      />
      <TouchableOpacity style={[styles.btn, loading && { opacity: 0.5 }]} onPress={parseText} disabled={loading}>
        <Text style={styles.btnText}>{loading ? '解析中...' : '🔍 解析並匯入'}</Text>
      </TouchableOpacity>

      {results.map((r, i) => (
        <TouchableOpacity key={i} style={styles.resultCard} onPress={() => navigation.navigate('Orders', { screen: 'OrderDetail', params: { projectId: r.project_id } })}>
          <Text style={styles.resultTitle}>✅ {r.project_id}</Text>
          <Text style={styles.resultLink}>點擊查看詳情 →</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 12 },
  help: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 13, minHeight: 250, fontFamily: 'monospace', borderWidth: 1, borderColor: '#e2e8f0' },
  btn: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  resultCard: { backgroundColor: '#f0fdf4', borderRadius: 12, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#bbf7d0' },
  resultTitle: { fontWeight: '600', color: '#166534', fontSize: 15 },
  resultLink: { color: '#2563eb', fontSize: 12, marginTop: 4 },
});
