import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const PieGraph = ({ data }) => {
  const countNumbers = [];
  const label = [];

  data.forEach((item) => {
    countNumbers.push(item.count);
    label.push(item._id);
  });

  return (
    <div className="wrapper">
      <div className="pie--container">
        <Pie
          datasetIdKey="id"
          data={{
            datasets: [
              {
                data: [...countNumbers],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PieGraph;
