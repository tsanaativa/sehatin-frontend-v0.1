import ConsultRoom from '@/features/consult/components/ConsultRoom';
import { getUser } from '@/utils/user';

const Consult = () => {
  const user = getUser();

  return <ConsultRoom user={user} />;
};

export default Consult;
