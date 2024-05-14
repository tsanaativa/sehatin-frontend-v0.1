'use client';
import { Button, Input, TextArea } from '@/components/common';
import AddressLoading from '@/components/common/AddressLoading';
import GoogleMapView from '@/components/common/GoogleMapView';
import Selector from '@/components/common/Selector';
import ToggleInput from '@/components/common/ToggleInput';
import { DEFAULT_ADDRESS } from '@/constants/address';
import { updateUserAddress } from '@/features/profile/actions/profile';
import {
  getCities,
  getDistricts,
  getProvinces,
  getSubDistricts,
} from '@/services/location';
import { Address } from '@/types/Address';
import { GoogleMapResult } from '@/types/Location';
import { formatAddress, formatCoordinateToLongLat } from '@/utils/formatter';
import { validate } from '@/utils/validation';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type UpdateUserAddressFormProps = {
  address: Address;
};

const UpdateUserAddressForm = ({ address }: UpdateUserAddressFormProps) => {
  const { userId } = useParams();
  const [errors, setErrors] = useState<Record<string, string>>({
    province: '',
    city: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    address: '',
  });

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

  const [input, setInput] = useState(initialInput);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const [provinces, setProvinces] = useState<Record<string, string>>({});
  const [cities, setCities] = useState<Record<string, string>>({});
  const [districts, setDistricts] = useState<Record<string, string>>({});
  const [subDistricts, setSubDistricts] = useState<Record<string, string>>({});
  const [postalCodes, setPostalCodes] = useState<Record<string, number>>({});
  const [coordinates, setCoordinates] = useState<
    Record<string, { latitude: number; longitude: number }>
  >({});

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isDefault, setIsDefault] = useState<boolean>(true);

  const fetchProvinces = async () => {
    try {
      const rec = await getProvinces();
      setProvinces(rec);
      if (address && isDefault) {
        const provinceId = getIdByName(rec, address.province);
        if (provinceId) {
          setInput({
            ...input,
            province: provinceId,
          });
          await fetchCitiesByProvince(provinceId);
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchCitiesByProvince = async (provinceId: string) => {
    try {
      const rec = await getCities(provinceId);
      setCities(rec);
      if (address && isDefault) {
        const cityId = getIdByName(rec, address.city);
        if (cityId) {
          const defaultInput = {
            ...initialInput,
            province: provinceId,
          };
          await fetchDistrictsByCity(cityId, defaultInput);
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchDistrictsByCity = async (
    cityId: string,
    defaultInput?: typeof initialInput
  ) => {
    try {
      const rec = await getDistricts(cityId);
      setDistricts(rec);
      if (address && isDefault && defaultInput) {
        const districtId = getIdByName(rec, address.district);
        if (districtId) {
          await fetchSubDistrictsByDistrict(districtId, {
            ...defaultInput,
            city: cityId,
            district: districtId,
          });
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchSubDistrictsByDistrict = async (
    districtId: string,
    defaultInput?: typeof initialInput
  ) => {
    try {
      const rec = await getSubDistricts(districtId);
      setSubDistricts(rec.rec);
      setPostalCodes(rec.recPostalCode);
      setCoordinates(rec.recCoordinate);
      if (address && isDefault && defaultInput) {
        const subDistrictId = getIdByName(rec.rec, address.sub_district);
        if (subDistrictId && address.coordinate) {
          const coordinate = formatCoordinateToLongLat(address.coordinate);
          setInput({
            ...defaultInput,
            subDistrict: subDistrictId,
            postalCode: `${address.postal_code}`,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          });
          setIsDefault(false);
          setIsFetching(false);
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const getIdByName = useCallback(
    (records: Record<string, string>, name: string) => {
      const res = (Object.keys(records) as Array<string>).find(
        (key) => records[key] === name
      );
      return res;
    },
    []
  );

  const handleProvince = (option: string) => {
    setCities({});
    setDistricts({});
    setSubDistricts({});
    setPostalCodes({});
    setInput({
      ...input,
      ['province']: option,
      city: '',
      district: '',
      subDistrict: '',
      postalCode: '',
    });
    handleInput('province', option);
    fetchCitiesByProvince(option);
  };

  const handleCity = (option: string) => {
    setDistricts({});
    setSubDistricts({});
    setPostalCodes({});
    setInput({
      ...input,
      ['city']: option,
      district: '',
      subDistrict: '',
      postalCode: '',
    });
    handleInput('city', option);
    fetchDistrictsByCity(option);
  };

  const handleDistrict = (option: string) => {
    setSubDistricts({});
    setPostalCodes({});
    setInput({
      ...input,
      ['district']: option,
      subDistrict: '',
      postalCode: '',
    });
    handleInput('district', option);
    fetchSubDistrictsByDistrict(option);
  };

  const handleSubDistrict = (option: string) => {
    setInput({
      ...input,
      subDistrict: option,
    });
    handleInput('subDistrict', option);
    if (postalCodeRef.current) {
      const currentPostalCode = `${postalCodes[option]}`;
      const currentCoordinate = coordinates[option];
      postalCodeRef.current.value = currentPostalCode;
      setInput({
        ...input,
        postalCode: currentPostalCode,
        latitude: currentCoordinate?.latitude,
        longitude: currentCoordinate?.longitude,
      });
    }
  };

  const handleInput = (id: string, value: string) => {
    const errs = errors;

    if (value == '') {
      errs[id] = `${id.replace('-', ' ')} cannot be empty`;
      setErrors({ ...errs });
      return;
    }

    errs[id] = validate(value, id);

    setErrors({ ...errs });

    if (id === 'address') {
      getLatLongByAddress(value);
    }
  };

  const handleIsMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMain = e.target.checked;
    if (input.isMain !== isMain) {
      setInput({
        ...input,
        isMain: isMain,
      });
    }
  };

  const invalidSubmission = () => {
    return Object.values(errors).some((err) => err !== '');
  };

  const anyEmptyField = () => {
    return (
      input.province === '' ||
      input.city === '' ||
      input.district === '' ||
      input.subDistrict === '' ||
      addressRef.current?.value === ''
    );
  };

  const handleSubmit = () => {
    if (invalidSubmission() || anyEmptyField()) {
      const allErrors = Object.fromEntries(
        Object.keys(errors).map((i) => {
          const err: Record<string, string> = {
            address:
              addressRef.current?.value === ''
                ? 'address cannot be empty'
                : errors['address'],
            province:
              input.province === ''
                ? 'province cannot be empty'
                : errors['province'],
            city: input.city === '' ? 'city cannot be empty' : errors['city'],
            district:
              input.district === ''
                ? 'district cannot be empty'
                : errors['district'],
            subDistrict:
              input.subDistrict === ''
                ? 'sub district cannot be empty'
                : errors['subDistrict'],
            postalCode:
              input.postalCode === ''
                ? 'postal code cannot be empty'
                : errors['postalCode'],
          };
          return [i, err[i]];
        })
      );
      setErrors({ ...allErrors });
      return;
    }

    const body = {
      province: provinces[input.province],
      city: cities[input.city],
      city_id: parseInt(input.city),
      district: districts[input.district],
      sub_district: subDistricts[input.subDistrict],
      postal_code: input.postalCode,
      address: addressRef.current?.value,
      latitude: `${input.latitude}`,
      longitude: `${input.longitude}`,
      is_main: input.isMain,
    };

    handleUpdateAddress(body);
  };

  const handleUpdateAddress = async (body: any) => {
    setIsLoading(true);
    try {
      await updateUserAddress(`${userId}`, address.id, body);
    } catch (err) {
      toast.error((err as Error).message);
    }
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLatLongByAddress = async (address: string) => {
    const addressObj: Address = {
      ...DEFAULT_ADDRESS,
      province: input.province,
      city: input.city,
      district: input.district,
      sub_district: input.subDistrict,
      postal_code: parseInt(input.postalCode),
      address: address,
    };

    const formattedAddress = formatAddress(addressObj).split(' ').join('+');
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&address=${formattedAddress}`
      );
      const result: { results: GoogleMapResult[] } = await response.json();
      if (result.results.length > 0) {
        const addrComponents = result.results[0].address_components;
        const lastComponent = addrComponents[addrComponents.length - 1];
        if (
          lastComponent.types[0] === 'postal_code' &&
          lastComponent.long_name === input.postalCode
        ) {
          setInput({
            ...input,
            latitude: result.results[0].geometry.location.lat,
            longitude: result.results[0].geometry.location.lng,
          });
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    setIsDefault(true);
    setProvinces({});
    setCities({});
    setDistricts({});
    setSubDistricts({});
    setPostalCodes({});
    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <form
        action={handleSubmit}
        className="[&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <div className="grid md:grid-cols-2 gap-4 ">
          {isFetching ? (
            <AddressLoading />
          ) : (
            <>
              <label htmlFor="province">
                <h5>Province</h5>
                <Selector
                  id="province"
                  options={provinces}
                  selected={input.province || ''}
                  name="province"
                  searchable
                  required
                  onSelect={handleProvince}
                  invalid={errors['province'] !== ''}
                  message={errors['province']}
                  placeholder="Choose your province ..."
                />
              </label>
              <label htmlFor="city">
                <h5>City</h5>
                <Selector
                  id="city"
                  options={cities}
                  selected={input.city}
                  name="city"
                  searchable
                  required
                  onSelect={handleCity}
                  invalid={errors['city'] !== ''}
                  message={errors['city']}
                  placeholder="Choose your city ..."
                  disabled={Object.keys(cities).length === 0}
                />
              </label>
              <label htmlFor="district">
                <h5>District</h5>
                <Selector
                  id="district"
                  options={districts}
                  selected={input.district}
                  name="district"
                  searchable
                  required
                  onSelect={handleDistrict}
                  invalid={errors['district'] !== ''}
                  message={errors['district']}
                  placeholder="Choose your district ..."
                  disabled={Object.keys(districts).length === 0}
                />
              </label>
              <label htmlFor="subdistrict">
                <h5>Sub District</h5>
                <Selector
                  id="subdistrict"
                  options={subDistricts}
                  selected={input.subDistrict}
                  name="subdistrict"
                  searchable
                  required
                  onSelect={handleSubDistrict}
                  invalid={errors['subDistrict'] !== ''}
                  message={errors['subDistrict']}
                  placeholder="Choose your sub district ..."
                  disabled={Object.keys(subDistricts).length === 0}
                />
              </label>
              <label htmlFor="postalcode">
                <h5>Postal Code</h5>
                <Input
                  id="postalCode"
                  name="postalCode"
                  disabled
                  ref={postalCodeRef}
                  defaultValue={address.postal_code}
                />
              </label>
              <label htmlFor="address">
                <h5>Address</h5>
                <TextArea
                  ref={addressRef}
                  id="address"
                  name="address"
                  message={errors['address']}
                  invalid={errors['address'] !== ''}
                  onInput={({ target }) =>
                    handleInput(
                      'address',
                      (target as HTMLTextAreaElement).value
                    )
                  }
                  disabled={input.postalCode === ''}
                  defaultValue={address.address}
                />
              </label>
            </>
          )}
        </div>
        <div className="mt-5">
          <ToggleInput
            label="Set as main address"
            defaultChecked={address.is_main}
            onChange={handleIsMain}
          />
        </div>
        <div className="mt-5">
          {address && input.latitude !== 0 && input.longitude !== 0 && (
            <GoogleMapView lng={input.longitude} lat={input.latitude} />
          )}
        </div>
        <div className="flex justify-end items-center mt-5">
          <Button
            className="px-4 min-w-[100px]"
            variant="primary"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateUserAddressForm;