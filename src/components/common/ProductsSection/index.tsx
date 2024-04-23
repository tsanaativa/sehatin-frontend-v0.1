import React from 'react';
import { ProductCard } from '..';
import CategorizeSection from '../CategorizeSection';

type ProductsSectionProps = {
  title: string;
  seeAllUrl: string;
};

const ProductsSection = ({ title, seeAllUrl }: ProductsSectionProps) => {
  return (
    <CategorizeSection title={title} seeAllUrl={seeAllUrl}>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 min-w-max gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-4">
          {Array.from({ length: 6 }).map((val, idx) => (
            <ProductCard key={idx} width="max-w-[197.2px]" />
          ))}
        </div>
      </div>
    </CategorizeSection>
  );
};

export default ProductsSection;
