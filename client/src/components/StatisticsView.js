import { ReactComponent as CloseSvg } from "../assets/close.svg";

const StatisticsView = ({ handleStatisticsViewStyle }) => {
  return (
    <div className="StatisticsView">
      <div className="stats-header">
        <h2>Statistics</h2>
        <div className="close-stats" onClick={handleStatisticsViewStyle}>
          <span>Close Statistics</span>
          <CloseSvg />
        </div>
      </div>
      <div className="stats-container"></div>
    </div>
  );
};

export default StatisticsView;
