import { ReactComponent as BikeSvg } from "../assets/bike.svg";
import { ReactComponent as TimerSvg } from "../assets/timer.svg";

const List = () => {
  return (
    <ul className="List">
      <li>
        <div className="stations">
          <div>
            <span className="station--header">Departure station:</span>
            <span className="station--name">Departure station</span>
          </div>
          <div>
            <span className="station--header">Return station:</span>
            <span className="station--name">return station</span>
          </div>
        </div>
        <div className="distance--container">
          <div>
            <span>1000km</span>
          </div>
          <BikeSvg />
          <span className="border"></span>
          <div>
            <span>3000 minutes</span>
          </div>
          <TimerSvg />
        </div>
      </li>
    </ul>
  );
};

export default List;
