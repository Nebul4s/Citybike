import { useState, useEffect } from "react";

import ListView from "../components/ListView";
import RenderMap from "../components/RenderMap";
import StatisticsView from "../components/StatisticsView";

let controller, signal;
const Mainpage = () => {
  const [mapData, setMapData] = useState(null);
  const [collection, setCollection] = useState("journeys");

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [fields, setFields] = useState("");
  const [filters, setFilters] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getLocationStats, setGetLocationStats] = useState(null);
  const [locationStats, setLocationStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (collection) {
          if (controller) {
            controller.abort();
          }
          controller = new AbortController();
          signal = controller.signal;
        }

        if (!search) {
          setError(null);
          setIsLoading(true);

          const res = await fetch(
            `http://localhost:5000/${collection}/getAll?page=${page}&limit=${limit}&fields=${fields}&${filters}`,
            { signal: signal }
          );
          const json = await res.json();

          setData(json.data);
          setResults(json.results);
          setIsLoading(false);
        }

        if (search) {
          setError(null);
          setIsLoading(true);
          setData(null);
          const res = await fetch(
            `http://localhost:5000/${collection}/search?page=${page}&limit=${limit}&fields=${fields}&${filters}&search=${search}`,
            { signal: signal }
          );
          const json = await res.json();

          setData(json.data);
          setResults(json.results);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [page, limit, collection, fields, filters, search]);

  const handleStyle = () => {
    document
      .querySelector(".StatisticsView")
      .classList.toggle("stats-open__statView");
    document.querySelector(".overlay").classList.toggle("stats-open__overlay");
  };

  return (
    <div className="Mainpage">
      <div className="overlay"></div>
      <RenderMap
        mapData={mapData}
        collection={collection}
        locationStats={locationStats}
        statsLoading={statsLoading}
      />
      <ListView
        handleStatisticsViewStyle={handleStyle}
        isLoading={isLoading}
        data={data}
        results={results}
        error={error}
        setMapData={setMapData}
        page={page}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        setCollection={setCollection}
        collection={collection}
        setFields={setFields}
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
        setGetLocationStats={setGetLocationStats}
        getLocationStats={getLocationStats}
        setLocationStats={setLocationStats}
        setStatsLoading={setStatsLoading}
      />
      <StatisticsView handleStatisticsViewStyle={handleStyle} />
    </div>
  );
};

export default Mainpage;
