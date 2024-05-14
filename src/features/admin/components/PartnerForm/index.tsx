'use client';

import { Button, ChangePasswordButton, Input } from '@/components/common';
import MedPictureUploader from '@/components/common/MedPictureUploader';
import { Partner } from '@/types/Partner';
import { validate } from '@/utils/validation';
import { Save } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createPartner, updatePartner } from '../../action/partner';
import { useParams } from 'next/navigation';

type PartnerFormProps = {
  isEditing?: boolean;
  defaultData?: Partner;
};

const PartnerForm = ({ isEditing, defaultData }: PartnerFormProps) => {
  const { partnerId } = useParams();
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    password: '',
    'password-confirmation': '',
    phone_number: '',
  });

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [logo, setLogo] = useState<File | undefined>();

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

  const handleFileChange = (file: File) => {
    setLogo(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', `${name.current?.value}`);
    formData.append('email', `${email.current?.value}`);
    formData.append('password', `${password.current?.value}`);
    formData.append('phone_number', `${phoneNumber.current?.value}`);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      if (!isEditing) {
        await createPartner(formData);
      } else {
        await updatePartner(`${partnerId}`, formData);
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <form className="my-2" action={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="font-poppins font-semibold text-3xl text-dark">
            {isEditing ? 'Update' : 'Create'} Partner
          </h1>
          <Button
            type="submit"
            loading={isLoading}
            className="flex items-center gap-x-2 px-6 py-3 min-w-[119.6px] min-h-[48px]"
          >
            <Save /> Save
          </Button>
        </div>
        <div className="flex gap-x-12 mt-6">
          <MedPictureUploader
            name="logo"
            onChange={handleFileChange}
            defaultMedPicture={defaultData?.logo}
          />
          <div className=" w-1/2">
            <div className="flex flex-col gap-y-6">
              <label htmlFor="name">
                <h5 className="text-sm text-dark-gray">Name</h5>
                <Input
                  ref={name}
                  id="name"
                  name="name"
                  placeholder="Type name..."
                  message={errors['name']}
                  invalid={errors['name'] !== ''}
                  onInput={({ target }) =>
                    handleInput('name', (target as HTMLInputElement).value)
                  }
                  inputClass="w-full"
                  defaultValue={defaultData?.name}
                />
              </label>
              <label htmlFor="email">
                <h5 className="text-sm text-dark-gray">Email</h5>
                <Input
                  ref={email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Type email ..."
                  message={errors['email']}
                  invalid={errors['email'] !== ''}
                  onInput={({ target }) =>
                    handleInput('email', (target as HTMLInputElement).value)
                  }
                  inputClass="w-full"
                  defaultValue={defaultData?.email}
                  disabled={isEditing}
                />
              </label>
              <label htmlFor="phone_number">
                <h5 className="text-sm text-dark-gray">
                  WhatsApp Phone Number
                </h5>
                <Input
                  ref={phoneNumber}
                  id="phone_number"
                  name="phone_number"
                  placeholder="Type WhatsApp number..."
                  message={errors['phone_number']}
                  invalid={errors['phone_number'] !== ''}
                  onInput={({ target }) =>
                    handleInput(
                      'phone_number',
                      (target as HTMLInputElement).value
                    )
                  }
                  inputClass="w-full"
                  defaultValue={defaultData?.phone_number}
                />
              </label>
              {!isEditing && (
                <>
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
                        handleInput(
                          'password',
                          (target as HTMLInputElement).value
                        )
                      }
                      onBlur={handleOnBlurPassword}
                      invalid={errors['password'] !== ''}
                      onAppend={() => setShowPassword(!showPassword)}
                      inputClass="w-full"
                    />
                  </label>
                  <div className="flex flex-col gap-y-3">
                    <label htmlFor="password-confirmation">
                      <h5 className="text-sm text-dark-gray">
                        Confirm Password
                      </h5>
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
                        onAppend={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        inputClass="w-full"
                      />
                    </label>
                    <span className="text-xs text-dark-gray">
                      Minimum 8 characters with at least one uppercase, one
                      lowercase, one special character and a number
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      {isEditing && (
        <div className="flex mt-7">
          <div className="min-w-[175px]"></div>
          <ChangePasswordButton />
        </div>
      )}
    </>
  );
};

export default PartnerForm;
