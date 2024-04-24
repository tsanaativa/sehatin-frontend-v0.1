import { BriefcaseBusiness, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common';
import { Doctor } from '@/types/Doctor';
import Badge from '@/components/common/Badge';

type DoctorCardProps = {
  width?: string;
  doctor: Doctor;
  isMini?: boolean;
};

const DoctorCard = ({ width, doctor, isMini = false }: DoctorCardProps) => {
  const yearsOfExp = new Date().getFullYear() - doctor?.work_start_year;

  return (
    <Link href="/doctors/dr-siapa-hayo">
      {isMini ? (
        <div
          className={`p-3 border-2 border-primary-border rounded-lg flex flex-col w-fit items-center gap-1 ${width}`}
        >
          <div className="relative w-fit h-fit">
            <Image
              src={doctor.photo_url}
              className="object-cover rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20"
              width={300}
              height={300}
              alt=""
            />
            <div
              className={`absolute bottom-1 right-[0.4rem] rounded-full border border-light ${doctor.is_online ? 'bg-green' : 'bg-gray'} w-4 h-4`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-poppins font-medium text-dark max-w-[200px] line-clamp-1 md:max-w-[250px] lg:max-w-full md:text-lg">
              {doctor.name}
            </span>
            <div className="font-semibold text-sm text-dark-gray md:text-base">
              {doctor.specialist.name}
            </div>
          </div>
          <Button
            className="flex items-center justify-center gap-x-1 px-5 text-xs w-fit mt-1 md:text-sm"
            variant="primary"
          >
            <MessageCircleMore size={14} /> Chat
          </Button>
        </div>
      ) : (
        <div
          className={`p-3 flex gap-3 border-2 border-primary-border rounded-lg w-full ${width}`}
        >
          <Image
            src={doctor.photo_url}
            className="object-cover rounded w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            width={300}
            height={300}
            alt=""
          />
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center gap-2">
              <span className="font-poppins font-medium text-dark max-w-[200px] line-clamp-1 md:max-w-[250px] lg:max-w-full md:text-lg">
                {doctor.name}
              </span>
              <Badge
                variant={`${doctor.is_online ? 'success' : 'gray'}`}
                className="text-nowrap"
              >
                • {doctor.is_online ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <div className="font-semibold text-sm text-dark-gray md:text-base">
              {doctor.specialist.name}
            </div>
            <Badge
              variant="gray"
              className="w-fit flex gap-1 items-center font-bold"
            >
              <BriefcaseBusiness size={15} /> {yearsOfExp} year
              {yearsOfExp > 1 && 's'}
            </Badge>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center font-poppins font-medium text-secondary  md:text-sm lg:text-base">
                Rp {doctor.fee.toLocaleString('id')}
              </div>
              <Button
                className="flex items-center justify-center gap-x-1 px-5 text-xs w-fit md:text-sm"
                variant="primary"
              >
                <MessageCircleMore size={14} /> Chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default DoctorCard;
