'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_ADMIN_SORT_OPTIONS } from '@/constants/sort';
import { PARTNER_COLUMN_LIST } from '@/constants/tables';
import { getAllPartners } from '@/services/partner';
import { Admin, AdminsParams } from '@/types/Admin';
import { PaginationInfo } from '@/types/PaginationInfo';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deletePartner } from '../../action/partner';
import useDebounce from '@/hooks/useDebounce';

const AdminPartnerList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [params, setParams] = useState<AdminsParams>({
    keyword: searchParams.get('keyword') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
    sortBy: searchParams.get('sortBy') || '',
    sort: searchParams.get('sort') || 'desc',
  });

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total_data: 0,
    total_page: 0,
  });

  const [allPartners, setAllPartners] = useState<Admin[]>([]);

  const debounce = useDebounce(params, 500);

  const fetchAllPartners = async () => {
    try {
      const res = await getAllPartners(debounce);
      setPaginationInfo(res.pagination_info);
      setAllPartners(res.pharmacy_managers);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (debounce) {
      fetchAllPartners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

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

  const handleChangeParams = useCallback(
    (params: UsersParams) => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = {
      ...params,
      keyword: e.target.value,
      page: 1,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePartner(id);
      toast.success('successfully deleted');
      fetchAllPartners();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-6">
        <Input
          inputClass="h-[44px]"
          prepend="Search"
          placeholder="Search..."
          onChange={handleSearch}
          defaultValue={params.keyword}
        />
        <div className="flex gap-x-4">
          <SortDropdown
            onSort={handleSort}
            sortBy={params.sortBy}
            sort={params.sort}
            options={ADMIN_ADMIN_SORT_OPTIONS}
          />
        </div>
      </div>
      <DataTable
        className="mt-8"
        dataList={allPartners}
        columnList={PARTNER_COLUMN_LIST}
        tabelName="partner"
        loading={isLoading}
        onDelete={handleDelete}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminPartnerList;
