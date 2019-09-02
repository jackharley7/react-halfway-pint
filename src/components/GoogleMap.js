import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { ThemeContext } from 'styled-components';

export default ({defaultCenter, onGoogleApiLoaded, children, defaultZoom = 15}) => {
  const theme = useContext(ThemeContext);

  const createMapOptions = () => {
    if( theme.mode === 'light') return { styles: {}};
    return {
      styles: darkModeStyles,
    };
  }  

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyC0u5-GKiyOy0Bp0-Bvu-mvwUI3tirf-NE", libraries: ["places"]}}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      placesLibrary={true}
      yesIWantToUseGoogleMapApiInternals
      hoverDistance={25}
      onGoogleApiLoaded={onGoogleApiLoaded}
      options={createMapOptions}
    >
      { children }
    </GoogleMapReact>
  );
};

const darkModeStyles = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
];