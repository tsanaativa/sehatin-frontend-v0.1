'use client';

import { getPageName, getPathNames } from '@/utils/pageHeader';
import { usePathname } from 'next/navigation';
import Breadcrumb from './Breadcrumb';

type PageNavProps = {
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const PageNav = ({ title, children }: PageNavProps) => {
  const paths = usePathname();
  const pathnames = getPathNames(paths);
  const currentPath = pathnames[pathnames.length - 1];

  return (
    <div className={`${currentPath !== 'meds' && 'hidden md:block'}`}>
      <Breadcrumb
        paths={paths}
        pathnames={pathnames}
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

export default PageNav;
