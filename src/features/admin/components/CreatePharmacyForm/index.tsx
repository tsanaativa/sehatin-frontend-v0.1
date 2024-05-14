'use client';
import { Button, Icon, Input, Selector, TextArea } from '@/components/common';
import GoogleMapView from '@/components/common/GoogleMapView';
import { DEFAULT_ADDRESS } from '@/constants/address';
import {
  getCities,
  getDistricts,
  getProvinces,
  getSubDistricts,
} from '@/services/location';
import { Address } from '@/types/Address';
import { GoogleMapResult } from '@/types/Location';
import { formatAddress } from '@/utils/formatter';
import { validate } from '@/utils/validation';
import { Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createPharmacy, createPharmacyPartner } from '../../action/pharmacy';
import { useParams } from 'next/navigation';

type CreatePharmacyFormProps = {
  isAdmin?: boolean;
};

const CreatePharmacyForm = ({ isAdmin }: CreatePharmacyFormProps) => {
  const { partnerId } = useParams();
  const [operationalDay, setOperationalDay] = useState({
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
  });

  const [shippingMethodsNon, setShippingMethodsNon] = useState({
    '1': null,
    '2': null,
  });

  const [shippingMethodsOff, setShippingMethodsOff] = useState({
    '1': null,
    '2': null,
  });

  const name = useRef<HTMLInputElement>(null);
  const openHour = useRef<HTMLInputElement>(null);
  const closeHour = useRef<HTMLInputElement>(null);
  const pharmacistName = useRef<HTMLInputElement>(null);
  const pharmacistNumber = useRef<HTMLInputElement>(null);
  const pharmacistPhoneNumber = useRef<HTMLInputElement>(null);
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
      setCoordinates(rec.recCoordinate);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

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
    handleInput('subDistrict', option);
    if (postalCodeRef.current) {
      const currentPostalCode = `${postalCodes[option]}`;
      const currentCoordinate = coordinates[option];
      postalCodeRef.current.value = currentPostalCode;
      setInput({
        ...input,
        subDistrict: option,
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
    const days: string[] = [];
    Object.keys(operationalDay).map((key) => {
      if (operationalDay[key as keyof typeof operationalDay]) {
        days.push(key);
      }
    });

    const officialShippingIds: number[] = [];
    Object.keys(shippingMethodsOff).map((key) => {
      if (shippingMethodsOff[key as keyof typeof shippingMethodsOff]) {
        officialShippingIds.push(parseInt(key));
      }
    });

    const nonofficialShippingIds: number[] = [];
    Object.keys(shippingMethodsNon).map((key) => {
      if (shippingMethodsNon[key as keyof typeof shippingMethodsNon]) {
        nonofficialShippingIds.push(parseInt(key));
      }
    });

    const body = {
      name: name.current?.value,
      operational_hour: `${openHour.current?.value} - ${closeHour.current?.value}`,
      operational: days.join(', '),
      pharmacist_name: pharmacistName.current?.value,
      pharmacist_license_number: pharmacistNumber.current?.value,
      pharmacist_phone_number: pharmacistPhoneNumber.current?.value,
      province: provinces[input.province],
      city: cities[input.city],
      city_id: parseInt(input.city),
      district: districts[input.district],
      sub_district: subDistricts[input.subDistrict],
      postal_code: input.postalCode,
      address: addressRef.current?.value,
      latitude: `${input.latitude}`,
      longitude: `${input.longitude}`,
      official_shipping_id: officialShippingIds,
      non_official_shipping_id: nonofficialShippingIds,
    };

    handleCreatePharmacy(body);
  };

  const handleCreatePharmacy = async (body: any) => {
    setIsLoading(true);
    try {
      if (!isAdmin) {
        await createPharmacy(body);
      } else {
        await createPharmacyPartner(`${partnerId}`, body);
      }
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

  const handleCheckDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    const id = e.target.id;
    setOperationalDay({
      ...operationalDay,
      [id]: val,
    });
  };

  const handleCheckShippingMethodOff = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.checked;
    const id = e.target.id;
    setShippingMethodsOff({
      ...shippingMethodsOff,
      [id]: val,
    });
  };

  const handleCheckShippingMethodNon = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.checked;
    const id = e.target.id;
    setShippingMethodsNon({
      ...shippingMethodsNon,
      [id]: val,
    });
  };

  return (
    <form action={handleSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Create Pharmacy
        </h1>
        <Button
          type="submit"
          className="flex items-center gap-x-1 px-6 py-3"
          loading={isLoading}
        >
          <Save /> Save
        </Button>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-y-6">
            <label htmlFor="name">
              <h5 className="text-sm text-dark-gray">Name</h5>
              <Input
                ref={name}
                id="name"
                placeholder="Type name..."
                inputClass="w-full"
              />
            </label>
            <label htmlFor="pharmacistName">
              <h5 className="text-sm text-dark-gray">Pharmacist Name</h5>
              <Input
                ref={pharmacistName}
                id="pharmacistName"
                placeholder="Type pharmacist name..."
                inputClass="w-full"
              />
            </label>
            <label htmlFor="pharmacistNumber">
              <h5 className="text-sm text-dark-gray">Pharmacist Number</h5>
              <Input
                ref={pharmacistNumber}
                id="pharmacistNumber"
                type="number"
                placeholder="Type pharmacist number..."
                inputClass="w-full"
              />
            </label>
            <label htmlFor="pharmacistPhoneNumber">
              <h5 className="text-sm text-dark-gray">
                Pharmacist Phone Number
              </h5>
              <Input
                ref={pharmacistPhoneNumber}
                id="pharmacistPhoneNumber"
                type="number"
                placeholder="Type pharmacist phone number..."
                inputClass="w-full"
              />
            </label>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2 w-full">
                <h5 className="text-sm text-dark-gray">Operational Day</h5>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.keys(operationalDay).map((month, idx) => (
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
                          onChange={handleCheckDay}
                          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                      <span>{month}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label htmlFor="name" className="w-full">
                <h5 className="text-sm text-dark-gray">Operational Hour</h5>
                <div className="flex items-center gap-4">
                  <Input
                    ref={openHour}
                    id="name"
                    type="time"
                    placeholder="Type open hour..."
                    inputClass="w-full"
                  />
                  <span>-</span>
                  <Input
                    ref={closeHour}
                    type="time"
                    id="name"
                    placeholder="Type close hour..."
                    inputClass="w-full"
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-col gap-y-2">
              <h5 className="text-sm text-dark-gray">
                Available Shipping Methods
              </h5>
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
                        id="1"
                        onChange={handleCheckShippingMethodOff}
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
                        id="2"
                        onChange={handleCheckShippingMethodOff}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                    <span>Official SameDay</span>
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
                        name="nonofficial"
                        id="1"
                        onChange={handleCheckShippingMethodNon}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                    <span>TIKI ONS</span>
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
                        name="nonofficial"
                        id="2"
                        onChange={handleCheckShippingMethodNon}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                    <span>JNE YES</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]">
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
                    handleInput(
                      'address',
                      (target as HTMLTextAreaElement).value
                    )
                  }
                  disabled={input.postalCode === ''}
                />
              </label>
            </div>
            <div className="mt-5">
              {input.latitude !== 0 && input.longitude !== 0 && (
                <GoogleMapView lng={input.longitude} lat={input.latitude} />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePharmacyForm;
