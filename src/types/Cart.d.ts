type OfficialMethod = {
  id: number;
  name: 'instant' | 'sameday';
};

type NonOfficialMethod = {
  id: number;
  name: 'jne' | 'tiki';
  courier: 'jne' | 'tiki';
};

type ShippingType = NonOfficialMethod['name'] & OfficialMethod['name'];

type ShippingMethod = {
  id: number;
  name: string;
  courier?: string;
  service?: string;
  description?: string;
};

type Cart = {
  pharmacy_id: number;
  pharmacy_name: string;
  id: number;
  product_name: string;
  product_picture: string;
  selling_unit: string;
  price: string;
  quantity: number;
  updated_at: string;
  weight: number;
  is_available: boolean;
  total_stock: number;
  slug_id: string;
  shipping_methods: {
    official: OfficialMethod[];
    non_official: NonOfficialMethod[];
  };
};

type ShipmentRequest = {
  pharmacy_id: number;
  user_address_id: number;
  total_weight: number;
  official_shipping_method_id?: number;
  non_official_shipping_method_id?: number;
};

type OrderRequest = {
  cart_item_id: number[];
  user_address_id: number;
  total_price: number;
  shipping_fee: number;
  shipping_method: string;
};

export type {
  ShippingMethod,
  Cart,
  OfficialMethod,
  NonOfficialMethod,
  ShipmentRequest,
  OrderRequest,
};
