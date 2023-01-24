import { useEffect } from "react";
import DoughnutGraph from "../charts/PieGraph";

const LocationDetails = ({ location, locationStats }) => {
  useEffect(() => {
    if (locationStats.departureStats.length) {
      document
        .querySelector(".location--details__container")
        .classList.add("fixed--height");
    }
  }, [locationStats]);

  return (
    <div className="LocationDetails">
      <div className="location--details__box">
        <ul>
          <li>
            <span className="detail--headers">Name</span>
            <span className="detail">{location[0].Nimi}</span>
          </li>
          <li>
            <span className="detail--headers">Address</span>
            <span className="detail">{location[0].Osoite}</span>
          </li>
          <li>
            <span className="detail--headers">
              Amount of journeys starting from the station
            </span>
            <span className="detail">
              {locationStats.departureStats[0].departureAmount}
            </span>
          </li>
          <li>
            <span className="detail--headers">
              Amount of journeys ending at the station
            </span>
            <span className="detail">
              {locationStats.returnStats[0].returnAmount}
            </span>
          </li>
        </ul>
      </div>
      <div className="location--details__avg">
        <div className="avg--item__container">
          <span className="detail--headers">
            Average distance of a journey starting from the station
          </span>
          <span className="border"></span>
          <span className="detail">
            {Math.floor(
              locationStats.departureStats[0].avgDistanceStartingFromStation
            ) / 1000}{" "}
            Kilometers
          </span>
        </div>
        <div className="avg--item__container">
          <span className="detail--headers">
            Average distance of a journey ending at the station
          </span>
          <span className="border"></span>
          <span className="detail">
            {Math.floor(
              locationStats.returnStats[0].avgDistanceEndingAtStation.toFixed(1)
            ) / 1000}{" "}
            Kilometers
          </span>
        </div>
      </div>
      <div className="location--details__toplist">
        <div className="toplist--item__container">
          <h2>Top 5 Return stations for journeys starting from the station</h2>
          <div className="toplist--item">
            <ul>
              {locationStats.topReturnStations.map((station) => (
                <li key={station._id}>
                  <span>{station._id}</span>
                  <span>{station.count}</span>
                </li>
              ))}
            </ul>
            <DoughnutGraph data={locationStats.topReturnStations} />
          </div>
          <div className="toplist--chart"></div>
        </div>
        <div className="toplist--item__container">
          <h2>Top 5 Departure stations for journeys ending at the station</h2>
          <div className="toplist--item">
            <DoughnutGraph data={locationStats.topDepartureStations} />
            <ul>
              {locationStats.topDepartureStations.map((station) => (
                <li key={station._id}>
                  <span>{station._id}</span>
                  <span>{station.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="toplist--chart"></div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
