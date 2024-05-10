'use client';

import { Input } from '@/components/common';
import { validate } from '@/utils/validation';
import { useRef, useState } from 'react';

const CreateAdminForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    password: '',
    'password-confirmation': '',
    'birth-date': '',
  });
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

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

  const handleInput = (key: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[key] = `${key.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    if (key == 'password-confirmation' && value !== password.current?.value) {
      errs[key] = `password and confirmation password must be same`;
      setErrors({ ...errs });
      return;
    }

    errs[key] = validate(value, key);
    errs['password-confirmation'] =
      key.endsWith('password') &&
      value !== confirmPassword.current?.value &&
      confirmPassword.current?.value !== ''
        ? 'password and confirmation password must be same'
        : '';

    setErrors({ ...errs });
  };

  return (
    <div className="flex flex-col gap-y-6 mt-5">
      <label htmlFor="name">
        <h5 className="text-sm text-dark-gray">Name</h5>
        <Input
          ref={name}
          id="name"
          name="name"
          placeholder="Type your fullname..."
          message={errors['name']}
          invalid={errors['name'] !== ''}
          onInput={({ target }) =>
            handleInput('name', (target as HTMLInputElement).value)
          }
          inputClass="w-full"
        />
      </label>
      <label htmlFor="email">
        <h5 className="text-sm text-dark-gray">Email</h5>
        <Input
          ref={email}
          id="email"
          name="email"
          type="email"
          placeholder="Type your email ..."
          message={errors['email']}
          invalid={errors['email'] !== ''}
          onInput={({ target }) =>
            handleInput('email', (target as HTMLInputElement).value)
          }
          inputClass="w-full"
        />
      </label>
      <label htmlFor="password">
        <h5 className="text-sm text-dark-gray">Password</h5>
        <Input
          ref={password}
          id="password"
          name="password"
          placeholder="Type a strong password ..."
          type={showPassword ? 'password' : 'text'}
          append={showPassword ? 'EyeOff' : 'Eye'}
          message={errors['password']}
          onInput={({ target }) =>
            handleInput('password', (target as HTMLInputElement).value)
          }
          onBlur={handleOnBlurPassword}
          invalid={errors['password'] !== ''}
          onAppend={() => setShowPassword(!showPassword)}
          inputClass="w-full"
        />
      </label>
      <div className="flex flex-col gap-y-3">
        <label htmlFor="password-confirmation">
          <h5 className="text-sm text-dark-gray">Confirm Password</h5>
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
            inputClass="w-full"
          />
        </label>
        <span className="text-xs text-dark-gray">
          Minimum 8 characters with at least one uppercase, one lowercase, one
          special character and a number
        </span>
      </div>
    </div>
  );
};

export default CreateAdminForm;
