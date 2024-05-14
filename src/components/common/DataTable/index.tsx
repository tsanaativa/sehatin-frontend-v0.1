'use client';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import DefaultMedPictureImg from '@/assets/images/default-med.svg';
import { ModalPharmacyProduct } from '@/features/admin/components';
import { Address } from '@/types/Address';
import { Specialist } from '@/types/Doctor';
import {
  PharmacyAddress,
  PharmacyProduct,
  ShippingMethods,
} from '@/types/Pharmacy';
import { Category, Product } from '@/types/Product';
import { TableHeader } from '@/types/Tables';
import { Gender } from '@/types/User';
import {
  formatAddress,
  formatDate,
  formatDateTime,
  formatShippingMethods,
} from '@/utils/formatter';
import { currency } from '@/utils/helper';
import { getPathNames } from '@/utils/pageHeader';
import { Check, Edit2, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Badge, Button, DeleteModalButton, NoDataFound, Skeleton } from '..';
import ToggleInput from '../ToggleInput';
import ViewMoreButton from '@/features/admin/components/ViewMoreButton';
import OrderStatus from '../OrderStatus';
import AdminConfirmButton from '@/features/admin/components/AdminConfirmButton';

type DataTableProps<T> = {
  columnList: TableHeader[];
  dataList: T[];
  tabelName: string;
  className?: string;
  loading?: boolean;
  onDelete?: (id: number) => void;
  userId?: string;
};

const DataTable = <T,>({
  columnList,
  dataList,
  tabelName,
  className,
  loading = false,
  onDelete = () => {},
  userId,
}: DataTableProps<T>) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [idItem, setIdItem] = useState<number>(0);
  const currentPathname =
    '/' + getPathNames(pathname)[0] + '/' + getPathNames(pathname)[1];
  const { pharmacyId } = useParams();

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
                        ) : column.accessor === 'address_button' ? (
                          <Link
                            className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                            href={`${currentPathname}/${item['id' as keyof typeof item]}/address/list`}
                          >
                            View
                          </Link>
                        ) : column.accessor === 'pharmacy_button' ? (
                          <Link
                            className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                            href={`${currentPathname}/${item['id' as keyof typeof item]}/pharmacy/list`}
                          >
                            View
                          </Link>
                        ) : column.accessor === 'address' ? (
                          <div className="flex flex-col gap-1">
                            {formatAddress(item as Address)}
                            {(item as Address).is_main && (
                              <Badge className="w-fit min-w-[100px]">
                                Main
                              </Badge>
                            )}
                          </div>
                        ) : column.accessor === 'order_number' ? (
                          <div className="flex flex-col gap-1 max-w-[100px]">
                            {
                              item[
                                'order_number' as keyof typeof item
                              ] as string
                            }
                          </div>
                        ) : column.accessor === 'product["name"]' ? (
                          <div className="flex flex-col gap-1 max-w-[100px]">
                            {
                              (
                                item[
                                  'product_detail' as keyof typeof item
                                ] as Product
                              ).name
                            }
                          </div>
                        ) : column.accessor === 'order_status' ? (
                          <div className="flex flex-col gap-1 max-w-[100px]">
                            <OrderStatus
                              status={
                                item[
                                  'order_status' as keyof typeof item
                                ] as string
                              }
                            />
                          </div>
                        ) : column.accessor === 'payment_proof' ? (
                          <div className="flex flex-col gap-1">
                            {item['payment_proof' as keyof typeof item] ? (
                              <Link
                                href={
                                  item[
                                    'payment_proof' as keyof typeof item
                                  ] as string
                                }
                                target="_blank"
                              >
                                View
                              </Link>
                            ) : (
                              <div className="text-dark-gray">
                                Unpaid. Deadline:{' '}
                                {formatDateTime(
                                  item[
                                    'payment_deadline' as keyof typeof item
                                  ] as string
                                )}
                              </div>
                            )}
                          </div>
                        ) : column.accessor === 'user_order' ? (
                          <div className="flex flex-col gap-1">
                            {item['user_name' as keyof typeof item] as string} (
                            {item['user_email' as keyof typeof item] as string}){' '}
                            <br />
                            <ViewMoreButton label="View Address">
                              <span className="text-dark-gray text-sm">
                                {formatAddress(
                                  item[
                                    'user_address' as keyof typeof item
                                  ] as Address
                                )}
                              </span>
                            </ViewMoreButton>
                          </div>
                        ) : column.accessor === 'pharmacy_order' ? (
                          <div className="flex flex-col gap-1">
                            {
                              item[
                                'pharmacy_name' as keyof typeof item
                              ] as string
                            }{' '}
                            (
                            {
                              item[
                                'pharmacy_email' as keyof typeof item
                              ] as string
                            }
                            ) <br />
                            <ViewMoreButton label="View Address">
                              <span className="text-dark-gray text-sm">
                                {formatAddress(
                                  item[
                                    'pharmacy_address' as keyof typeof item
                                  ] as Address
                                )}
                              </span>
                            </ViewMoreButton>
                          </div>
                        ) : column.accessor === 'available_shipping_methods' ? (
                          <div className="flex flex-col gap-1">
                            {formatShippingMethods(
                              item[
                                'shipping_methods' as keyof typeof item
                              ] as ShippingMethods
                            )}
                          </div>
                        ) : column.accessor === 'pharmacy_product' ? (
                          <Link
                            className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                            href={`${currentPathname}/${item['id' as keyof typeof item]}/product`}
                          >
                            View
                          </Link>
                        ) : column.accessor === 'sales_report' ? (
                          <Link
                            className="w-full text-light bg-primary-dark/85 hover:bg-primary-dark/90 rounded-md px-6 py-2"
                            href={`${currentPathname}/${item['id' as keyof typeof item]}/sales-report`}
                          >
                            View
                          </Link>
                        ) : column.accessor === 'action' ? (
                          <div className="h-full flex gap-2 items-center">
                            {tabelName !== 'admin' && (
                              <Link
                                href={
                                  tabelName === 'pharmacy_product'
                                    ? `/admin/pharmacy/${pharmacyId}/product/${item['id' as keyof typeof item]}/update`
                                    : `/admin/${tabelName}/${item['id' as keyof typeof item]}/update`
                                }
                              >
                                <Edit2 size={20} className="text-blue" />
                              </Link>
                            )}
                            {tabelName !== 'admin' &&
                              tabelName !== 'address' &&
                              tabelName !== 'adminPharmacy' && (
                                <Link
                                  href={
                                    tabelName === 'pharmacy_product'
                                      ? `/admin/pharmacy/${pharmacyId}/product/${item['id' as keyof typeof item]}/update`
                                      : `/admin/${tabelName}/${item['id' as keyof typeof item]}/update`
                                  }
                                >
                                  <Edit2 size={20} className="text-blue" />
                                </Link>
                              )}
                            {tabelName === 'address' && (
                              <a
                                href={`/admin/user/${userId}/address/${item['id' as keyof typeof item]}/update`}
                              >
                                <Edit2 size={20} className="text-blue" />
                              </a>
                            )}
                            <DeleteModalButton
                              isIcon
                              onConfirm={() =>
                                onDelete(
                                  item['id' as keyof typeof item] as number
                                )
                              }
                              objName={tabelName.replace('_', ' ')}
                            />
                          </div>
                        ) : column.accessor === 'active_status' ? (
                          <ToggleInput
                            checked={
                              item[
                                'is_available' as keyof typeof item
                              ] as boolean
                            }
                            key={item['id' as keyof typeof item] as number}
                          />
                        ) : column.accessor === 'shipping_fee' ? (
                          <>
                            {item['shipping_method' as keyof typeof item]}
                            <br />
                            <span className="text-dark-gray text-nowrap">
                              (Cost: Rp{' '}
                              {parseFloat(
                                item[
                                  'shipping_fee' as keyof typeof item
                                ] as string
                              ).toLocaleString('id')}
                              )
                            </span>
                          </>
                        ) : column.accessor === 'total_price' ? (
                          <span className="text-nowrap">
                            Rp{' '}
                            {parseFloat(
                              item['total_price' as keyof typeof item] as string
                            ).toLocaleString('id')}
                          </span>
                        ) : column.accessor === 'order_action' ? (
                          <>
                            {item['payment_proof' as keyof typeof item] ? (
                              <AdminConfirmButton
                                id={item['id' as keyof typeof item] as string}
                              />
                            ) : (
                              <>-</>
                            )}
                          </>
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
                            )
                              ?.map((category) => category.name)
                              .join(', ')}
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
                            <span className="flex gap-1 items-center">
                              <Phone size={15} />
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
