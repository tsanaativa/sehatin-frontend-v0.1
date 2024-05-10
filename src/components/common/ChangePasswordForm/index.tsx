'use client';
import React, { useRef, useState } from 'react';
import { Button, Input } from '@/components/common';
import { validate } from '@/utils/validation';
import { post } from '@/utils/api';
import { toast } from 'react-toastify';

type ChangePasswordFormProps = {
  onSuccess: () => void;
};

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({
    password: '',
    'new-password': '',
    'password-confirmation': '',
  });

  const password = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

  const handleOnBlurPassword = () => {
    const errs = errors;
    if (newPassword.current?.value !== confirmPassword.current?.value) {
      errs['password-confirmation'] =
        'new password and confirmation must be same';
      setErrors({ ...errs });
      return;
    }
    errs['password-confirmation'] = '';
    setErrors({ ...errs });
  };

  const handleInput = (id: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[id] = `${id.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    if (id == 'password-confirmation' && value !== newPassword.current?.value) {
      errs[id] = `new password and confirmation password must be same`;
      setErrors({ ...errs });
      return;
    }

    if (id !== 'password') {
      errs[id] = validate(value, id);
    }

    errs['password-confirmation'] =
      id === 'new-password' &&
      value !== confirmPassword.current?.value &&
      confirmPassword.current?.value !== ''
        ? 'new password and confirmation password must be same'
        : '';

    setErrors({ ...errs });
  };

  const invalidSubmission = () => {
    return Object.values(errors).some((err) => err !== '');
  };

  const anyEmptyField = () => {
    return (
      password.current?.value == '' ||
      newPassword.current?.value == '' ||
      confirmPassword.current?.value == ''
    );
  };

  const handleSubmit = () => {
    if (invalidSubmission() || anyEmptyField()) {
      const allErrors = Object.fromEntries(
        Object.keys(errors).map((i) => {
          const err: Record<string, string> = {
            password:
              password.current?.value == ''
                ? 'password cannot be empty'
                : errors['password'],
            'new-password':
              newPassword.current?.value == ''
                ? 'new password cannot be empty'
                : errors['new-password'],
            'password-confirmation':
              confirmPassword.current?.value == ''
                ? 'confirmation password cannot be empty'
                : errors['password-confirmation'],
          };
          return [i, err[i]];
        })
      );
      setErrors({ ...allErrors });
      return;
    }

    const req = {
      password: password.current?.value,
      new_password: newPassword.current?.value,
    };
    handleChangePassword(req);
  };

  const handleChangePassword = async (req: any) => {
    try {
      await post(`/auth/change-password`, req);
      toast.success('successfully changed password');
      onSuccess();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div>
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
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
            onBlur={handleOnBlurPassword}
            invalid={errors['password'] !== ''}
            onAppend={() => setShowPassword(!showPassword)}
          />
        </label>
        <label htmlFor="new-password">
          <h5>New Password</h5>
          <Input
            ref={newPassword}
            id="new-password"
            name="new-password"
            type={showNewPassword ? 'password' : 'text'}
            append={showNewPassword ? 'EyeOff' : 'Eye'}
            message={errors['new-password']}
            onInput={({ target }) =>
              handleInput('new-password', (target as HTMLInputElement).value)
            }
            onBlur={handleOnBlurPassword}
            invalid={errors['new-password'] !== ''}
            onAppend={() => setShowNewPassword(!showNewPassword)}
          />
        </label>
        <label htmlFor="password-confirmation">
          <h5>Confirm Password</h5>
          <Input
            ref={confirmPassword}
            id="password-confirmation"
            name="password-confirmation"
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
        <Button className="h-14 mt-2" variant="primary">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
