// 'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getPageName } from '@/utils/pageHeader';

type BreadcrumbProps = {
  paths: string;
  pathNames: string[];
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
};

const Breadcrumb = ({
  paths,
  pathNames,
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
}: BreadcrumbProps) => {
  return (
    <div className="hidden md:block -mt-2">
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={'/'}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {pathNames.length !== index + 1 ? (
                  <Link href={href} className="hover:underline">
                    {getPageName(link)}
                  </Link>
                ) : (
                  `${getPageName(link)}`
                )}
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
