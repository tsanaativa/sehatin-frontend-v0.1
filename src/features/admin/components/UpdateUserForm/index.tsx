'use client';
import { AvatarUploader, Button, Input } from '@/components/common';
import { User } from '@/types/User';
import { validate } from '@/utils/validation';
import { Save } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserAction } from '../../action/user';

const UpdateUserForm = ({ user }: { user: User }) => {
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    'birth-date': '',
  });
  const [birthDate, setBirthDate] = useState<string>(
    user.birth_date ? user.birth_date.split('T')[0] : ''
  );
  const [genderId, setGenderId] = useState<number>(
    user?.gender?.id ? user?.gender.id : 0
  );
  const [picture, setPicture] = useState<File | undefined>();

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);

  let formData = new FormData();

  if (picture) {
    formData.append('profile_picture', picture, picture.name);
  }

  formData.append('name', name.current?.value || '');
  formData.append('birth_date', birthDate || '');
  formData.append('gender_id', `${genderId}`);

  const handleInput = (key: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[key] = `${key.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    errs[key] = validate(value, key);

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

  const handleChangePicture = (file: File) => {
    setPicture(file);
  };

  const handleSubmit = () => {
    const invalidSubmission = Object.values(errors).some((e) => e !== '');
    const anyEmptyField =
      [
        name.current?.value,
        email.current?.value,
        birthDatePicker.current?.value,
      ].includes('') || picture == null;

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
            'birth-date':
              birthDate == ''
                ? 'birth date cannot be empty'
                : errors['birth-date'],
          };
          return [e, err[e]];
        })
      );
      setErrors({ ...errs });
      return;
    }

    let formData = new FormData();
    formData.append('name', name.current?.value || '');
    formData.append('birth_date', birthDate || '');
    formData.append('gender_id', `${genderId}`);
    if (picture) {
      formData.append('profile_picture', picture, picture.name);
    }

    handleUpdate(formData);
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateUserAction(user.id, formData);
      toast.success('successfuly updated');
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <form action={handleSubmit} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Update User
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-center gap-x-12 mt-6">
        <AvatarUploader
          defaultAvatar={user.profile_picture}
          onChange={handleChangePicture}
        />

        <div className=" w-1/2">
          <span className="font-semibold text-base text-dark-gray">
            User Data
          </span>
          <div className="flex flex-col gap-y-6 mt-5">
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
                defaultValue={user?.name}
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
                defaultValue={user?.email}
                disabled
              />
            </label>
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
                defaultValue={
                  user?.birth_date ? user.birth_date.split('T')[0] : ''
                }
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
                    name="genderId"
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
                    name="genderId"
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
            <Link className="text-sm text-primary-dark" href="/admin/user/list">
              Change Password?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateUserForm;
