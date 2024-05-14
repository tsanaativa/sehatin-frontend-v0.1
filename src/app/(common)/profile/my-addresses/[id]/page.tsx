import AddressUpdateForm from '@/components/common/AddressUpdateForm';
import { getUserAddress } from '@/services/profile';

const UpdateAddress = async ({ params }: { params: { id: number } }) => {
  const address = await getUserAddress(params.id);
  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        Update Address
      </h2>
      <div className="flex flex-col gap-y-2 py-4 md:min-w-[700px]">
        <div className="flex flex-col gap-4 text-xs text-dark-gray md:text-base">
          <AddressUpdateForm address={address} />
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
