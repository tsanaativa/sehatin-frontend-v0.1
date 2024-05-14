export type Address = {
  id: number;
  is_main: boolean;
  address: string;
  province: string;
  city: string;
  city_id: number;
  district: string;
  sub_district: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  coordinate?: string;
};

export type ReverseGeoResponse = {
  province_id: number;
  city_id: number;
  district_id: number;
  sub_district_id: number;
  postal_code: number;
  address: string;
};
