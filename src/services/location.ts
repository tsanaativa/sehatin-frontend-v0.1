import { Doctor } from '@/types/Doctor';
import { User } from '@/types/User';
import { get } from '@/utils/api';
import { getSession } from './session';
import { Location, Subdistrict } from '@/types/Location';

export const getProvinces = async () => {
  try {
    let res = await get<Location[]>(`/loc/provinces`);
    let rec: Record<string, string> = {};
    res.data.map((data) => {
      rec[data.id] = data.name;
    });
    return rec;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getCities = async (provinceId: string) => {
  try {
    let res = await get<Location[]>(`/loc/cities/${provinceId}`);
    let rec: Record<string, string> = {};
    res.data.map((data) => {
      rec[data.id] = data.name;
    });
    return rec;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getDistricts = async (cityId: string) => {
  try {
    let res = await get<Location[]>(`/loc/districts/${cityId}`);
    let rec: Record<string, string> = {};
    res.data.map((data) => {
      rec[data.id] = data.name;
    });
    return rec;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getSubDistricts = async (districtId: string) => {
  try {
    let res = await get<Subdistrict[]>(`/loc/sub-districts/${districtId}`);
    let rec: Record<string, string> = {};
    let recPostalCode: Record<string, number> = {};
    res.data.map((data) => {
      rec[data.id] = data.name;
      recPostalCode[data.id] = data.postal_code;
    });
    return { rec, recPostalCode };
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getGoogleLatLongByAddress = async (address: string) => {
  try {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&address=${address}`
    );
    const result = await response.json();
    // console.log(result, "buset");
    if (!result.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (err) {
    console.log((err as Error).message);
  }
};
