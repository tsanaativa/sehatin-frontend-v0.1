import { AdminSidebar } from '@/components/layout';
import AdminHeader from '@/components/layout/AdminHeader';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-gray-soft">
      <div className="flex">
        <AdminSidebar />
        <div className="w-full">
          <AdminHeader />
          <div className="px-9 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
