import ConsultRoom from '@/features/consult/components/ConsultRoom';
import { getUser } from '@/services/user';
import { logout } from '@/utils/interceptor';
import { redirect } from 'next/navigation';

const Consult = async () => {
  const user = await getUser();

  if (!user) {
    await logout();
    redirect('/');
  }

  return <ConsultRoom user={user} />;
};

export default Consult;
