import FilterDropdown from '@/components/common/FilterDropdown';
import Pagination from '@/components/common/Pagination';
import { DUMMY_DOCTOR } from '@/constants/dummy';
import DoctorCard from '@/features/doctors/components/DoctorCard';
import DoctorsSortDropdown from '@/features/doctors/components/DoctorsSortDropdown';
import React from 'react';

const DoctorsBySpecialist = () => {
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex justify-between items-center">
          <span className="text-dark-gray text-sm">
            10 to 20 of 100 results
          </span>
          <div className="grid grid-cols-2 gap-2">
            <DoctorsSortDropdown />
            <FilterDropdown />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-w-max gap-3 mb-4 mt-4 sm:gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((val, idx) => (
            <DoctorCard
              key={idx}
              width="md:min-w-[350px]"
              doctor={DUMMY_DOCTOR}
            />
          ))}
        </div>
        <div className="flex w-full py-4">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default DoctorsBySpecialist;
