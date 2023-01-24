import { useEffect } from "react";

import RenderList from "./lists/RenderList";
import SearchAndFilter from "./SearchAndFilter";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";

const ListView = ({
  handleStatisticsViewStyle,
  isLoading,
  data,
  results,
  error,
  setMapData,
  page,
  setLimit,
  limit,
  setPage,
  setCollection,
  collection,
  setFields,
  setFilters,
  search,
  setSearch,
  setGetLocationStats,
  getLocationStats,
  setLocationStats,
  setStatsLoading,
}) => {
  const handleActiveStyle = (e) => {
    const buttons = document.querySelectorAll(".nav--btn");
    buttons.forEach((item) => {
      item.classList.remove("active");
    });

    e.target.closest("li").classList.add("active");
  };

  const handleNavigation = (e) => {
    handleActiveStyle(e);
    setCollection(e.target.dataset.collection);
    if (e.target.dataset.collection === "locations") {
      setFields("-Namn,-Name,-Stad,-Adress");
    } else {
      setFields("");
    }
  };

  const handleSelectListItem = (item) => {
    setMapData(item);

    if (collection === "locations") {
      setGetLocationStats(item.Nimi);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (collection !== "locations" || !getLocationStats) {
          setGetLocationStats(null);
          setLocationStats(null);
          document
            .querySelector(".location--details__container")
            .classList.remove("fixed--height");
          return;
        }

        setStatsLoading(true);
        const res = await fetch(
          `http://localhost:5000/locations/getLocationStats/${getLocationStats}`
        );

        const json = await res.json();

        if (!json.data.departureStats.length) return;

        setLocationStats(json.data);
        setStatsLoading(false);
      } catch (err) {
        console.log(err.message);
        setStatsLoading(false);
      }
    };
    getData();
  }, [
    getLocationStats,
    collection,
    setLocationStats,
    setStatsLoading,
    setGetLocationStats,
  ]);

  return (
    <div className="ListView">
      <ul className="btn-container">
        <li
          className="nav--btn active"
          data-collection={"journeys"}
          onClick={handleNavigation}
        >
          Journeys
          <span></span>
        </li>
        <li
          className="nav--btn"
          data-collection={"locations"}
          onClick={handleNavigation}
        >
          Locations
          <span></span>
        </li>
        <li className="nav--btn" onClick={handleStatisticsViewStyle}>
          Statistics
          <span></span>
        </li>
      </ul>
      <SearchAndFilter
        setLimit={setLimit}
        setPage={setPage}
        setFilters={setFilters}
        collection={collection}
        setSearch={setSearch}
        search={search}
      />
      <RenderList
        isLoading={isLoading}
        data={data}
        error={error}
        selectedItem={handleSelectListItem}
        collection={collection}
      />
      <div className="pagination">
        {page >= 2 ? (
          <div>
            <ChevronLeft onClick={() => setPage((page -= 1))} />
          </div>
        ) : (
          <div className="pagination--hidden">
            <ChevronLeft />
          </div>
        )}
        <span>
          Page {page} of {Math.ceil(results / limit)}
        </span>
        {page !== Math.ceil(results / limit) ? (
          <div>
            <ChevronRight onClick={() => setPage((page += 1))} />
          </div>
        ) : (
          <div className="pagination--hidden">
            <ChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
