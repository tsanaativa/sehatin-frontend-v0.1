'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_ADMIN_SORT_OPTIONS } from '@/constants/sort';
import { ADMIN_COLUMN_LIST } from '@/constants/tables';
import { getAllAdmins } from '@/services/admin';
import { Admin, AdminsParams } from '@/types/Admin';
import { PaginationInfo } from '@/types/PaginationInfo';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAdmin } from '../../action/admin';

const AdminAdminList = () => {
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

  const [allAdmins, setAllAdmins] = useState<Admin[]>([]);

  const fetchAllAdmins = async () => {
    try {
      const res = await getAllAdmins(params);
      setPaginationInfo(res.pagination_info);
      setAllAdmins(res.admin);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllAdmins();
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
      await deleteAdmin(id);
      toast.success('successfully deleted');
      fetchAllAdmins();
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
        dataList={allAdmins}
        columnList={ADMIN_COLUMN_LIST}
        tabelName="admin"
        loading={isLoading}
        onDelete={handleDelete}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminAdminList;
