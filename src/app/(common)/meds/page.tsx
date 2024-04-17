import { Button } from '@/components/common';
import AddressCard from '@/components/common/AddressCard';
import CategoriesSection from '@/components/common/CategoriesSection';
import ProductsSection from '@/components/common/ProductsSection';
import React from 'react';

const Meds = () => {
  return (
    <div className="flex flex-col gap-6">
      <CategoriesSection />
      <ProductsSection
        title="Vitamin C"
        seeAllUrl="/meds/categories/vitamin-c"
      />
      <ProductsSection
        title="Obat Sakit Kepala"
        seeAllUrl="/meds/categories/obat-sakit-kepala"
      />
      <Button className="w-full mb-6" variant="outlined-primary">
        Load More
      </Button>
    </div>
  );
};

export default Meds;
