import ListView from "../components/ListView";
import RenderMap from "../components/RenderMap";
import StatisticsView from "../components/StatisticsView";

const Mainpage = () => {
  const handleStyle = () => {
    document
      .querySelector(".StatisticsView")
      .classList.toggle("stats-open__statView");
    document
      .querySelector(".RenderMap")
      .classList.toggle("stats-open__mapView");
  };

  return (
    <div className="Mainpage">
      <RenderMap />
      <ListView test={handleStyle} />
      <StatisticsView test={handleStyle} />
    </div>
  );
};

export default Mainpage;
