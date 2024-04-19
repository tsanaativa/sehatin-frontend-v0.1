import { ProductCard } from '@/components/common';
import FilterDropdown from '@/components/common/FilterDropdown';
import Pagination from '@/components/common/Pagination';
import SortDropdown from '@/components/common/SortDropdown';
import Link from 'next/link';
import React from 'react';

const ProductsByCategory = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-dark-gray text-sm">10 to 20 of 100 results</span>
        <div className="grid grid-cols-2 gap-2">
          <SortDropdown />
          <FilterDropdown />
        </div>
      </div>
      <div className="grid gap-3 sm:gap-4 mt-2 md:mt-4 mb-4 md:gap-6 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))]">
        {Array.from({ length: 6 }).map((product, idx) => {
          return (
            <Link key={idx} href={`meds/product/1`}>
              <ProductCard />
            </Link>
          );
        })}
      </div>
      <div className="flex w-full py-4">
        <Pagination />
      </div>
    </div>
  );
};

export default ProductsByCategory;
