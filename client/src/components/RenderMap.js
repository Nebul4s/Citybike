import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const RenderMap = () => {
  return (
    <div className="RenderMap">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div className="location--details__container">
        <h2>Location Details</h2>
      </div>
    </div>
  );
};

export default RenderMap;
