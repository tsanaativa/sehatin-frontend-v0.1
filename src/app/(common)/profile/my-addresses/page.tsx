import AddressCard from '@/components/common/AddressCard';
import AddAddressButton from '@/features/profile/components/AddAddressButton';
import { getProfile } from '@/services/profile';
import Link from 'next/link';

const MyAddresses = async () => {
  const profile = await getProfile();

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        My Addresses
      </h2>
      <div className="flex flex-col gap-4 mt-5">
        {profile.addresses.map((addr, idx) => (
          <div key={idx}>
            <Link
              href={`/profile/my-addresses/${addr.id}`}
              className="md:hidden"
            >
              <AddressCard address={addr} key={idx} />
            </Link>
            <div className="hidden md:block">
              <AddressCard address={addr} key={idx} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 md:justify-end">
        <AddAddressButton />
      </div>
    </div>
  );
};

export default MyAddresses;
