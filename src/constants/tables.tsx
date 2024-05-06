import { Badge, Button } from '@/components/common';
import { TableHeader } from '@/types/Tables';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
    accessor: 'birthDate',
  },
  {
    label: 'Gender',
    accessor: 'gender',
  },
  {
    label: 'Status',
    customCell: <Badge variant="success">Verified</Badge>,
  },
  {
    label: 'Action',
    customCell: (
      <>
        <Link href="/admin/user/update">
          <Pencil className="text-blue" />
        </Link>
        <Link href="/admin/user/delete">
          <Trash2 className="text-danger" />
        </Link>
      </>
    ),
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
    accessor: 'consultationFee',
  },
  {
    label: 'Year of Experience',
    accessor: 'yearOfExperinece',
  },
  {
    label: 'Status',
    customCell: <Badge variant="success">Verified</Badge>,
  },
  {
    label: 'Action',
    customCell: (
      <>
        <Link href="/admin/user/update">
          <Pencil className="text-blue" />
        </Link>
        <Link href="/admin/user/delete">
          <Trash2 className="text-danger" />
        </Link>
      </>
    ),
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
    customCell: <Button>View List</Button>,
  },
  {
    label: 'Action',
    customCell: (
      <>
        <Link href="/admin/user/update">
          <Pencil className="text-blue" />
        </Link>
        <Link href="/admin/user/delete">
          <Trash2 className="text-danger" />
        </Link>
      </>
    ),
  },
];
