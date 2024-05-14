export type Partner = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  logo: string;
};

export type PartnersParams = {
  keyword: string;
  page: number;
  limit: number;
  sort: string;
  sortBy: string;
};
