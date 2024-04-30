'use client';

import { Button } from '@/components/common';
import { DISPLAYED_SPECIALISTS } from '@/constants/specialists';
import { Specialist } from '@/types/Doctor';
import { useState } from 'react';
import DoctorsSection from '../DoctorsSection';
import Link from 'next/link';

const DoctorsBySpecialists = () => {
  const NUMBER_OF_SPECIALISTS_TO_FETCH = 2;
  const [offset, setOffset] = useState(NUMBER_OF_SPECIALISTS_TO_FETCH);
  const [specialists, setSpecialists] = useState<Specialist[]>(
    DISPLAYED_SPECIALISTS.slice(0, 2)
  );

  const loadMore = async () => {
    const offsetToFetch = offset + NUMBER_OF_SPECIALISTS_TO_FETCH;
    setOffset(offsetToFetch);
    setSpecialists(DISPLAYED_SPECIALISTS.slice(0, offsetToFetch));
  };

  return (
    <div>
      {specialists.map((specialist, idx) => (
        <DoctorsSection specialist={specialist} key={idx} />
      ))}
      <div className="w-full flex justify-center mt-2 md:mt-10">
        {offset !== 8 ? (
          <Button
            className="w-full my-6 md:text-lg md:max-w-[300px]"
            variant="outlined-primary"
            onClick={loadMore}
          >
            Load More
          </Button>
        ) : (
          <Link href="/specialist" className="w-full md:max-w-[300px]">
            <Button
              className="w-full my-6 px-3 md:px-5 md:text-lg"
              variant="outlined-primary"
            >
              See All Specialists
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DoctorsBySpecialists;
