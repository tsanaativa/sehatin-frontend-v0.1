'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/common';
import Selector from '@/components/common/Selector';
import { validate } from '@/utils/validation';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import TextArea from '../TextArea';

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
    latitude: '',
    longitude: '',
  };

  const [input, setInput] = useState(initialInput);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const specialistOptions = DUMMY_SPECIALISTS;

  const handleProvince = (option: string) => {
    setInput({
      ...input,
      ['province']: option,
    });
    handleInput('province', option);
  };

  const handleCity = (option: string) => {
    setInput({
      ...input,
      ['city']: option,
    });
    handleInput('city', option);
  };

  const handleDistrict = (option: string) => {
    setInput({
      ...input,
      ['district']: option,
    });
    handleInput('district', option);
  };

  const handleSubDistrict = (option: string) => {
    setInput({
      ...input,
      ['subDistrict']: option,
    });
    handleInput('subDistrict', option);
  };

  const handlePostalCode = (option: string) => {
    setInput({
      ...input,
      ['postalCode']: option,
    });
    handleInput('postalCode', option);
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
              options={specialistOptions}
              selected={input.province}
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
              options={specialistOptions}
              selected={input.city}
              name="city"
              searchable
              required
              onSelect={handleCity}
              invalid={errors['city'] !== ''}
              message={errors['city']}
              placeholder="Choose your city ..."
            />
          </label>
          <label htmlFor="district">
            <h5>District</h5>
            <Selector
              id="district"
              options={specialistOptions}
              selected={input.district}
              name="district"
              searchable
              required
              onSelect={handleDistrict}
              invalid={errors['district'] !== ''}
              message={errors['district']}
              placeholder="Choose your district ..."
            />
          </label>
          <label htmlFor="subdistrict">
            <h5>Sub District</h5>
            <Selector
              id="subdistrict"
              options={specialistOptions}
              selected={input.subDistrict}
              name="subdistrict"
              searchable
              required
              onSelect={handleSubDistrict}
              invalid={errors['subDistrict'] !== ''}
              message={errors['subDistrict']}
              placeholder="Choose your sub district ..."
            />
          </label>
          <label htmlFor="postalcode">
            <h5>Postal Code</h5>
            <Selector
              id="postalcode"
              options={specialistOptions}
              selected={input.postalCode}
              name="postalcode"
              searchable
              required
              onSelect={handlePostalCode}
              invalid={errors['postalCode'] !== ''}
              message={errors['postalCode']}
              placeholder="Choose your postal code..."
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
            />
          </label>
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