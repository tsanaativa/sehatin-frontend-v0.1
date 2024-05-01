import ConsultRoom from '@/features/doctors/components/ConsultRoom';
import ConsultSidebar from '@/features/doctors/components/ConsultSidebar';

const Consult = () => {
  return (
    <>
      <div className="hidden md:block">
        <ConsultSidebar />
      </div>
      <ConsultRoom />
    </>
  );
};

export default Consult;
