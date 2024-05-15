'use client';

import { Button } from '@/components/common';
import AddressAutofillForm from '@/components/common/AddressAutofillForm';
import AddressLoading from '@/components/common/AddressLoading';
import ToggleInput from '@/components/common/ToggleInput';
import { getAddressByLatLong } from '@/services/profile';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CreateAddressAutofill = () => {
  const initialInput = {
    province: '',
    city: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    address: '',
    latitude: 0,
    longitude: 0,
    isMain: true,
  };

  const getCurrentAddress = async (lat: number, lon: number) => {
    try {
      const res = await getAddressByLatLong({
        lat: lat,
        lon: lon,
      });

      setAutofillInput({
        ...initialInput,
        province: `${res.province_id}`,
        city: `${res.city_id}`,
        district: `${res.district_id}`,
        subDistrict: `${res.sub_district_id}`,
        postalCode: `${res.postal_code}`,
        address: res.address,
        longitude: lon,
        latitude: lat,
      });
    } catch (err) {
      return;
    }
  };

  const [autofillInput, setAutofillInput] = useState<
    typeof initialInput | undefined
  >();

  useEffect(() => {
    getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      getCurrentAddress(pos.coords.latitude, pos.coords.longitude);
    });
  };

  return (
    <div>
      <h2 className="text-xl text-center font-semibold font-poppins md:text-2xl md:text-start">
        Create Address
      </h2>
      <div className="flex flex-col gap-y-2 py-4 md:min-w-[700px]">
        <div className="flex flex-col gap-4 text-xs text-dark-gray md:text-base">
          {autofillInput ? (
            <AddressAutofillForm autofillInput={autofillInput} />
          ) : (
            <div className="[&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]">
              <div className="grid md:grid-cols-2 gap-4 ">
                <AddressLoading />
              </div>
              <div className="mt-5">
                <ToggleInput
                  label="Set as main address"
                  defaultChecked
                  disabled
                />
              </div>
              <div className="flex justify-between items-center mt-5">
                <span className="text-gray flex gap-1 items-center">
                  Please wait...
                </span>
                <Button
                  className="px-4 min-w-[100px]"
                  variant="primary"
                  disabled
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAddressAutofill;
