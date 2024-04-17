import { ProductCard } from '@/components/common';
import FilterDropdown from '@/components/common/FilterDropdown';
import Pagination from '@/components/common/Pagination';
import SortDropdown from '@/components/common/SortDropdown';
import Link from 'next/link';
import React from 'react';

const ProductsByCategory = () => {
  const dummyProducts = [
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-dark-gray text-sm">10 to 20 of 100 results</span>
        <div className="grid grid-cols-2 gap-2">
          <SortDropdown />
          <FilterDropdown />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-light rounded-lg mt-4">
        {dummyProducts.map((product, idx) => {
          return (
            <Link key={idx} href={`meds/product/${product.id}`}>
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
