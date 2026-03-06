import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = ({ movie }) => {
  return (
   <Link to={`/movie/${movie.mal_id}`}> <div className="item overflow-hidden text-white hover:bg-white/2">
   <div className="img">
     <img
       src={movie.images.webp.large_image_url}
       alt={movie.title_english || movie.title}
       className="object-cover"
     />
   </div>
   <div className="txt">
     <div className="upper truncate text-white">{movie.title_english || movie.title}</div>
     <div className="lowertxtlogo">
       <div className="cc flex items-center">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width={200}
           height={200}
           viewBox="0 0 2368 1664"
           className="w-4 h-4"
         >
           <path
             fill="currentColor"
             d="M2368 192v1280q0 78-57 135t-135 57H192q-77 0-134.5-57T0 1472V192q0-77 57.5-134.5T192 0h1984q78 0 135 57.5t57 134.5zM1219 835q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64h-147q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T1691 363q-128 0-237 63t-172 172t-63 237zm-1019 1q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64H944q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T672 364q-128 0-237 63T263 599t-63 237z"
           />
         </svg>
         <span className="ml-1">{movie.episodes || "?"}</span>
       </div>
       <div className="dub flex items-center">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width={200}
           height={200}
           viewBox="0 0 24 24"
           className="w-4 h-4"
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
         <span className="ml-1">{movie.episodes || "?"}</span>
       </div>
       <div className="w-1 h-1 rounded-full bg-white"></div>
       <div className="tv">{movie.type}</div>
     </div>
   </div>
 </div></Link>
  );
};
const Stats = () => {
  const [topairing, setTopairing] = useState([]);
  const [mostpopular, setMostpopular] = useState([]);
  const [mostfavourite, setMostfavourite] = useState([]);
  const [latestcompleted, setlatestcompleted] = useState([]);

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      axios
        .get(`https://api.jikan.moe/v4/anime?order_by=popularity&status=airing`)
        .then((response) => {
          console.log(response.data);
          const uniqueAnime = [];
          const seenTitles = new Set();

          // Filter duplicates based on the title & ensure episodes are not null
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title_english) && anime.episodes !== null) {
              seenTitles.add(anime.title_english);
              uniqueAnime.push(anime);
            }
          });

          if (uniqueAnime.length === 0 && attempt < 5) {
            console.log(
              `No valid anime found. Retrying... Attempt ${attempt + 1}`
            );
            setTimeout(() => fetchData(attempt + 1), 2000);
            return;
          }

          // Limit to first 5 unique items
          setTopairing(uniqueAnime.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (attempt < 10) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
          }
        });
    };

    fetchData(); // Initial API call
  }, []);

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      axios
        .get(`https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc`)
        .then((response) => {
          console.log(response.data);
          const uniqueAnime = [];
          const seenTitles = new Set();

          // Filter duplicates based on the title & ensure episodes are not null
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title) && anime.episodes !== null) {
              seenTitles.add(anime.title);
              uniqueAnime.push(anime);
            }
          });

          if (uniqueAnime.length === 0 && attempt < 5) {
            console.log(
              `No valid anime found. Retrying... Attempt ${attempt + 1}`
            );
            setTimeout(() => fetchData(attempt + 1), 2000);
            return;
          }

          // Limit to first 5 unique items
          setMostpopular(uniqueAnime.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (attempt < 10) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
          }
        });
    };

    fetchData(); // Initial API call
  }, []);

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      axios
        .get(`https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc`)
        .then((response) => {
          console.log(response.data);
          const uniqueAnime = [];
          const seenTitles = new Set();

          // Filter duplicates based on the title & ensure episodes are not null
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title) && anime.episodes !== null) {
              seenTitles.add(anime.title);
              uniqueAnime.push(anime);
            }
          });

          if (uniqueAnime.length === 0 && attempt < 5) {
            console.log(
              `No valid anime found. Retrying... Attempt ${attempt + 1}`
            );
            setTimeout(() => fetchData(attempt + 1), 2000);
            return;
          }

          // Limit to first 5 unique items
          setMostfavourite(uniqueAnime.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (attempt < 10) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
          }
        });
    };

    fetchData(); // Initial API call
  }, []);

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      axios
        .get(
          `https://api.jikan.moe/v4/anime?status=complete&order_by=start_date&sort=desc`
        )
        .then((response) => {
          console.log(response.data);
          const uniqueAnime = [];
          const seenTitles = new Set();

          // Filter duplicates based on the title and ensure episodes are not null
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title) && anime.episodes !== null) {
              seenTitles.add(anime.title);
              uniqueAnime.push(anime);
            }
          });

          // If no valid data is found, retry up to 5 times
          if (uniqueAnime.length === 0 && attempt < 5) {
            console.log(
              `No valid anime found. Retrying... Attempt ${attempt + 1}`
            );
            setTimeout(() => fetchData(attempt + 1), 2000);
            return;
          }

          // Limit to first 5 unique items
          setlatestcompleted(uniqueAnime.slice(0, 5));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (attempt < 10) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
          }
        });
    };

    fetchData(); // Initial API call
  }, []);

  return (
    <>
      <div className="statbars w-full">
        <div className="topairing w-full">
          <h1>Top Airing</h1>
          {topairing.map((movie) => {
            return <Item movie={movie} />;
          })}
          <div className="viewmore text-white">
            <div className="i">
              View more
              <div>&gt;</div>
            </div>
          </div>
        </div>
        <div className="mostpopular">
          <h1>Most Popular</h1>
          {mostpopular.map((movie) => {
            return <Item movie={movie} />;
          })}
          <div className="viewmore text-white">
            <div className="i">
              View more
              <div>&gt;</div>
            </div>
          </div>
        </div>
        <div className="mostfavourite">
          <h1>Most Favourite</h1>
          {mostfavourite.map((movie) => {
            return <Item movie={movie} />;
          })}
          <div className="viewmore text-white">
            <div className="i">
              View more
              <div>&gt;</div>
            </div>
          </div>
        </div>
        <div className="latestcompleted">
          <h1>Latest Completed</h1>
          {latestcompleted.map((movie) => {
            return <Item movie={movie} />;
          })}
          <div className="viewmore text-white">
            <div className="i">
              View more
              <div>&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
