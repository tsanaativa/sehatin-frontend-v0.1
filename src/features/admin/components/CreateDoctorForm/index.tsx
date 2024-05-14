'use client';

import { Button, FileUploader, Input, Selector } from '@/components/common';
import { FileProps } from '@/components/common/FileUploader';
import { getSpecialists } from '@/services/specialist';
import { validate } from '@/utils/validation';
import { Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createDoctorAction } from '../../action/doctor';

const CreateDoctorForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    password: '',
    'password-confirmation': '',
    'birth-date': '',
    specialist: '',
    'consultation-fee-number': '',
    'doctor-certificate': '',
    'work-start': '',
  });
  const [birthDate, setBirthDate] = useState<string>('');
  const [genderId, setGenderId] = useState<1 | 2>(1);
  const [specialty, setSpecialty] = useState<string>('');
  const [workStart, setWorkStart] = useState<string>('');
  const [specialistOptions, setSpecialistOptions] = useState<
    Record<string, string>
  >({});
  const [uploaded, setUploaded] = useState<FileProps>({
    file: null,
    image: '',
    error: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);
  const consultationFee = useRef<HTMLInputElement>(null);
  const certificate = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSpecialistOptions = async () => {
      try {
        const res = await getSpecialists();
        const data = Object.fromEntries(
          res.map((d) => [d.id.toString(), d.name])
        );
        setSpecialistOptions(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchSpecialistOptions();
  }, []);

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

  const workStartOptions = Object.fromEntries(
    [...Array(65)].map((_, idx) => {
      const now = new Date().getFullYear();
      return [`y-${now - idx}`, `${now - idx}`];
    })
  );

  const handleWorkStart = (option: string) => {
    setWorkStart(option);
    handleInput('work-start', option);
  };

  const handleUpload = (uploaded: FileProps) => {
    setUploaded(uploaded);
    if (uploaded.error !== '') {
      setErrors({
        ...errors,
        'doctor-certificate': uploaded.error,
      });
    }
  };

  const handleSubmit = () => {
    const invalidSubmission = Object.values(errors).some((e) => e !== '');
    const anyEmptyField =
      [
        name.current?.value,
        email.current?.value,
        password.current?.value,
        confirmPassword.current?.value,
        birthDatePicker.current?.value,
        consultationFee.current?.value,
      ].includes('') || uploaded.file == null;

    if (invalidSubmission || anyEmptyField) {
      const errs = Object.fromEntries(
        Object.keys(errors).map((e) => {
          const err: Record<string, string> = {
            name:
              name.current?.value == ''
                ? 'name cannot be empty'
                : errors['name'],
            email:
              email.current?.value == ''
                ? 'email cannot be empty'
                : errors['email'],
            password:
              password.current?.value == ''
                ? 'password cannot be empty'
                : errors['password'],
            'password-confirmation':
              confirmPassword.current?.value == ''
                ? 'confirmation password cannot be empty'
                : errors['password-confirmation'],
            'birth-date':
              birthDate == ''
                ? 'birth date cannot be empty'
                : errors['birth-date'],
            specialist:
              specialty == ''
                ? 'specialist cannot be empty'
                : errors['specialist'],
            'consultation-fee-number':
              consultationFee.current?.value == ''
                ? 'consultation fee cannot be empty'
                : errors['consultation-fee-number'],
            'work-start':
              workStart == ''
                ? 'work start cannot be empty'
                : errors['work-start'],
            'doctor-certificate':
              certificate.current?.files?.length == 0
                ? 'doctor certificate cannot be empty'
                : errors['doctor-certificate'],
          };
          return [e, err[e]];
        })
      );
      setErrors({ ...errs });
      return;
    }

    let formData = new FormData();
    formData.append('name', name.current?.value || '');
    formData.append('email', email.current?.value || '');
    formData.append('password', password.current?.value || '');
    formData.append('birth_date', birthDate || '');
    formData.append('gender_id', `${genderId}`);
    if (uploaded.file) {
      formData.append(
        'certificate',
        uploaded.file as File,
        uploaded.file?.name
      );
    }
    formData.append('fee', `${consultationFee.current?.value}`);
    formData.append(
      'work_start_year',
      `${parseInt(workStartOptions[workStart])}`
    );
    formData.append('doctor_specialists_id', `${parseInt(specialty)}`);

    handleCreate(formData);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await createDoctorAction(formData);
      toast.success('successfuly created');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form action={handleSubmit} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Create Doctor
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
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
              Minimum 8 characters with at least one uppercase, one lowercase,
              one special character and a number
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
                  checked={genderId == 1}
                  onChange={() => setGenderId(1)}
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
                  checked={genderId == 2}
                  onChange={() => setGenderId(2)}
                />
                <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
                <span>Female</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-6 w-1/3">
          <label htmlFor="specialist">
            <h5 className="text-sm text-dark-gray">Specialist</h5>
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
            <h5 className="text-sm text-dark-gray">Consultation Fee</h5>
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
          <label htmlFor="work-start">
            <h5 className="text-sm text-dark-gray">Work Start</h5>
            <Selector
              id="work-start"
              wrapperId="auth-main"
              options={workStartOptions}
              selected={workStart}
              name="work-start"
              invalid={errors['work-start'] !== ''}
              message={errors['work-start']}
              onSelect={handleWorkStart}
              append="Calendar"
              gridView="[grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]"
              placeholder="Choose the year you start working ..."
            />
          </label>
          <label htmlFor="certificate">
            <h5 className="text-sm text-dark-gray">Doctor Certificate</h5>
            <div className="2xl:min-h-[56px] flex items-center">
              <div className="max-w-[585px] 2xl:w-[337px]">
                <FileUploader
                  id="certificate"
                  name="certificate"
                  uploaded={uploaded}
                  instruction="Image format, max 1 MB"
                  placeholder={`${uploaded.file ? 'Change' : 'Choose'} File...`}
                  accept="application/pdf"
                  maxSize={1000}
                  onUpload={(file, image, error) =>
                    handleUpload({ file, image, error })
                  }
                />
              </div>
            </div>
          </label>
        </div>
      </div>
    </form>
  );
};

export default CreateDoctorForm;
