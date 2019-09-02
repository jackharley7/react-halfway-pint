import {useState, useEffect} from 'react';

export default (value, duration) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, duration);

    return () => {
      clearTimeout(handler);
    }
  }, [value]);

  return debounceValue;
};