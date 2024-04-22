'use client';

import React from 'react';
import PageNav from '../PageNav';
import { AddressCard, SearchBar } from '@/features/meds/components';
import { getPageName, getPathNames } from '@/utils/pageHeader';
import { usePathname } from 'next/navigation';

const UserPageHeader = () => {
  const paths = usePathname();
  const pathnames = getPathNames(paths);
  const currentPath = pathnames[pathnames.length - 1];

  return (
    <>
      {!!getPageName(currentPath) && (
        <div className="max-w-[1150px] py-4 relative flex flex-col gap-4 text-sm w-full px-4 sm:px-6 md:py-7">
          <PageNav>
            <div className="w-full md:max-w-[280px]">
              <AddressCard />
            </div>
          </PageNav>
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default UserPageHeader;