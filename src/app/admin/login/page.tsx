import { Auth } from '@/components/layout';
import LoginAdminForm from '@/features/auth/components/LoginAdminForm';

const LoginAdmin = () => {
  return (
    <Auth pageTitle="Login">
      <LoginAdminForm />
    </Auth>
  );
};

export default LoginAdmin;
