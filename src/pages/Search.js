
import React, { useState } from 'react';
import styled from 'styled-components';
// import GoogleMapReact from 'google-map-react';
import LocationSelector, { useLocationSelection } from '../components/LocationSelector';
import { MiddlePointMarker } from '../components/MapMarkers';
import Box from '../components/Layout/Box';
import MapBox from '../components/Layout/MapBox';
import ActionButton from '../components/Buttons/ActionButton';
import { screens } from '../theme';
import GoogleMap from '../components/GoogleMap';

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  @media ${screens.md} {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  };
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export default () => {
  const myLocationSelection = useLocationSelection();
  const friendsLocationSelection = useLocationSelection();

  const [placesAPI, setPlacesAPI] = useState(null);
  const [geocodeAPI, setGeocodeAPI] = useState(null);

  const handleApiLoaded = ({ map, maps }) => {
    setPlacesAPI(new maps.places.PlacesService(map));
    setGeocodeAPI(new maps.Geocoder);
  };

  return (
    <Wrapper>
      <Box title="Find A Halfway Pint" style={{borderBottomRightRadius: '30px'}}>
        <LocationSelector label="My Location" places={placesAPI} geocoder={geocodeAPI} {...myLocationSelection} currentLocation />
        <LocationSelector label="Friends Location" places={placesAPI} geocoder={geocodeAPI} {...friendsLocationSelection} />
        <ButtonWrapper>
          <ActionButton
            url={buildHalfwayUrl(myLocationSelection, friendsLocationSelection)}
            disabled={!(myLocationSelection.selected && friendsLocationSelection.selected)}>Go</ActionButton>
        </ButtonWrapper>
      </Box>
      <MapBox style={{flex: 1, height: '56vh'}}>
        <GoogleMap
          defaultCenter={{lat: 51.5301934, lng: -0.013624}}
          onGoogleApiLoaded={handleApiLoaded}
          defaultZoom={12}
        >
          { myLocationSelection.selected ? <MiddlePointMarker lat={myLocationSelection.selection.geometry.location.lat()} lng={myLocationSelection.selection.geometry.location.lng()} /> : null }
          { friendsLocationSelection.selected ? <MiddlePointMarker lat={friendsLocationSelection.selection.geometry.location.lat()} lng={friendsLocationSelection.selection.geometry.location.lng()} /> : null }
        </GoogleMap>
      </MapBox>
    </Wrapper>
  )
};

const buildHalfwayUrl = (a, b) => {
  if (!(a.selected && b.selected)) {
    return null
  }
  return `/halfway?start=${a.selection.geometry.location.lat()},${a.selection.geometry.location.lng()}&end=${b.selection.geometry.location.lat()},${b.selection.geometry.location.lng()}`
};
