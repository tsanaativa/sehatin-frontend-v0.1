export type Product = {
  id: number;
  name: string;
  generic_name: string;
  selling_unit: string;
  unit_in_pack: string;
  content: string;
  description: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  product_picture: string;
  slug: string;
  form: string;
  classification: string;
  manufacture: string;
  categories: Category[];
};

export type Category = {
  id: number;
  name: string;
};

export type Classification = {
  id: number;
  name: string;
};
