'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_DOCTOR_SORT_OPTIONS } from '@/constants/sort';
import { DOCTOR_COLUMN_LIST } from '@/constants/tables';
import { getAllDoctor } from '@/services/doctor';
import { Doctor } from '@/types/Doctor';
import { PaginationInfo } from '@/types/PaginationInfo';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setParams((prev) => ({
      ...prev,
      page: prev.keyword !== newKeyword ? 1 : prev.page,
      keyword: newKeyword,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const res = await getAllDoctor();
        setAllDoctors(res.doctors);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchAllDoctors();
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

  return (
    <>
      <div className="flex justify-between mt-6">
        <Input inputClass="h-9" prepend="Search" placeholder="search" />
        <div className="flex gap-x-4">
          <SortDropdown
            onSort={handleSort}
            sortBy={params.sortBy}
            sort={params.sort}
            options={ADMIN_DOCTOR_SORT_OPTIONS}
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
        dataList={allDoctors}
        columnList={DOCTOR_COLUMN_LIST}
        tabelName="doctor"
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminDoctorList;
