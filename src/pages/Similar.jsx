import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import axios from "axios";

const Item5 = ({ movie }) => {
  const fullResImage = movie.images.jpg.large_image_url.replace(
    "_l.jpg",
    ".jpg"
  );
  return (
    <>
      <Link to={`/movie/${movie.mal_id}`}>
        <div className="item">
          <img
            src={movie.images.webp.large_image_url || fullResImage}
            alt={movie.title}
          />
          <div className="innertxt truncate !h-[16px] !z-5 flex items-center">
            <div> {movie.title_english || movie.title}</div>
          </div>
          <div className="innerlowertxt">
            <div className="txtelement">TV</div>
            <div className="txtelement">.</div>
            <div className="txtelement">24m</div>
          </div>
          <div className="absolutecontent">
            <div className="cc">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                viewBox="0 0 2368 1664"
              >
                <path
                  fill="currentColor"
                  d="M2368 192v1280q0 78-57 135t-135 57H192q-77 0-134.5-57T0 1472V192q0-77 57.5-134.5T192 0h1984q78 0 135 57.5t57 134.5zM1219 835q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64h-147q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T1691 363q-128 0-237 63t-172 172t-63 237zm-1019 1q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64H944q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T672 364q-128 0-237 63T263 599t-63 237z"
                />
              </svg>
              {movie.episodes}
            </div>
            <div className="dub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.43 5.838v5.57a4.43 4.43 0 0 1-8.78 0v-5.57a4.43 4.43 0 0 1 8.78 0"
                />
                <path
                  fill="currentColor"
                  d="M12.79 17.998v2.5h2.89a.75.75 0 0 1 0 1.5H8.4a.75.75 0 1 1 0-1.5h2.85v-2.5a7.4 7.4 0 0 1-6.67-7.38a.75.75 0 0 1 1.5 0a5.92 5.92 0 1 0 11.84 0a.75.75 0 0 1 1.5 0a7.4 7.4 0 0 1-6.67 7.38z"
                />
              </svg>
              {movie.episodes}
            </div>
            <div className="epno">{movie.episodes}</div>
          </div>
          <div className="imggradientcover" />
        </div>
      </Link>
    </>
  );
};
const Similar = () => {
    const { genre_mid } = useParams();
    const [animeList, setAnimeList] = useState([]);
    const [genreName, setGenreName] = useState("");
     const [genres, setGenres] = useState([]);
      const [isExpanded, setIsExpanded] = useState(false);
    
  
    // Fetch genre name
    useEffect(() => {
      const fetchGenreName = async () => {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/genres/anime`);
          const genres = response.data.data;
  
          // Find genre by ID
          const genre = genres.find((g) => g.mal_id === parseInt(genre_mid));
          if (genre) setGenreName(genre.name);
        } catch (error) {
          console.error("Error fetching genre name:", error);
        }
      };
  
      fetchGenreName();
    }, [genre_mid]);
  
    // Fetch anime list by genre ID
    useEffect(() => {
      const fetchAnimeByGenre = async (retryCount = 0) => {
        try {
          const response = await axios.get(
            `https://api.jikan.moe/v4/anime?genres=${genre_mid}&&order_by=score&sort=desc&order_by=score&sort=desc`
          );
          setAnimeList(response.data.data);
        } catch (error) {
          if (retryCount < 10) {
            console.warn(`Retrying fetchAnimeByGenre... Attempt ${retryCount + 1}`);
            setTimeout(() => fetchAnimeByGenre(retryCount + 1), 2000);
          } else {
            console.error("Error fetching anime after 10 attempts:", error);
          }
        }
      };
  
      fetchAnimeByGenre();
    }, [genre_mid]);
  

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
    <>
      <Navbar />
      <div className="h-[70px] bg-none"></div>
      <div className="lowerflex">
        <div className="left">
          {" "}
          <div className="topbar">
            <h1>{genreName} Anime</h1>
          </div>
          <div className="contentcard">
            <div className="row-1 flex-wrap">
              {animeList.map((movie) => (
                <Item5 movie={movie} />
              ))}
            </div>
          </div>
        </div>

        <div className="right !gap-12">
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
      </div>
    </>
  );
};

export default Similar;
