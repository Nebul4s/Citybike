import { ReactComponent as OpenSVG } from "../assets/expand_more.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";
import { ReactComponent as Check } from "../assets/check.svg";

const SearchAndFilter = ({ setLimit, setPage }) => {
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
  );
};

export default SearchAndFilter;
