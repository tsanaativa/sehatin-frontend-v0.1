import { Button } from '@/components/common';
import { createAdmin } from '@/features/admin/action/admin';
import { CreateAdminForm } from '@/features/admin/components';
import { Save } from 'lucide-react';

const CreateAdmin = () => {
  return (
    <form action={createAdmin} className="my-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Admin List
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex mb-6">
        <div>
          <CreateAdminForm />
        </div>
      </div>
    </form>
  );
};

export default CreateAdmin;
