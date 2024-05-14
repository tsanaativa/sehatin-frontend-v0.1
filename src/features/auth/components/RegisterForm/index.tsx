'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button, FileUploader, Input } from '@/components/common';
import { RadioBox } from '@/components/common';
import { DoctorBadge, PatientBadge } from '@/assets/icons';
import Selector from '@/components/common/Selector';
import { validate } from '@/utils/validation';
import GoogleSection from '../GoogleSection';
import { FileProps } from '@/components/common/FileUploader';
import { getSpecialists } from '@/services/specialist';
import { toast } from 'react-toastify';
import register from '../../actions/register';
import Auth, { AuthModalProps } from '@/components/layout/Auth';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [specialistLoad, setSpecialistLoad] = useState(false);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({
    all: {
      name: '',
      email: '',
      password: '',
      'password-confirmation': '',
    },
    user: {
      'birth-date': '',
    },
    doctor: {
      doctor_specialists_id: '',
      'fee-number': '',
      work_start_year: '',
      'doctor-certificate': '',
    },
  });

  const [role, setRole] = useState<'user' | 'doctor'>('user');
  const [birthDate, setBirthDate] = useState<string>('');
  const [workStart, setWorkStart] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [specialty, setSpecialty] = useState<string>('');
  const [uploaded, setUploaded] = useState<FileProps>({
    file: null,
    image: '',
    error: '',
  });

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);
  const consultationFee = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [specialistOptions, setSpecialistOptions] = useState<
    Record<string, string>
  >({});

  const workStartOptions = Object.fromEntries(
    [...Array(65)].map((_, idx) => {
      const now = new Date().getFullYear();
      return [`y-${now - idx}`, `${now - idx}`];
    })
  );

  const handleOnBlurPassword = () => {
    const errs = errors;
    if (confirmPassword.current?.value !== password.current?.value) {
      errs['all']['password-confirmation'] =
        'password and confirmation must be same';
      setErrors({ ...errs });
      return;
    }
    errs['all']['password-confirmation'] = '';
    setErrors({ ...errs });
  };

  const handleDate = (target: HTMLInputElement) => {
    const value = new Date(target.value);
    const year = value.getFullYear();
    const month = value.getMonth();
    const day = value.getDate();
    const result = `${year}/${month >= 9 ? month + 1 : `0${month + 1}`}/${day >= 10 ? day : `0${day}`}`;
    setBirthDate(result);
    handleInput('user', 'birth-date', result);
  };

  const handleSpecialty = (option: string) => {
    setSpecialty(option);
    handleInput('doctor', 'doctor_specialists_id', option);
  };

  const handleWorkStart = (option: string) => {
    setWorkStart(option);
    handleInput('doctor', 'work_start_year', option);
  };

  const handleInput = (
    key: 'all' | 'user' | 'doctor',
    id: string,
    value: string
  ) => {
    const errs = errors;

    if (value == '') {
      errs[key][id] = `${id.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    if (id == 'password-confirmation' && value !== password.current?.value) {
      errs[key][id] = `password and confirmation password must be same`;
      setErrors({ ...errs });
      return;
    }

    errs[key][id] = validate(value, id);
    errs['all']['password-confirmation'] =
      id.endsWith('password') &&
      value !== confirmPassword.current?.value &&
      confirmPassword.current?.value !== ''
        ? 'password and confirmation password must be same'
        : '';

    setErrors({ ...errs });
  };

  const invalidSubmission = () => {
    const anyError = (key: 'all' | 'user' | 'doctor') =>
      Object.values(errors[key]).some((err) => err !== '');

    return (
      (role == 'doctor' && (anyError('all') || anyError('doctor'))) ||
      (role == 'user' && (anyError('all') || anyError('user')))
    );
  };

  const anyEmptyField = () => {
    const emptyGeneral =
      name.current?.value == '' ||
      email.current?.value == '' ||
      password.current?.value == '' ||
      confirmPassword.current?.value == '';
    const emptyDoctor =
      workStart == '' ||
      specialty == '' ||
      consultationFee.current?.value == '' ||
      !uploaded.file;

    return (
      (role == 'doctor' && (emptyGeneral || emptyDoctor)) ||
      (role == 'user' && (emptyGeneral || birthDate == ''))
    );
  };

  const handleUpload = (uploaded: FileProps) => {
    setUploaded(uploaded);
    if (uploaded.error !== '') {
      setErrors({
        ...errors,
        doctor: {
          ...errors['doctor'],
          'doctor-certificate': uploaded.error,
        },
      });
    }
  };

  const handleSubmit = () => {
    if (invalidSubmission() || anyEmptyField()) {
      const allErrors = Object.fromEntries(
        Object.keys(errors).map((e) => {
          const errItems = Object.fromEntries(
            Object.keys(errors[e]).map((i) => {
              const err: Record<string, string> = {
                name:
                  name.current?.value == ''
                    ? 'name cannot be empty'
                    : errors['all']['name'],
                email:
                  email.current?.value == ''
                    ? 'email cannot be empty'
                    : errors['all']['email'],
                password:
                  password.current?.value == ''
                    ? 'password cannot be empty'
                    : errors['all']['password'],
                'password-confirmation':
                  confirmPassword.current?.value == ''
                    ? 'confirmation password cannot be empty'
                    : errors['all']['password-confirmation'],
                'birth-date':
                  birthDate == ''
                    ? 'birth date cannot be empty'
                    : errors['user']['birth-date'],
                doctor_specialists_id:
                  specialty == ''
                    ? 'specialist cannot be empty'
                    : errors['doctor']['doctor_specialists_id'],
                'fee-number':
                  consultationFee.current?.value == ''
                    ? 'consultation fee cannot be empty'
                    : errors['doctor']['fee-number'],
                work_start_year:
                  workStart == ''
                    ? 'work start cannot be empty'
                    : errors['doctor']['work_start_year'],
                'doctor-certificate': !uploaded.file
                  ? 'doctor certificate cannot be empty'
                  : errors['doctor']['doctor-certificate'],
              };
              return [i, err[i]];
            })
          );
          return [e, errItems];
        })
      );
      if (uploaded.file) allErrors['doctor']['doctor-certificate'] = '';
      setUploaded({
        ...uploaded,
        error: allErrors['doctor']['doctor-certificate'],
      });
      setErrors({ ...allErrors });
      return;
    }
    setTimeout(() => {
      setIsLoading(true);
    }, 0);
  };

  const getSpecialistsData = async () => {
    setSpecialistLoad(true);
    try {
      const data = await getSpecialists();
      const specialists = Object.fromEntries(data.map((d) => [d.id, d.name]));
      setSpecialistOptions(specialists);
    } catch (error) {
      if (error instanceof Error) {
        console.log('ERROR', error.message);
        toast.error(error.message);
      }
    } finally {
      setSpecialistLoad(false);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<
    Omit<AuthModalProps, 'show' | 'onCloseModal'>
  >({
    mode: 'CircleCheck',
    btnText: 'OK',
    onConfirm: () => setShowModal(false),
    title: 'Verification Email Sent!',
    caption:
      'We have sent a verification email. Please check your inbox and follow the instructions to verify your account.',
  });

  const registerUser = async (formData: FormData) => {
    try {
      formData.delete('certificate');
      formData.delete('work_start_year');
      formData.append('certificate', uploaded.file as File);
      formData.append('work_start_year', workStart.split('-')[1]);
      await register(formData);
      setShowModal(true);
    } catch (error: any) {
      if (error.message.includes('email already exist')) {
        setModalData({
          mode: 'Info',
          btnText: 'Open Login Page',
          onConfirm: () => push('/auth/login'),
          title: 'You already registered!',
          caption:
            "Please verify your email if you haven't verified it or feel free to sign in",
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
    getSpecialistsData();
  }, []);
  return (
    <Auth
      modal={{
        show: showModal,
        onCloseModal: () => setShowModal(false),
        ...modalData,
      }}
      reverse
      wrapperClass="lg:[&>*]:max-w-[1024px]"
    >
      <form
        action={(e) =>
          invalidSubmission() || anyEmptyField() || registerUser(e)
        }
        className="flex flex-col gap-4 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <div className="flex items-center [&>*]:max-w-[250px] justify-center gap-[20px] [&_span]:pt-[7px] [&_span]:text-[11px] mt-[6px]">
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
        <div className="[&>*]:flex [&>*]:flex-col [&>*]:gap-1 flex gap-y-4 gap-x-6 flex-wrap [&>*]:grow [&>*]:basis-[337px] 2xl:mt-6">
          <label htmlFor="name">
            <h5>Name</h5>
            <Input
              ref={name}
              id="name"
              name="name"
              type="text"
              placeholder="Type your fullname ..."
              message={errors['all']['name']}
              invalid={errors['all']['name'] !== ''}
              onInput={({ target }) =>
                handleInput('all', 'name', (target as HTMLInputElement).value)
              }
            />
          </label>
          <label htmlFor="email">
            <h5>Email</h5>
            <Input
              ref={email}
              id="email"
              name="email"
              type="email"
              placeholder="Type your email ..."
              message={errors['all']['email']}
              invalid={errors['all']['email'] !== ''}
              onInput={({ target }) =>
                handleInput('all', 'email', (target as HTMLInputElement).value)
              }
            />
          </label>
          <label htmlFor="password">
            <h5>Password</h5>
            <Input
              ref={password}
              id="password"
              name="password"
              placeholder="Type a strong password ..."
              type={showPassword ? 'password' : 'text'}
              append={showPassword ? 'EyeOff' : 'Eye'}
              message={errors['all']['password']}
              onInput={({ target }) =>
                handleInput(
                  'all',
                  'password',
                  (target as HTMLInputElement).value
                )
              }
              onBlur={handleOnBlurPassword}
              invalid={errors['all']['password'] !== ''}
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
              message={errors['all']['password-confirmation']}
              invalid={errors['all']['password-confirmation'] !== ''}
              onInput={({ target }) =>
                handleInput(
                  'all',
                  'password-confirmation',
                  (target as HTMLInputElement).value
                )
              }
              onAppend={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </label>
          {role == 'user' && (
            <>
              <label htmlFor="birth-date">
                <h5>Birth Date</h5>
                <Input
                  ref={birthDatePicker}
                  id="birth-date"
                  name="birth-date"
                  placeholder="Enter your birth date ..."
                  append="Calendar"
                  type="date"
                  valueMode={birthDate}
                  onInput={({ target }) =>
                    handleDate(target as HTMLInputElement)
                  }
                  message={errors['user']['birth-date']}
                  invalid={errors['user']['birth-date'] !== ''}
                  onAppend={() => {
                    birthDatePicker.current?.focus();
                    birthDatePicker.current?.showPicker();
                  }}
                />
              </label>
              <div>
                <h5>Gender</h5>
                <div
                  className="flex gap-16 2xl:min-h-[56px] items-center [&>label]:flex [&>label]:cursor-pointer [&>label]:items-center [&>label]:gap-1.5 [&_input]:hidden
              [&_mark]:grid [&_mark]:place-items-center [&_mark]:w-4 [&_mark]:h-4 [&_mark]:rounded-full [&_mark]:border [&_mark]:border-gray
              [&_mark]:bg-transparent after:[&_mark]:content-[''] after:[&_mark]:h-2.5 after:[&_mark]:w-2.5 after:[&_mark]:rounded-full
              after:[&_mark]:bg-primary-dark after:[&_mark]:hidden [&_span]:leading-[150%] [&_span]:tracking-[0.5px]"
                >
                  <label htmlFor="male">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={1}
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
                      value={2}
                      className="peer"
                      checked={gender == 'female'}
                      onChange={() => setGender('female')}
                    />
                    <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
                    <span>Female</span>
                  </label>
                </div>
              </div>
            </>
          )}
          {role == 'doctor' && (
            <>
              <label htmlFor="doctor_specialists_id">
                <h5>Specialist</h5>
                <Selector
                  id="doctor_specialists_id"
                  wrapperId="auth-main"
                  options={specialistOptions}
                  selected={specialty}
                  isLoading={specialistLoad}
                  name="doctor_specialists_id"
                  searchable
                  required
                  onSelect={handleSpecialty}
                  invalid={errors['doctor']['doctor_specialists_id'] !== ''}
                  message={errors['doctor']['doctor_specialists_id']}
                  placeholder="Choose your specialty ..."
                />
              </label>
              <label htmlFor="fee">
                <h5>Consultation Fee</h5>
                <Input
                  ref={consultationFee}
                  id="fee"
                  name="fee"
                  placeholder="Type your prefered consultation fee ..."
                  prepend="Rp"
                  type="number"
                  invalid={errors['doctor']['fee-number'] !== ''}
                  message={errors['doctor']['fee-number']}
                  onInput={({ target }) =>
                    handleInput(
                      'doctor',
                      'fee-number',
                      (target as HTMLInputElement).value
                    )
                  }
                />
              </label>
              <label htmlFor="work_start_year">
                <h5>Work Start</h5>
                <Selector
                  id="work_start_year"
                  wrapperId="auth-main"
                  options={workStartOptions}
                  selected={workStart}
                  name="work_start_year"
                  invalid={errors['doctor']['work_start_year'] !== ''}
                  message={errors['doctor']['work_start_year']}
                  onSelect={handleWorkStart}
                  append="Calendar"
                  gridView="[grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]"
                  placeholder="Choose the year you start working ..."
                />
              </label>
              <label>
                <h5>Doctor Certificate</h5>
                <div className="2xl:min-h-[56px] flex items-center">
                  <div className="w-[320px]">
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
            </>
          )}
        </div>
        <Button
          type="submit"
          loading={isLoading}
          onClick={handleSubmit}
          className="h-14 mt-9"
          variant="primary"
        >
          Register
        </Button>
      </form>
      <GoogleSection role={role} />
    </Auth>
  );
};

export default RegistrationForm;
