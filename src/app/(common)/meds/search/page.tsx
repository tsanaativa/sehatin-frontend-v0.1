import SearchDoctors from '@/features/doctors/components/SearchDoctors';
import SearchMeds from '@/features/meds/components/SearchMeds';
import { getUser } from '@/services/session';
import React from 'react';

const SearchMedsPage = async () => {
  const user = await getUser();

  return <SearchMeds user={user} />;
};

export default SearchMedsPage;
