const StatisticsView = ({ test }) => {
  return (
    <div className="StatisticsView">
      <div className="stats-container">
        <span onClick={test}>Close Statistics</span>
      </div>
    </div>
  );
};

export default StatisticsView;
