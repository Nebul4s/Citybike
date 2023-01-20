import RenderList from "./lists/RenderList";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";
import SearchAndFilter from "./SearchAndFilter";

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
  };

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
