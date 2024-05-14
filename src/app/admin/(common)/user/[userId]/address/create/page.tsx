import { AddressCreateForm } from '@/components/common';

const CreateUserAddress = () => {
  return (
    <div className="mt-2">
      <div className="flex flex-col justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark mb-6">
          Create Address
        </h1>
        <div className="w-full">
          <AddressCreateForm />
        </div>
      </div>
    </div>
  );
};

export default CreateUserAddress;
