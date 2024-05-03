export type Address = {
  id: number;
  is_main: boolean;
  is_active: boolean;
  address: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: number;
  latitude: number;
  longitude: number;
};
