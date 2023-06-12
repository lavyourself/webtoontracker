import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AddWebtoon.css";

const AddWebtoon = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [status, setStatus] = useState("Reading");
  const [link, setLink] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSynopsisChange = (e) => {
    setSynopsis(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve webtoons from localStorage
    const webtoons = JSON.parse(localStorage.getItem("webtoons")) || [];

    // Generate a unique ID for the new webtoon
    const id = Date.now().toString();

    // Create a new webtoon object
    const newWebtoon = {
      id,
      title,
      synopsis,
      status,
      link,
    };

    // Add the new webtoon to the list
    webtoons.push(newWebtoon);

    // Save the updated list of webtoons to localStorage
    localStorage.setItem("webtoons", JSON.stringify(webtoons));

    // Navigate to the webtoon list page
    navigate("/");
  };

  return (
    <div className="body">
      <h2 className="heading">Add Webtoon</h2>
      <form onSubmit={handleSubmit}>
        <div className="labels">
          <label htmlFor="title">Title:</label>
          <input
            className="box"
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="labels">
          <label htmlFor="synopsis">Synopsis:</label>
          <textarea
            className="box"
            id="synopsis"
            value={synopsis}
            onChange={handleSynopsisChange}
            required
          />
        </div>
        <div className="labels">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="box"
          >
            <option value="Reading">Reading</option>
            <option value="Not Read">Not Read</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
        <div className="labels">
          <label htmlFor="link">Link:</label>
          <input
            className="box"
            type="text"
            id="link"
            value={link}
            onChange={handleLinkChange}
            required
          />
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddWebtoon;
