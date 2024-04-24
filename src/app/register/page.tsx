import { Auth } from '@/components/layout';
import RegistrationForm from '@/features/auth/components/RegistrationForm';

const Register = () => {
  return (
    <Auth>
      <RegistrationForm />
    </Auth>
  );
};

export default Register;
