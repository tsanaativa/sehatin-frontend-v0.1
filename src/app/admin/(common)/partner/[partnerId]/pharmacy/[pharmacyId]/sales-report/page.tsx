import AdminSalesReportList from '@/features/admin/components/AdminSalesReportList';

const SalesReportList = () => {
  return (
    <>
      <h1 className="font-poppins font-semibold text-3xl text-dark">
        Sales Report List
      </h1>
      <AdminSalesReportList isAdmin />
    </>
  );
};

export default SalesReportList;
