import { UpdateDoctorForm } from '@/features/admin/components';
import { getOneDoctor } from '@/services/doctor';

const UpdateDoctor = async ({ params }: { params: { doctorId: number } }) => {
  const doctor = await getOneDoctor(params.doctorId);

  return <UpdateDoctorForm doctor={doctor} />;
};

export default UpdateDoctor;
