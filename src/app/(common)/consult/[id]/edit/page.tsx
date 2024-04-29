import PatientForm from '@/features/doctors/components/PatientForm';

const EditPatientData = () => {
  return (
    <div className="d-flex w-full">
      <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
        Edit Patient Data
      </h2>
      <div className="mt-5">
        <PatientForm isEdit />
      </div>
    </div>
  );
};

export default EditPatientData;
