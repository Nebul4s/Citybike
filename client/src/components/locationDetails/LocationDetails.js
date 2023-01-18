const LocationDetails = ({ location }) => {
  return (
    <div className="LocationDetails">
      <div className="location--details__box">
        <ul>
          <li>
            <span className="detail--headers">Name</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">Address</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">X</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">Y</span>
            <span className="detail"></span>
          </li>
        </ul>
      </div>
      <div className="location--details__box">
        <ul>
          <li>
            <span className="detail--headers">Name</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">Address</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">X</span>
            <span className="detail"></span>
          </li>
          <li>
            <span className="detail--headers">Y</span>
            <span className="detail"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LocationDetails;
