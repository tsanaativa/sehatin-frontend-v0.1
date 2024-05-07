'use client';

import { Input, Selector } from '@/components/common';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import { validate } from '@/utils/validation';
import { useRef, useState } from 'react';

const UpdateDoctorForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    password: '',
    'password-confirmation': '',
    'birth-date': '',
    specialist: '',
    'consultation-fee-number': '',
    'doctor-certificate': '',
  });
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [specialty, setSpecialty] = useState<string>('');
  const [filename, setFilename] = useState<string>('');

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);
  const consultationFee = useRef<HTMLInputElement>(null);
  const certificate = useRef<HTMLInputElement>(null);

  const specialistOptions = DUMMY_SPECIALISTS;

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

  const handleDate = (target: HTMLInputElement) => {
    const value = new Date(target.value);
    const year = value.getFullYear();
    const month = value.getMonth();
    const day = value.getDate();
    const result = `${year}/${month >= 9 ? month + 1 : `0${month + 1}`}/${day}`;
    setBirthDate(result);
    handleInput('birth-date', result);
  };

  const handleSpecialty = (option: string) => {
    setSpecialty(option);
    handleInput('specialist', option);
  };

  const handleCertificate = async (target: HTMLInputElement) => {
    const errs = errors;
    if (target.files) {
      const fileSize = Math.round((target.files[0].size / 1024) * 100) / 100;
      if (fileSize > 1000) {
        errs['doctor-certificate'] =
          `maximum file size is 1 MB, while your upload size is ${fileSize} KB`;
        setErrors({ ...errs });
        return;
      }
      errs['doctor-certificate'] = '';
      setErrors({ ...errs });
      setFilename(target.files[0].name);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <label htmlFor="name">
          <h5 className="text-sm text-dark-gray">Name</h5>
          <Input
            ref={name}
            id="name"
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
        <label htmlFor="birth-date">
          <h5 className="text-sm text-dark-gray">Birth Date</h5>
          <Input
            ref={birthDatePicker}
            id="birth-date"
            name="birth-date"
            placeholder="Enter your birth date ..."
            append="Calendar"
            type="date"
            valueMode={birthDate}
            onInput={({ target }) => handleDate(target as HTMLInputElement)}
            message={errors['birth-date']}
            invalid={errors['birth-date'] !== ''}
            onAppend={() => {
              birthDatePicker.current?.focus();
              birthDatePicker.current?.showPicker();
            }}
            inputClass="w-full"
          />
        </label>
        <div>
          <h5 className="text-sm text-dark-gray">Gender</h5>
          <div
            className="flex gap-16 items-center [&>label]:flex [&>label]:cursor-pointer [&>label]:items-center [&>label]:gap-1.5 [&_input]:hidden
              [&_mark]:grid [&_mark]:place-items-center [&_mark]:w-4 [&_mark]:h-4 [&_mark]:rounded-full [&_mark]:border-[1px] [&_mark]:border-gray
              [&_mark]:bg-transparent after:[&_mark]:content-[''] after:[&_mark]:h-2.5 after:[&_mark]:w-2.5 after:[&_mark]:rounded-full
              after:[&_mark]:bg-primary-dark after:[&_mark]:hidden [&_span]:leading-[150%] [&_span]:tracking-[0.5px]"
          >
            <label htmlFor="male">
              <input
                type="radio"
                name="gender"
                id="male"
                className="peer"
                checked={gender == 'male'}
                onChange={() => setGender('male')}
              />
              <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
              <span>Male</span>
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                name="gender"
                id="female"
                className="peer"
                checked={gender == 'female'}
                onChange={() => setGender('female')}
              />
              <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
              <span>Female</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 w-1/3">
        <label htmlFor="specialist">
          <h5>Specialist</h5>
          <Selector
            id="specialist"
            options={specialistOptions}
            selected={specialty}
            name="specialist"
            searchable
            required
            onSelect={handleSpecialty}
            invalid={errors['specialist'] !== ''}
            message={errors['specialist']}
            placeholder="Choose your specialty ..."
          />
        </label>
        <label htmlFor="consultation-fee">
          <h5>Consultation Fee</h5>
          <Input
            ref={consultationFee}
            id="consultation-fee"
            name="consultation-fee"
            placeholder="Type your prefered consultation fee ..."
            prepend="Rp"
            type="number"
            invalid={errors['consultation-fee-number'] !== ''}
            message={errors['consultation-fee-number']}
            onInput={({ target }) =>
              handleInput(
                'consultation-fee-number',
                (target as HTMLInputElement).value
              )
            }
            inputClass="w-full"
          />
        </label>
        <label htmlFor="certificate">
          <h5>Doctor Certificate</h5>
          <div className="flex items-center gap-3">
            <input
              ref={certificate}
              type="file"
              name="certificate"
              id="certificate"
              className="hidden"
              accept="application/pdf"
              onInput={({ target }) => {
                handleCertificate(target as HTMLInputElement);
                (target as HTMLInputElement).value = '';
              }}
            />
            <button
              type="button"
              onClick={() => certificate.current?.click()}
              className="font-poppins text-primary border-[1px] text-sm min-w-32 border-primary rounded-md h-10 px-3 leading-[150%] hover:border-primary-dark hover:text-primary-dark transition-colors duration-300"
            >
              {filename.length > 0 ? 'Change' : 'Choose'} File...
            </button>
            <p className="text-xs leading-[150%] text-dark-gray overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {filename.length > 0 ? filename : 'PDF format, max 1 MB'}
            </p>
          </div>
          {errors['doctor-certificate'].length > 0 && (
            <span className={`text-danger text-xs`}>
              {errors['doctor-certificate']}
            </span>
          )}
        </label>
      </div>
    </>
  );
};

export default UpdateDoctorForm;
