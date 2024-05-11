'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_USER_SORT_OPTIONS } from '@/constants/sort';
import { USER_COLUMN_LIST } from '@/constants/tables';
import { getAllUser } from '@/services/user';
import { PaginationInfo } from '@/types/PaginationInfo';
import { User, UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [params, setParams] = useState<UsersParams>({
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

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUser(params);
        setAllUsers(res.users);
        setPaginationInfo(res.pagination_info);
      } catch (error: any) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    fetchAllUsers();
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

  const handleFilter = (specialistId: string) => {
    const newParams = {
      ...params,
      specialistId: specialistId,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleResetFilter = () => {
    handleFilter('');
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
            options={ADMIN_USER_SORT_OPTIONS}
          />
          {/* <FilterDropdown
            options={}
            selected=""
            onFilter={handleFilter}
            onReset={handleResetFilter}
          /> */}
        </div>
      </div>
      <DataTable
        className="mt-8"
        dataList={allUsers}
        columnList={USER_COLUMN_LIST}
        tabelName="user"
        loading={isLoading}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminUserList;
