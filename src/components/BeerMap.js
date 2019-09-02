import React, { useState } from 'react';
import GoogleMap from './GoogleMap';
import { MiddlePointMarker, BeerMarker } from './MapMarkers';

export default ({lat, lng}) => {
  const [locations, setLocations] = useState([]);

  const handleApiLoaded = async ({ map, maps }) => {
    const service = new maps.places.PlacesService(map);

    try {
      const options = await findNearbyPubs(service, lat, lng)
      setLocations(options);
    } catch {
      // no pubs found :(
    }
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMap
        defaultCenter={{lat, lng}}
        defaultZoom={15}
        onGoogleApiLoaded={handleApiLoaded}
      >
        { locations.map(({geometry}, i) => <BeerMarker key={i} lat={geometry.location.lat()} lng={geometry.location.lng()}/>) }
        <MiddlePointMarker lat={lat} lng={lng} />
      </GoogleMap>
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

// calculate distance from one lat/lng to another. Slight overkill for short distances!
// const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2-lat1);  // deg2rad below
//   const dLon = deg2rad(lon2-lon1); 
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ; 
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   const d = R * c; // Distance in km
//   return d;
// }

// const deg2rad = (deg) => deg * (Math.PI/180);

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
