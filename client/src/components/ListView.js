import List from "./List";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";

const ListView = ({ test, data, error, setMapData }) => {
  const handleActiveStyle = (e) => {
    const buttons = document.querySelectorAll(".nav--btn");
    buttons.forEach((item) => {
      item.classList.remove("active");
    });

    e.target.closest("li").classList.add("active");
  };

  const handleNavigation = (e) => {
    handleActiveStyle(e);
  };

  const handleSelectJourney = (journey) => {
    setMapData(journey);
  };

  return (
    <div className="ListView">
      <ul className="btn-container">
        <li className="nav--btn active" onClick={handleNavigation}>
          Journeys
          <span></span>
        </li>
        <li className="nav--btn" onClick={handleNavigation}>
          Locations
          <span></span>
        </li>
        <li className="nav--btn" onClick={test}>
          Statistics
          <span></span>
        </li>
      </ul>
      <div className="search--container">
        <div className="search--input__container">
          <input type="search" placeholder="Search.." />
          <Search />
        </div>
        <div className="filter--container">
          <Filter />
        </div>
      </div>
      <List data={data} error={error} selectedJourney={handleSelectJourney} />
      <div className="pagination">
        <div>
          <ChevronLeft />
        </div>
        <span>1 of 3</span>
        <div>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default ListView;
