import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [appData, setAppData] = useState({ customers: [], packages: [] });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setAppData(data));
  }, []);

  return appData;
};

export default useFetchData;
