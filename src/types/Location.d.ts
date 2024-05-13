export type Location = {
  id: number;
  name: string;
};

export type Subdistrict = Location & {
  postal_code: number;
  coordinate: string;
};

export type GoogleMapResult = {
  address_components: {
    long_name: string;
    types: string[];
  }[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};
