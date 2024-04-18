'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    let value = searchBarRef.current?.value;
    if (e.key === 'Enter') {
      router.push(`/meds/search?keyword=${value}`);
    }
  }

  return (
    <div className="w-full bg-light rounded-lg flex items-center">
      <div className="text-gray px-3">
        <Search size={20} />
      </div>
      <input
        ref={searchBarRef}
        className="w-full py-3 outline-none border-0 rounded-lg"
        placeholder="Search..."
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchBar;
