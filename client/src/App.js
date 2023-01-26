import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import ImportFromCsv from "./pages/ImportFromCsv";
import CreateNewJourney from "./pages/CreateNewJourney";

function App() {
  const handleActiveStyle = (e) => {
    const allTargets = document.querySelectorAll(".nav--item");
    allTargets.forEach((navItem) => {
      navItem.classList.remove("active");
    });

    const target = e.target.closest(".nav--item");
    target.classList.add("active");
  };

  return (
    <div className="App-container">
      <div className="App">
        <BrowserRouter>
          <div className="nav">
            <div
              onClick={(e) => handleActiveStyle(e)}
              className="nav--item active"
            >
              <NavLink to="/">Home</NavLink>
            </div>
            <div onClick={(e) => handleActiveStyle(e)} className="nav--item">
              <NavLink to="/import">Import from file</NavLink>
            </div>
            <div onClick={(e) => handleActiveStyle(e)} className="nav--item">
              <NavLink to="/create">Create new</NavLink>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/import" element={<ImportFromCsv />} />
            <Route path="/create" element={<CreateNewJourney />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
