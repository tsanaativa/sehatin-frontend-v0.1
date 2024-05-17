'use client';

import { Button } from '@/components/common';
import { Auth } from '@/components/layout';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/common/Input';
import React, { useEffect, useRef, useState } from 'react';
import ResetHero from '@/assets/images/reset-password.png';
import { AuthModalProps } from '@/components/layout/Auth';
import { toast } from 'react-toastify';
import { resendEmail, verifyEmail } from '../../actions/login';
import { parseJwt } from '@/utils/helper';
import Link from 'next/link';

const VerifyEmailForm = () => {
  const urlParam = useSearchParams();
  const { push } = useRouter();
  const [mailLoad, setMailLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const password = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const invalidSubmission = () => password.current?.value == '' || error != '';

  const [showModal, setShowModal] = useState(false);
  const initModalData: Omit<AuthModalProps, 'show'> = {
    mode: 'CircleCheck',
    btnText: 'OK',
    onConfirm: () => push('/auth/login'),
    onCloseModal: () => {},
    title: 'You Are Now Verified!',
    caption:
      'You have successfully verified your account. Please login to consult to a doctor or order medicine.',
  };

  const [modalData, setModalData] = useState(initModalData);

  const onSubmitClick = () => {
    if (invalidSubmission()) {
      setError((e) =>
        password.current?.value == '' ? 'password cannot be empty' : e
      );
      return;
    }
    setTimeout(() => {
      setIsLoading(true);
    }, 0);
  };

  const resendMail = async () => {
    try {
      const token = urlParam.get('token');
      const jwt = parseJwt(token as string);
      let role = jwt.split('role":"')[1];
      role = role.split('"')[0];
      let email = jwt.split('userEmail":"')[1];
      email = email.split('"')[0];
      const message = await resendEmail({ role, email });
      setShowModal(false);
      toast.success(message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const token = urlParam.get('token');
      formData.append('token', token as string);
      await verifyEmail(formData);
      setModalData(initModalData);
      setShowModal(true);
      setTimeout(() => {
        push('/auth/login');
      }, 3000);
    } catch (error: any) {
      if (
        ['token is expired', 'unauthorized'].some((e) =>
          error.message.includes(e)
        )
      ) {
        setModalData({
          mode: 'CircleAlert',
          btnText: 'Get New Access',
          loading: mailLoad,
          onCloseModal: () => setShowModal(false),
          onConfirm: () => resendMail(),
          title: 'Expired Access!',
          caption:
            'Access to verify your account has been expired. You can request new email by click the button bellow.',
        });
        setShowModal(true);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = urlParam.get('token');
    if (!token) {
      setModalData({
        mode: 'CircleAlert',
        btnText: 'OK',
        onCloseModal: () => {},
        onConfirm: () => push('/auth/register'),
        title: 'Invalid Access!',
        caption:
          "You don't have permission to access this page and will be redirected to register page automatically in 3 second",
      });
      setShowModal(true);
      setTimeout(() => {
        push('/auth/register');
      }, 3000);
    }
  }, [push, urlParam]);
  return (
    <Auth
      modal={{
        show: showModal,
        ...modalData,
      }}
      heroImage={ResetHero}
      pageTitle="Verify Account"
    >
      <form
        action={(e) => invalidSubmission() || handleSubmit(e)}
        className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <label htmlFor="password">
          <h5>Password</h5>
          <Input
            ref={password}
            id="password"
            name="password"
            placeholder="Type a strong password ..."
            type={showPassword ? 'password' : 'text'}
            append={showPassword ? 'EyeOff' : 'Eye'}
            message={error}
            onInput={({ target }) =>
              (target as HTMLInputElement).value == ''
                ? setError('password cannot be empty')
                : setError('')
            }
            invalid={error !== ''}
            onAppend={() => setShowPassword(!showPassword)}
          />
        </label>
        <Button
          type="submit"
          loading={isLoading}
          onClick={onSubmitClick}
          className="h-14 mt-9"
          variant="primary"
        >
          Verify Account
        </Button>
        <Link href="/auth/login">
          <Button
            type="button"
            className="h-14 grid place-items-center w-full"
            variant="outlined-primary"
          >
            Go to Login Page
          </Button>
        </Link>
      </form>
    </Auth>
  );
};

export default VerifyEmailForm;
