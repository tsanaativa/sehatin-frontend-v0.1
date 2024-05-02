import ConsultRoom from '@/features/doctors/components/ConsultRoom';
import ConsultSidebar from '@/features/doctors/components/ConsultSidebar';

const Consult = () => {
  return (
    <>
      <div className="hidden md:block">
        <ConsultSidebar />
      </div>
      <div className="w-full min-h-full md:border md:border-gray-light md:py-6 md:px-7 md:rounded">
        <ConsultRoom />
      </div>
    </>
  );
};

export default Consult;
