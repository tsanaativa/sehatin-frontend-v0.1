'use client';

import { Button, Input } from '@/components/common';
import { User } from '@/types/User';
import { validate } from '@/utils/validation';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import createRoom from '../../actions/room';
import { toast } from 'react-toastify';
import { createConsultation } from '../../actions/consultation';

type PatientFormProps = {
  isEdit?: boolean;
  user: User;
};

const PatientForm = ({ isEdit, user }: PatientFormProps) => {
  const router = useRouter();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    'birth-date': '',
  });

  const birthDatePicker = useRef<HTMLInputElement>(null);
  const [birthDate, setBirthDate] = useState<string>(
    user?.birth_date ? user?.birth_date.split('T')[0] : ''
  );
  const [gender, setGender] = useState<number>(
    user?.gender?.id ? user?.gender?.id : 0
  );

  const name = useRef<HTMLInputElement>(null);

  const handleDate = (target: HTMLInputElement) => {
    setBirthDate(target.value);
    handleInput('birth-date', target.value);
  };

  const handleInput = (id: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[id] = `${id.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    errs[id] = validate(value, id);

    setErrors({ ...errs });
  };

  const invalidSubmission = () => {
    return Object.values(errors).some((err) => err !== '');
  };

  const anyEmptyField = () => {
    return name.current?.value == '' || birthDate == '';
  };

  const handleSubmit = async () => {
    if (invalidSubmission() || anyEmptyField()) {
      const allErrors = Object.fromEntries(
        Object.keys(errors).map((i) => {
          const err: Record<string, string> = {
            name:
              name.current?.value == ''
                ? 'name cannot be empty'
                : errors['name'],
            'birth-date':
              birthDate == ''
                ? 'birth date cannot be empty'
                : errors['birth-date'],
          };
          return [i, err[i]];
        })
      );
      setErrors({ ...allErrors });
      return;
    }

    const doctorId = parseInt(`${id}`);

    console.log({
      name: name.current?.value,
      gender: gender,
      birthDate: birthDate,
    });

    const consultationReq = {
      doctor_id: doctorId,
      patient_name: name.current?.value,
      patient_gender_id: gender,
      patient_birth_date: birthDate,
    };

    setIsLoading(true);
    try {
      const consultation = await createConsultation(consultationReq);
      console.log(consultation);

      const createRoomReq = {
        id: consultation.id,
        doctor_id: doctorId,
      };

      await createRoom(createRoomReq);
      router.push(`/consult/${consultation.id}`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
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
            message={errors['name']}
            invalid={errors['name'] !== ''}
            onInput={({ target }) =>
              handleInput('name', (target as HTMLInputElement).value)
            }
            defaultValue={user?.name}
          />
        </label>
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
            onInput={({ target }) => handleDate(target as HTMLInputElement)}
            message={errors['birth-date']}
            invalid={errors['birth-date'] !== ''}
            onAppend={() => {
              birthDatePicker.current?.focus();
              birthDatePicker.current?.showPicker();
            }}
            defaultValue={
              user?.birth_date ? user?.birth_date.split('T')[0] : ''
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
                name="gender"
                id="male"
                value={1}
                className="peer"
                checked={gender === 1}
                onChange={() => setGender(1)}
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
                value={2}
                checked={gender === 2}
                onChange={() => setGender(2)}
              />
              <mark className="peer-checked:after:block peer-checked:border-primary-dark"></mark>
              <span>Female</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between gap-5 items-center mt-6">
          <Button
            variant="outlined-gray"
            className="hidden items-center py-3 justify-center gap-1 px-6 min-w-[190px] mt-3 w-full md:w-fit md:flex"
            onClick={router.back}
          >
            Back
          </Button>
          <Button
            className="flex items-center py-3 justify-center gap-1 px-6 mt-3 w-full min-h-[44px] md:min-w-[190px] md:w-fit"
            onClick={handleSubmit}
            loading={isLoading}
          >
            {isEdit ? 'Save' : 'Start Consultation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
