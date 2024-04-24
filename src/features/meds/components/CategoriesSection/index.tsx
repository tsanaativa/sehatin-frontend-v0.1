import Link from 'next/link';
import React from 'react';
import CategorizeSection from '../../../../components/common/CategorizeSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';

const CategoriesSection = () => {
  return (
    <CategorizeSection title={'Categories'} seeAllUrl={`/meds/category`}>
      <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto  md:gap-x-8 md:text-lg">
        {DISPLAYED_CATEGORIES.map((category, idx) => (
          <Link href={`/meds?categoryId=${category.id}`} key={idx}>
            <div className="h-full bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">{category.icon}</div>
              <span className="line-clamp-2">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </CategorizeSection>
  );
};

export default CategoriesSection;
