import PageHeader from '@/components/common/PageHeader';
import AddressCard from '@/features/meds/components/AddressCard';
import SearchBar from '@/features/meds/components/SearchBar';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary w-full">
      <div className="flex justify-center px-6">
        <div className="max-w-[1150px] py-4 relative flex flex-col gap-4 text-sm w-full px-4 sm:px-6 md:py-7">
          <PageHeader>
            <div className="w-full md:max-w-[280px]">
              <AddressCard />
            </div>
          </PageHeader>
          <SearchBar />
        </div>
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-6 md:rounded-none">
        <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MedsLayout;
