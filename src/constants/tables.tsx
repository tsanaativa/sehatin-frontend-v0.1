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
    label: 'Status',
    accessor: 'status',
  },
  {
    label: 'User Detail',
    accessor: 'id',
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
    accessor: 'consultation_fee',
  },
  {
    label: 'Year of Experience',
    accessor: 'year_of_experience',
  },
  {
    label: 'Status',
    accessor: 'status',
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
    accessor: 'address',
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
    accessor: 'availableShippingMethods',
  },
  {
    label: 'Product',
    accessor: 'id',
  },
  {
    label: 'Action',
    accessor: 'action',
  },
];
