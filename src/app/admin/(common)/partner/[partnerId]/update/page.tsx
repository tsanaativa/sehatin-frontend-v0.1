import PartnerForm from '@/features/admin/components/PartnerForm';
import { getPartner } from '@/services/partner';

const UpdatePartner = async ({ params }: { params: { partnerId: string } }) => {
  const defaultData = await getPartner(params.partnerId);

  return <PartnerForm isEditing defaultData={defaultData} />;
};

export default UpdatePartner;
