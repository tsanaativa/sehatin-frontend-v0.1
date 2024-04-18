import AddressCard from '@/features/meds/components/AddressCard';
import SearchBar from '@/features/meds/components/SearchBar';
import React from 'react';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary/40">
      <div className="p-4 relative sm:px-6 flex flex-col gap-4 text-sm">
        <AddressCard />
        <SearchBar />
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl p-5">
        {children}
      </div>
    </div>
  );
};

export default MedsLayout;
