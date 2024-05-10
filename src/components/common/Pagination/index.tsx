'use client';

import { usePagination } from '@/hooks/usePagination';
import { PaginationInfo } from '@/types/PaginationInfo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from './PaginationButton';

type PaginationProps = {
  className?: string;
  paginationInfo?: PaginationInfo;
  onMove?: (page: number) => void;
};

const Pagination = ({
  className,
  paginationInfo = { page: 1, limit: 10, total_data: 0, total_page: 0 },
  onMove = () => {},
}: PaginationProps) => {
  const currentPage = paginationInfo.page;

  const paginationRange =
    usePagination(
      currentPage,
      paginationInfo.total_data,
      1,
      paginationInfo.limit
    ) || [];

  const lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 0;

  return (
    <div className={`flex justify-center gap-2 md:gap-3 w-full ${className}`}>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onMove(paginationInfo.page - 1)}
      >
        <ChevronLeft />
      </PaginationButton>

      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === '...') {
          return (
            <div
              key={idx}
              className="bg-light text-dark-gray w-10 h-10 flex items-center justify-center rounded"
            >
              ...
            </div>
          );
        }
        return (
          <PaginationButton
            active={currentPage === pageNumber}
            key={idx}
            onClick={() => onMove(pageNumber as number)}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <PaginationButton
        disabled={currentPage === lastPage}
        onClick={() => onMove(paginationInfo.page + 1)}
      >
        <ChevronRight />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
