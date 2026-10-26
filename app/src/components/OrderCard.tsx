import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {Area, Order} from '../data/mock';

const money = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const timeAgo = (iso: string) => {
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  return m < 60 ? `${m} phút trước` : `${Math.floor(m / 60)} giờ trước`;
};

export default function OrderCard({order, areaMap}: {order: Order; areaMap: Record<number, Area>}) {
  const from = areaMap[order.pickup_area_id]?.name;
  const to = areaMap[order.dropoff_area_id]?.name;

  return (
    <View style={s.card}>
      <View style={s.row}>
        <Text style={s.fee}>{order.ship_fee ? money(order.ship_fee) : 'Thương lượng'}</Text>
        {order.is_urgent && <Text style={[s.tag, s.urgent]}>GẤP</Text>}
        {order.need_advance && <Text style={[s.tag, s.advance]}>ỨNG</Text>}
        <Text style={s.time}>{timeAgo(order.created_at)}</Text>
      </View>

      <Text style={s.addr}>📦 {order.pickup_address} <Text style={s.area}>({from})</Text></Text>
      <Text style={s.addr}>📍 {order.dropoff_address} <Text style={s.area}>({to})</Text></Text>

      {order.cod_amount > 0 && <Text style={s.meta}>COD: {money(order.cod_amount)}</Text>}
      {!!order.note && <Text style={s.meta}>{order.note}</Text>}

      <View style={[s.row, s.footer]}>
        <Text style={s.source}>{order.source_name}</Text>
        <Pressable style={s.call} onPress={() => Linking.openURL(`tel:${order.contact_phone}`)}>
          <Text style={s.callText}>Gọi {order.contact_phone}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {backgroundColor: '#fff', borderRadius: 12, padding: 14, marginHorizontal: 12, marginVertical: 6, elevation: 2},
  row: {flexDirection: 'row', alignItems: 'center', gap: 6},
  fee: {fontSize: 18, fontWeight: '700', color: '#0a7d36'},
  tag: {fontSize: 11, fontWeight: '700', color: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden'},
  urgent: {backgroundColor: '#e53935'},
  advance: {backgroundColor: '#fb8c00'},
  time: {marginLeft: 'auto', fontSize: 12, color: '#888'},
  addr: {marginTop: 6, fontSize: 15, color: '#222'},
  area: {color: '#666'},
  meta: {marginTop: 4, fontSize: 13, color: '#555'},
  footer: {marginTop: 10, justifyContent: 'space-between'},
  source: {fontSize: 12, color: '#888'},
  call: {backgroundColor: '#1976d2', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6},
  callText: {color: '#fff', fontWeight: '600'},
});

