import AddressCard from '@/features/meds/components/AddressCard';
import SearchBar from '@/features/meds/components/SearchBar';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-500/0 to-primary">
      <div className="flex justify-center px-4">
        <div className="py-4 relative flex flex-col gap-4 text-sm w-full lg:max-w-[1075px]">
          <AddressCard />
          <SearchBar />
        </div>
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl md:rounded-none flex justify-center px-4">
        <div className="py-4 md:py-10 w-full lg:max-w-[1075px]">{children}</div>
      </div>
    </div>
  );
};

export default MedsLayout;
