import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WebtoonList from "./WebtoonList";
import WebtoonDetail from "./WebtoonDetail";
import AddWebtoon from "./AddWebtoon";
import EditWebtoon from "./EditWebtoon";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className="list">
              <Link to="/">Webtoon List</Link>
            </li>
            <li className="list" id="add-webtoon">
              <Link to="/add">Add Webtoon</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WebtoonList />} />
          <Route path="/webtoon/:id" element={<WebtoonDetail />} />
          <Route path="/add" element={<AddWebtoon />} />
          <Route path="/edit/:id" element={<EditWebtoon />} />
        </Routes>
      </div>
    </Router>
  );
};
//
export default App;
