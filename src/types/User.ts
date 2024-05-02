import { Address } from './Address';

export type User = {
  id: number;
  name: string;
  email: string;
  gender?: 'male' | 'female';
  birth_date?: string;
  profile_picture?: string;
  role: string;
  addresses: Address[];
};
