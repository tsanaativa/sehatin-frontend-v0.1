import { AvatarUploader, Button } from '@/components/common';
import { createUser } from '@/features/admin/action/user';
import { CreateUserForm } from '@/features/admin/components';
import { Save } from 'lucide-react';

const CreateUser = () => {
  return (
    <form action={createUser} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          User List
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-center gap-x-12 mt-6">
        <AvatarUploader />
        <div className=" w-1/2">
          <span className="font-semibold text-base text-dark-gray">
            User Data
          </span>
          <CreateUserForm />
        </div>
      </div>
    </form>
  );
};

export default CreateUser;
