import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMap from './GoogleMap';
import { BeerMarker } from './MapMarkers';
import LocationDetails from './BeerMap/LocationDetails';
import getClosestLocation from './../services/closestPub';

const MapWrapper = styled.div`
  height: 40vh;
`;

export default ({lat, lng}) => {
  const [location, setLocation] = useState(null);

  const handleApiLoaded = async ({ map, maps }) => {
    const service = new maps.places.PlacesService(map);
    const options = await findNearbyPubs(service, lat, lng);
    setLocation(getClosestLocation(lat, lng, options));
  };

  return (
    <div style={{ height: '56vh', width: '100%' }}>
      <LocationDetails location={location}/>
      <MapWrapper>
        <GoogleMap
          defaultCenter={{lat, lng}}
          defaultZoom={15}
          onGoogleApiLoaded={handleApiLoaded}
        >
          { location && <BeerMarker lat={location.geometry.location.lat()} lng={location.geometry.location.lng()}/> }
        </GoogleMap>
      </MapWrapper>
    </div>
  );
};

export const useMap = (iLat, iLng) => {
  const [lat, setLat] = useState(iLat);
  const [lng, setLng] = useState(iLng);

  function changeLocation(nLat, nLng) {
    setLat(nLat)
    setLng(nLng)
  }

  return {
    lat,
    lng,
    changeLocation,
  }
};

const findNearbyPubs = (service, lat, lng) => {
  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: {
        lat,
        lng,
      },
      radius: 700,
      type: ['bar']
    }, (a, b) => {
      if (b === "OK") {
        resolve(a);
      } else {
        reject(b);
      }
    });
  });
}
