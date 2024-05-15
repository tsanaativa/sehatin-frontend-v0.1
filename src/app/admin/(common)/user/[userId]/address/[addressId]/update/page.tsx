import AddressLoading from '@/components/common/AddressLoading';
import { UpdateUserAddressForm } from '@/features/admin/components';
import { getUserAddressById } from '@/services/profile';
import { Address } from '@/types/Address';

const UpdateUserAddress = async ({
  params,
}: {
  params: { userId: string; addressId: string };
}) => {
  let address: Address;
  try {
    const res = await getUserAddressById(params.userId, params.addressId);
    address = res;
  } catch (err) {
    throw err as Error;
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark mb-6">
          Update User
        </h1>
        <div className="w-full">
          {!!!address ? (
            <AddressLoading />
          ) : (
            <UpdateUserAddressForm address={address} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUserAddress;
