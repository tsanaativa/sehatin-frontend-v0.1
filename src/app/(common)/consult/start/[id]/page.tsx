import PatientForm from '@/features/consult/components/PatientForm';
import { getProfile } from '@/services/profile';
import { User } from '@/types/User';

const ConsultStart = async () => {
  let profileData: User | undefined;
  profileData = await getProfile();

  return (
    <div className="d-flex w-full">
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        Patient Data
      </h2>
      <div className="mt-5">
        <PatientForm user={profileData} />
      </div>
    </div>
  );
};

export default ConsultStart;
