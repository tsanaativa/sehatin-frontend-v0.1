'use client';

import { CategorizeSection } from '@/components/common';
import { Doctor, Specialist } from '@/types/Doctor';
import { get } from '@/utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DoctorCard from '../DoctorCard';
import DoctorCardSkeleton from '../DoctorCardSkeleton';

type DoctorsSectionProps = {
  specialist: Specialist;
  isAuthenticated: boolean;
};

const DoctorsSection = ({
  specialist,
  isAuthenticated,
}: DoctorsSectionProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const params = {
          specialistId: specialist.id,
          limit: 6,
        };
        const res = await get<typeof params, { doctors: Doctor[] }>(
          `/doctors`,
          params
        );

        setDoctors(res.data.doctors);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [specialist.id]);

  return (
    <CategorizeSection
      title={specialist.name}
      seeAllUrl={`/doctors/search?specialistId=${specialist.id}`}
      className="mt-6 md:mt-16"
    >
      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 min-w-max gap-3 sm:gap-4 md:gap-6 ">
          {!isLoading ? (
            <>
              {doctors.map((doctor, idx) => (
                <DoctorCard
                  key={idx}
                  width="min-w-[350px] md:min-w-[400px]"
                  doctor={doctor}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 2 }).map((val, idx) => (
                <DoctorCardSkeleton
                  key={idx}
                  width="min-w-[350px] md:min-w-[400px]"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </CategorizeSection>
  );
};

export default DoctorsSection;
