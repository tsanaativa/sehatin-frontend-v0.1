'use client';

import { Button } from '@/components/common';
import ProductsSection from '@/features/meds/components/ProductsSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import { Category } from '@/types/Category';
import React, { useState } from 'react';

const LoadMoreMeds = () => {
  const NUMBER_OF_CATEGORIES_TO_FETCH = 2;
  const [offset, setOffset] = useState(NUMBER_OF_CATEGORIES_TO_FETCH);
  const [categories, setCategories] = useState<Category[]>(
    DISPLAYED_CATEGORIES.slice(0, 2)
  );

  const loadMoreUsers = async () => {
    const offsetToFetch = offset + NUMBER_OF_CATEGORIES_TO_FETCH;
    setOffset(offsetToFetch);
    setCategories(DISPLAYED_CATEGORIES.slice(0, offsetToFetch));
  };

  return (
    <div>
      {categories.map((category, idx) => (
        <ProductsSection category={category} key={idx} />
      ))}
      {offset !== 8 && (
        <div className="w-full flex justify-center mt-2 md:mt-10">
          <Button
            className="w-full my-6 md:text-lg md:max-w-[300px]"
            variant="outlined-primary"
            onClick={loadMoreUsers}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoadMoreMeds;
