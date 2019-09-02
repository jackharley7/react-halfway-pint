import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-regular-svg-icons'
import {DropDownItem} from './../../DropDown';
import LocationLoading from './../LocationLoading';

export default ({loading, geolocation, onClick}) => {
  if (geolocation) return null;
  if (loading) return (
    <DropDownItem icon={<FontAwesomeIcon icon={faDotCircle}/>}>
      { <LocationLoading value='Thinking...' /> }
    </DropDownItem>
  );
  return (
    <DropDownItem icon={<FontAwesomeIcon icon={faDotCircle}/>}>
      <div className='current-location-list-item-content' onClick={onClick}>Use Current Location</div>
    </DropDownItem>
  )
}

export const useCurrentLocationSearch = (doSearch) => {
  const [geolocation, setGeolocation] = useState();
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const showPosition = async(p, onSelect) => {
    const results = await doSearch(p.coords.latitude, p.coords.longitude);
    setGeolocation(results[0]);
    onSelect(results[0]);
    setLoading(false);
  }
  function showError(err) {
    setLoading(false);
    if (err && err.code && err.code === 1) {
      setBlocked(true);
    }
  }

  const getCurrentLocation = async (onSelect) => {
    setLoading(true);
    return navigator.geolocation.getCurrentPosition((p) => showPosition(p, onSelect), showError);
  }

  const removeGeolocation = async () => {
    setGeolocation(null);
  };

  return {
    loading,
    geolocation,
    getCurrentLocation,
    removeGeolocation,
    blocked,
  }
};
