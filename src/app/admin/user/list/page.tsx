import { AdminUserList } from '@/features/admin/components';
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
      <AdminUserList />
    </>
  );
};

export default UserList;
