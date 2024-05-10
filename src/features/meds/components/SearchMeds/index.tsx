'use client';

import {
  FilterDropdown,
  NoDataFound,
  Pagination,
  ProductCard,
  Skeleton,
  SortDropdown,
} from '@/components/common';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import MedsSortDropdown from '../MedsSortDropdown';
import {
  DUMMY_CATEGORIES,
  DUMMY_PRODUCT,
  DUMMY_SPECIALISTS,
} from '@/constants/dummy';
import { UserContext } from '@/context/UserProvider';
import { User } from '@/types/User';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product, NearestProductsParams } from '@/types/Product';
import { PaginationInfo } from '@/types/PaginationInfo';
import { getNearestProducts } from '@/services/product';
import { toast } from 'react-toastify';
import { DEFAULT_ADDRESS } from '@/constants/address';
import { formatCoordinateToLongLat } from '@/utils/formatter';
import { ProductCardSkeleton } from '..';
import { MEDS_SORT_OPTIONS } from '@/constants/sort';

type SearchMedsProps = {
  user?: User;
};

const SearchMeds = ({ user }: SearchMedsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const coordinate =
    user && user?.addresses?.length > 0
      ? formatCoordinateToLongLat(user?.addresses[0]?.coordinate || '')
      : {
          longitude: DEFAULT_ADDRESS.longitude,
          latitude: DEFAULT_ADDRESS.latitude,
        };

  const [params, setParams] = useState<NearestProductsParams>({
    keyword: searchParams.get('keyword') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
    categoryId: searchParams.get('categoryId') || '',
    sortBy: searchParams.get('sortBy') || '',
    sort: searchParams.get('sort') || 'desc',
    longitude: coordinate.longitude,
    latitude: coordinate.latitude,
  });

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total_data: 0,
    total_page: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
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
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getNearestProducts(params);
        setProducts(res.products);
        setPaginationInfo(res.pagination_info);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
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

  const handleFilter = (categoryId: string) => {
    const newParams = {
      ...params,
      categoryId: categoryId,
    };
    setParams(newParams);
    handleChangeParams(newParams);
  };

  const handleResetFilter = () => {
    handleFilter('');
  };

  const handleChangeParams = useCallback(
    (params: NearestProductsParams) => {
      const newParams = new URLSearchParams(searchParams);
      Object.keys(params).map((key) => {
        if (key !== 'limit') {
          let val = params[key as keyof typeof params].toString();
          if (val !== '') {
            newParams.set(key, val);
          } else {
            newParams.delete(key);
          }
          newParams.delete('longitude');
          newParams.delete('latitude');
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
              {products.length +
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
              options={MEDS_SORT_OPTIONS}
            />
            <FilterDropdown
              options={DUMMY_SPECIALISTS}
              selected={params.categoryId}
              onFilter={handleFilter}
              onReset={handleResetFilter}
            />
          </div>
        </div>
        <div>
          {!isLoading ? (
            <>
              {products.length > 0 ? (
                <div className="grid gap-3 mt-4 mb-4 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))] sm:gap-4 md:gap-6">
                  {products.map((product, idx) => (
                    <ProductCard
                      key={idx}
                      width="max-w-[197.2px]"
                      product={product}
                      isAuthenticated={!!user}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound className="py-16" />
              )}
            </>
          ) : (
            <div className="grid gap-3 mt-4 mb-4 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))] sm:gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((val, idx) => (
                <ProductCardSkeleton key={idx} />
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

export default SearchMeds;
