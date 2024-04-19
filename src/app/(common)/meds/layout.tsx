import PageHeader from '@/components/common/PageHeader';
import AddressCard from '@/features/meds/components/AddressCard';
import SearchBar from '@/features/meds/components/SearchBar';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary">
      <div className="flex justify-center px-6">
        <div className="py-4 md:py-7 relative flex flex-col gap-4 text-sm w-full px-4 sm:px-6 max-w-[1150px]">
          <PageHeader>
            <div className="w-full md:max-w-[280px]">
              <AddressCard />
            </div>
          </PageHeader>
          <SearchBar />
        </div>
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl md:rounded-none flex justify-center px-6">
        <div className="py-4 md:py-10 w-full px-4 sm:px-6 max-w-[1150px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MedsLayout;
