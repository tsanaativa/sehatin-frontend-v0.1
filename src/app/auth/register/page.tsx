import { Auth } from '@/components/layout';
import RegistrationForm from '@/features/auth/components/RegisterForm';

const Register = () => {
  return (
    <Auth reverse wrapperClass="lg:[&>*]:max-w-[1024px]">
      <RegistrationForm />
    </Auth>
  );
};

export default Register;
