import { useState } from "react";

import RangeSlider from "./RangeSlider";
import MultiSelectList from "./MultiSelectList";

const Filter = ({ setFilters, setPage }) => {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [selectDepartureItems, setSelectDepartureItems] = useState([]);
  const [selectReturnItems, setSelectReturnItems] = useState([]);
  const [distanceMin, setDistanceMin] = useState(0);
  const [distanceMax, setDistanceMax] = useState(90000);
  const [durationMin, setDurationMin] = useState(0);
  const [durationMax, setDurationMax] = useState(90000);

  const clearFilters = () => {
    setStartingDate("");
    setEndingDate("");
    setSelectDepartureItems([]);
    setSelectReturnItems([]);
    setDistanceMin(0);
    setDistanceMax(90000);
    setDurationMin(0);
    setDurationMax(90000);

    document.querySelectorAll(".list--item").forEach((item) => {
      item.classList.remove("checked");
    });
    setFilters("");
  };

  const applyFilters = () => {
    const departureItems = selectDepartureItems.join(",");
    const returnItems = selectReturnItems.join(",");

    const queryString = `Departure[gte]=${startingDate}&Departure[lte]=${endingDate}&DepartureStationName=${departureItems}&ReturnStationName=${returnItems}&CoveredDistanceMeters[gte]=${distanceMin}&CoveredDistanceMeters[lte]=${distanceMax}&DurationSec[gte]=${durationMin}&DurationSec[lte]=${durationMax}`;
    setFilters(queryString);
    setPage(1);
  };

  return (
    <div className="filter--container">
      <div className="filter--date__container">
        <div className="filter--date__header">
          <h2>Departure Date</h2>
        </div>
        <div className="filter--date__inputs">
          <input
            type="date"
            onChange={(e) =>
              setStartingDate(
                new Date(e.target.value).toISOString().slice(0, 10)
              )
            }
          />
          <input
            type="date"
            value={endingDate}
            onChange={(e) =>
              setEndingDate(new Date(e.target.value).toISOString().slice(0, 10))
            }
          />
        </div>
      </div>
      <div className="filter--by__name">
        <h2>Station Name</h2>
        <div className="by--name__lists">
          <MultiSelectList
            title="Departure Stations"
            listType="departureStations"
            selectDepartureItems={selectDepartureItems}
            setSelectDepartureItems={setSelectDepartureItems}
          />
          <MultiSelectList
            title="Return Stations"
            listType="returnStations"
            selectReturnItems={selectReturnItems}
            setSelectReturnItems={setSelectReturnItems}
          />
        </div>
      </div>
      <RangeSlider
        title={"Distance"}
        maxValue={90000}
        min={distanceMin}
        max={distanceMax}
        setMin={setDistanceMin}
        setMax={setDistanceMax}
      />
      <RangeSlider
        title={"Duration"}
        maxValue={90000}
        min={durationMin}
        max={durationMax}
        setMin={setDurationMin}
        setMax={setDurationMax}
      />

      <div className="submit--filter__container">
        <button className="submit--filter__btn clear" onClick={clearFilters}>
          Clear
        </button>
        <button className="submit--filter__btn" onClick={applyFilters}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Filter;
