import AddressCard from '@/components/common/AddressCard';
import SearchBar from '@/components/common/SearchBar';
import React from 'react';

const Meds = () => {
  return (
    <main>
      <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary/40 py-5 px-4 relative sm:px-6 flex flex-col gap-4">
        <AddressCard />
        <SearchBar />
      </div>
    </main>
  );
};

export default Meds;
