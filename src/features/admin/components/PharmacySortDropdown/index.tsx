'use client';
import { SortDropdown } from '@/components/common';
import { ADMIN_PHARMACY_SORT_OPTIONS } from '@/constants/sort';
import { useState } from 'react';

const DoctorSortDropdown = () => {
  const [sortBy, setSortBy] = useState<string>(ADMIN_PHARMACY_SORT_OPTIONS[0]);
  return (
    <>
      <SortDropdown
        sortBy={sortBy}
        setSortBy={setSortBy}
        options={ADMIN_PHARMACY_SORT_OPTIONS}
      />
    </>
  );
};

export default DoctorSortDropdown;
