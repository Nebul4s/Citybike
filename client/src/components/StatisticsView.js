import { ReactComponent as CloseSvg } from "../assets/close.svg";

const StatisticsView = ({ test }) => {
  return (
    <div className="StatisticsView">
      <div className="stats-header">
        <h2>Statistics</h2>
        <div className="close-stats" onClick={test}>
          <span>Close Statistics</span>
          <CloseSvg />
        </div>
      </div>
      <div className="stats-container"></div>
    </div>
  );
};

export default StatisticsView;
