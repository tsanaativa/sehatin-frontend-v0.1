'use client';
import {
  DataTable,
  Input,
  Pagination,
  SortDropdown,
} from '@/components/common';
import { SALES_REPORT_SORT_OPTIONS } from '@/constants/sort';
import { SALES_REPORT_COLUMN_LIST } from '@/constants/tables';
import useDebounce from '@/hooks/useDebounce';
import { getSalesReport } from '@/services/sales_report';
import { PaginationInfo } from '@/types/PaginationInfo';
import { SalesReport } from '@/types/SalesReport';
import { UsersParams } from '@/types/User';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type AdminSalesReportListProps = {
  isAdmin?: boolean;
};

type SalesParams = UsersParams & {
  pharmacyId: string;
};

const AdminSalesReportList = ({ isAdmin }: AdminSalesReportListProps) => {
  const [allReports, setAllReports] = useState<SalesReport[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { pharmacyId } = useParams();

  const [params, setParams] = useState<SalesParams>({
    keyword: searchParams.get('keyword') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
    sortBy: searchParams.get('sortBy') || '',
    sort: searchParams.get('sort') || 'desc',
    pharmacyId: `${pharmacyId}`,
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

  useEffect(() => {
    if (debounce) {
      const fetchAllReports = async () => {
        try {
          const res = await getSalesReport(params);
          setPaginationInfo(res.pagination_info);
          setAllReports(res.sales_reports);
        } catch (error: any) {
          if (error.message !== 'Error: data not found')
            toast.error(error.message);
        }
        setIsLoading(false);
      };

      fetchAllReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const handleChangeParams = useCallback(
    (params: SalesParams) => {
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
            options={SALES_REPORT_SORT_OPTIONS}
          />
        </div>
      </div>
      <DataTable
        className="mt-8"
        dataList={allReports}
        columnList={SALES_REPORT_COLUMN_LIST}
        tabelName="sales"
        loading={isLoading}
      />
      <Pagination paginationInfo={paginationInfo} onMove={handleMovePage} />
    </>
  );
};

export default AdminSalesReportList;
