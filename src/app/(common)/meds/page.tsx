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
      <Button className="w-full my-6" variant="outlined-primary">
        Load More
      </Button>
    </div>
  );
};

export default Meds;
