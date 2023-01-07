import List from "./List";

const ListView = ({ test }) => {
  return (
    <div className="ListView">
      <ul className="btn-container">
        <li>Journeys</li>
        <li>Locations</li>
        <li onClick={test}>Statistics</li>
      </ul>
      <List />
      <div className="pagination">
        <span>prev</span>
        <span>1 of 3</span>
        <span>next</span>
      </div>
    </div>
  );
};

export default ListView;
