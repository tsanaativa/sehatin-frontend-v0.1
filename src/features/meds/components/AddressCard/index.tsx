'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LocationIcon } from '@/assets/icons';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Address } from '@/types/Address';
import Link from 'next/link';

const AddressCard = () => {
  const defaultAddress: Address = {
    id: 0,
    is_main: false,
    is_active: true,
    address: 'Jl. Mega Kuningan Barat III Lot 10.1-6',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Kuningan Timur',
    subdistrict: 'Setiabudi',
    postal_code: 12950,
  };
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>(defaultAddress);
  const [addressOpts, setAddressOpts] = useState<Address[]>([]);

  useEffect(() => {
    function getAddrOpts() {
      const dummyAddresses: Address[] = [
        {
          id: 1,
          is_main: false,
          is_active: true,
          address: 'Jl. Blablab No. 3',
          province: 'DKI Jakarta',
          city: 'Jakarta Pusat',
          district: 'Menteng',
          subdistrict: 'Gondangdia',
          postal_code: 12345,
        },
        {
          id: 2,
          is_main: true,
          is_active: false,
          address: 'Jl. Blablab No. 3',
          province: 'DKI Jakarta',
          city: 'Jakarta Pusat',
          district: 'Menteng',
          subdistrict: 'Gondangdia',
          postal_code: 12345,
        },
        {
          id: 3,
          is_main: true,
          is_active: false,
          address: 'Jl. ssss No. 3',
          province: 'DKI Jakarta',
          city: 'Jakarta Pusat',
          district: 'Menteng',
          subdistrict: 'Gondangdia',
          postal_code: 12345,
        },
      ];

      const addrOpts = dummyAddresses.filter((addr) => {
        if (addr.is_active) {
          setAddress(addr);
        }
        return addr.is_active === false;
      });

      setAddressOpts(addrOpts);
    }
    getAddrOpts();
  }, []);

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

  function formatAddress(addr: Address) {
    return `${addr.address}, ${addr.subdistrict}, ${addr.district}, ${addr.city}, ${addr.province}, ${addr.postal_code}`;
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
            {address && formatAddress(address)}
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
            <div className="flex gap-2 flex items-center justify-center p-2 border-b border-gray-light">
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
              {addressOpts.map((addr, idx) => {
                return (
                  <label
                    key={idx}
                    htmlFor={`addr-${idx}`}
                    className="flex gap-2 flex items-center px-3 py-2 hover:bg-gray-lighter"
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
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
