'use client';
import { DoctorBadge, PatientBadge } from '@/assets/icons';
import { Button, Icon, Input, RadioBox } from '@/components/common';
import { useRef, useState } from 'react';
import GoogleSection from './GoogleSection';
import Link from 'next/link';
import api from '@/utils/api';
import { LoginResponse } from '@/types/Auth';
import local from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'doctor'>('user');
  const [errors, setErrors] = useState<Record<string, string>>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

    const req = {
      email: email.current?.value,
      password: password.current?.value,
      role: role,
    };

    try {
      setIsLoading(true);
      const res = await api.post('/auth/login', req);
      const user = res.data as LoginResponse;
      local.set(process.env.NEXT_PUBLIC_USER_LOCAL_KEY as string, user);
      toast.success('Successfully logged in');
      push('/');
      console.log(user);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]">
        <div className="flex items-center gap-[20px] [&_span]:pt-[7px] [&_span]:text-[11px] mt-[6px]">
          <RadioBox
            id="user"
            name="user"
            value="user"
            isActive={role === 'user'}
            onChange={() => setRole('user')}
          >
            <PatientBadge isWhite={role !== 'user'} />
            <span>User</span>
          </RadioBox>
          <RadioBox
            id="doctor"
            name="doctor"
            value="doctor"
            isActive={role === 'doctor'}
            onChange={() => setRole('doctor')}
          >
            <DoctorBadge isWhite={role !== 'doctor'} />
            <span>Doctor</span>
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
          />
        </label>
        <Link
          href="/forgot-password"
          className="text-right text-dark-gray hover:text-primary-dark transition duration-300"
        >
          Forgot Password
        </Link>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="h-14 mt-7 grid place-items-center"
          variant="primary"
        >
          <>
            {isLoading ? (
              <Icon
                name="LoaderCircle"
                size={24}
                className="animate-spin text-light"
              />
            ) : (
              'Login'
            )}
          </>
        </Button>
      </form>
      <GoogleSection mode="login" />
    </>
  );
};

export default LoginForm;
