import { Address } from './Address';

export type User = {
  id: number;
  name: string;
  email: string;
  gender?: Gender;
  birth_date?: string;
  profile_picture?: string;
  is_online?: boolean;
  role: string;
  addresses: Address[];
};

export type Gender = {
  id?: number;
  name?: string;
};

export type UsersParams = {
  keyword: string;
  page: number;
  limit: number;
  sortBy: string;
  sort: string;
};
