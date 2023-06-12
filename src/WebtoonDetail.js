import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const WebtoonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webtoon, setWebtoon] = useState(null);

  useEffect(() => {
    const storedWebtoons = JSON.parse(localStorage.getItem("webtoons")) || [];
    const webtoon = storedWebtoons.find((webtoon) => webtoon.id === id);
    setWebtoon(webtoon);
  }, [id]);

  const handleDelete = () => {
    const storedWebtoons = JSON.parse(localStorage.getItem("webtoons")) || [];
    const updatedWebtoons = storedWebtoons.filter(
      (webtoon) => webtoon.id !== id
    );
    localStorage.setItem("webtoons", JSON.stringify(updatedWebtoons));
    navigate("/");
  };

  if (!webtoon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Webtoon Detail</h2>
      <div>
        <p>
          <strong>Title:</strong> {webtoon.title}
        </p>
        <p>
          <strong>Synopsis:</strong> {webtoon.synopsis}
        </p>
        <p>
          <strong>Status:</strong> {webtoon.status}
        </p>
        <p>
          <strong>Link:</strong> {webtoon.link}
        </p>
      </div>
      <button type="button" onClick={() => navigate(`/edit/${id}`)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <Link to="/">Back to Webtoon List</Link>
    </div>
  );
};

export default WebtoonDetail;
