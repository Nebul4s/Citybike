const JourneyDetails = ({ location }) => {
  const departure = location ? location[0] : true;
  const returnStation = location ? location[1] : true;

  return (
    <div className="JourneyDetails">
      <div className="journey--details__box">
        <h2>Departure Station</h2>
        <ul>
          <li>
            <div className="detail--headers">
              <span>Name</span>
            </div>
            <span className="detail">{departure.Nimi || "Not Specified"}</span>
          </li>
          <li>
            <span className="detail--headers">Address</span>
            <span className="detail">
              {departure.Osoite || "Not Specified"}
            </span>
          </li>
          <li>
            <span className="detail--headers">X</span>
            <span className="detail">{departure.x || "Not Specified"}</span>
          </li>
          <li>
            <span className="detail--headers">Y</span>
            <span className="detail">{departure.y || "Not Specified"}</span>
          </li>
        </ul>
      </div>
      <div className="journey--details__box">
        <h2>Return Station</h2>
        <ul>
          <li>
            <span className="detail--headers">Name</span>
            <span className="detail">
              {returnStation.Nimi || "Not Specified"}
            </span>
          </li>
          <li>
            <span className="detail--headers">Address</span>
            <span className="detail">
              {returnStation.Osoite || "Not Specified"}
            </span>
          </li>
          <li>
            <span className="detail--headers">X</span>
            <span className="detail">{returnStation.x || "Not Specified"}</span>
          </li>
          <li>
            <span className="detail--headers">Y</span>
            <span className="detail">{returnStation.y || "Not Specified"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JourneyDetails;
