import { DUMMY_CATEGORIES } from '@/constants/dummy';
import Link from 'next/link';
import React from 'react';

const Category = () => {
  return (
    <div className="pb-4">
      <span className="font-poppins font-semibold text-dark md:text-2xl">
        Choose Category
      </span>
      <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
        {DUMMY_CATEGORIES.map((category, idx) => {
          return (
            <Link key={idx} href={`/meds/search?categoryId=${category.id}`}>
              <div
                key={idx}
                className={`border-gray-light px-3 py-2 ${idx + 1 !== DUMMY_CATEGORIES.length && 'border-b md:border-b-0'} md:py-3 md:px-4 ${idx % 3 !== 2 && 'md:border-e'}`}
              >
                {category.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
