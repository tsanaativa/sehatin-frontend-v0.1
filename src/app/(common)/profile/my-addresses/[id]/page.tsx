import Addresses from '@/components/common/Addresses';
import { getProfile, getUserAddress } from '@/services/profile';

const UpdateAddress = async ({ params }: { params: { id: number } }) => {
  const address = await getUserAddress(params.id);
  // return <Addresses profile={profile} />;
};

export default UpdateAddress;
