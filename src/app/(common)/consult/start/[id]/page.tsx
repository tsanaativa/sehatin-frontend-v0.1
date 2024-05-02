import PatientForm from '@/features/consult/components/PatientForm';

const ConsultStart = () => {
  return (
    <div className="d-flex w-full">
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        Patient Data
      </h2>
      <div className="mt-5">
        <PatientForm />
      </div>
    </div>
  );
};

export default ConsultStart;
