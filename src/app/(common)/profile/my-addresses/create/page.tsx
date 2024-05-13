import { AddressForm } from '@/components/common';

const CreateAddress = async () => {
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        Create Address
      </h2>
      <div className="flex flex-col gap-y-2 py-4 md:min-w-[700px]">
        <div className="flex flex-col gap-4 text-xs text-dark-gray md:text-base">
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAddress;
