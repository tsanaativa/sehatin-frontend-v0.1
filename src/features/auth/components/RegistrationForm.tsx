'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/common';
import { RadioBox } from '@/components/common';
import { DoctorBadge, PatientBadge } from '@/assets/icons';
import Selector from '@/components/common/Selector';
import { validate } from '@/utils/validation';

const RegistrationForm = () => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    'password-confirmation': '',
    'birth-date': '',
  });

  const [doctorErrors, setDoctorErrors] = useState({
    specialist: '',
    'consultation-fee': '',
  });

  const [role, setRole] = useState<'user' | 'doctor'>('user');
  const [birthDate, setBirthDate] = useState<string>('');
  const [workStart, setWorkStart] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [specialty, setSpecialty] = useState<string>('');

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const birthDatePicker = useRef<HTMLInputElement>(null);
  const workStartPicker = useRef<HTMLInputElement>(null);
  const consultationFee = useRef<HTMLInputElement>(null);
  const certificate = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const specialistOptions = {
    '1': 'Sp. Kandungan & Kebidanan',
    '2': 'Sp. Kulit & Kelamin',
    '3': 'Sp. THT',
    '4': 'Sp. Jiwa',
    '5': 'Sp. Penyakit Dalam',
    '6': 'Sp. Anak',
    '7': 'Sp. Mata',
    '8': 'Dokter Gigi',
    '9': 'Dokter Umum',
    '10': 'Psikolog Klinis',
    '11': 'Sp. Saraf',
    '12': 'Sp. Paru',
    '13': 'Sp. Urologi',
    '14': 'Sp. Orthopaedi & Traumatologi',
    '15': 'Sp. Jantung & Pembuluh Darah',
    '16': 'Sp. PD Gastroenterologi - Hepatologi',
    '17': 'Sp. Bedah Umum',
    '18': 'Sp. Gizi Klinik',
    '19': 'Sp. PD Endokrin - Metabolik - Diabetes',
    '20': 'Sp. Andrologi',
    '21': 'Sp. Konservasi Gigi',
    '22': 'Dokter Bedah',
    '23': 'Sp. PD Ginjal - Hipertensi',
    '24': 'Sp. Gigi Anak',
    '25': 'Sp. Bedah Onkologi',
    '26': 'Sp. PD Reumatologi',
    '27': 'Sp. PD Hematologi & Onkologi Medik',
    '28': 'Sp. Bedah Mulut & Maksilofasial',
    '29': 'Sp. Bedah Saraf',
    '30': 'Sp. Rehabilitasi Medik & Kedokteran Fisik',
    '31': 'Sp. Ortodonsia',
    '32': 'Sp. Periodonsia',
    '33': 'Sp. Kedokteran Olahraga',
    '34': 'Psikolog Klinis Anak & Remaja',
    '35': 'Sp. PD Kardiovaskular',
    '36': 'Sp. Bedah Digestif',
    '37': 'Akupuntur',
    '38': 'Sp. Bedah Plastik',
    '39': 'Sp. Bedah Toraks Kardiovaskular',
    '40': 'Sp. Bedah Anak',
    '41': 'Fisioterapis',
    '42': 'Sp. Prostodonsia',
    '43': 'Sp. Bedah Vaskuler & Endovaskuler',
    '44': 'Sp. Penyakit Mulut',
    '45': 'Sp. PD Alergi - Imunologi',
    '46': 'Sp. PD Tropik - Infeksi',
    '47': 'Konselor Laktasi',
    '48': 'Sp. Bedah Spine',
    '49': 'Psikolog Klinis Dewasa',
    '50': 'Sp. Mikrobiologi Klinik',
    '51': 'Psikologi Industri dan Organisasi',
    '52': 'Sp. Bedah Panggul & Lutut',
    '53': 'Dokter Kecantikan',
    '54': 'Sp. Radiologi',
    '55': 'Sp. Anestesiologi',
    '56': 'Sp. Okupasi',
    '57': 'Sp. Onkologi Radiasi',
    '58': 'Sp. Patologi Anatomi',
    '59': 'Sp. Patologi Klinik',
    '60': 'Bidan',
    '61': 'Apoteker',
    '62': 'Dokter Forensik',
    '63': 'Dokter Umum (DU)',
    '64': 'Hipnoterapis',
    '65': 'Sp. Anak (Onkologi)',
    '66': 'Sp. Farmakologi Klinik',
    '67': 'Sp. Intervensi dan Kegawatdaruratan Napas',
    '68': 'Sp. Jiwa (Anak dan Remaja)',
    '69': 'Sp. Kedokteran Nuklir',
    '70': 'Sp. Nutrisi pada Kelainan Metabolisme',
    '71': 'Dokter Gigi Spesialis Radiologi - Subspesialis Radiodiagnosis Imaging',
    '72': 'Insurance',
    '73': 'Sp. Anak (Alergi-Imunologi Anak)',
    '74': 'Ahli Gizi',
    '75': 'Dokter Emergensi Medik',
    '76': 'Dokter Gigi Kosmetik',
    '77': 'Dokter Gigi Sp. Radiologi',
    '78': 'Dokter Hewan',
    '79': 'Haloskin',
    '80': 'Ilmu Biomedik',
    '81': 'Konselor',
    '82': 'Konsultasi Medis',
    '83': 'Lainnya',
    '84': 'Psikolog Non Klinis',
    '85': 'Sp. Anak (Gastroenterologi-Hepatologi)',
    '86': 'Sp. Anak (Nefrologi)',
    '87': 'Sp. Anak (Neonatologi)',
    '88': 'Sp. Anak (Neurologi)',
    '89': 'Sp. Anak (Nutrisi & Penyakit Metabolik)',
    '90': 'Sp. Anak (Penyakit Tropik-Infeksi)',
    '91': 'Sp. Anak (Tumbuh Kembang)',
    '92': 'Sp. Fetomaternal',
    '93': 'Sp. Gizi Klink (Konsultan Endokrin Metabolik)',
    '94': 'Sp. Jantung (Kardiologi Intervensi)',
    '95': 'Sp. Kedokteran Kelautan',
    '96': 'Sp. Kedokteran Keluarga Layanan Primer',
    '97': 'Sp. Kedokteran Penerbangan',
    '98': 'Sp. Kulit & Kelamin (Alergi-Imunologi)',
    '99': 'Sp. PD Geriatri',
    '100': 'Sp. PD Psikosomatik',
    '101': 'Sp. Saraf (Neuro-onkologi)',
    '102': 'Sp. THT (Bronko-Esofagologi)',
    '103':
      'Spesialis Bedah Toraks Kardiak & Vaskular - Konsultan Vaskular EndoVaskular',
    '104': 'Spesialis Kedokteran Olahraga (Ahli Latihan dan Kompetisi)',
    '105': 'Spesialis Orthopedi Olahraga dan Artroskopi',
    '106': 'Spesialis Penyakit Dalam (Pulmonologi)',
    '107': 'Spesialis Saraf Konsultan Nyeri',
  };

  const workStartOptions = Object.fromEntries(
    [...Array(65)].map((_, idx) => {
      const now = new Date().getFullYear();
      return [`y-${now - idx}`, `${now - idx}`];
    })
  );

  const handleInput = (id: string, value: string) => {
    const diffConfirm =
      id.endsWith('password') &&
      value !== confirmPassword.current?.value &&
      confirmPassword.current?.value !== ''
        ? 'password and confirmation must be same'
        : '';

    if (value == '') {
      setErrors({ ...errors, [id]: `${id.replace('-', '')} is required` });
      return;
    }

    if (id == 'password-confirmation' && value !== password.current?.value) {
      setErrors({ ...errors, [id]: `password and confirmation must be same` });
      return;
    }

    setErrors({
      ...errors,
      [id]: validate(value, id),
      ['password-confirmation']: diffConfirm,
    });
  };

  const handleDate = (target: HTMLInputElement) => {
    const value = new Date(target.value);
    const year = value.getFullYear();
    const month = value.getMonth();
    const day = value.getDate();
    return `${year}/${month >= 9 ? month + 1 : `0${month + 1}`}/${day}`;
  };

  const handleOnBlurPassword = () => {
    if (confirmPassword.current?.value !== password.current?.value) {
      setErrors({
        ...errors,
        ['password-confirmation']: `password and confirmation must be same`,
      });
      return;
    }
    setErrors({ ...errors, ['password-confirmation']: '' });
  };

  return (
    <form
      action=""
      className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
    >
      <div className="flex items-center gap-[20px] [&_span]:pt-[7px] [&_span]:text-[11px] mt-[6px]">
        <RadioBox
          id="user"
          name="user"
          isActive={role === 'user'}
          onChange={() => setRole('user')}
        >
          <PatientBadge isWhite={role !== 'user'} />
          <span>User</span>
        </RadioBox>
        <RadioBox
          id="doctor"
          name="doctor"
          isActive={role === 'doctor'}
          onChange={() => setRole('doctor')}
        >
          <DoctorBadge isWhite={role !== 'doctor'} />
          <span>Doctor</span>
        </RadioBox>
      </div>
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
          message={errors['email']}
          invalid={errors['email'] !== ''}
          onInput={({ target }) =>
            handleInput('email', (target as HTMLInputElement).value)
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
          message={errors['password']}
          onInput={({ target }) =>
            handleInput('password', (target as HTMLInputElement).value)
          }
          onBlur={handleOnBlurPassword}
          invalid={errors['password'] !== ''}
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
                setBirthDate(handleDate(target as HTMLInputElement))
              }
              message={errors['birth-date']}
              invalid={errors['birth-date'] !== ''}
              onAppend={() => {
                birthDatePicker.current?.focus();
                birthDatePicker.current?.showPicker();
              }}
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
              onSelect={(option) => setSpecialty(option)}
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
              onInput={({ target }) =>
                handleInput(
                  'consultation-fee-number',
                  (target as HTMLInputElement).value
                )
              }
            />
          </label>
          <label htmlFor="work-start">
            <h5>Work Start</h5>
            <Selector
              id="work-start"
              options={workStartOptions}
              selected={workStart}
              name="work-start"
              onSelect={(option) => setWorkStart(option)}
              append="Calendar"
              placeholder="Choose the date you start working ..."
            />
            {/* <Input
              ref={workStartPicker}
              id="work-start"
              name="work-start"
              placeholder="Enter the date you start working ..."
              append="Calendar"
              type="date"
              valueMode={workStart}
              onInput={({ target }) =>
                setWorkStart(handleDate(target as HTMLInputElement))
              }
              onAppend={() => workStartPicker.current?.showPicker()}
            /> */}
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
              />
              <button
                type="button"
                onClick={() => certificate.current?.click()}
                className="font-poppins text-primary border-[1px] text-sm border-primary rounded-md h-10 px-3 leading-[150%] hover:border-primary-dark hover:text-primary-dark transition-colors duration-300"
              >
                Choose File...
              </button>
              <span className="text-xs leading-[150%] text-dark-gray">
                PDF format, max 1 MB
              </span>
            </div>
          </label>
        </>
      )}
    </form>
  );
};

export default RegistrationForm;
