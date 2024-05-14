import { AdminPharmacyList } from '@/features/admin/components';

const PharmacyList = async ({ params }: { params: { partnerId: string } }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Pharmacy List
        </h1>
        <a
          className="bg-primary-dark font-poppins font-medium text-base text-white rounded-lg px-6 py-3 hover:bg-primary-dark/90"
          href={`/admin/partner/${params.partnerId}/pharmacy/create`}
        >
          + Create Pharmacy
        </a>
      </div>
      <AdminPharmacyList isAdmin />
    </>
  );
};

export default PharmacyList;
