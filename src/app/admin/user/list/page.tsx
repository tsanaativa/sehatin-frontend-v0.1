import {
  DataTable,
  FilterDropdown,
  Input,
  Pagination,
} from '@/components/common';
import { USER_COLUMN_LIST } from '@/constants/tables';
import { UserSortDropdown } from '@/features/admin/components';
import Link from 'next/link';

const UserList = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          User List
        </h1>
        <Link
          className="bg-primary-dark font-poppins font-medium text-base text-white rounded-lg px-6 py-3 hover:bg-primary-dark/90"
          href="/admin/user/create"
        >
          + Create User
        </Link>
      </div>
      <div className="flex justify-between mt-6">
        <Input inputClass="h-9" prepend="Search" placeholder="search" />
        <div className="flex gap-x-4">
          <UserSortDropdown />
          <FilterDropdown />
        </div>
      </div>
      <DataTable className="mt-8" columnList={USER_COLUMN_LIST} />
      <Pagination position="end" className="mt-6" />
    </>
  );
};

export default UserList;
