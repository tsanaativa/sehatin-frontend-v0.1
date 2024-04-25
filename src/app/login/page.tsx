import { Auth } from '@/components/layout';
import LoginForm from '@/features/auth/components/LoginForm';
import LoginHero from '@/assets/images/login-hero.png';

const Login = () => {
  return (
    <Auth pageTitle="Login" heroImage={LoginHero}>
      <LoginForm />
    </Auth>
  );
};

export default Login;
