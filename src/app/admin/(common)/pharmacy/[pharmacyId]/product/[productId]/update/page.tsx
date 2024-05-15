import { Button } from '@/components/common';
import { updatePharmacyProductAction } from '@/features/admin/action/pharmacyProduct';
import { UpdatePharmacyProductForm } from '@/features/admin/components';
import { getOnePharmacyProducts } from '@/services/pharmacy';
import { Save } from 'lucide-react';

const UpdatePharmacyProduct = async ({
  params,
}: {
  params: { productId: number };
}) => {
  const pharmacyProduct = await getOnePharmacyProducts(params.productId);

  return (
    <form action={updatePharmacyProductAction} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Update Pharmacy Product
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
        <UpdatePharmacyProductForm pharmacyProduct={pharmacyProduct} />
      </div>
    </form>
  );
};

export default UpdatePharmacyProduct;
