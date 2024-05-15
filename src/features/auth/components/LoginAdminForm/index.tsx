'use client';

import { Button, Input, RadioBox } from '@/components/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { loginAdmin } from '../../actions/login';
import { DoctorBadge, PatientBadge } from '@/assets/icons';
import { Store, UserRoundCog } from 'lucide-react';

const LoginAdminForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'admin' | 'pharmacyManager'>('admin');
  const [errors, setErrors] = useState<Record<string, string>>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleInput = (id: 'email' | 'password', value: string) => {
    const errs = errors;
    if (value == '') {
      errs[id] = `${id} cannot be empty`;
      setErrors({ ...errs });
      return;
    }
    errs[id] = '';
    setErrors({ ...errs });
  };

  const { push } = useRouter();
  const handleSubmit = async () => {
    const errs = errors;
    if (email.current?.value == '') {
      errs['email'] = 'email cannot be empty';
    }
    if (password.current?.value == '') {
      errs['password'] = 'password cannot be empty';
    }
    if (Object.values(errs).some((e) => e !== '')) {
      setErrors({ ...errs });
      return;
    }
  };

  const loginAction = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const message = await loginAdmin(formData);
      if (message) toast.success('successfully logged in');
      push('/admin/dashboard');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="text-dark-gray leading-[150%] tracking-[0.5px] mb-[6px]">
        Please select your role
      </div>
      <form
        action={loginAction}
        className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <div className="flex items-center gap-[20px] [&_span]:pt-[7px] [&_span]:text-[11px] mt-[6px]">
          <RadioBox
            id="admin"
            name="role"
            value="admin"
            isActive={role === 'admin'}
            onChange={() => setRole('admin')}
          >
            <UserRoundCog size={30} />
            <span>Admin</span>
          </RadioBox>
          <RadioBox
            id="pharmacyManager"
            name="role"
            value="pharmacyManager"
            isActive={role === 'pharmacyManager'}
            onChange={() => setRole('pharmacyManager')}
          >
            <Store size={30} />
            <span>Partner</span>
          </RadioBox>
        </div>
        <label htmlFor="email">
          <h5>Email</h5>
          <Input
            ref={email}
            id="email"
            name="email"
            type="email"
            message={errors['email']}
            invalid={errors['email'] !== ''}
            onInput={({ target }) =>
              handleInput('email', (target as HTMLInputElement).value)
            }
            inputClass="w-full"
          />
        </label>
        <label htmlFor="password">
          <h5>Password</h5>
          <Input
            ref={password}
            id="password"
            name="password"
            type={showPassword ? 'password' : 'text'}
            append={showPassword ? 'EyeOff' : 'Eye'}
            message={errors['password']}
            onInput={({ target }) =>
              handleInput('password', (target as HTMLInputElement).value)
            }
            invalid={errors['password'] !== ''}
            onAppend={() => setShowPassword(!showPassword)}
            inputClass="w-full"
          />
        </label>
        <Link
          href="/forgot-password"
          className="text-right text-dark-gray hover:text-primary-dark transition duration-300"
        >
          Forgot Password
        </Link>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="h-14 mt-7 grid place-items-center"
          variant="primary"
          loading={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginAdminForm;
