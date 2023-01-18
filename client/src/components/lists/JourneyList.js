import { ReactComponent as BikeSvg } from "../../assets/bike.svg";
import { ReactComponent as TimerSvg } from "../../assets/timer.svg";

const JourneyList = ({ data, selectedItem }) => {
  return (
    <ul className="JourneyList">
      {data.map((item) => (
        <li key={item._id} onClick={() => selectedItem(item)}>
          <div className="stations">
            <div>
              <span className="station--header">Departure station:</span>
              <span className="station--name">{item.DepartureStationName}</span>
            </div>
            <div>
              <span className="station--header">Return station:</span>
              <span className="station--name">{item.ReturnStationName}</span>
            </div>
          </div>
          <div className="distance--container">
            <div>
              <span>{(item.CoveredDistanceMeters / 1000).toFixed(2)} km</span>
            </div>
            <BikeSvg />
            <span className="border"></span>
            <div>
              <span>{(item.DurationSec / 60).toFixed(2)} minutes</span>
            </div>
            <TimerSvg />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JourneyList;
