'use client';

import { LocationIcon } from '@/assets/icons';
import { DEFAULT_ADDRESS } from '@/constants/address';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Address } from '@/types/Address';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { formatAddress } from '@/utils/address';
import { useEffect, useMemo, useState } from 'react';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import ModalSetAddress from '../ModalSetAddress';

type AddressCardProps = {
  user?: User;
};

const AddressCard = ({ user }: AddressCardProps) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(
    user?.addresses && user.addresses.length > 0
      ? user?.addresses[0]
      : DEFAULT_ADDRESS
  );
  const addressOpts = useMemo(
    () => (user?.addresses ? user?.addresses : []),
    [user?.addresses]
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (addressOpts.length === 0) {
      setShowModal(true);
      const timer = setTimeout(() => {
        router.push('/profile/my-addresses');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [addressOpts, router]);

  function show() {
    setShowDropdown(true);
  }

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const idx = parseInt(e.target.id.split('-')[1]);
      setAddress(addressOpts[idx]);
    }
    setShowDropdown(false);
  }

  return (
    <div className="relative">
      <div
        className="text-primary-dark bg-primary-light border border-primary-border rounded-lg py-2 ps-3 pe-2 flex items-center justify-between cursor-pointer gap-2"
        onClick={show}
      >
        <div className="flex gap-5 items-center max-w-full truncate">
          <div className="max-w-1">
            <LocationIcon width={12} />
          </div>
          <p className="truncate max-h-10">
            {addressOpts.length === 0 ? (
              'You have no addresses'
            ) : (
              <>{address && formatAddress(address)}</>
            )}
          </p>
        </div>
        <span>
          <ChevronDown size={20} />
        </span>
      </div>
      <div
        className={`mt-1 w-full absolute z-10 right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <div className="flex flex-col text-dark-gray">
          {addressOpts.length === 0 ? (
            <div className="flex gap-2 items-center justify-center p-2 border-b border-gray-light">
              <span className="mt-1">
                You have no addresses.{' '}
                <Link href="/profile/address">
                  <span className="text-primary-dark underline font-semibold">
                    Set your address
                  </span>
                </Link>
              </span>
            </div>
          ) : (
            <>
              {addressOpts.map((addr, idx) => (
                <label
                  key={idx}
                  htmlFor={`addr-${idx}`}
                  className="flex gap-2 items-center px-3 py-2 hover:bg-gray-lighter"
                >
                  <input
                    id={`addr-${idx}`}
                    type="radio"
                    name="addr"
                    defaultChecked={addr.is_active}
                    className="hidden"
                    onChange={handleChange}
                  />
                  {formatAddress(addr)}
                </label>
              ))}
            </>
          )}
        </div>
      </div>
      <ModalSetAddress showModal={showModal} />
    </div>
  );
};

export default AddressCard;
