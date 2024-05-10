import SearchDoctors from '@/features/doctors/components/SearchDoctors';
import { getUser } from '@/services/session';
import React from 'react';

const SearchDoctorsPage = async () => {
  const user = await getUser();

  return <SearchDoctors isAuthenticated={!!user} />;
};

export default SearchDoctorsPage;
