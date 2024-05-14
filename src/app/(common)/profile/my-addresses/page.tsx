import Addresses from '@/components/common/Addresses';
import { getProfile } from '@/services/profile';

const MyAddresses = async () => {
  const profile = await getProfile();

  return <Addresses profile={profile} />;
};

export default MyAddresses;
