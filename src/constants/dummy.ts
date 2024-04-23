import { Address } from '@/types/Address';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';

export const DUMMY_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Vitamin C',
  },
  {
    id: 1,
    name: 'Vitamin C',
  },
  {
    id: 1,
    name: 'Vitamin C',
  },
  {
    id: 1,
    name: 'Vitamin C',
  },
  {
    id: 1,
    name: 'Vitamin C',
  },
];

export const DUMMY_PRODUCT: Product = {
  id: 1,
  name: 'Panadol Extra 10 Kaplet 2 box bla',
  selling_unit: 'Box',
  price: 15990,
  generic_name: 'Paracetamol',
  image:
    'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export const DUMMY_ADDRESSES: Address[] = [
  {
    id: 1,
    is_main: false,
    is_active: true,
    address: 'Jl. Blablab No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
  },
  {
    id: 2,
    is_main: true,
    is_active: false,
    address: 'Jl. Blablab No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
  },
  {
    id: 3,
    is_main: false,
    is_active: false,
    address: 'Jl. ssss No. 3',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Menteng',
    subdistrict: 'Gondangdia',
    postal_code: 12345,
  },
];

export const DUMMY_USER = {
  name: 'Vivin',
  email: 'vivin@gmail.com',
};

export const DUMMY_CHOOSE_PHARMACIES = [
  {
    name: 'Century Plaza Senayan 1',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '10 km',
    shipping: 'Official Instant, Official Same Day',
    status: true,
  },
  {
    name: 'Century Plaza Senayan 2',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '12 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
  {
    name: 'Century Plaza Senayan 3',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '18 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
  {
    name: 'Century Plaza Senayan 4',
    address: 'Jl. bla bla ini alamat lah ya pokoknya, gggg, sssss, 52616',
    distance: '22 km',
    shipping: 'Official Instant, Official Same Day',
    status: false,
  },
];
