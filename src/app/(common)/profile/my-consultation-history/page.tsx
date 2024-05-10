import ConsultationHistory from '@/features/consult/components/ConsultationHistory';
import { getUser } from '@/services/session';
import { redirect } from 'next/navigation';

const MyConsultationHistory = async () => {
  const user = await getUser();

  if (!user || user.role !== 'user') {
    redirect('/');
  }

  return <ConsultationHistory user={user} />;
};

export default MyConsultationHistory;
