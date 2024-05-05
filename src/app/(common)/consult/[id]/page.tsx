import ConsultRoom from '@/features/consult/components/ConsultRoom';
import { getUser } from '@/services/user';
import { redirect } from 'next/navigation';

const Consult = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  return <ConsultRoom user={user} />;
};

export default Consult;
