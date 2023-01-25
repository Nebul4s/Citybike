import { useState, useEffect } from "react";

import RangeSlider from "./RangeSlider";
import OneWaySlider from "./OneWaySlider";
import MultiSelectList from "./MultiSelectList";
import LoadingAnimation from "../LoadingAnimation";

const Filter = ({
  setFilters,
  setPage,
  minMaxValues,
  filtersLoading,
  collection,
  search,
}) => {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [selectDepartureItems, setSelectDepartureItems] = useState([]);
  const [selectReturnItems, setSelectReturnItems] = useState([]);
  const [selectLocationNameItems, setSelectLocationNameItems] = useState([]);
  const [selectCityNames, setSelectCityNames] = useState([]);
  const [distanceMin, setDistanceMin] = useState(0);
  const [distanceMax, setDistanceMax] = useState(0);
  const [durationMin, setDurationMin] = useState(0);
  const [durationMax, setDurationMax] = useState(0);
  const [maxDurationValue, setMaxDurationValue] = useState(0);
  const [maxDistanceValue, setMaxDistanceValue] = useState(0);
  const [bicycleCapacity, setBicycleCapacity] = useState(44);
  const [maxBicycleCapacity, setMaxBicycleCapacity] = useState(0);

  const clearFilters = () => {
    setStartingDate(minMaxValues.minDeparture);
    setEndingDate(minMaxValues.maxDeparture);
    setSelectDepartureItems([]);
    setSelectReturnItems([]);
    setSelectLocationNameItems([]);
    setSelectCityNames([]);
    setDistanceMin((minMaxValues.minDistance / 1000).toFixed(2));
    setDistanceMax((minMaxValues.maxDistance / 1000).toFixed(2));
    setDurationMin((minMaxValues.minDuration / 60).toFixed(0));
    setDurationMax((minMaxValues.maxDuration / 60).toFixed(0));

    document.querySelectorAll(".list--item").forEach((item) => {
      item.classList.remove("checked");
    });
    setFilters("");
  };

  const applyFilters = () => {
    if (collection === "journeys") {
      const departureItems = selectDepartureItems.join(",");
      const returnItems = selectReturnItems.join(",");

      const stationNames = !search
        ? `&DepartureStationName=${departureItems}&ReturnStationName=${returnItems}`
        : "";
      const queryString = `Departure[gte]=${startingDate}&Departure[lte]=${endingDate}${stationNames}&CoveredDistanceMeters[gte]=${
        distanceMin * 1000
      }&CoveredDistanceMeters[lte]=${distanceMax * 1000}&DurationSec[gte]=${
        durationMin * 60
      }&DurationSec[lte]=${durationMax * 60}`;
      setFilters(queryString);
    }

    if (collection === "locations") {
      const queryString = `Nimi=${selectLocationNameItems}&Kaupunki=${selectCityNames}&Kapasiteet[gte]=0&Kapasiteet[lte]=${bicycleCapacity}`;
      setFilters(queryString);
    }
    setPage(1);
  };

  useEffect(() => {
    if (!minMaxValues) return;
    setStartingDate(minMaxValues.minDeparture);
    setEndingDate(minMaxValues.maxDeparture);
    setDistanceMin((minMaxValues.minDistance / 1000).toFixed(2));
    setDistanceMax((minMaxValues.maxDistance / 1000).toFixed(2));
    setDurationMin((minMaxValues.minDuration / 60).toFixed(0));
    setDurationMax((minMaxValues.maxDuration / 60).toFixed(0));
    setMaxDurationValue((minMaxValues.maxDuration / 60).toFixed(0));
    setMaxDistanceValue((minMaxValues.maxDistance / 1000).toFixed(2));

    setBicycleCapacity(minMaxValues.maxKapasiteet);
    if (!maxBicycleCapacity) setMaxBicycleCapacity(minMaxValues.maxKapasiteet);
  }, [minMaxValues, maxBicycleCapacity]);

  return (
    <div className="filter--container">
      {!filtersLoading && (
        <div className="title--container">
          <h2 className="title">Filter</h2>
        </div>
      )}

      {filtersLoading && <LoadingAnimation />}
      {!filtersLoading && (
        <>
          {collection === "journeys" && (
            <>
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
                      setEndingDate(
                        new Date(e.target.value).toISOString().slice(0, 10)
                      )
                    }
                  />
                </div>
              </div>
              {!search && (
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
                      selectCityNames={selectCityNames}
                      setSelectCityNames={setSelectCityNames}
                    />
                  </div>
                </div>
              )}
              <RangeSlider
                title={"Distance (km)"}
                maxValue={maxDistanceValue}
                min={distanceMin}
                max={distanceMax}
                setMin={setDistanceMin}
                setMax={setDistanceMax}
              />
              <RangeSlider
                title={"Duration (minutes)"}
                maxValue={maxDurationValue}
                min={durationMin}
                max={durationMax}
                setMin={setDurationMin}
                setMax={setDurationMax}
              />
            </>
          )}
          {!filtersLoading && collection === "locations" && (
            <div className="locations--filter__container">
              <MultiSelectList
                title="Stations"
                listType="locationNames"
                selectLocationNameItems={selectLocationNameItems}
                setSelectLocationNameItems={setSelectLocationNameItems}
              />
              <OneWaySlider
                title="Bicycle Capacity"
                bicycleCapacity={bicycleCapacity}
                setBicycleCapacity={setBicycleCapacity}
                maxValue={maxBicycleCapacity}
              />
            </div>
          )}
          <div className="submit--filter__container">
            <button
              className="submit--filter__btn clear"
              onClick={clearFilters}
            >
              Clear
            </button>
            <button className="submit--filter__btn" onClick={applyFilters}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
