'use client';
import { ModalPharmacyProduct } from '@/features/admin/components';
import { Specialist } from '@/types/Doctor';
import { PharmacyAddress, PharmacyProduct } from '@/types/Pharmacy';
import { Category, Product } from '@/types/Product';
import { TableHeader } from '@/types/Tables';
import { Gender } from '@/types/User';
import { formatDate } from '@/utils/formatter';
import { currency } from '@/utils/helper';
import { getPathNames } from '@/utils/pageHeader';
import { Check, Edit2, Pencil, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Badge, Button, DeleteModalButton, NoDataFound, Skeleton } from '..';
import ToggleInput from '../ToggleInput';
import Image from 'next/image';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import DefaultMedPictureImg from '@/assets/images/default-med.svg';

type DataTableProps<T> = {
  columnList: TableHeader[];
  dataList: T[];
  tabelName: string;
  className?: string;
  loading?: boolean;
  onDelete?: (id: number) => void;
};

const DataTable = <T,>({
  columnList,
  dataList,
  tabelName,
  className,
  loading = false,
  onDelete = () => {},
}: DataTableProps<T>) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [idItem, setIdItem] = useState<number>(0);
  const currentPathname =
    '/' + getPathNames(pathname)[0] + '/' + getPathNames(pathname)[1];

  return (
    <table
      className={`w-full border border-gray-lighter text-left text-base mb-7 ${className}`}
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
        {loading ? (
          <tr>
            <td colSpan={99} className="py-10 w-full text-dark-gray table-cell">
              <Skeleton>
                <div className="w-full flex justify-center">Loading...</div>
              </Skeleton>
            </td>
          </tr>
        ) : (
          <>
            {dataList?.length > 0 ? (
              <>
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
                            ? 'items-center gap-x-2 px-6 py-4 h-full table-cell align-middle'
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
                          <div className="h-full flex gap-2 items-center">
                            {tabelName !== 'admin' && (
                              <Link
                                href={`/admin/${tabelName}/${item['id' as keyof typeof item]}/update`}
                              >
                                <Edit2 size={20} className="text-blue" />
                              </Link>
                            )}
                            <DeleteModalButton
                              isIcon
                              onConfirm={() =>
                                onDelete(
                                  item['id' as keyof typeof item] as number
                                )
                              }
                              objName={tabelName}
                            />
                          </div>
                        ) : column.accessor === 'active_status' ? (
                          <ToggleInput
                            checked={
                              item[
                                'is_available' as keyof typeof item
                              ] as boolean
                            }
                          />
                        ) : column.accessor === 'confirm' ? (
                          <>
                            {(item[
                              'status' as keyof typeof item
                            ] as boolean) !== null ? (
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
                              (
                                item[
                                  column.accessor as keyof typeof item
                                ] as Gender
                              )['name']
                            }
                          </>
                        ) : column.accessor === 'birth_date' ? (
                          <>
                            {formatDate(
                              item[
                                column.accessor as keyof typeof item
                              ] as string
                            )}
                          </>
                        ) : column.accessor === 'categories' ? (
                          <div className="flex flex-col">
                            {(
                              item[
                                column.accessor as keyof typeof item
                              ] as Category[]
                            )?.map((category) => (
                              <span key={category.id}>{category.name}</span>
                            ))}
                          </div>
                        ) : column.accessor === 'pharmacy_product_name' ? (
                          <>
                            {
                              (item['product' as keyof typeof item] as Product)[
                                'name'
                              ]
                            }
                          </>
                        ) : column.accessor === 'stock' ? (
                          <>
                            {
                              item[
                                'total_stock' as keyof typeof item
                              ] as Product
                            }
                          </>
                        ) : column.accessor === 'category' ? (
                          <>
                            {(item['product' as keyof typeof item] as Product)[
                              'categories'
                            ]?.map((category) => <>{category.name}</>)}
                          </>
                        ) : column.accessor === 'modal' ? (
                          <>
                            <Button
                              className="w-full"
                              onClick={() => {
                                setIdItem(
                                  item['id' as keyof typeof item] as number
                                );
                                setShowModal(true);
                              }}
                            >
                              View
                            </Button>
                            <ModalPharmacyProduct
                              onShowModal={setShowModal}
                              showModal={showModal}
                              data={dataList as PharmacyProduct[]}
                              id={idItem}
                            />
                          </>
                        ) : column.accessor === 'product_selling_unit' ? (
                          <>
                            {
                              (item['product' as keyof typeof item] as Product)[
                                'selling_unit'
                              ]
                            }
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
                              {
                                item[
                                  'pharmacist_name' as keyof typeof item
                                ] as string
                              }
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
                              {
                                item[
                                  'operational_day' as keyof typeof item
                                ] as string
                              }
                              ,{' '}
                              {
                                item[
                                  'operational_hour' as keyof typeof item
                                ] as string
                              }
                            </span>
                          </>
                        ) : column.accessor === 'fee' ? (
                          <>
                            {currency(
                              item[
                                column.accessor as keyof typeof item
                              ] as number
                            )}
                          </>
                        ) : column.accessor === 'specialist' ? (
                          <>
                            {
                              (
                                item[
                                  column.accessor as keyof typeof item
                                ] as Specialist
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
                        ) : column.accessor === 'logo' ||
                          column.accessor?.endsWith('picture') ? (
                          <>
                            <Image
                              alt={column.accessor}
                              src={
                                (item[
                                  column.accessor as keyof typeof item
                                ] as string) ||
                                (column.accessor === 'profile_picture'
                                  ? DefaultAvatarImg
                                  : DefaultMedPictureImg)
                              }
                              width={80}
                              height={80}
                              className="object-cover rounded h-16 w-16"
                            />
                          </>
                        ) : (
                          <>{item[column.accessor as keyof typeof item]}</>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={99} className="py-10">
                  <NoDataFound />
                </td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
