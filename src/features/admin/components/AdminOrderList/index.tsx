'use client';
import {
  DataTable,
  FilterDropdown,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_MEDICINE_SORT_OPTIONS } from '@/constants/sort';
import { ORDER_COLUMN_LIST } from '@/constants/tables';
import { getAllOrders } from '@/services/order';
import { Order } from '@/types/Order';
import { PaginationInfo } from '@/types/PaginationInfo';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type AdminOrderListProps = {
  isAdmin?: boolean;
};

type Params = UsersParams & {
  status: string;
};

const AdminOrderList = ({ isAdmin }: AdminOrderListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [params, setParams] = useState<Params>({
    keyword: searchParams.get('keyword') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
    sortBy: searchParams.get('sortBy') || '',
    sort: searchParams.get('sort') || 'desc',
    status: '',
  });

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total_data: 0,
    total_page: 0,
  });

  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setParams((prev) => ({
      ...prev,
      page: prev.keyword !== newKeyword ? 1 : prev.page,
      keyword: newKeyword,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await getAllOrders(
          isAdmin ? 'admin' : 'pharmacy-manager',
          params
        );
        setAllOrders(res.orders);
        setPaginationInfo(res.pagination_info);
      } catch (error: any) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleMovePage = (page: number) => {
    const newParams = {
      ...params,
      page: page,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleSort = (sortBy: string, sort: string) => {
    const newParams = {
      ...params,
      sort: sort,
      sortBy: sortBy,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleFilter = (status: string) => {
    const newParams = {
      ...params,
      status: status,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleResetFilter = () => {
    handleFilter('');
  };

  const handleChangeParams = useCallback(
    (params: Params) => {
      const newParams = new URLSearchParams(searchParams);
      Object.keys(params).map((key) => {
        if (key !== 'limit') {
          let val = params[key as keyof typeof params].toString();
          if (val !== '') {
            newParams.set(key, val);
          } else {
            newParams.delete(key);
          }
          replace(`${pathname}?${newParams.toString()}`);
        }
      });
    },
    [pathname, replace, searchParams]
  );

  const filterOptions: Record<string, string> = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    completed: 'Completed',
    canceled: 'Canceled',
  };

  return (
    <>
      <div className="flex justify-between mt-6">
        <Input
          inputClass="h-[44px]"
          prepend="Search"
          placeholder="Search..."
          defaultValue={params.keyword}
        />
        <div className="flex gap-x-4">
          <SortDropdown
            onSort={handleSort}
            sortBy={params.sortBy}
            sort={params.sort}
            options={ADMIN_MEDICINE_SORT_OPTIONS}
          />
          <FilterDropdown
            options={filterOptions}
            selected={params.status}
            onFilter={handleFilter}
            onReset={handleResetFilter}
          />
        </div>
      </div>
      <DataTable
        className="mt-8"
        dataList={allOrders}
        columnList={ORDER_COLUMN_LIST}
        tabelName="order"
        loading={isLoading}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminOrderList;
