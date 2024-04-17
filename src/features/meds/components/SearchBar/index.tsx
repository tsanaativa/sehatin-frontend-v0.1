import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-full bg-light rounded-lg flex items-center">
      <div className="text-gray px-3">
        <Search size={20} />
      </div>
      <input
        className="w-full py-3 outline-none border-0 rounded-lg"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
