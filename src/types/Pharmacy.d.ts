export type Pharmacy = {
  id: number;
  pharmacy_manager: PharmacyManager;
  name: string;
  operationalHour: string;
  operationalDay: string;
  pharmacistName: string;
  pharmacistLicense_number: string;
  pharmacistPhoneNumber: string;
  shippingMethods: ShippingMethods;
  pharmacyAddress: PharmacyAddress;
};

export type PharmacyManager = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
};

export type ShippingMethods = {
  official?: [];
  nonOfficial?: [];
};

export type PharmacyAddress = {
  id: number;
  pharmacyId: number;
  city: string;
  province: string;
  address: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  coordinate: string;
};
