'use client';

import { SortDropdown } from '@/components/common';
import { DOCTORS_SORT_OPTIONS } from '@/constants/sort';
import React, { useState } from 'react';

const DoctorsSortDropdown = () => {
  const [sortBy, setSortBy] = useState<string>(DOCTORS_SORT_OPTIONS[0]);
  return (
    <SortDropdown
      sortBy={sortBy}
      setSortBy={setSortBy}
      options={DOCTORS_SORT_OPTIONS}
    />
  );
};

export default DoctorsSortDropdown;
