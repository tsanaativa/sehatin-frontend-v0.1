import { Auth } from '@/components/layout';
import RegistrationForm from '@/features/auth/components/RegistrationForm';

const Register = () => {
  return (
    <Auth reverse>
      <RegistrationForm />
    </Auth>
  );
};

export default Register;
