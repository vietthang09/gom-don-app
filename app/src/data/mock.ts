export type Area = {id: number; name: string; slug: string; aliases: string[]; sort_order: number};

export type Order = {
  id: number;
  source_name: string;
  post_url?: string;
  raw_text: string;
  posted_at: string;
  pickup_address: string;
  pickup_area_id: number;
  dropoff_address: string;
  dropoff_area_id: number;
  ship_fee: number | null; // null = thương lượng
  cod_amount: number;
  need_advance: boolean;
  is_urgent: boolean;
  note?: string;
  contact_phone: string;
  status: 'open' | 'expired' | 'hidden';
  created_at: string;
  expires_at: string;
};

export const areas: Area[] = [
  {id: 1, name: 'Hải Châu', slug: 'hai-chau', aliases: ['hc', 'hai chau', 'chợ cồn', 'chợ hàn'], sort_order: 1},
  {id: 2, name: 'Thanh Khê', slug: 'thanh-khe', aliases: ['tk', 'thanh khe'], sort_order: 2},
  {id: 3, name: 'Sơn Trà', slug: 'son-tra', aliases: ['st', 'son tra'], sort_order: 3},
  {id: 4, name: 'Ngũ Hành Sơn', slug: 'ngu-hanh-son', aliases: ['nhs', 'ngu hanh son'], sort_order: 4},
  {id: 5, name: 'Liên Chiểu', slug: 'lien-chieu', aliases: ['lc', 'lien chieu'], sort_order: 5},
  {id: 6, name: 'Cẩm Lệ', slug: 'cam-le', aliases: ['cl', 'cam le'], sort_order: 6},
  {id: 7, name: 'Hòa Vang', slug: 'hoa-vang', aliases: ['hv', 'hoa vang'], sort_order: 7},
];

const ago = (min: number) => new Date(Date.now() - min * 60000).toISOString();
const inH = (min: number) => new Date(Date.now() + min * 60000).toISOString();

type Seed = Pick<
  Order,
  'pickup_address' | 'pickup_area_id' | 'dropoff_address' | 'dropoff_area_id' | 'ship_fee' | 'cod_amount' | 'need_advance' | 'is_urgent' | 'note' | 'contact_phone' | 'source_name'
> & {minAgo: number; status?: Order['status']};

const seeds: Seed[] = [
  {source_name: 'Ship Đà Nẵng 247', pickup_address: '12 Hùng Vương', pickup_area_id: 1, dropoff_address: '45 Nguyễn Văn Linh', dropoff_area_id: 2, ship_fee: 25000, cod_amount: 350000, need_advance: false, is_urgent: true, note: 'Quần áo, hàng nhẹ', contact_phone: '0905123456', minAgo: 3},
  {source_name: 'Ship Đà Nẵng 247', pickup_address: 'Chợ Cồn', pickup_area_id: 1, dropoff_address: '88 Ngô Quyền', dropoff_area_id: 3, ship_fee: 30000, cod_amount: 0, need_advance: true, is_urgent: false, note: 'Đồ ăn, giao nhanh', contact_phone: '0935222333', minAgo: 8},
  {source_name: 'Hội Shipper ĐN', pickup_address: '200 Điện Biên Phủ', pickup_area_id: 2, dropoff_address: 'Đại học Bách Khoa', dropoff_area_id: 5, ship_fee: 40000, cod_amount: 1200000, need_advance: true, is_urgent: false, note: 'Laptop, dễ vỡ', contact_phone: '0914777888', minAgo: 15},
  {source_name: 'Hội Shipper ĐN', pickup_address: '15 Võ Nguyên Giáp', pickup_area_id: 3, dropoff_address: 'Làng đá Non Nước', dropoff_area_id: 4, ship_fee: 35000, cod_amount: 0, need_advance: false, is_urgent: false, note: 'Tượng đá nhỏ', contact_phone: '0988111222', minAgo: 22},
  {source_name: 'manual', pickup_address: '99 Cách Mạng Tháng 8', pickup_area_id: 6, dropoff_address: '3 Nguyễn Hữu Thọ', dropoff_area_id: 1, ship_fee: null, cod_amount: 150000, need_advance: false, is_urgent: false, note: 'Thương lượng phí', contact_phone: '0777333444', minAgo: 31},
  {source_name: 'Ship Đà Nẵng 247', pickup_address: 'KCN Hòa Khánh', pickup_area_id: 5, dropoff_address: '120 Tôn Đức Thắng', dropoff_area_id: 2, ship_fee: 45000, cod_amount: 0, need_advance: false, is_urgent: true, note: 'Giấy tờ gấp', contact_phone: '0966555444', minAgo: 40},
  {source_name: 'Hội Shipper ĐN', pickup_address: 'Hòa Phong, Hòa Vang', pickup_area_id: 7, dropoff_address: '30 Trần Phú', dropoff_area_id: 1, ship_fee: 60000, cod_amount: 500000, need_advance: true, is_urgent: false, note: 'Nông sản', contact_phone: '0903999000', minAgo: 55},
  {source_name: 'Ship Đà Nẵng 247', pickup_address: '77 Lê Duẩn', pickup_area_id: 1, dropoff_address: '5 Mỹ Khê', dropoff_area_id: 3, ship_fee: 28000, cod_amount: 200000, need_advance: false, is_urgent: false, note: 'Mỹ phẩm', contact_phone: '0912345678', minAgo: 70},
  {source_name: 'manual', pickup_address: 'Cũ - đã hết hạn', pickup_area_id: 1, dropoff_address: 'Không quan trọng', dropoff_area_id: 2, ship_fee: 20000, cod_amount: 0, need_advance: false, is_urgent: false, note: 'Đơn hết hạn', contact_phone: '0900000000', minAgo: 400, status: 'expired'},
];

export const orders: Order[] = seeds.map((s, i) => {
  const {minAgo, status, ...rest} = s;
  return {
    ...rest,
    id: i + 1,
    raw_text: `${s.pickup_address} -> ${s.dropoff_address}`,
    posted_at: ago(minAgo),
    created_at: ago(minAgo),
    expires_at: status === 'expired' ? ago(minAgo - 180) : inH(180 - minAgo),
    status: status ?? 'open',
  };
});

/** Giống query feed: status = open, chưa hết hạn, mới nhất trước, tối đa 50; lọc theo khu lấy hàng. */
export function fetchOrders(areaIds: number[] = []): Promise<Order[]> {
  const now = Date.now();
  const list = orders
    .filter(o => o.status === 'open' && new Date(o.expires_at).getTime() > now)
    .filter(o => !areaIds.length || areaIds.includes(o.pickup_area_id))
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 50);
  return new Promise(res => setTimeout(() => res(list), 400));
}

