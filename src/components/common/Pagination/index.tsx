import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from './PaginationButton';

type PaginationProps = {
  position?: 'start' | 'center' | 'end';
  className?: string;
};

const Pagination = ({ position = 'center', className }: PaginationProps) => {
  const TYPE_POSITION = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  return (
    <div
      className={`flex ${TYPE_POSITION[position]} gap-2 md:gap-3 w-full ${className}`}
    >
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
