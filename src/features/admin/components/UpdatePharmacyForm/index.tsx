'use client';
import { Icon, Input, Selector, TextArea } from '@/components/common';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import { validate } from '@/utils/validation';
import { useRef, useState } from 'react';

const UpdatePharmacyForm = () => {
  const operationalDay = useRef<Record<string, HTMLInputElement | null>>({
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
  });

  const shippingMethods = useRef<Record<string, HTMLInputElement | null>>({
    officialInstant: null,
    officialSameDay: null,
    jneYes: null,
    tikiOns: null,
  });

  const name = useRef<HTMLInputElement>(null);
  const pharmacistName = useRef<HTMLInputElement>(null);
  const pharmacistNumber = useRef<HTMLInputElement>(null);
  const pharmacistPhoneNumber = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="flex flex-col gap-y-6">
        <label htmlFor="name">
          <h5 className="text-sm text-dark-gray">Name</h5>
          <Input
            ref={name}
            id="name"
            placeholder="Type your fullname..."
            inputClass="w-full"
          />
        </label>
        <label htmlFor="pharmacistName">
          <h5 className="text-sm text-dark-gray">Pharmacist Name</h5>
          <Input
            ref={pharmacistName}
            id="pharmacistName"
            placeholder="Type your pharmacist name..."
            inputClass="w-full"
          />
        </label>
        <label htmlFor="pharmacistNumber">
          <h5 className="text-sm text-dark-gray">Pharmacist Number</h5>
          <Input
            ref={pharmacistNumber}
            id="pharmacistNumber"
            type="number"
            placeholder="Type your pharmacist number..."
            inputClass="w-full"
          />
        </label>
        <label htmlFor="pharmacistPhoneNumber">
          <h5 className="text-sm text-dark-gray">Pharmacist Phone Number</h5>
          <Input
            ref={pharmacistPhoneNumber}
            id="pharmacistPhoneNumber"
            type="number"
            placeholder="Type your pharmacist phone number..."
            inputClass="w-full"
          />
        </label>
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2">
            <h5 className="text-sm text-dark-gray">Operational Day</h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.keys(operationalDay.current).map((month, idx) => (
                <label
                  key={idx}
                  htmlFor={month}
                  aria-label={month}
                  className="flex items-center"
                >
                  <div className="relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border bg-gray-lighter border-gray has-[input:checked]:bg-primary-dark has-[input:checked]:border-primary-dark">
                    <Icon
                      name="Check"
                      className="w-2 h-2 stroke-[6] text-gray-light"
                    />
                    <input
                      type="checkbox"
                      name={month}
                      id={month}
                      ref={operationalDay.current[month]?.value}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                  <span>{month}</span>
                </label>
              ))}
            </div>
          </div>
          <label htmlFor="name">
            <h5 className="text-sm text-dark-gray">Operational Hour</h5>
            <div className="flex items-center gap-4">
              <Input
                ref={name}
                id="name"
                placeholder="Type your fullname..."
                inputClass="w-full"
              />
              <span>-</span>
              <Input
                ref={name}
                id="name"
                placeholder="Type your fullname..."
                inputClass="w-full"
              />
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-y-2">
          <h5 className="text-sm text-dark-gray">Available Shipping Methods</h5>
          <div className="grid grid-cols-2">
            <div className="grid  grid-cols-2 gap-2">
              <label
                htmlFor="officialInstant"
                aria-label="officialInstant"
                className="flex items-center"
              >
                <div className="relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border bg-gray-lighter border-gray has-[input:checked]:bg-primary-dark has-[input:checked]:border-primary-dark">
                  <Icon
                    name="Check"
                    className="w-2 h-2 stroke-[6] text-gray-light"
                  />
                  <input
                    type="checkbox"
                    name="officialInstant"
                    id="officialInstant"
                    ref={shippingMethods.current.officialInstant?.value}
                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <span>Official Instant</span>
              </label>
            </div>
            <div className="grid  grid-cols-2 gap-2">
              <label
                htmlFor="officialSameDay"
                aria-label="officialSameDay"
                className="flex items-center"
              >
                <div className="relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border bg-gray-lighter border-gray has-[input:checked]:bg-primary-dark has-[input:checked]:border-primary-dark">
                  <Icon
                    name="Check"
                    className="w-2 h-2 stroke-[6] text-gray-light"
                  />
                  <input
                    type="checkbox"
                    name="officialSameDay"
                    id="officialSameDay"
                    ref={operationalDay.current.officialSameDay?.value}
                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <span>Official Same Day</span>
              </label>
            </div>
            <div className="grid  grid-cols-2 gap-2">
              <label
                htmlFor="jneYes"
                aria-label="jneYes"
                className="flex items-center"
              >
                <div className="relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border bg-gray-lighter border-gray has-[input:checked]:bg-primary-dark has-[input:checked]:border-primary-dark">
                  <Icon
                    name="Check"
                    className="w-2 h-2 stroke-[6] text-gray-light"
                  />
                  <input
                    type="checkbox"
                    name="jneYes"
                    id="jneYes"
                    ref={operationalDay.current.jneYes?.value}
                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <span>JNE YES</span>
              </label>
            </div>
            <div className="grid  grid-cols-2 gap-2">
              <label
                htmlFor="tikiOns"
                aria-label="tikiOns"
                className="flex items-center"
              >
                <div className="relative grid place-items-center w-4 h-4 rounded-[3px] mr-3 md:mr-[18px] border bg-gray-lighter border-gray has-[input:checked]:bg-primary-dark has-[input:checked]:border-primary-dark">
                  <Icon
                    name="Check"
                    className="w-2 h-2 stroke-[6] text-gray-light"
                  />
                  <input
                    type="checkbox"
                    name="tikiOns"
                    id="tikiOns"
                    ref={operationalDay.current.tikiOns?.value}
                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
                <span>TIKI ONS</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <span className="text-base text-dark-gray">Address</span>

        <div className="[&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]">
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
          <span
            role="button"
            className="text-primary-dark font-semibold hover:underline"
            onClick={getCurrentLatLong}
          >
            Autofill by current location
          </span>
        </div>
      </div>
    </>
  );
};

export default UpdatePharmacyForm;
