import Addresses from '@/components/common/Addresses';
import { getProfile } from '@/services/profile';
import { User } from '@/types/User';

const MyAddresses = async () => {
  let profile: User;
  try {
    profile = await getProfile();
  } catch (err) {
    return;
  }

  return <Addresses profile={profile} />;
};

export default MyAddresses;
