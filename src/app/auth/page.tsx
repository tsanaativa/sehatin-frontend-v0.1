import WaitingOauth from '@/features/auth/components/WaitingOauth';
import { Suspense } from 'react';

const Auth = () => {
  return (
    <Suspense>
      {' '}
      <WaitingOauth />
    </Suspense>
  );
};

export default Auth;
