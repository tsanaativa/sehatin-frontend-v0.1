import { AdminAdminList } from '@/features/admin/components';
import Link from 'next/link';

const AdminList = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Admin List
        </h1>
        <Link
          className="bg-primary-dark font-poppins font-medium text-base text-white rounded-lg px-6 py-3 hover:bg-primary-dark/90"
          href="/admin/admin/create"
        >
          + Create Admin
        </Link>
      </div>
      <AdminAdminList />
    </>
  );
};

export default AdminList;
