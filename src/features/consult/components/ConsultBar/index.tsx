'use client';

import { Badge } from '@/components/common';
import { DUMMY_DOCTOR } from '@/constants/dummy';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ConsultDropdown } from '..';
import DoctorDetailCard from '../../../doctors/components/DoctorDetailCard';
import EndChatButton from '../EndChatButton';

type ConsultBarProps = {
  isTyping: boolean;
};

const ConsultBar = ({ isTyping }: ConsultBarProps) => {
  const doctor = DUMMY_DOCTOR;
  const { id } = useParams();

  const handleEndChat = () => {};

  return (
    <div className="w-full">
      <div className="hidden flex-col gap-5 text-center items-center md:flex">
        <div className="border border-gray-light rounded min-w-[300px]">
          <DoctorDetailCard doctor={doctor} isTyping={isTyping} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <EndChatButton onConfirm={handleEndChat} />
        </div>
      </div>
      <div className="flex justify-between items-center w-full md:hidden">
        <div className="flex gap-4 w-full">
          <Image
            src={doctor.profile_picture}
            className="object-cover rounded-full w-14 h-14"
            width={300}
            height={300}
            priority
            alt=""
          />
          <div className="flex flex-col gap-[0.125rem]">
            <span className="font-semibold text-lg">{doctor.name}</span>
            {!isTyping ? (
              <div className="max-w-fit">
                <Badge
                  variant={`${doctor.is_online ? 'success' : 'gray'}`}
                  className="text-nowrap px-2"
                >
                  • {doctor.is_online ? 'Online' : 'Offline'}
                </Badge>
              </div>
            ) : (
              <div className="text-sm text-dark-gray">typing...</div>
            )}
          </div>
        </div>
        <ConsultDropdown onEndChat={handleEndChat} />
      </div>
    </div>
  );
};

export default ConsultBar;
