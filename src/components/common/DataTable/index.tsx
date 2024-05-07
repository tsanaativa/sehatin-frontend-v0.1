import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '..';
import Link from 'next/link';
import { TableHeader } from '@/types/Tables';

type DataTableProps = {
  columnList: TableHeader[];
  dataList?: [];
  className?: string;
};

const DataTable = ({ columnList, dataList, className }: DataTableProps) => {
  return (
    <table
      className={`w-full border border-gray-lighter text-left text-base ${className}`}
    >
      <thead className="bg-gray-soft text-dark/70">
        <tr>
          {columnList.map((column, idx) => (
            <th className="p-6" key={idx}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="font-medium text-dark">
        <tr className="border-b border-gray-lighter last:border-none">
          <td className="px-6 py-4">Vivin</td>
          <td className="px-6 py-4">vivin@gmail.com</td>
          <td className="px-6 py-4">Anak</td>
          <td className="px-6 py-4">Rp150.000</td>
          <td className="px-6 py-4">10 years</td>
          <td className="px-6 py-4">
            <Badge variant="success">Verified</Badge>
          </td>
          <td className="flex items-center gap-x-2 px-6 py-4">
            <Link href="/admin/user/update">
              <Pencil className="text-blue" />
            </Link>
            <Link href="/admin/user/delete">
              <Trash2 className="text-danger" />
            </Link>
          </td>
        </tr>
        <tr className="border-b border-gray-lighter last:border-none">
          <td className="px-6 py-4">Vivin</td>
          <td className="px-6 py-4">vivin@gmail.com</td>
          <td className="px-6 py-4">Anak</td>
          <td className="px-6 py-4">Rp150.000</td>
          <td className="px-6 py-4">10 years</td>
          <td className="px-6 py-4">
            <Badge variant="gray">Not Verified</Badge>
          </td>
          <td className="flex items-center gap-x-2 px-6 py-4">
            <Link href="/admin/user/update">
              <Pencil className="text-blue" />
            </Link>
            <Link href="/admin/user/delete">
              <Trash2 className="text-danger" />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
