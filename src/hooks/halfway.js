import {useState, useEffect} from 'react'
import getHalfwayLocations from '../services/journey';

export const useHalfwayPoint = (start, end) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [halfway, setHalfway] = useState({location: {}, venues: []});

  useEffect(() => {
    async function doFetch() {
      try {
        const results = await getHalfwayLocations(start, end);
        setLoading(false);
        setHalfway(results);
      } catch (err) {
        setLoading(false)
        setError(true)
      }
    }
    doFetch()
  }, []);

  return {halfway, loading, error};
}
