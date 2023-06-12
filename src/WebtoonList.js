import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/WebtoonListstyle.css";

const WebtoonList = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedWebtoons = JSON.parse(localStorage.getItem("webtoons")) || [];
    setWebtoons(storedWebtoons);
  }, []);

  const handleDelete = (id) => {
    const updatedWebtoons = webtoons.filter((webtoon) => webtoon.id !== id);
    localStorage.setItem("webtoons", JSON.stringify(updatedWebtoons));
    setWebtoons(updatedWebtoons);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedWebtoons = webtoons.map((webtoon) => {
      if (webtoon.id === id) {
        return { ...webtoon, status: newStatus };
      }
      return webtoon;
    });
    localStorage.setItem("webtoons", JSON.stringify(updatedWebtoons));
    setWebtoons(updatedWebtoons);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWebtoons = webtoons.filter((webtoon) => {
    const title = webtoon.title.toLowerCase();
    const status = webtoon.status.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      title.includes(searchTermLowerCase) ||
      status.includes(searchTermLowerCase)
    );
  });

  if (webtoons.length === 0) {
    return <div>No webtoons found. Add some webtoons!</div>;
  }

  return (
    <div className="full-list">
      <h2 className="main-heading">Webtoon List</h2>
      <div className="search--bar">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by title or status"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr className="headings">
            <th className="right-padding">Title</th>
            <th className="left-padding">Synopsis</th>
            <th className="left-padding">Status</th>
            <th className="left-padding">Link</th>
            <th className="left-padding">Actions</th>
          </tr>
        </thead>
        <tbody className="body">
          {filteredWebtoons.map((webtoon) => (
            <tr key={webtoon.id}>
              <td className="right-padding">{webtoon.title}</td>
              <td className="left-padding" id="synopsis">
                {webtoon.synopsis}
              </td>
              <td className="left-padding">
                <select
                  className="status"
                  value={webtoon.status}
                  onChange={(e) =>
                    handleStatusChange(webtoon.id, e.target.value)
                  }
                >
                  <option value="Not Read">Not Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </td>
              <td className="left-padding">
                <a
                  className="links"
                  href={webtoon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {webtoon.link}
                </a>
              </td>
              <td className="left-padding">
                <Link to={`/edit/${webtoon.id}`}>Edit</Link>
                <button
                  type="button"
                  onClick={() => handleDelete(webtoon.id)}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-webtoon">
        <Link to="/add">Add Webtoon</Link>
      </div>
    </div>
  );
};

export default WebtoonList;
