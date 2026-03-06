import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Item5 = ({movie}) => {
  const fullResImage = movie.images.jpg.large_image_url.replace("_l.jpg", ".jpg");
  return (
  <>
  <Link to={`/movie/${movie.mal_id}`}><div className="item">
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
        </div></Link>
        </>);
}

const Leftflex = () => {
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      axios.get(`https://api.jikan.moe/v4/anime`)
        .then((response) => {
          console.log(response.data);
  
          const uniqueAnime = [];
          const seenTitles = new Set();
  
          // Filter duplicates based on the title & ensure episodes are not null
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title) && anime.episodes !== null && anime.title_english !== null) {
              seenTitles.add(anime.title);
              uniqueAnime.push(anime);
            }
          });
  
          if (uniqueAnime.length === 0 && attempt < 5) {
            console.log(`No valid anime found. Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
            return;
          }
  
          // Limit to first 12 unique items
          setList(uniqueAnime.slice(0, 12));
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (attempt < 5) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchData(attempt + 1), 2000);
          }
        });
    };
  
    fetchData(); // Initial API call

    const fetchMovies = (attempt = 0) => {
      axios.get(`https://api.jikan.moe/v4/anime?type=movie`)
        .then((response) => {
          console.log("Movies Data:", response.data);
  
          const uniqueMovies = [];
          const seenTitles = new Set();
  
          // Filter duplicates based on title & ensure data integrity
          response.data.data.forEach((anime) => {
            if (!seenTitles.has(anime.title) && anime.title_english !== null) {
              seenTitles.add(anime.title);
              uniqueMovies.push(anime);
            }
          });
  
          if (uniqueMovies.length === 0 && attempt < 5) {
            console.log(`No valid movies found. Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchMovies(attempt + 1), 2000);
            return;
          }
  
          setList1(uniqueMovies.slice(0, 12)); // Store movies in list2
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          if (attempt < 5) {
            console.log(`Retrying... Attempt ${attempt + 1}`);
            setTimeout(() => fetchMovies(attempt + 1), 2000);
          }
        });
    };
    fetchMovies(); // Fetch movies
  
  }, []);
  

  return (
    <>
    <div className="left">
    <div className="topbar">
      <h1>Latest Episode</h1>
      <h3>view more &gt;</h3>
    </div>
    <div className="contentcard">
      <div className="row-1 flex-wrap">
        {list.map((movie)=>(
          <Item5 movie={movie}/>
        ))}
      </div>
    </div>
    <div className="topbar">
      <h1>Latest Episode</h1>
      <h3>view more &gt;</h3>
    </div>
    <div className="contentcard">
      <div className="row-1 flex-wrap">
        {list1.map((movie)=>(
          <Item5 movie={movie}/>
        ))}
      </div>
    </div>
    
    </div>
  </>
  )
}

export default Leftflex