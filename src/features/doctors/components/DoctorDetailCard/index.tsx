import React from 'react';
import Image from 'next/image';
import { Doctor } from '@/types/Doctor';
import { getYearsOfExp } from '@/utils/doctor';

type DoctorDetailCardProps = {
  doctor: Doctor;
  isTyping?: boolean;
};

const DoctorDetailCard = ({ doctor, isTyping }: DoctorDetailCardProps) => {
  const yearsOfExp = getYearsOfExp(doctor.work_start_year);
  return (
    <div className="px-4 py-8 flex flex-col items-center gap-y-2 ">
      <div className="relative w-fit h-fit">
        <Image
          src={doctor.profile_picture}
          className="object-cover rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          width={300}
          height={300}
          alt=""
        />
        {!isTyping ? (
          <div
            className={`absolute bottom-1 right-[0.7rem] rounded-full border border-light ${doctor.is_online ? 'bg-green' : 'bg-gray'} w-4 h-4`}
          ></div>
        ) : (
          <div
            className={`absolute bottom-1 flex justify-center right-[0.3rem] rounded-full border border-light bg-gray-light text-dark-gray font-bold text-xl w-8 h-5`}
          >
            <span className="-mt-[0.6rem] animate-pulse">...</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <span className="font-poppins font-medium text-dark text-lg">
          {doctor.name}
        </span>
        <div className="font-semibold text-sm text-dark-gray md:text-base">
          {doctor.specialist.name}
        </div>
        <div className="font-semibold text-sm text-dark-gray md:text-base">
          {yearsOfExp} of experience
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailCard;
