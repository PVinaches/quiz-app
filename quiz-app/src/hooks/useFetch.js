import { useEffect, useState } from "react";

export function useFetch(fetchFunction, fetchParams = [], initialValue) {
  const [data, setData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError(null);

      try {
        const fetchedData = await fetchFunction(...fetchParams);
        setData(fetchedData);
      } catch(error) {
        setError({ message: error.message || 'Failed to fetch data' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFunction, fetchParams]);

  return { data, isFetching, error };
};