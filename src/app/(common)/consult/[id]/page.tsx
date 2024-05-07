import ConsultRoom from '@/features/consult/components/ConsultRoom';
import { getUser } from '@/services/session';

const Consult = async () => {
  const user = await getUser();

  return <ConsultRoom user={user} />;
};

export default Consult;
