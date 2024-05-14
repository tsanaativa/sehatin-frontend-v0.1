'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_PHARMACY_SORT_OPTIONS } from '@/constants/sort';
import { PHARMACY_COLUMN_LIST } from '@/constants/tables';
import {
  getAllPharmacies,
  getAllPharmaciesByPartnerId,
} from '@/services/pharmacy';
import { PaginationInfo } from '@/types/PaginationInfo';
import { Pharmacy } from '@/types/Pharmacy';
import { UsersParams } from '@/types/User';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deletePharmacy } from '../../action/pharmacy';

type AdminPharmacyListProps = {
  isAdmin?: boolean;
};

const AdminPharmacyList = ({ isAdmin = false }: AdminPharmacyListProps) => {
  const { partnerId } = useParams();
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

  const [allPharmacies, setAllPharmacies] = useState<Pharmacy[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setParams((prev) => ({
      ...prev,
      page: prev.keyword !== newKeyword ? 1 : prev.page,
      keyword: newKeyword,
    }));
  }, [searchParams]);

  const fetchAllPharmacies = async () => {
    try {
      const res = await getAllPharmacies(searchParams);
      setPaginationInfo(res.pagination_info);
      setAllPharmacies(res.pharmacies);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchPartnerPharmacies = async () => {
    try {
      const res = await getAllPharmaciesByPartnerId(
        `${partnerId}`,
        searchParams
      );
      setPaginationInfo(res.pagination_info);
      setAllPharmacies(res.pharmacies);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPartnerPharmacies();
    } else {
      fetchAllPharmacies();
    }
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
      await deletePharmacy(id);
      toast.error('successfully deleted');
      if (isAdmin) {
        fetchPartnerPharmacies();
      } else {
        fetchAllPharmacies();
      }
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
          defaultValue={params.keyword}
          onChange={handleSearch}
        />
        <div className="flex gap-x-4">
          <SortDropdown
            onSort={handleSort}
            sortBy={params.sortBy}
            sort={params.sort}
            options={ADMIN_PHARMACY_SORT_OPTIONS}
          />
        </div>
      </div>
      <DataTable
        className="mt-8"
        dataList={allPharmacies}
        columnList={PHARMACY_COLUMN_LIST}
        tabelName={isAdmin ? 'adminPharmacy' : 'pharmacy'}
        loading={isLoading}
        onDelete={handleDelete}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminPharmacyList;
