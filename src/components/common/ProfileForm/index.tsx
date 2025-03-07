'use client';

import { AvatarUploader, Button, Input } from '@/components/common';
import Selector from '@/components/common/Selector';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import { updateProfile } from '@/features/profile/actions/profile';
import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';
import { validate } from '@/utils/validation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ChangePasswordButton from '../ChangePasswordButton';
import Link from 'next/link';

type ProfileFormProps = {
  role?: string;
  defaultUser?: User;
  defaultDoctor?: Doctor;
};

const ProfileForm = ({
  defaultUser,
  defaultDoctor,
  role = 'user',
}: ProfileFormProps) => {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({
    all: {
      name: '',
      email: '',
    },
    user: {
      'birth-date': '',
    },
    doctor: {
      specialist: '',
      'consultation-fee-number': '',
      'work-start': '',
      'doctor-certificate': '',
    },
  });

  const [birthDate, setBirthDate] = useState<string>(
    defaultUser?.birth_date ? defaultUser.birth_date.split('T')[0] : ''
  );
  const [workStart, setWorkStart] = useState<string>(
    `y-${defaultDoctor?.work_start_year}` || ''
  );
  const [genderId, setGenderId] = useState<number>(
    defaultUser?.gender?.id ? defaultUser?.gender.id : 0
  );
  const [specialty, setSpecialty] = useState<string>(
    defaultDoctor?.specialist?.id ? `${defaultDoctor?.specialist?.id}` : '0'
  );
  const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string>(
    defaultDoctor?.certificate || ''
  );

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);
  const consultationFee = useRef<HTMLInputElement>(null);
  const certificate = useRef<HTMLInputElement>(null);

  const specialistOptions = DUMMY_SPECIALISTS;

  const workStartOptions = Object.fromEntries(
    [...Array(65)].map((_, idx) => {
      const now = new Date().getFullYear();
      return [`y-${now - idx}`, `${now - idx}`];
    })
  );

  const handleDate = (target: HTMLInputElement) => {
    setBirthDate(target.value);
    handleInput('user', 'birth-date', target.value);
  };

  const handleSpecialty = (option: string) => {
    setSpecialty(option);
    handleInput('doctor', 'specialist', option);
  };

  const handleWorkStart = (option: string) => {
    setWorkStart(option);
    handleInput('doctor', 'work-start', option);
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

    setErrors({ ...errs });
  };

  const handleCertificate = async (target: HTMLInputElement) => {
    const errs = errors;
    if (target.files) {
      const fileInput = target.files[0];
      const fileSize = Math.round((fileInput.size / 1024) * 100) / 100;
      if (fileSize > 1000) {
        errs['doctor']['doctor-certificate'] =
          `maximum file size is 1 MB, while your upload size is ${fileSize} KB`;
        setErrors({ ...errs });
        return;
      }
      errs['doctor']['doctor-certificate'] = '';
      setErrors({ ...errs });
      setFile(fileInput);
      setFileName(fileInput.name);
    }
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
      !certificate.current?.files;

    return (
      (role == 'doctor' && (emptyGeneral || emptyDoctor)) ||
      (role == 'user' && (emptyGeneral || birthDate == ''))
    );
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
                specialist:
                  specialty == ''
                    ? 'specialist cannot be empty'
                    : errors['doctor']['specialist'],
                'consultation-fee-number':
                  consultationFee.current?.value == ''
                    ? 'consultation fee cannot be empty'
                    : errors['doctor']['consultation-fee-number'],
                'work-start':
                  workStart == ''
                    ? 'work start cannot be empty'
                    : errors['doctor']['work-start'],
                'doctor-certificate':
                  certificate.current?.files?.length == 0
                    ? 'doctor certificate cannot be empty'
                    : errors['doctor']['doctor-certificate'],
              };
              return [i, err[i]];
            })
          );
          return [e, errItems];
        })
      );
      setErrors({ ...allErrors });
      return;
    }

    let formData = new FormData();
    formData.append('name', name.current?.value || '');
    if (picture) {
      formData.append('profile_picture', picture);
    }
    if (role === 'user') {
      formData.append('birth_date', birthDate || '');
      formData.append('gender_id', `${genderId}`);
    } else {
      if (file) {
        formData.append('certificate', file);
      }
      formData.append('fee', `${consultationFee.current?.value}`);
      formData.append(
        'work_start_year',
        `${parseInt(workStartOptions[workStart])}`
      );
      formData.append('specialist_id', `${parseInt(specialty)}`);
    }

    handleUpdate(formData);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await updateProfile(role, formData);
      toast.success('successfully updated');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const [picture, setPicture] = useState<File | undefined>();

  const handleChangePicture = (file: File) => {
    setPicture(file);
  };

  return (
    <>
      <AvatarUploader
        defaultAvatar={
          defaultUser?.profile_picture || defaultDoctor?.profile_picture
        }
        onChange={handleChangePicture}
      />
      <div className="w-full">
        <form
          action={handleSubmit}
          className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
        >
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
              defaultValue={
                role === 'doctor' ? defaultDoctor?.name : defaultUser?.name
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
              defaultValue={
                role === 'doctor' ? defaultDoctor?.email : defaultUser?.email
              }
              disabled={!!defaultDoctor || !!defaultUser}
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
                  defaultValue={
                    defaultUser?.birth_date
                      ? defaultUser.birth_date.split('T')[0]
                      : ''
                  }
                />
              </label>
              <div>
                <h5>Gender</h5>
                <div
                  className="flex gap-16 items-center [&>label]:flex [&>label]:cursor-pointer [&>label]:items-center [&>label]:gap-1.5 [&_input]:hidden
              [&_mark]:grid [&_mark]:place-items-center [&_mark]:w-4 [&_mark]:h-4 [&_mark]:rounded-full [&_mark]:border-[1px] [&_mark]:border-gray
              [&_mark]:bg-transparent after:[&_mark]:content-[''] after:[&_mark]:h-2.5 after:[&_mark]:w-2.5 after:[&_mark]:rounded-full
              after:[&_mark]:bg-primary-dark after:[&_mark]:hidden [&_span]:leading-[150%] [&_span]:tracking-[0.5px]"
                >
                  <label htmlFor="male">
                    <input
                      type="radio"
                      name="genderId"
                      id="1"
                      className="peer"
                      checked={genderId === 1}
                      onChange={() => setGenderId(1)}
                    />
                    <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
                    <span>Male</span>
                  </label>
                  <label htmlFor="female">
                    <input
                      type="radio"
                      name="genderId"
                      id="female"
                      value="2"
                      className="peer"
                      checked={genderId === 2}
                      onChange={() => setGenderId(2)}
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
                  invalid={errors['doctor']['specialist'] !== ''}
                  message={errors['doctor']['specialist']}
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
                  invalid={errors['doctor']['consultation-fee-number'] !== ''}
                  message={errors['doctor']['consultation-fee-number']}
                  onInput={({ target }) =>
                    handleInput(
                      'doctor',
                      'consultation-fee-number',
                      (target as HTMLInputElement).value
                    )
                  }
                  defaultValue={defaultDoctor?.fee}
                />
              </label>
              <label htmlFor="work-start">
                <h5>Work Start</h5>
                <Selector
                  id="work-start"
                  options={workStartOptions}
                  selected={workStart}
                  name="work-start"
                  invalid={errors['doctor']['work-start'] !== ''}
                  message={errors['doctor']['work-start']}
                  onSelect={handleWorkStart}
                  append="Calendar"
                  placeholder="Choose the year you start working ..."
                />
              </label>
              <label htmlFor="certificate">
                <h5>Doctor Certificate</h5>
                <div className="flex items-center gap-3">
                  {defaultDoctor?.certificate && !!!file && (
                    <Link href={defaultDoctor.certificate} target="_blank">
                      <Button
                        type="button"
                        className="font-poppins text-sm min-w-32 rounded-md h-10 px-3 leading-[150%]"
                      >
                        View
                      </Button>
                    </Link>
                  )}
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
                    {file || defaultDoctor?.certificate ? 'Change' : 'Choose'}{' '}
                    File...
                  </button>
                  <p className="text-xs leading-[150%] text-dark-gray overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {file ? fileName : 'PDF format, max 1 MB'}
                  </p>
                </div>
                {errors['doctor']['doctor-certificate'].length > 0 && (
                  <span className={`text-danger text-xs`}>
                    {errors['doctor']['doctor-certificate']}
                  </span>
                )}
              </label>
            </>
          )}
          <div className="flex justify-end items-center">
            <Button
              loading={isLoading}
              className="flex items-center justify-center gap-1 px-6 min-w-[150px] min-h-[44px] mt-3 w-fit"
            >
              Save
            </Button>
          </div>
        </form>
        <div className="pb-6 -mt-8 md:-mt-9">
          <ChangePasswordButton />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
