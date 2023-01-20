import { useState, useEffect } from "react";

import ListView from "../components/ListView";
import RenderMap from "../components/RenderMap";
import StatisticsView from "../components/StatisticsView";

const Mainpage = () => {
  const [mapData, setMapData] = useState(null);
  const [collection, setCollection] = useState("journeys");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [fields, setFields] = useState("");
  const [filters, setFilters] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:5000/${collection}/getAll?page=${page}&limit=${limit}&fields=${fields}&${filters}`
        );

        const json = await res.json();

        setData(json.data);
        setResults(json.results);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [page, limit, collection, fields, filters]);

  const handleStyle = () => {
    document
      .querySelector(".StatisticsView")
      .classList.toggle("stats-open__statView");
    document.querySelector(".overlay").classList.toggle("stats-open__overlay");
  };

  return (
    <div className="Mainpage">
      <div className="overlay"></div>
      <RenderMap mapData={mapData} collection={collection} />
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
      />
      <StatisticsView handleStatisticsViewStyle={handleStyle} />
    </div>
  );
};

export default Mainpage;
