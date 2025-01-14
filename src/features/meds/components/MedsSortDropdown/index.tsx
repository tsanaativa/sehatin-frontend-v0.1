'use client';

import { SortDropdown } from '@/components/common';
import { MEDS_SORT_OPTIONS } from '@/constants/sort';
import { useState } from 'react';

const MedsSortDropdown = () => {
  const [sortBy, setSortBy] = useState<string>(MEDS_SORT_OPTIONS[0]);
  return (
    <>
      <SortDropdown
        sortBy={sortBy}
        onSort={setSortBy}
        options={MEDS_SORT_OPTIONS}
        sort=""
      />
    </>
  );
};

export default MedsSortDropdown;
