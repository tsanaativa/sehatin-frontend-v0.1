import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-full bg-light rounded-lg flex items-center">
      <div className="text-gray px-3">
        <Search />
      </div>
      <input
        className="w-full py-4 outline-none rounded-lg"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
