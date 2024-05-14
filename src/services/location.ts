import { Location, Subdistrict } from '@/types/Location';
import { get } from '@/utils/api';
import { formatCoordinateToLongLat } from '@/utils/formatter';

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
    let recCoordinate: Record<string, { latitude: number; longitude: number }> =
      {};
    res.data.map((data) => {
      rec[data.id] = data.name;
      recPostalCode[data.id] = data.postal_code;
      let coordinate = formatCoordinateToLongLat(data.coordinate);
      recCoordinate[data.id] = coordinate;
    });
    return { rec, recPostalCode, recCoordinate };
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};
