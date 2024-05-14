import { AvatarUploader, Button } from '@/components/common';
import { UpdateMedicineForm } from '@/features/admin/components';
import { getProduct } from '@/services/medicine';
import { Save } from 'lucide-react';

const UpdateMedicine = async ({
  params,
}: {
  params: { medicineId: number };
}) => {
  const product = await getProduct(params.medicineId);

  return <UpdateMedicineForm product={product} />;
};

export default UpdateMedicine;
