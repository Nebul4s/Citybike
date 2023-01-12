import { useState, useEffect } from "react";

export const useFetch = (collection, endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!collection) return;
        const res = await fetch(
          `http://localhost:5000/${collection}/${endpoint}`
        );
        const json = await res.json();

        if (json.code === 429) {
          setError(json);
          return;
        }

        setData(json);
      } catch (err) {
        console.error(err);
        setError(`Fetch resulted with an error: ${err.name}, ${err.message}`);
      }
    };
    getData();
  }, [collection, endpoint]);

  return { data, error };
};
