import SearchDoctors from '@/features/doctors/components/SearchDoctors';
import SearchMeds from '@/features/meds/components/SearchMeds';
import { getCategories } from '@/services/category';
import { getUser } from '@/services/session';
import React from 'react';

const SearchMedsPage = async () => {
  const user = await getUser();
  const categories = await getCategories();

  return <SearchMeds user={user} categories={categories} />;
};

export default SearchMedsPage;
