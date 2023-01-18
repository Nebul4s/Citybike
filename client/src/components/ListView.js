import RenderList from "./lists/RenderList";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";
import { ReactComponent as OpenSVG } from "../assets/expand_more.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";
import { ReactComponent as Check } from "../assets/check.svg";

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

  const handleDropdown = () => {
    document
      .querySelector(".results--page__heading ")
      .classList.toggle("dropdown--open");
    document
      .querySelector(".dropdown--content ")
      .classList.toggle("dropdown--open");
  };

  const handlePageLimit = (e) => {
    const allTargets = document.querySelectorAll(".dropdown--item");
    allTargets.forEach((item) => {
      item.classList.remove("active");
    });

    const target = e.target.closest("li");
    const value = target.dataset.Value;
    setLimit(value);
    setPage(1);
    target.classList.add("active");
    handleDropdown();
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
          <div className="results--page__heading" onClick={handleDropdown}>
            <span>Results per. page</span>
            <div className="svg--container">
              <OpenSVG />
            </div>
          </div>
          <ul className="dropdown--content">
            <li
              className="dropdown--item active"
              onClick={(e) => handlePageLimit(e)}
              data--value="5"
            >
              <div className="li--flex">
                <span className="value">5</span>
                <Check />
              </div>
            </li>
            <li
              className="dropdown--item"
              onClick={(e) => handlePageLimit(e)}
              data--value="10"
            >
              <div className="li--flex">
                <span className="value">10</span>
                <Check />
              </div>
            </li>
            <li
              className="dropdown--item"
              onClick={(e) => handlePageLimit(e)}
              data--value="25"
            >
              <div className="li--flex">
                <span className="value">25</span>
                <Check />
              </div>
            </li>
            <li
              className="dropdown--item"
              onClick={(e) => handlePageLimit(e)}
              data--value="50"
            >
              <div className="li--flex">
                <span className="value">50</span>
                <Check />
              </div>
            </li>
          </ul>
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
          Page {page} of {Math.ceil(results / limit)}
        </span>
        <div>
          <ChevronRight onClick={() => setPage((page += 1))} />
        </div>
      </div>
    </div>
  );
};

export default ListView;
