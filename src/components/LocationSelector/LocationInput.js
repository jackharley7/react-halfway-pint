import React, {useState, useEffect, Fragment} from 'react';
import DropDown, { DropDownItem, DropDownItemDivider } from './../DropDown';
import LocationLoading from './LocationLoading';
import AddressListItem from './../LocationSelector/LocationInput/AddressListItem';
import CurrentLocationListItem, { useCurrentLocationSearch } from './LocationInput/CurrentLocationListItem';
import useDebounce from './../../hooks/useDebounce';

export default ({
  value,
  canSearch,
  onChange,
  onSelect,
  currentLocation,
  search,
  findByLatLng,
}) => {
  const debouncedSearchTerm = useDebounce(value, 500);
  const {searching, locations, clearLocations, error} = useLocationSearch(debouncedSearchTerm, canSearch, search)
  const {loading, geolocation, getCurrentLocation, blocked, removeGeolocation} = useCurrentLocationSearch(findByLatLng);

  const thinking = loading || searching;

  const doSelect = (l, isGeolocation) => {
    onSelect(l)
    clearLocations();
    if (!isGeolocation) {
      removeGeolocation();
    }
  };

  return (
    <div>
      <DropDown value={value} onChange={onChange} isEditing={true} hasItems={thinking || locations.length || (currentLocation && !blocked && !geolocation)}>
        { thinking ?
          <LocationLoading value='Thinking...' /> :
          <Fragment>
            { currentLocation && !blocked && <CurrentLocationListItem geolocation={geolocation} onClick={() => getCurrentLocation((l) => doSelect(l, true))} /> }
            { locations.length > 0 && <Fragment>
              <DropDownItemDivider value='results' />
            </Fragment> }
          </Fragment>
        }
        { locations.map((l, i) => <DropDownItem key={i} onClick={() => doSelect(l, false)}><AddressListItem address={l.formatted_address}/></DropDownItem>) }
      </DropDown>
    </div>
  )
}

const useLocationSearch = (value, canSearch, doSearch) => {
  const [searching, setSearching] = useState(false)
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    if (value === "" || !canSearch) return;
    async function doFetch() {
      try {
        setSearching(true);
        setLocations([]);
        const results = await doSearch(value);
        setSearching(false);
        setLocations(results);
      } catch (err) {
        setSearching(false)
        setError(true)
      }
    }
    doFetch()
  }, [value, canSearch]);

  const clear = () => {
    setLocations([]);
  };

  return {
    searching,
    locations,
    clearLocations: clear,
    error,
  }
}

export const useLocationInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [canSearch, setCanSearch] = useState(true)

  function handleValueChange(value, doSearch) {
    setCanSearch(doSearch)
    setValue(value)
  }

  return {
    value,
    canSearch,
    onChange: handleValueChange,
  }
};
