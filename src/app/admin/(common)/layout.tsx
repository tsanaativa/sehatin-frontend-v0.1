import { AdminSidebar } from '@/components/layout';
import AdminHeader from '@/components/layout/AdminHeader';
import { getUser } from '@/services/session';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div className="w-full min-h-screen bg-gray-soft">
      <div className="flex">
        <AdminSidebar user={user} />
        <div className="w-full">
          <AdminHeader />
          <div className="px-9 py-6 ms-[320px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
