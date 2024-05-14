'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { STOCK_MUTATION_SORT_OPTIONS } from '@/constants/sort';
import { STOCK_MUTATION_COLUMN_LIST } from '@/constants/tables';
import useDebounce from '@/hooks/useDebounce';
import { getStockMutations } from '@/services/stock_mutation';
import { PaginationInfo } from '@/types/PaginationInfo';
import { StockMutation } from '@/types/StockMutation';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminStockMutationList = () => {
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

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setParams((prev) => ({
      ...prev,
      page: prev.keyword !== newKeyword ? 1 : prev.page,
      keyword: newKeyword,
    }));
  }, [searchParams]);

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

  const [isLoading, setIsLoading] = useState(true);

  const debounce = useDebounce(params, 500);
  const [allMutations, setAllMutations] = useState<StockMutation[]>([]);

  useEffect(() => {
    if (debounce) {
      const fetchAllMutations = async () => {
        try {
          const res = await getStockMutations(params);
          setPaginationInfo(res.pagination_info);
          setAllMutations(res.stock_transfers);
        } catch (error: any) {
          if (error.message !== 'Error: data not found')
            toast.error(error.message);
        }
        setIsLoading(false);
      };

      fetchAllMutations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

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
            options={STOCK_MUTATION_SORT_OPTIONS}
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
        dataList={allMutations}
        columnList={STOCK_MUTATION_COLUMN_LIST}
        tabelName="pharmacy"
        loading={isLoading}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminStockMutationList;
