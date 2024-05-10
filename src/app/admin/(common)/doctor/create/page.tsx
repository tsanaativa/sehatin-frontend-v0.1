import { AvatarUploader, Button } from '@/components/common';
import { CreateDoctorForm } from '@/features/admin/components';
import { Save } from 'lucide-react';

const CreateDoctor = () => {
  return (
    <form className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Create Doctor
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
        <AvatarUploader />
        <CreateDoctorForm />
      </div>
    </form>
  );
};

export default CreateDoctor;
