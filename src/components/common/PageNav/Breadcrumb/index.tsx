import { getPageName } from '@/utils/pageHeader';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type BreadcrumbProps = {
  paths: string;
  pathnames: string[];
  homeElement?: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
};

const Breadcrumb = ({
  paths,
  pathnames,
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
}: BreadcrumbProps) => {
  return (
    <div className="hidden -mt-2 md:block">
      <ul className={containerClasses}>
        {homeElement && (
          <>
            <li className={listClasses}>
              <Link href={'/'}>{homeElement}</Link>
            </li>
            {pathnames.length > 0 && separator}
          </>
        )}
        {pathnames.map((link, index) => {
          let href = `/${pathnames.slice(0, index + 1).join('/')}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                {pathnames.length !== index + 1 ? (
                  <Link href={href} className="hover:underline">
                    {getPageName(link)}
                  </Link>
                ) : (
                  `${getPageName(link)}`
                )}
              </li>
              {!(!!!homeElement && index === 0) && (
                <>{pathnames.length !== index + 1 && separator}</>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
