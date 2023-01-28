import { useState } from "react";
const JourneyForm = ({ locationNames }) => {
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [departureStationID, setDepartureStationID] = useState(null);
  const [returnStation, setReturnStation] = useState("");
  const [returnStationID, setReturnStationID] = useState(null);
  const [coveredDistanceMeters, setCoveredDistanceMeters] = useState(null);
  const [durationSec, setDurationSec] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        Departure: departure,
        Return: returnDate,
        DepartureStationName: departureStation,
        DepartureStationId: departureStationID,
        ReturnStationName: returnStation,
        ReturnStationId: returnStationID,
        CoveredDistanceMeters: coveredDistanceMeters,
        DurationSec: durationSec,
      };

      fetch("http://localhost:5000/journeys/createNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      document.getElementById("journey--form").reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDepartureStation = (e) => {
    const item = locationNames.filter((el) => el.Nimi === e.target.value);
    if (item.length === 0) return;

    setDepartureStation(item[0].Nimi);
    setDepartureStationID(item[0].ID);
  };

  const handleReturnStation = (e) => {
    const item = locationNames.filter((el) => el.Nimi === e.target.value);
    if (item.length === 0) return;

    setReturnStation(item[0].Nimi);
    setReturnStationID(item[0].ID);
  };

  return (
    <div className="JourneyForm">
      <h2>Journey Form</h2>
      <form id="journey--form" onSubmit={handleSubmit}>
        <div className="dates--container form--flex">
          <div className="date form--item">
            <span>Departure</span>
            <input
              onChange={(e) => setDeparture(e.target.value)}
              className="form--input"
              type="date"
              required
            />
          </div>
          <div className="date form--item">
            <span>Return</span>
            <input
              onChange={(e) => setReturnDate(e.target.value)}
              className="form--input"
              type="date"
              required
            />
          </div>
        </div>
        <div className="stations--container form--flex">
          <div className="station form--item">
            <span>Departure Station</span>
            <input
              onChange={(e) => handleDepartureStation(e)}
              className="form--input"
              list="departure--data"
              required
            />
            <datalist id="departure--data">
              {locationNames &&
                locationNames.map((item) => (
                  <option key={item._id} data--id={item.ID}>
                    {item.Nimi}
                  </option>
                ))}
            </datalist>
          </div>
          <div className="station form--item">
            <span>Return Station</span>
            <input
              onChange={(e) => handleReturnStation(e)}
              className="form--input"
              list="return--data"
              required
            />
            <datalist id="return--data">
              {locationNames &&
                locationNames.map((item) => (
                  <option key={item._id}>{item.Nimi}</option>
                ))}
            </datalist>
          </div>
        </div>
        <div className="journey--details__container form--flex">
          <div className="journey form--item">
            <span>Covered Distance (meters)</span>
            <input
              onChange={(e) => setCoveredDistanceMeters(e.target.value)}
              className="form--input"
              type="text"
              required
            />
          </div>
          <div className="journey form--item">
            <span>Duration (seconds)</span>
            <input
              onChange={(e) => setDurationSec(e.target.value)}
              className="form--input"
              type="text"
              required
            />
          </div>
        </div>
        <div className="submit--container form--flex">
          <div></div>
          <div className="submit--btn__container form--item">
            <button type="reset" className="clear">
              Clear
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JourneyForm;
