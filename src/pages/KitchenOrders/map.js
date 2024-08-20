import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBeoSc41NabP50zIM7bi2gMYTrolDSRmBA', // Replace with your API key
  });

  const [markerPosition, setMarkerPosition] = useState({lat: props.latitude ? props.latitude : center.lat, lng: props.longitude ? props.longitude : center.lng});

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={15}
    >
      <Marker
        position={markerPosition}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapComponent);
