'use client';

import React from 'react';
import Breadcrumb from './Breadcrumb';
import { getPageName } from '@/utils/pageHeader';
import { usePathname } from 'next/navigation';

type PageHeaderProps = {
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const PageHeader = ({ title, children }: PageHeaderProps) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => {
    return !!path;
  });
  const currentPath = pathNames[pathNames.length - 1];

  return (
    <div className={`${currentPath !== 'meds' && 'hidden md:block'}`}>
      <Breadcrumb
        paths={paths}
        pathNames={pathNames}
        homeElement={'Home'}
        separator={<span className="font-normal"> &gt; </span>}
        activeClasses="font-normal hover:no-underline"
        containerClasses="flex gap-2 text-light"
        listClasses="font-semibold hover:underline"
      />
      {currentPath === 'meds' && (
        <div className="flex justify-between items-center md:my-2">
          <h1 className="text-light text-3xl font-semibold font-poppins mt-2 hidden md:block">
            {title ? title : `${getPageName(currentPath)}`}
          </h1>
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
