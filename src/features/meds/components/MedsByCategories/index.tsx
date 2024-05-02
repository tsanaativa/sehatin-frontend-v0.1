'use client';

import { Button } from '@/components/common';
import ProductsSection from '@/features/meds/components/ProductsSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import { Category } from '@/types/Product';
import React, { useState } from 'react';
import Link from 'next/link';

const MedsByCategories = () => {
  const NUMBER_OF_CATEGORIES_TO_FETCH = 2;
  const [offset, setOffset] = useState(NUMBER_OF_CATEGORIES_TO_FETCH);
  const [categories, setCategories] = useState<Category[]>(
    DISPLAYED_CATEGORIES.slice(0, 2)
  );

  const loadMore = async () => {
    const offsetToFetch = offset + NUMBER_OF_CATEGORIES_TO_FETCH;
    setOffset(offsetToFetch);
    setCategories(DISPLAYED_CATEGORIES.slice(0, offsetToFetch));
  };

  return (
    <div>
      {categories.map((category, idx) => (
        <ProductsSection category={category} key={idx} />
      ))}
      <div className="w-full flex justify-center mt-2 md:mt-10">
        {offset !== 8 ? (
          <Button
            className="w-full my-6 md:text-lg md:max-w-[300px]"
            variant="outlined-primary"
            onClick={loadMore}
          >
            Load More
          </Button>
        ) : (
          <Link href="/meds/category" className="w-full md:max-w-[300px]">
            <Button
              className="w-full my-6 px-3 md:px-5 md:text-lg"
              variant="outlined-primary"
            >
              See All Categories
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MedsByCategories;
