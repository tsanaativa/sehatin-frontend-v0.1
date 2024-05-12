import { Address } from './Address';

export type Order = {
  id: number;
  order_number: string;
  total_price: string;
  payment_proof?: string;
  payment_deadline: string;
  shipping_fee: string;
  order_status: string;
  pharmacy_name: string;
  user_address: Address;
  pharmacy_address: Address;
  order_items: OrderItem[];
};

export type OrderItem = {
  name: string;
  selling_unit: string;
  price: string;
  quantity: number;
  product_picture: string;
};
