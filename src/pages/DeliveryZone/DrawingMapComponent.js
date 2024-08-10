import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '800px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ['drawing'];

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBeoSc41NabP50zIM7bi2gMYTrolDSRmBA',
    libraries,
  });

  const [polygonPaths, setPolygonPaths] = useState([]);
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath();
    const coordinates = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i).toJSON();
      coordinates.push(point);
    }
    setPolygonPaths(coordinates);
    // polygon.setMap(null); // Optionally remove the polygon from the map once it's completed
  }, []);

  const drawingManagerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon'],
    },
    polygonOptions: {
      fillColor: '#2196F3',
      fillOpacity: 0.4,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
    },
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10} onLoad={onLoad}>
      {map && window.google && (
        <DrawingManager
          options={drawingManagerOptions}
          onPolygonComplete={onPolygonComplete}
        />
      )}
      {polygonPaths.length > 0 && (
        <div>
          <h2>Polygon Coordinates:</h2>
          <pre>{JSON.stringify(polygonPaths, null, 2)}</pre>
        </div>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
