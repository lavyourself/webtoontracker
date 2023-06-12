import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/EditWebtoon.css";

const EditWebtoon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webtoon, setWebtoon] = useState(null);
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const storedWebtoons = JSON.parse(localStorage.getItem("webtoons")) || [];
    const webtoon = storedWebtoons.find((webtoon) => webtoon.id === id);
    if (webtoon) {
      setWebtoon(webtoon);
      setTitle(webtoon.title);
      setSynopsis(webtoon.synopsis);
      setStatus(webtoon.status);
      setLink(webtoon.link);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedWebtoons = JSON.parse(localStorage.getItem("webtoons")) || [];
    const updatedWebtoons = storedWebtoons.map((webtoon) =>
      webtoon.id === id
        ? { ...webtoon, title, synopsis, status, link }
        : webtoon
    );
    localStorage.setItem("webtoons", JSON.stringify(updatedWebtoons));
    navigate("/");
  };

  if (!webtoon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <h2 className="heading">Edit Webtoon</h2>
      <form onSubmit={handleSubmit}>
        <div className="labels">
          <label>
            Title:
            <input
              className="box"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="labels">
          <label>
            Synopsis:
            <textarea
              className="box"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              id="synopsis"
            />
          </label>
        </div>
        <div className="labels">
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="box"
              id="status"
            >
              <option value="Not Read">Not Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </label>
        </div>
        <div className="labels">
          <label>
            Link:
            <input
              className="box"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <div className="update--btn">
          <button type="submit" className="update-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWebtoon;
