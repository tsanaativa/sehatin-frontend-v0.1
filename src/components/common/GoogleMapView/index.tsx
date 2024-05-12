import { DEFAULT_ADDRESS } from '@/constants/address';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

type GoogleMapViewProps = {
  lat: number;
  lng: number;
};

const GoogleMapView = ({
  lat = DEFAULT_ADDRESS.latitude,
  lng = DEFAULT_ADDRESS.longitude,
}: GoogleMapViewProps) => {
  const [coordinate, setCoordinate] = useState({
    lat: lat,
    lng: lng,
  });

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  // const getUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(function (pos) {
  //     console.log(pos);
  //     setCoordinate({
  //       lat: pos.coords.latitude,
  //       lng: pos.coords.longitude,
  //     });
  //   });
  // };

  const mapContainerStyle = {
    width: '100%',
    height: '250px',
  };

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    console.log(e.latLng);
  };

  useEffect(() => {
    setCoordinate({
      lat: lat,
      lng: lng,
    });
  }, [lat, lng]);

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
          <MarkerF position={coordinate} draggable onDragEnd={handleDragEnd} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
