import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import LocationDetails from "./locationDetails/LocationDetails";
import JourneyDetails from "./locationDetails/JourneyDetails";
import LoadingAnimation from "./LoadingAnimation";

import { ReactComponent as OpenSVG } from "../assets/expand_more.svg";

const ChangeView = ({ coords }) => {
  const map = useMap();

  map.setView(coords, 13, { animate: true });
};

const RenderMap = ({ mapData, collection, locationStats, statsLoading }) => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState([60.1699, 24.9384]);

  const handleDetailsOpen = () => {
    const detailsContainer = document.querySelector(
      ".location--details__container"
    );
    const expandBtn = document.querySelector(".expand--btn");

    detailsContainer.classList.toggle("details--open");
    expandBtn.classList.toggle("close--details");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!mapData) return;

        if (mapData.Operaattor && collection === "locations") {
          setLocation([mapData]);
          setCoords([mapData.y, mapData.x]);
        }

        if (!mapData.Operaattor) {
          const departure = await fetch(
            `http://localhost:5000/locations/getLocation/${mapData.DepartureStationId}`
          );
          const returnStation = await fetch(
            `http://localhost:5000/locations/getLocation/${mapData.ReturnStationId}`
          );

          const departureData = await departure.json();
          const returnStationData = await returnStation.json();

          const data = [...departureData.data, ...returnStationData.data];

          setLocation(data);
          setCoords([data[0].y, data[0].x]);
        }
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, [mapData, collection]);

  return (
    <div className="RenderMap">
      <MapContainer
        className="details--open"
        center={coords}
        zoom={14}
        scrollWheelZoom={false}
      >
        <ChangeView coords={coords} zoom={11} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location &&
          location.map((loc, index) => (
            <Marker key={index} position={[loc.y, loc.x]}>
              <Popup>{loc.Osoite}</Popup>
            </Marker>
          ))}
      </MapContainer>
      {statsLoading && (
        <div className="location--details__container details--open loading--details__container">
          <div className="expand--btn" onClick={handleDetailsOpen}>
            <OpenSVG />
          </div>
          <LoadingAnimation />
        </div>
      )}
      {!statsLoading && (
        <div className="location--details__container details--open">
          <div className="expand--btn" onClick={handleDetailsOpen}>
            <OpenSVG />
          </div>
          <div className="inner--container">
            <h2>Location Details</h2>
            {location && !statsLoading && (
              <>
                {collection === "journeys" && location.length >= 2 && (
                  <JourneyDetails location={location} />
                )}
                {collection === "locations" && locationStats && (
                  <LocationDetails
                    location={location}
                    locationStats={locationStats}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderMap;
