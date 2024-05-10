import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Badge, Button } from '@/components/common';
import { Consultation } from '@/types/Consultation';
import { formatBirthDateToAge, formatDateTime } from '@/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';

type ConsultationCardProps = {
  consultation: Consultation;
  isDoctor: boolean;
};

const ConsultationCard = ({
  consultation,
  isDoctor,
}: ConsultationCardProps) => {
  return (
    <div className="border border-primary-border rounded-lg">
      <div className="flex justify-between gap-x-4 p-4 border-b border-primary-border">
        <Image
          src={
            (isDoctor
              ? consultation.doctor.profile_picture
              : consultation.user.profile_picture) || DefaultAvatarImg
          }
          className="rounded-full w-20 h-20 object-cover"
          width={600}
          height={300}
          alt=""
        />
        <div className="flex justify-between w-full h-fit">
          <div className=" flex flex-col gap-1">
            <span className="font-poppins font-medium text-dark md:text-lg">
              {isDoctor ? consultation.doctor.name : consultation.user.name}
            </span>
            <span className="font-medium text-dark-gray">
              {isDoctor
                ? consultation.doctor.specialist.name
                : `${consultation.patient_name} (${formatBirthDateToAge(consultation.patient_birth_date)} y.o., ${consultation.patient_gender?.name})`}
            </span>
            <span className="font-medium text-dark-gray text-xs md:text-sm">
              {consultation.ended_at
                ? `Ended at ${formatDateTime(consultation.ended_at)}`
                : `Started at ${formatDateTime(consultation.created_at)}`}
            </span>
          </div>
          <div className="flex flex-col justify-between min-w-[100px]">
            <Badge variant={`${consultation.ended_at ? 'success' : 'gray'}`}>
              {consultation.ended_at ? 'Completed' : 'Ongoing'}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-2">
          {consultation.certificate_url && (
            <a href={consultation.certificate_url || ''} target="_blank">
              <Button
                variant="outlined-primary"
                className="px-2 text-sm md:px-4"
              >
                View Certificate
              </Button>
            </a>
          )}
          {consultation.prescription_url && (
            <a href={consultation.prescription_url || ''} target="_blank">
              <Button
                variant="outlined-primary"
                className="px-2 text-sm md:px-4"
              >
                View Prescription
              </Button>
            </a>
          )}
        </div>
        <Link href={`/consult/${consultation.id}`}>
          <Button className="px-3 text-sm min-w-[120px]">View Chat</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConsultationCard;
