import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import OrderCard from './src/components/OrderCard';
import {Order, areas, fetchOrders} from './src/data/mock';

export default function App() {
  const [selected, setSelected] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const areaMap = useMemo(() => Object.fromEntries(areas.map(a => [a.id, a])), []);

  const load = useCallback(async () => {
    setLoading(true);
    setOrders(await fetchOrders(selected));
    setLoading(false);
  }, [selected]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (id: number) =>
    setSelected(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={s.title}>Gom Đơn</Text>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={areas}
            keyExtractor={a => String(a.id)}
            contentContainerStyle={s.chips}
            ListHeaderComponent={
              <Chip label="Tất cả" active={!selected.length} onPress={() => setSelected([])} />
            }
            renderItem={({item}) => (
              <Chip label={item.name} active={selected.includes(item.id)} onPress={() => toggle(item.id)} />
            )}
          />
        </View>

        <FlatList
          data={orders}
          keyExtractor={o => String(o.id)}
          renderItem={({item}) => <OrderCard order={item} areaMap={areaMap} />}
          refreshing={loading}
          onRefresh={load}
          ListEmptyComponent={loading ? undefined : <Text style={s.empty}>Chưa có đơn nào</Text>}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Chip = ({label, active, onPress}: {label: string; active: boolean; onPress: () => void}) => (
  <Pressable onPress={onPress} style={[s.chip, active && s.chipActive]}>
    <Text style={[s.chipText, active && s.chipTextActive]}>{label}</Text>
  </Pressable>
);

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f5f7'},
  title: {fontSize: 22, fontWeight: '800', paddingHorizontal: 16, paddingTop: 8},
  chips: {paddingHorizontal: 12, paddingVertical: 10, gap: 8},
  chip: {paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, backgroundColor: '#e3e6ea', marginRight: 8},
  chipActive: {backgroundColor: '#1976d2'},
  chipText: {color: '#333'},
  chipTextActive: {color: '#fff', fontWeight: '600'},
  empty: {textAlign: 'center', marginTop: 40, color: '#888'},
});
