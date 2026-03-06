import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Rightflex = () => {
  const [genres, setGenres] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchGenres = async (retryCount = 0) => {
      try {
        const response = await axios.get(
          "https://api.jikan.moe/v4/genres/anime"
        );
        setGenres(response.data.data); // Assuming the genres are in `data.data`
      } catch (error) {
        if (retryCount < 10) {
          console.warn(`Retrying fetchGenres... Attempt ${retryCount + 1}`);
          setTimeout(() => fetchGenres(retryCount + 1), 2000);
        } else {
          console.error("Error fetching genres after 10 attempts:", error);
        }
      }
    };

    fetchGenres();
  }, []);

  const colorList = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  useEffect(() => {
    const colorElements = document.getElementsByClassName("colorfulltext");
    for (let index = 0; index < colorElements.length; index++) {
      const textEl = colorElements[index];
      textEl.style.color =
        colorList[Math.floor(Math.random() * colorList.length)];
    }
  }, [genres]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const renderGenres = () => {
    return genres.map((genre, index) => (
      <div
        key={genre.mal_id}
        className={`colorfulltext item ${
          isExpanded || index < 21 ? "" : "hidden"
        }`}
        style={{
          fontSize: "0.9rem", // Reduce text size
          wordBreak: "break-word", // Ensure text wraps properly
        }}
      >
        <Link to={`/similar/${genre.mal_id}`}>{genre.name}</Link>
      </div>
    ));
  };

  return (
    <div className="right">
      <h1>Genres</h1>
      <div className="genres">
        <div
          className="categories"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            wordWrap: "break-word",
          }}
        >
          {renderGenres()}
        </div>
        <div className="showmore" onClick={toggleContent}>
          {isExpanded ? "Show less" : "Show more"}
        </div>
      </div>
    </div>
  );
};

export default Rightflex;
