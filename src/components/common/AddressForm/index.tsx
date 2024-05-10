'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@/components/common';
import Selector from '@/components/common/Selector';
import { validate } from '@/utils/validation';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import TextArea from '../TextArea';
import {
  getCities,
  getDistricts,
  getGoogleLatLongByAddress,
  getProvinces,
  getSubDistricts,
} from '@/services/location';
import { toast } from 'react-toastify';
import GoogleMapView from '../GoogleMapView';
import { GoogleMapResult } from '@/types/Location';
import { formatAddress } from '@/utils/formatter';
import { Address } from '@/types/Address';
import { DEFAULT_ADDRESS } from '@/constants/address';

const AddressForm = () => {
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
  };

  const [input, setInput] = useState(initialInput);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const [provinces, setProvinces] = useState<Record<string, string>>({});
  const [cities, setCities] = useState<Record<string, string>>({});
  const [districts, setDistricts] = useState<Record<string, string>>({});
  const [subDistricts, setSubDistricts] = useState<Record<string, string>>({});
  const [postalCodes, setPostalCodes] = useState<Record<string, number>>({});

  const fetchProvinces = async () => {
    try {
      const rec = await getProvinces();
      setProvinces(rec);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchCitiesByProvince = async (provinceId: string) => {
    try {
      const rec = await getCities(provinceId);
      setCities(rec);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchDistrictsByCity = async (cityId: string) => {
    try {
      const rec = await getDistricts(cityId);
      setDistricts(rec);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const fetchSubDistrictsByDistrict = async (districtId: string) => {
    try {
      const rec = await getSubDistricts(districtId);
      setSubDistricts(rec.rec);
      setPostalCodes(rec.recPostalCode);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvince = (option: string) => {
    setInput({
      ...input,
      ['province']: option,
    });
    handleInput('province', option);
    fetchCitiesByProvince(option);
  };

  const handleCity = (option: string) => {
    setInput({
      ...input,
      ['city']: option,
    });
    handleInput('city', option);
    fetchDistrictsByCity(option);
  };

  const handleDistrict = (option: string) => {
    setInput({
      ...input,
      ['district']: option,
    });
    handleInput('district', option);
    fetchSubDistrictsByDistrict(option);
  };

  const handleSubDistrict = (option: string) => {
    setInput({
      ...input,
      ['subDistrict']: option,
      ['postalCode']: `${postalCodes[option]}`,
    });
    handleInput('subDistrict', option);
    if (postalCodeRef.current)
      postalCodeRef.current.value = `${postalCodes[option]}`;
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
      ...input,
      address: addressRef.current?.value,
    };
    console.log(body);
  };

  const getCurrentLatLong = () => {};

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
        setInput({
          ...input,
          latitude: result.results[0].geometry.location.lat,
          longitude: result.results[0].geometry.location.lng,
        });
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="[&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
      >
        <div className="grid md:grid-cols-2 gap-4 ">
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
                handleInput('address', (target as HTMLTextAreaElement).value)
              }
              disabled={input.postalCode === ''}
            />
          </label>
        </div>
        <div className="mt-5">
          <GoogleMapView lng={input.longitude} lat={input.latitude} />
        </div>
        <div className="flex justify-between mt-5">
          <span
            role="button"
            className="text-primary-dark font-semibold hover:underline"
            onClick={getCurrentLatLong}
          >
            Autofill by current location
          </span>
          <Button className="px-4 min-w-[100px]" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
