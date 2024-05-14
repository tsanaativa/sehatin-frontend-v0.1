'use client';

import {
  AvatarUploader,
  Button,
  FileUploader,
  Input,
  Selector,
} from '@/components/common';
import { FileProps } from '@/components/common/FileUploader';
import { getSpecialists } from '@/services/specialist';
import { Doctor } from '@/types/Doctor';
import { validate } from '@/utils/validation';
import { Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { updateDoctorAction } from '../../action/doctor';

const UpdateDoctorForm = ({ doctor }: { doctor: Doctor }) => {
  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    specialist: '',
    'consultation-fee-number': '',
    'doctor-certificate': '',
    'work-start': '',
  });
  const [specialty, setSpecialty] = useState<string>(
    doctor?.specialist?.id ? `${doctor?.specialist?.id}` : '0'
  );
  const [workStart, setWorkStart] = useState<string>(
    `y-${doctor?.work_start_year}` || ''
  );
  const [specialistOptions, setSpecialistOptions] = useState<
    Record<string, string>
  >({});
  const [uploaded, setUploaded] = useState<FileProps>({
    file: null,
    image: '',
    error: '',
  });
  const [picture, setPicture] = useState<File | undefined>();

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
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

  const handleChangePicture = (file: File) => {
    setPicture(file);
  };

  const handleSubmit = () => {
    const invalidSubmission = Object.values(errors).some((e) => e !== '');
    const anyEmptyField =
      [
        name.current?.value,
        email.current?.value,
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
    if (picture) {
      formData.append('profile_picture', picture, picture.name);
    }
    formData.append('name', name.current?.value || '');
    formData.append('email', email.current?.value || '');
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
    formData.append('specialist_id', `${parseInt(specialty)}`);

    handleUpdate(formData);
  };

  const handleUpdate = async (formData: FormData) => {
    console.log(formData);
    try {
      await updateDoctorAction(doctor.id, formData);
      toast.success('successfuly updated');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form action={handleSubmit} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Update Doctor
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
        <AvatarUploader
          defaultAvatar={doctor.profile_picture}
          onChange={handleChangePicture}
        />
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
              defaultValue={doctor.name}
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
              defaultValue={doctor.email}
              disabled
            />
          </label>
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
              defaultValue={doctor.fee}
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

export default UpdateDoctorForm;
