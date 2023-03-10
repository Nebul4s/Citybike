import { useEffect, useState } from "react";

import { ReactComponent as OpenSVG } from "../../assets/expand_more.svg";
import { ReactComponent as Check } from "../../assets/check.svg";

const MultiSelectList = ({
  title,
  listType,
  selectDepartureItems,
  setSelectDepartureItems,
  selectReturnItems,
  setSelectReturnItems,
  selectLocationNameItems,
  setSelectLocationNameItems,
}) => {
  const [locationNames, setLocationNames] = useState(null);

  const handleListOpenStyles = (e) => {
    e.target.closest(".list--btn__container").classList.toggle("list--open");
    e.target
      .closest(".MultiSelectList")
      .querySelector(".list--items")
      .classList.toggle("list--open");
  };

  const handleSelectLocations = (e, listType) => {
    const newItem = e.target.closest("li").dataset.Name;

    e.target.closest("li").classList.toggle("checked");

    if (listType === "departureStations") {
      //remove item if it was previously active and it's clicked again
      if (selectDepartureItems.includes(newItem)) {
        const newItems = selectDepartureItems.filter(
          (oldItem) => oldItem !== newItem
        );
        setSelectDepartureItems(newItems);
      } else {
        setSelectDepartureItems([...selectDepartureItems, newItem]);
      }
    }
    if (listType === "returnStations") {
      if (selectReturnItems.includes(newItem)) {
        const newItems = selectReturnItems.filter(
          (oldItem) => oldItem !== newItem
        );
        setSelectReturnItems(newItems);
      } else {
        setSelectReturnItems([...selectReturnItems, newItem]);
      }
    }
    if (listType === "locationNames") {
      //remove item if it was previously active and it's clicked again
      if (selectLocationNameItems.includes(newItem)) {
        const newItems = selectLocationNameItems.filter(
          (oldItem) => oldItem !== newItem
        );
        setSelectLocationNameItems(newItems);
      } else {
        setSelectLocationNameItems([...selectLocationNameItems, newItem]);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/locations/getAll?fields=Nimi`
        );
        const json = await res.json();

        setLocationNames(json.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="MultiSelectList">
      <div
        className="list--btn__container"
        onClick={(e) => handleListOpenStyles(e)}
      >
        <span>{title}</span>
        <OpenSVG />
      </div>
      <ul className="list--items">
        {locationNames &&
          locationNames.map((item) => (
            <li
              className="list--item"
              onClick={(e) => handleSelectLocations(e, listType)}
              data--name={item.Nimi}
              key={item._id}
            >
              <span className="item--text">{item.Nimi}</span>
              <div className="checkbox">
                <Check />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelectList;
