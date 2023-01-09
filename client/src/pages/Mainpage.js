import { useEffect, useState } from "react";

import ListView from "../components/ListView";
import RenderMap from "../components/RenderMap";
import StatisticsView from "../components/StatisticsView";

const Mainpage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDevData = async () => {
      const data = await fetch("http://localhost:5000/dev");
      console.log(data);
    };
    fetchDevData();
  }, []);

  const handleStyle = () => {
    document
      .querySelector(".StatisticsView")
      .classList.toggle("stats-open__statView");
    document.querySelector(".overlay").classList.toggle("stats-open__overlay");
  };

  return (
    <div className="Mainpage">
      <div className="overlay"></div>
      <RenderMap />
      <ListView test={handleStyle} />
      <StatisticsView test={handleStyle} />
    </div>
  );
};

export default Mainpage;
