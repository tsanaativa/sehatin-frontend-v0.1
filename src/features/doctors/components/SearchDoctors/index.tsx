'use client';

import { SortDropdown } from '@/components/common';
import FilterDropdown from '@/components/common/FilterDropdown';
import NoDataFound from '@/components/common/NoDataFound';
import Pagination from '@/components/common/Pagination';
import Skeleton from '@/components/common/Skeleton';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import { DOCTORS_SORT_OPTIONS } from '@/constants/sort';
import DoctorCard from '@/features/doctors/components/DoctorCard';
import DoctorCardSkeleton from '@/features/doctors/components/DoctorCardSkeleton';
import { Doctor, DoctorsParams } from '@/types/Doctor';
import { PaginationInfo } from '@/types/PaginationInfo';
import api from '@/utils/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type SearchDoctorsProps = {
  isAuthenticated: boolean;
};

const SearchDoctors = ({ isAuthenticated }: SearchDoctorsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [params, setParams] = useState<DoctorsParams>({
    keyword: searchParams.get('keyword') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
    specialistId: searchParams.get('specialistId') || '',
    sortBy: searchParams.get('sortBy') || '',
    sort: searchParams.get('sort') || 'desc',
  });

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total_data: 0,
    total_page: 0,
  });

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setParams((prev) => ({
      ...prev,
      page: prev.keyword !== newKeyword ? 1 : prev.page,
      keyword: newKeyword,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<
          DoctorsParams,
          { pagination_info: PaginationInfo; doctors: Doctor[] }
        >(`/doctors`, params);
        setDoctors(res.data.doctors);
        setPaginationInfo(res.data.pagination_info);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
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
    (params: DoctorsParams) => {
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
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex justify-between items-center">
          {!isLoading ? (
            <span className="text-dark-gray text-sm">
              {paginationInfo.limit * paginationInfo.page -
                paginationInfo.limit +
                1}{' '}
              to{' '}
              {doctors.length +
                (paginationInfo.limit * paginationInfo.page -
                  paginationInfo.limit)}{' '}
              of {paginationInfo.total_data} results
            </span>
          ) : (
            <Skeleton>
              <span className="text-dark-gray text-sm bg-gray-light">
                <span className="invisible">0 to 15 of 15 results</span>
              </span>
            </Skeleton>
          )}
          <div className="grid grid-cols-2 gap-2">
            <SortDropdown
              onSort={handleSort}
              sortBy={params.sortBy}
              sort={params.sort}
              options={DOCTORS_SORT_OPTIONS}
            />
            <FilterDropdown
              options={DUMMY_SPECIALISTS}
              selected={params.specialistId}
              onFilter={handleFilter}
              onReset={handleResetFilter}
            />
          </div>
        </div>
        <div>
          {!isLoading ? (
            <>
              {doctors.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 min-w-max gap-3 mb-4 mt-4 sm:gap-4 md:gap-6">
                  {doctors.map((doctor, idx) => (
                    <DoctorCard
                      key={idx}
                      width="md:min-w-[350px]"
                      doctor={doctor}
                      isAuthenticated={isAuthenticated}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound className="py-16" />
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-w-max gap-3 mb-4 mt-4 sm:gap-4 md:gap-6">
              {Array.from({ length: 20 }).map((val, idx) => (
                <DoctorCardSkeleton key={idx} width="md:min-w-[350px]" />
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full py-4">
          <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
        </div>
      </div>
    </div>
  );
};

export default SearchDoctors;
