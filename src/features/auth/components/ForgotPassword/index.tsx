'use client';
import { PatientBadge, DoctorBadge } from '@/assets/icons';
import { Button, RadioBox } from '@/components/common';
import { Auth } from '@/components/layout';
import { useRef, useState } from 'react';
import Input from '@/components/common/Input';
import ForgotHero from '@/assets/images/forgot-password.png';
import forgotPassword from '../../actions/resetpassword';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'doctor'>('user');
  const [error, setError] = useState('');

  const email = useRef<HTMLInputElement>(null);
  const handleInput = (value: string) => {
    if (value == '') {
      setError('email cannot be empty');
      return;
    }
    setError('');
  };

  const onSubmitClick = () => {
    if (email.current?.value == '') {
      setError('email cannot be empty');
      return;
    }
    setTimeout(() => {
      setIsLoading(true);
    }, 0);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await forgotPassword(formData);
      setShowModal(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Auth
      modal={{
        show: showModal,
        onCloseModal: () => setShowModal(false),
        mode: 'CircleCheck',
        btnText: 'OK',
        onConfirm: () => setShowModal(false),
        title: 'Congratulation!',
        caption:
          'An email to get reset password access has been send to you. Please use the access in 10 minutes.',
      }}
      pageTitle="Forgot Password"
      heroImage={ForgotHero}
      wrapperClass="[&_img]:translate-x-20"
    >
      <form
        action={(e) => email.current?.value == '' || handleSubmit(e)}
        className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <div className="flex items-center gap-[20px] [&_span]:pt-[7px] [&_span]:text-[11px] mt-[6px]">
          <RadioBox
            id="user"
            name="role"
            value="user"
            isActive={role === 'user'}
            onChange={() => setRole('user')}
          >
            <PatientBadge isWhite={role !== 'user'} />
            <span>User</span>
          </RadioBox>
          <RadioBox
            id="doctor"
            name="role"
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
            message={error}
            invalid={error !== ''}
            onInput={({ target }) =>
              handleInput((target as HTMLInputElement).value)
            }
            inputClass="w-full"
          />
        </label>
        <Button
          type="submit"
          onClick={onSubmitClick}
          className="h-14 mt-5 grid place-items-center"
          variant="primary"
          loading={isLoading}
        >
          Reset Password
        </Button>
        <Link href="/auth/login">
          <Button
            type="button"
            className="h-14 grid place-items-center w-full"
            variant="outlined-primary"
            loading={isLoading}
          >
            Back to Login
          </Button>
        </Link>
      </form>
    </Auth>
  );
};

export default ForgotPasswordForm;
