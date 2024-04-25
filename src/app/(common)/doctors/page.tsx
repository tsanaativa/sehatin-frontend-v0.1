import { Button } from '@/components/common';
import CategorizeCard from '@/components/common/CategorizeCard';
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
            title={'My Recent Doctors'}
            seeAllUrl={`/doctors/recent`}
          >
            <div className="overflow-x-auto">
              <div className="flex flex-wrap min-w-max gap-3 sm:gap-4 md:gap-6 ">
                {Array.from({ length: 4 }).map((val, idx) => (
                  <DoctorCard
                    key={idx}
                    width="w-[160px]"
                    doctor={DUMMY_DOCTOR}
                    isMini
                  />
                ))}
              </div>
            </div>
          </CategorizeSection>
          <CategorizeSection
            title={'Specialists'}
            seeAllUrl={`/doctors/specialist`}
            className="mt-6 md:mt-16"
          >
            <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto md:gap-x-6 md:text-lg">
              {DISPLAYED_SPECIALISTS.map((specialist, idx) => (
                <CategorizeCard
                  key={idx}
                  link={`/doctors/search?specialistId=${specialist.id}`}
                  icon={specialist.icon}
                  name={specialist.name}
                />
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
                <div className="grid grid-cols-2 min-w-max gap-3 sm:gap-4 md:gap-6 ">
                  {Array.from({ length: 4 }).map((val, idx) => (
                    <DoctorCard
                      key={idx}
                      width="min-w-[350px] md:min-w-[400px]"
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
