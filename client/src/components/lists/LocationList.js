import { ReactComponent as BikeSvg } from "../../assets/bike.svg";

const LocationList = ({ data, selectedItem }) => {
  return (
    <ul className="LocationList">
      {data.map((item) => (
        <li key={item._id} onClick={() => selectedItem(item)}>
          <div className="location--header">
            <h2>{item.Nimi}</h2>
            <span>{item.Osoite}</span>
          </div>
          <div className="capacity--container">
            <span>Capacity</span>
            <span className="border"></span>
            <div className="capacity">
              <span>{item.Kapasiteet}</span>
              <BikeSvg />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
