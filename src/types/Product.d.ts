export type Product = {
  id: number;
  name: string;
  generic_name: string;
  selling_unit: string;
  price: string;
  product_picture: string;
  slug_id: string;
};

export type Category = {
  id: number;
  name: string;
};

export type NearestProductsParams = {
  keyword: string;
  page: number;
  limit: number;
  categoryId: string;
  sortBy: string;
  sort: string;
  longitude: number;
  latitude: number;
};

export type ProductsParams = {
  keyword: string;
  page: number;
  limit: number;
};
