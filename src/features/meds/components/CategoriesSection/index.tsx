import Link from 'next/link';
import React from 'react';
import CategorizeSection from '../../../../components/common/CategorizeSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import CategorizeCard from '@/components/common/CategorizeCard';

const CategoriesSection = () => {
  return (
    <CategorizeSection title={'Categories'} seeAllUrl={`/meds/category`}>
      <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto md:gap-x-6 md:text-lg">
        {DISPLAYED_CATEGORIES.map((category, idx) => (
          <CategorizeCard
            key={idx}
            link={`/meds?categoryId=${category.id}`}
            icon={category.icon}
            name={category.name}
          />
        ))}
      </div>
    </CategorizeSection>
  );
};

export default CategoriesSection;
