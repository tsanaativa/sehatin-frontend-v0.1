import { Button } from '@/components/common';
import CategorizeSection from '@/components/common/CategorizeSection';
import { DUMMY_DOCTOR } from '@/constants/dummy';
import { DISPLAYED_SPECIALISTS } from '@/constants/specialists';
import DoctorCard from '@/features/doctors/components/DoctorCard';
import Link from 'next/link';
import React from 'react';

const Doctors = () => {
  const shownSpecialists = DISPLAYED_SPECIALISTS.slice(0, 2);
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex flex-col">
          <CategorizeSection
            title={'Specialists'}
            seeAllUrl={`/doctors/specialist`}
          >
            <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto mt-2 md:mt-4 md:gap-x-8 md:text-lg">
              {DISPLAYED_SPECIALISTS.map((specialist, idx) => (
                <Link
                  href={`/doctors/search?specialistId=${specialist.id}`}
                  key={idx}
                >
                  <div className="h-full bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
                    <div className="min-w-fit">{specialist.icon}</div>
                    <span className="line-clamp-2">{specialist.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CategorizeSection>
          {shownSpecialists.map((specialist, idx) => (
            <CategorizeSection
              title={specialist.name}
              seeAllUrl={`/doctors/search?specialistId=${specialist.id}`}
              className="mt-6 md:mt-16"
              key={idx}
            >
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 min-w-max gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-4">
                  {Array.from({ length: 4 }).map((val, idx) => (
                    <DoctorCard
                      key={idx}
                      width="min-w-[350px]"
                      doctor={DUMMY_DOCTOR}
                    />
                  ))}
                </div>
              </div>
            </CategorizeSection>
          ))}
          <div className="w-full flex justify-center mt-2 md:mt-10">
            <Button
              className="w-full my-6 md:text-lg md:max-w-[300px]"
              variant="outlined-primary"
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
