'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { ADMIN_MEDICINE_SORT_OPTIONS } from '@/constants/sort';
import { MEDICINE_COLUMN_LIST } from '@/constants/tables';
import useDebounce from '@/hooks/useDebounce';
import { getAllProducts } from '@/services/medicine';
import { PaginationInfo } from '@/types/PaginationInfo';
import { Product } from '@/types/Product';
import { UsersParams } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteProductAction } from '../../action/product';

const AdminMedicineList = () => {
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

  const [allProduct, setAllProduct] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const debounce = useDebounce(params, 500);

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts(debounce);
      setAllProduct(res.products);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (debounce) {
      fetchAllProducts();
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
      await deleteProductAction(id);
      toast.success('successfully deleted');
      fetchAllProducts();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-6">
        <Input
          inputClass="h-9"
          prepend="Search"
          placeholder="search"
          onChange={handleSearch}
          defaultValue={params.keyword}
        />
        <SortDropdown
          onSort={handleSort}
          sortBy={params.sortBy}
          sort={params.sort}
          options={ADMIN_MEDICINE_SORT_OPTIONS}
        />
      </div>
      <DataTable
        className="mt-8"
        dataList={allProduct}
        columnList={MEDICINE_COLUMN_LIST}
        tabelName="medicine"
        loading={isLoading}
        onDelete={handleDelete}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminMedicineList;
