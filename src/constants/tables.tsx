import { TableHeader } from '@/types/Tables';

export const USER_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Birth Date',
    accessor: 'birth_date',
  },
  {
    label: 'Gender',
    accessor: 'gender',
  },
  {
    label: 'Profile Picture',
    accessor: 'profile_picture',
  },
  {
    label: 'Addresses',
    accessor: 'address_button',
  },
  {
    label: 'Status',
    accessor: 'is_verified',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const USER_ADDRESS_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Address',
    accessor: 'address',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const DOCTOR_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Specialist',
    accessor: 'specialist',
  },
  {
    label: 'Consultation Fee',
    accessor: 'fee',
  },
  {
    label: 'Year of Experience',
    accessor: 'year_of_experience',
  },
  {
    label: 'Status',
    accessor: 'is_verified',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const MEDICINE_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Generic Name',
    accessor: 'generic_name',
  },
  {
    label: 'Category',
    accessor: 'categories',
  },
  {
    label: 'Classification',
    accessor: 'classification',
  },
  {
    label: 'Selling Unit',
    accessor: 'selling_unit',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const PHARMACY_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Address',
    accessor: 'pharmacy_address',
  },
  {
    label: 'Pharmacist',
    accessor: 'pharmacist',
  },
  {
    label: 'Operational',
    accessor: 'operational',
  },
  {
    label: 'Available Shipping Methods',
    accessor: 'available_shipping_methods',
  },
  {
    label: 'Products',
    accessor: 'pharmacy_product',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const PHARMACY_PRODUCT_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'pharmacy_product_name',
  },
  {
    label: 'Category',
    accessor: 'category',
  },
  {
    label: 'Selling Unit',
    accessor: 'product_selling_unit',
  },
  {
    label: 'Details',
    accessor: 'modal',
  },
  {
    label: 'Price',
    accessor: 'price',
  },
  {
    label: 'Stock',
    accessor: 'stock',
  },
  {
    label: 'Active Status',
    accessor: 'active_status',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const STOCK_MUTATION_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Product Name',
    accessor: 'product_name',
  },
  {
    label: 'Sender',
    accessor: 'sender',
  },
  {
    label: 'Reciever',
    accessor: 'reciever',
  },
  {
    label: 'Quantity',
    accessor: 'quantity',
  },
  {
    label: 'Product Details',
    accessor: 'id',
  },
  {
    label: 'Action',
    accessor: 'confirm',
  },
];

export const ADMIN_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];

export const PARTNER_COLUMN_LIST: TableHeader[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
  {
    label: 'Phone Number',
    accessor: 'phone_number',
  },
  {
    label: 'Logo',
    accessor: 'logo',
  },
  {
    label: 'Pharmacy List',
    accessor: 'pharmacy_button',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];
