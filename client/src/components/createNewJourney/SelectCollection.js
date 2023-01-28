import { ReactComponent as BikeSVG } from "../../assets/bike.svg";
import { ReactComponent as LocationSVG } from "../../assets/location.svg";

const SelectCollection = ({ setCreateInCollection }) => {
  const handleFormChange = (e, collection) => {
    const parent = e.target.closest(".collections--container");

    parent.querySelectorAll(".collection--container").forEach((box) => {
      box.classList.remove("active");
    });
    e.target.closest(".collection--container").classList.add("active");

    setCreateInCollection(collection);
  };

  return (
    <div className="SelectCollection">
      <h2>Create new</h2>
      <p>
        Here you can enter a new location or a journey made through the form,
        change the form by clicking the boxes below
      </p>
      <div className="collections--container">
        <div
          className="collection--container active"
          onClick={(e) => handleFormChange(e, "journeys")}
        >
          <BikeSVG />
          <span>Journeys</span>
        </div>
        <div
          className="collection--container"
          onClick={(e) => handleFormChange(e, "locations")}
        >
          <LocationSVG />
          <span>Locations</span>
        </div>
      </div>
    </div>
  );
};

export default SelectCollection;
