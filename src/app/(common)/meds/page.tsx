import { Button } from '@/components/common';
import CategoriesSection from '@/components/common/CategoriesSection';
import ProductsSection from '@/components/common/ProductsSection';
import React from 'react';

const Meds = () => {
  return (
    <div className="flex flex-col">
      <CategoriesSection />
      <ProductsSection title="Vitamin C" seeAllUrl="/meds/category/1" />
      <ProductsSection title="Obat Sakit Kepala" seeAllUrl="/meds/category/2" />
      <div className="w-full flex justify-center mt-2 md:mt-10">
        <Button
          className="w-full md:max-w-[300px] my-6"
          variant="outlined-primary"
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Meds;
