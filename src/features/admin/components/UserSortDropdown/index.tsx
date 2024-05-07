'use client';
import { SortDropdown } from '@/components/common';
import { ADMIN_USER_SORT_OPTIONS } from '@/constants/sort';
import { useState } from 'react';

const UserSortDropdown = () => {
  const [sortBy, setSortBy] = useState<string>(ADMIN_USER_SORT_OPTIONS[0]);
  return (
    <>
      <SortDropdown
        sortBy={sortBy}
        setSortBy={setSortBy}
        options={ADMIN_USER_SORT_OPTIONS}
      />
    </>
  );
};

export default UserSortDropdown;
