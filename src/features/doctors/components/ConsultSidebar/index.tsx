'use client';

import { DUMMY_DOCTOR } from '@/constants/dummy';
import DoctorDetailCard from '../DoctorDetailCard';
import { Button } from '@/components/common';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ConsultSidebar = () => {
  const doctor = DUMMY_DOCTOR;
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-5 text-center items-center">
      <div className="border border-gray-light rounded min-w-[300px]">
        <DoctorDetailCard doctor={doctor} />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Link href={`/consult/${id}/edit`}>
          <Button variant="outlined-primary" className="w-full">
            Edit Patient Data
          </Button>
        </Link>
        <Button variant="outlined-danger" className="w-full">
          End Chat
        </Button>
      </div>
    </div>
  );
};

export default ConsultSidebar;
