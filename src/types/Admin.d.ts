export type Admin = {
  id: number;
  name: string;
  email: string;
};

export type AdminsParams = {
  keyword: string;
  page: number;
  limit: number;
  sort: string;
  sortBy: string;
};
