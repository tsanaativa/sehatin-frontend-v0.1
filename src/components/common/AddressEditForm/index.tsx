'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Input } from '@/components/common';
import Selector from '@/components/common/Selector';
import { validate } from '@/utils/validation';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import TextArea from '../TextArea';
import {
  getCities,
  getDistricts,
  getProvinces,
  getSubDistricts,
} from '@/services/location';
import { toast } from 'react-toastify';
import GoogleMapView from '../GoogleMapView';
import { GoogleMapResult } from '@/types/Location';
import { formatAddress, formatCoordinateToLongLat } from '@/utils/formatter';
import { Address } from '@/types/Address';
import { DEFAULT_ADDRESS } from '@/constants/address';
import ToggleInput from '../ToggleInput';
import { getAddressByLatLong } from '@/services/profile';

type AddressEditFormProps = {
  address: Address;
};

const AddressEditForm = ({ address }: AddressEditFormProps) => {
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

  // const initialInput = {
  //   province: address.province,
  //   city: address.city,
  //   district: address.district,
  //   subDistrict: address.sub_district,
  //   postalCode: `${address.postal_code}`,
  //   address: address.address,
  //   latitude: address.latitude,
  //   longitude: address.longitude,
  //   isMain: address.is_main,
  // };

  const [input, setInput] = useState(initialInput);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const [provinces, setProvinces] = useState<Record<string, string>>({});
  const [cities, setCities] = useState<Record<string, string>>({});
  const [districts, setDistricts] = useState<Record<string, string>>({});
  const [subDistricts, setSubDistricts] = useState<Record<string, string>>({});
  const [postalCodes, setPostalCodes] = useState<Record<string, number>>({});

  //   const fetchProvinces = async () => {
  //     try {
  //       const rec = await getProvinces();
  //       setProvinces(rec);
  //       if (address) {
  //         // rec.filter(address.province)
  //         const provinceId = Object.keys(provinces).find(
  //           (key) => provinces[key] === address.province
  //         );
  //       }
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  //   const fetchCitiesByProvince = async (provinceId: string) => {
  //     try {
  //       const rec = await getCities(provinceId);
  //       setCities(rec);
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  //   const fetchDistrictsByCity = async (cityId: string) => {
  //     try {
  //       const rec = await getDistricts(cityId);
  //       setDistricts(rec);
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  //   const fetchSubDistrictsByDistrict = async (districtId: string) => {
  //     try {
  //       const rec = await getSubDistricts(districtId);
  //       setSubDistricts(rec.rec);
  //       setPostalCodes(rec.recPostalCode);
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  // const getIdByName = useCallback((records: Record<string,string>, name: string) => {
  //   return (Object.keys(records) as Array<string>).find(key => records[key] === name);
  // }, [])

  useEffect(() => {
    console.log(address);
    if (address.coordinate) {
      const coordinate = formatCoordinateToLongLat(address.coordinate);
      setInput({
        province: address.province,
        city: address.city,
        district: address.district,
        subDistrict: address.sub_district,
        postalCode: `${address.postal_code}`,
        address: address.address,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        isMain: address.is_main,
      });
    }

    // if (address) {
    //   const provinceId = getIdByName(provinces, address.province);
    //   fetchCitiesByProvince(`{provinceId}`);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const handleProvince = (option: string) => {
  //     setInput({
  //       ...input,
  //       ['province']: option,
  //     });
  //     handleInput('province', option);
  //     fetchCitiesByProvince(option);
  //   };

  //   const handleCity = (option: string) => {
  //     setInput({
  //       ...input,
  //       ['city']: option,
  //     });
  //     handleInput('city', option);
  //     fetchDistrictsByCity(option);
  //   };

  //   const handleDistrict = (option: string) => {
  //     setInput({
  //       ...input,
  //       ['district']: option,
  //     });
  //     handleInput('district', option);
  //     fetchSubDistrictsByDistrict(option);
  //   };

  //   const handleSubDistrict = (option: string) => {
  //     setInput({
  //       ...input,
  //       subDistrict: option,
  //     });
  //     handleInput('subDistrict', option);
  //     if (postalCodeRef.current) {
  //       const currentPostalCode = `${postalCodes[option]}`;
  //       postalCodeRef.current.value = currentPostalCode;
  //       setInput({
  //         ...input,
  //         postalCode: currentPostalCode,
  //       });
  //       getLatLongByPostalCode(currentPostalCode, option);
  //     }
  //   };

  //   const getLatLongByPostalCode = async (
  //     postalCode: string,
  //     subDistrictId: string
  //   ) => {
  //     try {
  //       let response = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&address=${postalCode},ID`
  //       );
  //       const result: { results: GoogleMapResult[] } = await response.json();
  //       console.log(result);
  //       if (result.results.length > 0) {
  //         setInput({
  //           ...input,
  //           subDistrict: subDistrictId,
  //           postalCode: postalCode,
  //           latitude: result.results[0].geometry.location.lat,
  //           longitude: result.results[0].geometry.location.lng,
  //         });
  //       }
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  //   const handleInput = (id: string, value: string) => {
  //     const errs = errors;

  //     if (value == '') {
  //       errs[id] = `${id.replace('-', ' ')} cannot be empty`;
  //       setErrors({ ...errs });
  //       return;
  //     }

  //     errs[id] = validate(value, id);

  //     setErrors({ ...errs });

  //     if (id === 'address') {
  //       getLatLongByAddress(value);
  //     }
  //   };

  const handleIsMain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMain = e.target.checked;
    if (input.isMain !== isMain) {
      setInput({
        ...input,
        isMain: isMain,
      });
    }
  };

  //   const invalidSubmission = () => {
  //     return Object.values(errors).some((err) => err !== '');
  //   };

  //   const anyEmptyField = () => {
  //     return (
  //       input.province === '' ||
  //       input.city === '' ||
  //       input.district === '' ||
  //       input.subDistrict === '' ||
  //       addressRef.current?.value === ''
  //     );
  //   };

  //   const handleSubmit = () => {
  //     const body = {
  //       province: provinces[input.province],
  //       city: cities[input.city],
  //       city_id: parseInt(input.city),
  //       district: districts[input.district],
  //       sub_district: subDistricts[input.subDistrict],
  //       postal_code: input.postalCode,
  //       address: addressRef.current?.value,
  //       latitude: input.latitude,
  //       longitude: input.longitude,
  //       is_main: input.isMain,
  //     };
  //     console.log(body);
  //     if (invalidSubmission() || anyEmptyField()) {
  //       const allErrors = Object.fromEntries(
  //         Object.keys(errors).map((i) => {
  //           const err: Record<string, string> = {
  //             address:
  //               addressRef.current?.value === ''
  //                 ? 'address cannot be empty'
  //                 : errors['address'],
  //             province:
  //               input.province === ''
  //                 ? 'province cannot be empty'
  //                 : errors['province'],
  //             city: input.city === '' ? 'city cannot be empty' : errors['city'],
  //             district:
  //               input.district === ''
  //                 ? 'district cannot be empty'
  //                 : errors['district'],
  //             subDistrict:
  //               input.subDistrict === ''
  //                 ? 'sub district cannot be empty'
  //                 : errors['subDistrict'],
  //             postalCode:
  //               input.postalCode === ''
  //                 ? 'postal code cannot be empty'
  //                 : errors['postalCode'],
  //           };
  //           return [i, err[i]];
  //         })
  //       );
  //       setErrors({ ...allErrors });
  //       return;
  //     }
  //   };

  //   const [currentPos, setCurrentPos] = useState({
  //     latitude: 0,
  //     longitude: 0
  //   });

  //   useEffect(() => {
  //     getUserLocation();
  //   }, [])

  //   const getUserLocation = () => {
  //     navigator.geolocation.getCurrentPosition(function (pos) {
  //       console.log(pos);
  //       setCurrentPos({
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //       });
  //     });
  //   };

  //   const getCurrentAddress = async () => {
  //     setIsFetchingLatLon(true);
  //     setIsAutofill(true);
  //     await addressByLatLong(currentPos.latitude, currentPos.longitude);
  //   }

  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [isFetchingLatLon, setIsFetchingLatLon] = useState<boolean>(false);
  //   const [isAutofill, setIsAutofill] = useState<boolean>(false);

  //   const addressByLatLong = async (lat: number, lon: number) => {
  //     try {
  //       console.log(lat, lon)
  //       const res = await getAddressByLatLong({
  //         lat: lat,
  //         lon: lon
  //       });
  //       console.log(res)
  //       console.log(input.district)
  //       setExistingInput({
  //         address: res.address,
  //         postalCode: `${res.postal_code}`,
  //         subDistrict: `${res.sub_district_id}`,
  //         district: `${res.district_id}`,
  //         city: `${res.city_id}`,
  //         province: `${res.province_id}`,
  //         latitude: lat,
  //         longitude: lon,
  //         isMain: input.isMain
  //       })
  //     } catch (error) {
  //       toast.error((error as Error).message);
  //     } finally {
  //       setIsFetchingLatLon(false);
  //     }
  //   }

  //   const [existingInput, setExistingInput] = useState(initialInput);

  //   const getLatLongByAddress = async (address: string) => {
  //     const addressObj: Address = {
  //       ...DEFAULT_ADDRESS,
  //       province: input.province,
  //       city: input.city,
  //       district: input.district,
  //       sub_district: input.subDistrict,
  //       postal_code: parseInt(input.postalCode),
  //       address: address,
  //     };

  //     const formattedAddress = formatAddress(addressObj).split(' ').join('+');
  //     try {
  //       let response = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&address=${formattedAddress}`
  //       );
  //       const result: { results: GoogleMapResult[] } = await response.json();
  //       if (result.results.length > 0) {
  //         setInput({
  //           ...input,
  //           latitude: result.results[0].geometry.location.lat,
  //           longitude: result.results[0].geometry.location.lng,
  //         });
  //       }
  //     } catch (err) {
  //       toast.error((err as Error).message);
  //     }
  //   };

  return (
    <>
      <div className="[&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]">
        <div className="grid md:grid-cols-2 gap-4 ">
          <label htmlFor="province">
            <h5>Province</h5>
            <Input
              id="province"
              name="province"
              disabled
              value={address.province}
              //   ref={postalCodeRef}
            />
          </label>
          <label htmlFor="city">
            <h5>City</h5>
            <Input
              id="city"
              name="city"
              disabled
              value={address.city}
              //   ref={postalCodeRef}
            />
          </label>
          <label htmlFor="district">
            <h5>District</h5>
            <Input
              id="district"
              name="district"
              disabled
              value={address.district}
              //   ref={postalCodeRef}
            />
          </label>
          <label htmlFor="subdistrict">
            <h5>Sub District</h5>
            <Input
              id="subdistrict"
              name="subdistrict"
              disabled
              value={address.sub_district}
              //   ref={postalCodeRef}
            />
          </label>
          <label htmlFor="postalcode">
            <h5>Postal Code</h5>
            <Input
              id="postalCode"
              name="postalCode"
              disabled
              value={address.postal_code}
              //   ref={postalCodeRef}
            />
          </label>
          <label htmlFor="address">
            <h5>Address</h5>
            <TextArea
              //   ref={addressRef}
              id="address"
              name="address"
              value={address.address}
              disabled={input.postalCode === ''}
            />
          </label>
        </div>
        <div className="mt-5">
          <ToggleInput
            label="Set as main address"
            defaultChecked
            onChange={handleIsMain}
          />
        </div>
        <div className="mt-5">
          {address.address}
          {address.latitude} {address.longitude}
          {input.latitude} {input.longitude}
          {input.latitude !== 0 && input.longitude !== 0 && (
            <GoogleMapView lng={input.longitude} lat={input.latitude} />
          )}
        </div>
        <div className="flex justify-between items-center mt-5">
          <span
            role="button"
            className="text-primary-dark font-semibold hover:underline"
            // onClick={getCurrentAddress}
          >
            Edit Address
          </span>
          <Button
            className="px-4 min-w-[100px]"
            variant="primary"
            //   loading={isLoading}
          >
            s Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddressEditForm;
