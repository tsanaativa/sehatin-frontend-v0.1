'use client';
import { TableHeader } from '@/types/Tables';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '..';
import ToggleInput from '../ToggleInput';
import { usePathname } from 'next/navigation';

type DataTableProps<T> = {
  columnList: TableHeader[];
  dataList: T[];
  tabelName: string;
  className?: string;
};

const DataTable = <T,>({
  columnList,
  dataList,
  tabelName,
  className,
}: DataTableProps<T>) => {
  const pathname = usePathname();

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
        {dataList?.map((item, idx) => (
          <tr
            className="border-b border-gray-lighter last:border-none"
            key={idx}
          >
            {columnList.map((column, colIdx) => (
              <td
                key={colIdx}
                className={
                  column.label === 'Action'
                    ? 'flex items-center gap-x-2 px-6 py-4'
                    : 'px-6 py-4'
                }
              >
                {column.customCell ? (
                  <>{column.customCell}</>
                ) : column.accessor === 'status' ? (
                  <Badge
                    variant={
                      item[column.accessor as keyof typeof item]
                        ? 'success'
                        : 'gray'
                    }
                  >
                    <>
                      {
                        <>
                          {item[column.accessor as keyof typeof item]
                            ? 'Verified'
                            : 'Not Verified'}
                        </>
                      }
                    </>
                  </Badge>
                ) : column.accessor === 'id' ? (
                  <Link
                    className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                    href={`${pathname}/${item[column.accessor as keyof typeof item]}`}
                  >
                    View
                  </Link>
                ) : column.accessor === 'action' ? (
                  <>
                    <Link
                      href={`/admin/${tabelName}/${item['id' as keyof typeof item]}/update`}
                    >
                      <Pencil className="text-blue" />
                    </Link>
                    <Link
                      href={`/admin/${tabelName}/${item['id' as keyof typeof item]}/delete`}
                    >
                      <Trash2 className="text-danger" />
                    </Link>
                  </>
                ) : column.accessor === 'active_status' ? (
                  <ToggleInput
                    checked={
                      item[column.accessor as keyof typeof item] as boolean
                    }
                  />
                ) : (
                  <>{item[column.accessor as keyof typeof item]}</>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
