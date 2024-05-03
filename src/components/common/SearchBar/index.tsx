'use client';

import { Button } from '@/components/common';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    const value = searchBarRef.current?.value;
    const path = pathname.includes('meds') ? 'meds' : 'doctors';
    router.push(`/${path}/search?keyword=${value}`);
  };

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
          defaultValue={searchParams.get('keyword') || ''}
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
