import RenderList from "./lists/RenderList";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";

const ListView = ({
  handleStatisticsViewStyle,
  isLoading,
  data,
  results,
  error,
  setMapData,
  page,
  setPage,
  setCollection,
  collection,
  setFields,
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
      <div className="search--container">
        <div className="search--input__container">
          <input type="search" placeholder="Search.." />
          <div className="search--svg__container">
            <Search />
          </div>
        </div>
        <div className="results--page__container">
          <select>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="filter--container">
          <Filter />
        </div>
      </div>
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
            <ChevronLeft onClick={() => setPage((page -= 1))} />
          </div>
        )}
        <span>
          Page {page} of {Math.ceil(results / 5)}
        </span>
        <div>
          <ChevronRight onClick={() => setPage((page += 1))} />
        </div>
      </div>
    </div>
  );
};

export default ListView;
