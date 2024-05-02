import PatientForm from '@/features/consult/components/PatientForm';
import { getUser } from '@/utils/user';

const ConsultStart = () => {
  const user = getUser();

  return (
    <div className="d-flex w-full">
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        Patient Data
      </h2>
      <div className="mt-5">
        <PatientForm user={user} />
      </div>
    </div>
  );
};

export default ConsultStart;
