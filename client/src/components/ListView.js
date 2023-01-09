import List from "./List";

import { ReactComponent as ChevronLeft } from "../assets/left.svg";
import { ReactComponent as ChevronRight } from "../assets/right.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as Filter } from "../assets/filter.svg";

const ListView = ({ test }) => {
  return (
    <div className="ListView">
      <ul className="btn-container">
        <li>Journeys</li>
        <li>Locations</li>
        <li onClick={test}>Statistics</li>
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
      <List />
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
