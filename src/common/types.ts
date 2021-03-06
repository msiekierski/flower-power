export type Order = {
  orderNumber: number;
  date: Date;
  status: string;
  orderedItems: Array<OrderItem>;
};

export enum OrderStatus {
  PLACED = 'PLACED',
  PAID = 'PAID',
  IN_PROGRESS = 'IN PROGRESS',
  READY_TO_SEND = 'READY TO SEND',
  READY_TO_PICK_UP = 'READY TO PICK UP',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
}

export type OrderItem = {
  itemImageUrl: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  priceDiscount: number;
  lineTotal: number;
};

export type CartProduct = {
  productId: string;
  productImageUrl: string;
  itemDescription: string;
  storeName: string;
  storeId: string;
  itemPrice: number;
  quantity: number;
};

export type CartTotals = {
  total: number;
  amount: number;
};

export type Review = {
  author: string;
  text: string;
  rating: number;
  date: string;
};

export enum ProductCategory {
  FLOWER = 'Flowers',
  BUNCH = 'Bunch',
  FLOWERS_IN_VASE = 'Flowers in vase',
  FLOWERS_IN_BOX = 'Flowers in box',
  POT = 'Pot',
  SEED = 'Seed',
  CARD = 'Card',
  ORNAMENT = 'Ornament',
}

export type FlowerShopProduct = {
  imageUrl: string;
  productId: string;
  price: number;
  storeName?: string;
  storeId: string;
  description: string;
  color?: string;
  size?: string;
  category: string;
  subcategory?: string;
  longDescription?: string;
  composition?: string;
};

export type FlowerShop = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  phone: string;
  hasDelivery: boolean;
  images: Array<string>;
  openingHours: Array<OpeningHours | null>;
  reviews: Array<Review>;
  products: Array<FlowerShopProduct>;
};

export type OpeningHours = {
  from: string;
  to: string;
};

export type ProductSearch = {
  name: string;
  category: string;
  subcategory: string;
  id: string;
};

export type ShopSearch = {
  name: string;
  address: string;
  id?: string;
};

export enum ApiCallState {
  FETCH_BEGIN = 'fetch_begin',
  FETCH_ERROR = 'fetch_error',
  FETCH_SUCCESS = 'fetch_success',
  IDLE = 'idle',
}

export enum Roles {
  CLIENT = 'Client',
  EMPLOYEE = 'Employee',
  OWNER = 'Owner',
  ADMIN = 'Admin',
  NONE = 'None',
}

export type SearchItem = {
  id: string;
  imageUrl: string;
  category: string;
  subcategory: string;
};

export type SearchResultItem = {
  name: string;
  itemId: string;
  minPrice: number;
  maxPrice: number;
  imageUrl: string;
  color?: string;
  category: string;
  subcategory: string;
  discount?: number;
  size?: string;
};

export type ComparisonItem = {
  shopName: string;
  shopImageUrl: string;
  itemImageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  shopAddress: string;
  productName: string;
  color: string;
};

export type Location = {
  lat: number;
  long: number;
  city: string;
  formattedAddress?: string;
};

export type WarehouseItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: { newPrice: number; dateFrom: Date; dateTo: Date } | null;
  quantity: number;
  isSelected: boolean;
};

export type UserDetails = {
  name: string;
  surname: string;
  street: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
};

export type CreditCard = {
  cardNumber?: string;
  nameSurname?: string;
  cvvNumber?: string;
  expiryDate?: string;
};

export type CartItemAvailability = {
  productId: string;
  shopId: string;
  hasInStock: boolean;
  quantityLeft: number;
};

export type CartBouquet = {
  bouquetId: string;
  shopId: string;
  shopName: string;
  items: Array<CartProduct>;
  quantity: number;
};
