import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import Link from 'next/link';
import React from 'react';

const Specialist = () => {
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="pb-4">
          <span className="font-poppins font-semibold text-dark md:text-2xl">
            Choose Specialist
          </span>
          <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
            {DUMMY_SPECIALISTS.map((specialist, idx) => (
              <Link
                key={idx}
                href={`/doctors/search?specialistId=${specialist.id}`}
              >
                <div
                  key={idx}
                  className={`border-gray-light px-3 py-2 ${idx + 1 !== DUMMY_SPECIALISTS.length && 'border-b md:border-b-0'} md:py-3 md:px-4 ${idx % 3 !== 2 && 'md:border-e'}`}
                >
                  {specialist.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialist;