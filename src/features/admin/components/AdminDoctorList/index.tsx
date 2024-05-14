'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_DOCTOR_SORT_OPTIONS } from '@/constants/sort';
import { DOCTOR_COLUMN_LIST } from '@/constants/tables';
import useDebounce from '@/hooks/useDebounce';
import { getAllDoctor } from '@/services/doctor';
import { Doctor } from '@/types/Doctor';
import { PaginationInfo } from '@/types/PaginationInfo';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteDoctorAction } from '../../action/doctor';

const AdminDoctorList = () => {
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

  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const debounce = useDebounce(params, 500);

  const fetchAllDoctors = async () => {
    try {
      const res = await getAllDoctor(debounce);
      setPaginationInfo(res.pagination_info);
      setAllDoctors(res.doctors);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (debounce) {
      fetchAllDoctors();
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
      await deleteDoctorAction(id);
      toast.success('successfully deleted');
      fetchAllDoctors();
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
        <SortDropdown
          onSort={handleSort}
          sortBy={params.sortBy}
          sort={params.sort}
          options={ADMIN_DOCTOR_SORT_OPTIONS}
        />
      </div>
      <DataTable
        className="mt-8"
        dataList={allDoctors}
        columnList={DOCTOR_COLUMN_LIST}
        tabelName="doctor"
        loading={isLoading}
        onDelete={handleDelete}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminDoctorList;
