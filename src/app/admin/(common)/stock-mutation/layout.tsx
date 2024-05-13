'use client';

import Breadcrumb from '@/components/common/PageNav/Breadcrumb';
import { getPathNames } from '@/utils/pageHeader';
import { usePathname } from 'next/navigation';

const StockMutationLayout = ({ children }: { children: React.ReactNode }) => {
  const paths = usePathname();
  const pathnames = getPathNames(paths);

  return (
    <div>
      <span>
        <Breadcrumb
          paths={paths}
          pathnames={pathnames}
          separator={<span className="font-normal"> &gt; </span>}
          activeClasses="font-normal hover:no-underline"
          containerClasses="flex gap-2 text-dark"
          listClasses="font-semibold hover:underline"
        />
      </span>
      <div className="bg-light rounded-xl px-9 py-6 mt-6 min-h-[80vh] w-full">
        {children}
      </div>
    </div>
  );
};

export default StockMutationLayout;
