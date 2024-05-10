import { Button } from '@/components/common';
import { createPharmacyProduct } from '@/features/admin/action/pharmacyProduct';
import { AddPharmacyProductForm } from '@/features/admin/components';
import { Save } from 'lucide-react';

const AddPharmacyProduct = () => {
  return (
    <form action={createPharmacyProduct} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Add Pharmacy Product
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
        <AddPharmacyProductForm />
      </div>
    </form>
  );
};

export default AddPharmacyProduct;
