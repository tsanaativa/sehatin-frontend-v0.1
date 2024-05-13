'use client';
import { Button } from '@/components/common';
import { Auth } from '@/components/layout';
import Input from '@/components/common/Input';
import React, { useEffect, useRef, useState } from 'react';
import ResetHero from '@/assets/images/reset-password.png';
import { AuthModalProps } from '@/components/layout/Auth';
import { validate } from '@/utils/validation';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { resetPassword } from '../../actions/resetpassword';
import { parseJwt } from '@/utils/helper';
import Link from 'next/link';

const ResetPasswordForm = () => {
  const urlParam = useSearchParams();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({
    new_password: '',
    'password-confirmation': '',
  });
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleOnBlurPassword = () => {
    const errs = errors;
    if (confirmPassword.current?.value !== password.current?.value) {
      errs['password-confirmation'] = 'password and confirmation must be same';
      setErrors({ ...errs });
      return;
    }
    errs['password-confirmation'] = '';
    setErrors({ ...errs });
  };

  const invalidSubmission = () => Object.values(errors).some((e) => e != '');
  const anyEmptyField = () =>
    password.current?.value == '' || confirmPassword.current?.value == '';

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<
    Omit<AuthModalProps, 'show' | 'onCloseModal'>
  >({
    mode: 'CircleCheck',
    btnText: 'OK',
    onConfirm: () => push('/auth/login'),
    title: 'Reset Password Success!',
    caption: 'You have successfully reset your password.',
  });

  const handleInput = (id: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[id] = `${id.replace(/[^a-zA-Z ]/, ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    if (id == 'password-confirmation' && value !== password.current?.value) {
      errs[id] = `password and confirmation password must be same`;
      setErrors({ ...errs });
      return;
    }

    errs[id] = validate(value, id);
    errs['password-confirmation'] =
      value !== confirmPassword.current?.value &&
      confirmPassword.current?.value !== ''
        ? 'password and confirmation password must be same'
        : '';

    setErrors({ ...errs });
  };

  const onSubmitClick = () => {
    if (invalidSubmission() || anyEmptyField()) {
      const errs = Object.fromEntries(
        Object.keys(errors).map((i) => {
          const err: Record<string, string> = {
            password:
              password.current?.value == ''
                ? 'password cannot be empty'
                : errors['password'],
            'password-confirmation':
              confirmPassword.current?.value == ''
                ? 'confirmation password cannot be empty'
                : errors['password-confirmation'],
          };
          return [i, err[i]];
        })
      );
      setErrors({ ...errs });
      return;
    }
    setTimeout(() => {
      setIsLoading(true);
    }, 0);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const token = urlParam.get('token');
      const jwt = parseJwt(token as string);
      let email = jwt.split('userEmail":"')[1];
      formData.append('email', email.split('"')[0]);
      formData.append('token', token as string);
      await resetPassword(formData);
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
          onConfirm: () => push('/auth/forgot-password'),
          title: 'Expired Access!',
          caption:
            'Access to reset the password has been expired. Click the button bellow to get new access.',
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
        onConfirm: () => push('/auth/login'),
        title: 'Unauthorized!',
        caption:
          "You don't have permission to access this page and will be redirected to login page automatically in 3 second",
      });
      setShowModal(true);
      setTimeout(() => {
        push('/auth/login');
      }, 3000);
    }
  }, [push, urlParam]);
  return (
    <Auth
      modal={{
        show: showModal,
        onCloseModal: () => {},
        ...modalData,
      }}
      heroImage={ResetHero}
      pageTitle="Confirm Reset Password"
    >
      <form
        action={(e) =>
          invalidSubmission() || anyEmptyField() || handleSubmit(e)
        }
        className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <label htmlFor="new_password">
          <h5>New Password</h5>
          <Input
            ref={password}
            id="new_password"
            name="new_password"
            placeholder="Type a strong password ..."
            type={showPassword ? 'password' : 'text'}
            append={showPassword ? 'EyeOff' : 'Eye'}
            message={errors['new_password']}
            onInput={({ target }) =>
              handleInput('new_password', (target as HTMLInputElement).value)
            }
            onBlur={handleOnBlurPassword}
            invalid={errors['new_password'] !== ''}
            onAppend={() => setShowPassword(!showPassword)}
          />
        </label>
        <label htmlFor="password-confirmation">
          <h5>Confirm Password</h5>
          <Input
            ref={confirmPassword}
            id="password-confirmation"
            name="password-confirmation"
            placeholder="Confirm your password ..."
            append={showConfirmPassword ? 'EyeOff' : 'Eye'}
            type={showConfirmPassword ? 'password' : 'text'}
            message={errors['password-confirmation']}
            invalid={errors['password-confirmation'] !== ''}
            onInput={({ target }) =>
              handleInput(
                'password-confirmation',
                (target as HTMLInputElement).value
              )
            }
            onAppend={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </label>
        <Button
          type="submit"
          loading={isLoading}
          onClick={onSubmitClick}
          className="h-14 mt-9"
          variant="primary"
        >
          Confirm Reset Password
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

export default ResetPasswordForm;
