import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from './PaginationButton';

const Pagination = () => {
  return (
    <div className="flex justify-center gap-2 w-full">
      <PaginationButton disabled>
        <ChevronLeft />
      </PaginationButton>
      <PaginationButton active>1</PaginationButton>
      <PaginationButton>2</PaginationButton>
      <PaginationButton>3</PaginationButton>
      <PaginationButton>4</PaginationButton>
      <div className="bg-light text-dark-gray w-10 h-10 flex items-center justify-center rounded">
        ...
      </div>
      <PaginationButton>
        <ChevronRight />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
