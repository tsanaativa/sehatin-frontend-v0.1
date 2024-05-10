export type Location = {
  id: number;
  name: string;
};

export type Subdistrict = Location & {
  postal_code: number;
};

export type GoogleMapResult = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};
