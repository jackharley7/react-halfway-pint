import React, {useState} from 'react';
import styled from 'styled-components';
import LocationInput, {useLocationInput} from './LocationSelector/LocationInput';

const Wrapper = styled.section`
  padding: 10px;
`;

const Label = styled.h5`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 1px;
`;

export default ({
  selectLocation, 
  currentLocation,
  label,
  places,
  geocoder,
}) => {
  const myLocationQuery = useLocationInput("")

  const select = (l) => {
    selectLocation(l)
    myLocationQuery.onChange(l.formatted_address, false)
  }

  const searchByQuery = (value) => {
    var request = {
      query: value,
      fields: ['name', 'formatted_address', 'geometry'],
    };
    
    return new Promise((resolve, reject) => {
      places.findPlaceFromQuery(request, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  const findByLatLng = (lat, lng) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({'location': {lat, lng}}, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <LocationInput
        value={myLocationQuery.value}
        canSearch={myLocationQuery.canSearch}
        search={searchByQuery}
        findByLatLng={findByLatLng}
        onChange={(e) => myLocationQuery.onChange(e.target.value, true)}
        onSelect={(l) => select(l)} label={label}
        currentLocation={currentLocation}/>
    </Wrapper>
  )
}

export const useLocationSelection = () => {
  const [selected, setSelected] = useState(false)
  const [selection, setSelection] = useState(null)

  function selectLocation(s) {
    setSelection(s)
    setSelected(true)
  }

  function editLocation(s) {
    setSelected(false)
  }

  function removeLocation(s) {
    setSelected(false)
    setSelection(null)
  }

  return {
    selected,
    selection,
    selectLocation,
    editLocation,
    removeLocation,
  }
};