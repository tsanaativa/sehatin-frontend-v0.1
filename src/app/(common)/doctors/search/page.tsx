import SearchDoctors from '@/features/doctors/components/SearchDoctors';
import { getUser } from '@/services/user';
import React from 'react';

const SearchDoctorsPage = () => {
  const user = getUser();

  return <SearchDoctors isAuthenticated={!!user} />;
};

export default SearchDoctorsPage;
