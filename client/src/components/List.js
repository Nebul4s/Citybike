import LoadingAnimation from "./LoadingAnimation";
import ErrorMessage from "./ErrorMessage";

import { ReactComponent as BikeSvg } from "../assets/bike.svg";
import { ReactComponent as TimerSvg } from "../assets/timer.svg";

const List = ({ data, error, selectedJourney }) => {
  //Different props form data object like error exc
  const listItemData = data.data;

  return (
    <>
      {!listItemData && !error && (
        <div className="loading--container List">
          <LoadingAnimation />
        </div>
      )}
      {error && (
        <div className="error--container List">
          <ErrorMessage msg={error} />
        </div>
      )}
      {listItemData && (
        <ul className="List">
          {listItemData.map((item) => (
            <li key={item._id} onClick={() => selectedJourney(item)}>
              <div className="stations">
                <div>
                  <span className="station--header">Departure station:</span>
                  <span className="station--name">
                    {item.DepartureStationName}
                  </span>
                </div>
                <div>
                  <span className="station--header">Return station:</span>
                  <span className="station--name">
                    {item.ReturnStationName}
                  </span>
                </div>
              </div>
              <div className="distance--container">
                <div>
                  <span>
                    {(item.CoveredDistanceMeters / 1000).toFixed(2)} km
                  </span>
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
      )}
    </>
  );
};

export default List;
