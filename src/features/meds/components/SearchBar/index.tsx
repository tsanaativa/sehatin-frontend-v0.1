'use client';

import { Button } from '@/components/common';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      search();
    }
  }

  function search() {
    let value = searchBarRef.current?.value;
    router.push(`/meds/search?keyword=${value}`);
  }

  return (
    <div className="flex gap-4">
      <div className="w-full bg-light rounded-lg flex items-center md:text-base">
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
      <Button
        className="w-32 text-base h-full hidden md:block"
        onClick={search}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
