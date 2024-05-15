import AdminUserAddressList from '@/features/admin/components/AdminUserAddressList';

const UserAddressList = ({ params }: { params: { userId: string } }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          User Address List
        </h1>
        <a
          className="bg-primary-dark font-poppins font-medium text-base text-white rounded-lg px-6 py-3 hover:bg-primary-dark/90"
          href={`/admin/user/${params.userId}/address/create`}
        >
          + Create Address
        </a>
      </div>
      <AdminUserAddressList />
    </>
  );
};

export default UserAddressList;
