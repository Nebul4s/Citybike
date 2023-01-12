import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import ListView from "../components/ListView";
import RenderMap from "../components/RenderMap";
import StatisticsView from "../components/StatisticsView";

const Mainpage = () => {
  const [mapData, setMapData] = useState(null);
  const { data, error } = useFetch("journeys", "dev");

  const handleStyle = () => {
    document
      .querySelector(".StatisticsView")
      .classList.toggle("stats-open__statView");
    document.querySelector(".overlay").classList.toggle("stats-open__overlay");
  };

  return (
    <div className="Mainpage">
      <div className="overlay"></div>
      <RenderMap mapData={mapData} />
      <ListView
        test={handleStyle}
        data={data}
        error={error}
        setMapData={setMapData}
      />
      <StatisticsView test={handleStyle} />
    </div>
  );
};

export default Mainpage;
