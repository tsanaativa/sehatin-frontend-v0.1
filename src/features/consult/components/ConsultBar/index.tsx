'use client';

import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Badge } from '@/components/common';
import { Consultation } from '@/types/Consultation';
import { formatBirthDateToAge } from '@/utils/formatter';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ConsultDropdown } from '..';
import DoctorDetailCard from '../../../doctors/components/DoctorDetailCard';
import EndChatButton from '../EndChatButton';
import MedicalCertButton from '../MedicalCertButton';
import PrescriptionButton from '../PrescriptionButton';

type ConsultBarProps = {
  isTyping: boolean;
  consultation: Consultation;
  isDoctor: boolean;
  notifyCert: (url: string) => void;
  notifyPrescription: (url: string) => void;
  notifyEnd: (seconds: number) => void;
};

const ConsultBar = ({
  isTyping,
  consultation,
  isDoctor,
  notifyCert,
  notifyPrescription,
  notifyEnd,
}: ConsultBarProps) => {
  const { id } = useParams();

  const handleEndChat = () => {
    notifyEnd(isDoctor ? 0 : 30);
  };

  return (
    <div className="w-full">
      <div className="hidden flex-col gap-5 text-center items-center md:flex">
        <div className="border border-gray-light rounded min-w-[300px]">
          {isDoctor ? (
            <DoctorDetailCard
              doctor={consultation.doctor}
              isTyping={isTyping}
            />
          ) : (
            <div>
              <div className="px-4 py-8 flex flex-col items-center gap-y-2 ">
                <div className="relative w-fit h-fit">
                  <Image
                    src={consultation.user.profile_picture || DefaultAvatarImg}
                    className="object-cover rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                    width={300}
                    height={300}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-poppins font-medium text-dark text-lg mb-1">
                    {consultation.user.name}
                  </span>
                  <div className="text-sm text-dark-gray md:text-base">
                    {isDoctor ? (
                      <>{consultation.doctor.specialist.name}</>
                    ) : (
                      <table className="text-start">
                        <tbody>
                          <tr className="align-top">
                            <td>Patient Name</td>
                            <td className="ps-1 pe-2">:</td>
                            <td>{consultation.patient_name}</td>
                          </tr>
                          <tr className="align-top">
                            <td>Patient Gender</td>
                            <td className="ps-1 pe-2">:</td>
                            <td>{consultation.patient_gender?.name}</td>
                          </tr>
                          <tr className="align-top">
                            <td>Patient Age</td>
                            <td className="ps-1 pe-2">:</td>
                            <td>
                              {formatBirthDateToAge(
                                consultation.patient_birth_date
                              )}{' '}
                              y.o.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <MedicalCertButton
            notify={notifyCert}
            consultation={consultation}
            isDoctor={isDoctor}
          />
          <PrescriptionButton
            notify={notifyPrescription}
            consultation={consultation}
            isDoctor={isDoctor}
          />
          {!!!consultation.ended_at && (
            <EndChatButton onConfirm={handleEndChat} isDoctor={isDoctor} />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center w-full md:hidden">
        <div className="flex gap-4 w-full">
          <Image
            src={
              (isDoctor
                ? consultation.doctor.profile_picture
                : consultation.user.profile_picture) || DefaultAvatarImg
            }
            className="object-cover rounded-full w-14 h-14"
            width={300}
            height={300}
            priority
            alt=""
          />
          <div className="flex flex-col gap-[0.125rem]">
            <span className="font-semibold text-lg">
              {isDoctor ? consultation.doctor.name : consultation.user.name}
            </span>
            {isDoctor ? (
              <div>
                {!isTyping ? (
                  <div className="max-w-fit">
                    <Badge
                      variant={`${consultation.doctor.is_online ? 'success' : 'gray'}`}
                      className="text-nowrap px-2"
                    >
                      • {consultation.doctor.is_online ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-sm text-dark-gray">typing...</div>
                )}
              </div>
            ) : (
              <div className="text-dark-gray text-sm">
                {consultation.patient_name} (
                {formatBirthDateToAge(consultation.patient_birth_date)} y.o.,{' '}
                {consultation.patient_gender?.name})
              </div>
            )}
          </div>
        </div>
        <ConsultDropdown
          isDoctor={isDoctor}
          onEndChat={handleEndChat}
          notifyCert={notifyCert}
          notifyPrescription={notifyPrescription}
          consultation={consultation}
        />
      </div>
    </div>
  );
};

export default ConsultBar;
