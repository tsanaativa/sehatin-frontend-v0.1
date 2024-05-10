'use client';
import { TableHeader } from '@/types/Tables';
import { Check, Eye, Pencil, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { Badge, Button } from '..';
import ToggleInput from '../ToggleInput';
import { usePathname } from 'next/navigation';
import { any, string } from 'prop-types';
import { Gender } from '@/types/User';
import { formatDate } from '@/utils/formatter';
import { Category } from '@/types/Product';
import { useState } from 'react';
import { ModalPharmacyProduct } from '@/features/admin/components';
import { PharmacyAddress } from '@/types/Pharmacy';
import { getPathNames } from '@/utils/pageHeader';
import { Specialist } from '@/types/Doctor';
import { currency } from '@/utils/helper';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentPathname =
    '/' + getPathNames(pathname)[0] + '/' + getPathNames(pathname)[1];

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
                ) : column.accessor === 'is_verified' ? (
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
                    href={`${currentPathname}/${item[column.accessor as keyof typeof item]}`}
                  >
                    View
                  </Link>
                ) : column.accessor === 'pharmacy_product' ? (
                  <Link
                    className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                    href={`${currentPathname}/${item['id' as keyof typeof item]}/product`}
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
                ) : column.accessor === 'confirm' ? (
                  <>
                    {(item['status' as keyof typeof item] as boolean) !==
                    null ? (
                      <Badge
                        variant={
                          item['status' as keyof typeof item]
                            ? 'success'
                            : 'danger'
                        }
                      >
                        <>
                          {
                            <>
                              {item['status' as keyof typeof item]
                                ? 'Processed'
                                : 'Canceled'}
                            </>
                          }
                        </>
                      </Badge>
                    ) : (
                      <>
                        <Button
                          className="flex items-center gap-x-1 px-3"
                          variant="green"
                        >
                          <Check /> Processed
                        </Button>
                        <Button
                          className="flex items-center gap-x-1 px-3"
                          variant="danger"
                        >
                          <X /> Canceled
                        </Button>
                      </>
                    )}
                  </>
                ) : column.accessor === 'gender' ? (
                  <>
                    {
                      (item[column.accessor as keyof typeof item] as Gender)[
                        'name'
                      ]
                    }
                  </>
                ) : column.accessor === 'birth_date' ? (
                  <>
                    {formatDate(
                      item[column.accessor as keyof typeof item] as string
                    )}{' '}
                    {new Date(
                      item[column.accessor as keyof typeof item] as string
                    ).getFullYear()}
                  </>
                ) : column.accessor === 'categories' ? (
                  <>
                    {(
                      item[column.accessor as keyof typeof item] as Category[]
                    )?.map((category) => <>{category.name}</>)}
                  </>
                ) : column.accessor === 'modal' ? (
                  <>
                    <Button
                      className="w-full"
                      onClick={() => setShowModal(true)}
                    >
                      View
                    </Button>
                    <ModalPharmacyProduct
                      onShowModal={setShowModal}
                      showModal={showModal}
                    />
                  </>
                ) : column.accessor === 'pharmacy_address' ? (
                  <>
                    {
                      (
                        item[
                          column.accessor as keyof typeof item
                        ] as PharmacyAddress
                      )['address']
                    }
                  </>
                ) : column.accessor === 'pharmacist' ? (
                  <div className="flex flex-col">
                    <span>
                      {item['pharmacist_name' as keyof typeof item] as string}
                    </span>
                    <span>
                      {
                        item[
                          'pharmacist_license_number' as keyof typeof item
                        ] as string
                      }
                    </span>
                    <span>
                      {
                        item[
                          'pharmacist_phone_number' as keyof typeof item
                        ] as string
                      }
                    </span>
                  </div>
                ) : column.accessor === 'operational' ? (
                  <>
                    <span>
                      {item['operational_day' as keyof typeof item] as string},{' '}
                      {item['operational_hour' as keyof typeof item] as string}
                    </span>
                  </>
                ) : column.accessor === 'fee' ? (
                  <>
                    {currency(
                      item[column.accessor as keyof typeof item] as number
                    )}
                  </>
                ) : column.accessor === 'specialist' ? (
                  <>
                    {
                      (
                        item[column.accessor as keyof typeof item] as Specialist
                      )['name']
                    }
                  </>
                ) : column.accessor === 'year_of_experience' ? (
                  <>
                    {new Date().getFullYear() -
                      (item[
                        'work_start_year' as keyof typeof item
                      ] as number)}{' '}
                    {'Year'}
                  </>
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
