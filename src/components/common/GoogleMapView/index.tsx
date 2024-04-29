import { DEFAULT_ADDRESS } from '@/constants/address';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

const GoogleMapView = () => {
  const [coordinate, setCoordinate] = useState({
    lat: DEFAULT_ADDRESS.latitude,
    lng: DEFAULT_ADDRESS.longitude,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setCoordinate({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinate}
          zoom={18}
        >
          <MarkerF position={coordinate} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
