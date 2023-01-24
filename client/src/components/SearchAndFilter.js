import { useEffect, useState } from "react";

import Filter from "./filter/Filter";

import { ReactComponent as OpenSVG } from "../assets/expand_more.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as FilterSVG } from "../assets/filter.svg";
import { ReactComponent as Check } from "../assets/check.svg";

const SearchAndFilter = ({
  setLimit,
  setPage,
  setFilters,
  collection,
  search,
  setSearch,
}) => {
  const [minMaxValues, setMinMaxValues] = useState(null);
  const [filtersLoading, setFiltersLoading] = useState(false);

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

  const handleOpenFilters = () => {
    document
      .querySelector(".filter--container")
      .classList.toggle("filters--open");
  };

  const submitSearch = (e, clicked) => {
    if (e.code === "Enter" || clicked) {
      setSearch(e.target.value);
    }
  };

  const clearSearch = (e) => {
    if (e.target.value === "") setSearch("");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setFiltersLoading(true);
        const res = await fetch(
          `http://localhost:5000/${collection}/getMinMax`
        );

        const json = await res.json();

        setMinMaxValues(...json.data);
        setFiltersLoading(false);
      } catch (err) {
        console.log(err.message);
        setFiltersLoading(false);
      }
    };
    getData();
  }, [collection]);

  return (
    <div className="search--container">
      <div className="search--input__container">
        <input
          type="search"
          placeholder="Search.."
          onKeyDown={submitSearch}
          onChange={clearSearch}
        />
        <div className="search--svg__container">
          <Search onClick={(__) => submitSearch(__, "clicked")} />
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
      <div className="filter--svg__container" onClick={handleOpenFilters}>
        <FilterSVG />
      </div>

      <Filter
        setFilters={setFilters}
        setPage={setPage}
        minMaxValues={minMaxValues}
        filtersLoading={filtersLoading}
        collection={collection}
        search={search}
      />
    </div>
  );
};

export default SearchAndFilter;
