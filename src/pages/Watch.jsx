import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import axios from "axios";

// const Watch = () => {

//   const { mid } = useParams();

//   return (
//     <div className="min-h-screen w-full">
//       <Navbar />
//       <div className="h-[70px]"></div>
//       <AnimeDetail malId={mid} />
//     </div>
//   );
// };

// export default Watch;

// const AnimeDetail = ({ malId }) => {
//   const [anime, setAnime] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     const fetchAnime = async (attempt = 1) => {
//       try {
//         console.log(`Fetching attempt ${attempt}...`);
//         const response = await axios.get(
//           `https://api.jikan.moe/v4/anime/${malId}`
//         );
//         const data = response.data.data;
//         console.log({data});

//         if (data.episodes === null && attempt >= 10) {
//           console.warn("Episodes are null, switching to backup API...");
//           const backupResponse = await axios.get(
//             `https://api.anime-db.com/v1/anime/${malId}`
//           );
//           setAnime(backupResponse.data);
//         } else {
//           setAnime(data);
//         }
//       } catch (error) {
//         console.error(
//           `Attempt ${attempt}: Error fetching anime details`,
//           error
//         );
//         if (attempt < 10) {
//           setTimeout(() => fetchAnime(attempt + 1), 2000); // Retry after 2 seconds
//         } else {
//           console.error("Max retries reached.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnime();
//   }, [malId]);

//   if (loading) return <p className="text-white text-center">Loading...</p>;

//   if (!anime) return <p className="text-white text-center">Anime not found.</p>;

//   return (
//     <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-screen p-10">
//       <div><p className="text-gray-400">Home • TV • {anime.title_english}</p></div>
//     </div>
//   );
// };

// const Watch = () => {
//   const { mid } = useParams();

//   return (
//     <div className="min-h-screen w-full">
//       <Navbar />
//       <div className="h-[70px]"></div>
//       <AnimeStreamingPage malId={mid} />
//     </div>
//   );
// }

// export default Watch

// const AnimeStreamingPage = ({malId}) => {
//   const [anime, setAnime] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedEpisode, setSelectedEpisode] = useState(1);
//   const [episodes, setEpisodes] = useState([]);

//   // ✅ Fetch Anime Details with Retry Mechanism
//   useEffect(() => {
//     const fetchAnime = async (attempt = 1) => {
//       try {
//         console.log(`Fetching Anime: Attempt ${attempt}...`);
//         const response = await axios.get(`https://api.jikan.moe/v4/anime/${malId}`);
//         const data = response.data.data;
//         console.log({ data });

//         if (!data.episodes && attempt >= 10) {
//           console.warn("Episodes are null, switching to backup API...");
//           const backupResponse = await axios.get(`https://api.anime-db.com/v1/anime/${malId}`);
//           setAnime(backupResponse.data);
//         } else {
//           setAnime(data);
//         }
//       } catch (error) {
//         console.error(`Anime Fetch Attempt ${attempt} Failed:`, error);
//         if (attempt < 10) {
//           setTimeout(() => fetchAnime(attempt + 1), 2000); // Retry after 2 seconds
//         } else {
//           console.error("Max retries reached for anime.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnime();
//   }, [malId]);

//   // ✅ Fetch Episodes with Retry Mechanism
//   useEffect(() => {
//     const fetchEpisodes = async (attempt = 1) => {
//       try {
//         console.log(`Fetching Episodes: Attempt ${attempt}...`);
//         const response = await axios.get(`https://api.jikan.moe/v4/anime/${malId}/episodes`);
//         setEpisodes(response.data.data || []);
//       } catch (error) {
//         console.error(`Episode Fetch Attempt ${attempt} Failed:`, error);
//         if (attempt < 10) {
//           setTimeout(() => fetchEpisodes(attempt + 1), 2000); // Retry after 2 seconds
//         } else {
//           console.error("Max retries reached for episodes.");
//         }
//       }
//     };

//     fetchEpisodes();
//   }, [malId]);

//   if (loading) return <p className="text-white text-center">Loading...</p>;
//   if (!anime) return <p className="text-white text-center">Anime not found.</p>;

//   return (
//     <div className="min-h-screen w-full bg-gray-900 text-white">
//       <Navbar />
//       <div className="h-[60px]"></div>
//       <div className="max-w-7xl mx-auto flex gap-6 p-6">
//         {/* Left Section: Episode List */}
//         <div className="w-1/4 bg-gray-800 p-4 rounded-lg">
//           <h2 className="text-lg font-bold mb-3">List of episodes:</h2>
//           <ul>
//             {episodes.map((title, index) => (
//               <li
//                 key={index}
//                 className={`p-2 cursor-pointer ${
//                   selectedEpisode === index + 1 ? "text-pink-400" : "text-gray-300"
//                 } hover:text-white`}
//                 onClick={() => setSelectedEpisode(index + 1)}
//               >
//                 {index + 1}. {title}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Section: Video & Details */}
//         <div className="flex-1">
//           <div className="relative">
//             <video
//               className="w-full rounded-lg"
//               controls
//               src="https://example.com/video.mp4"
//             ></video>
//             <p className="absolute bottom-2 left-4 bg-black/70 p-2 rounded-md text-pink-400">
//               You are watching Episode {selectedEpisode}
//             </p>
//           </div>
//           <h1 className="text-3xl font-bold mt-4">Solo Leveling Season 2: Arise from the Shadow</h1>
//           <div className="flex gap-2 mt-2">
//             <span className="bg-gray-700 px-2 py-1 rounded">R</span>
//             <span className="bg-gray-700 px-2 py-1 rounded">HD</span>
//             <span className="bg-gray-700 px-2 py-1 rounded">13+</span>
//             <span className="bg-gray-700 px-2 py-1 rounded">24m</span>
//           </div>
//           <p className="text-gray-400 mt-2">
//             Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the supernatural
//             powers he has gained. However, keeping his skills hidden becomes more difficult as dungeon-related incidents pile up around him.
//           </p>
//           <button className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full">▶ Watch Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Navbar from "../Common/Navbar/Navbar";
// import axios from "axios";

const Watch = () => {
  const { mid } = useParams();
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="h-[70px]"></div>
      <AnimeStreamingPage malId={mid} />
    </div>
  );
};
export default Watch;

const AnimeStreamingPage = ({ malId }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showEp, setShowEp] = useState(false);

  const formatRating = (rating) => {
    const ratingMap = {
      "G - All Ages": "All Ages", // General audience
      "PG - Children": "7+", // Suitable for kids
      "PG-13 - Teens 13 or older": "13+", // Teen audience
      "R - 17+ (violence & profanity)": "17+", // Restricted for mature audiences
      "R+ - Mild Nudity": "17+ (Mild Nudity)", // Restricted with nudity
      "Rx - Hentai": "18+ (Adult Content)", // Explicit content
    };

    return ratingMap[rating] || "Unknown"; // Default to "Unknown" if rating is missing
  };

  useEffect(() => {
    if (anime?.type === "Movie") {
      setShowEp(false); // Hide episode info for movies
    } else if (selectedEpisode) {
      setShowEp(true); // Show episode info when an episode is selected
      const timer = setTimeout(() => {
        setShowEp(false); // Hide after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on unmount or re-run
    }
  }, [selectedEpisode, anime]);
  useEffect(() => {
    const fetchAnime = async (attempt = 1) => {
      try {
        console.log(`Fetching Anime: Attempt ${attempt}...`);
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${malId}`
        );
        const data = response.data.data;
        console.log({ data });

        if (!data.episodes && attempt >= 10) {
          console.warn("Episodes are null, switching to backup API...");
          const backupResponse = await axios.get(
            `https://api.anime-db.com/v1/anime/${malId}`
          );
          setAnime(backupResponse.data);
        } else {
          setAnime(data);
        }
      } catch (error) {
        console.error(`Anime Fetch Attempt ${attempt} Failed:`, error);
        if (attempt < 10) {
          setTimeout(() => fetchAnime(attempt + 1), 2000);
        } else {
          console.error("Max retries reached for anime.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [malId]);

  useEffect(() => {
    const fetchEpisodes = async (attempt = 1) => {
      try {
        console.log(`Fetching Episodes: Attempt ${attempt}...`);
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${malId}/episodes`
        );
        const episodesData = response.data.data || [];
        setEpisodes(episodesData);
        console.log({ episodesData });
        if (episodesData.length > 0) setSelectedEpisode(episodesData[0].mal_id);
      } catch (error) {
        console.error(`Episode Fetch Attempt ${attempt} Failed:`, error);
        if (attempt < 10) {
          setTimeout(() => fetchEpisodes(attempt + 1), 2000);
        } else {
          console.error("Max retries reached for episodes.");
        }
      }
    };
    fetchEpisodes();
  }, [malId]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!anime) return <p className="text-white text-center">Anime not found.</p>;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Navbar />
      <div className="h-[60px]"></div>
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        <div className="w-1/4 bg-gray-800 p-4 rounded-lg overflow-y-auto h-[640px]">
          <h2 className="text-lg font-bold mb-3">List of episodes:</h2>
          <ul>
            {episodes === undefined || episodes.length == 0 ? (
              <li className="p-2 cursor-pointer truncate text-pink-400 hover:text-white hover:bg-gray-600">
                1. EP
              </li>
            ) : (
              episodes.map((ep) => (
                <li
                  key={ep.mal_id}
                  className={`p-2 cursor-pointer truncate ${
                    selectedEpisode === ep.mal_id
                      ? "text-pink-400"
                      : "text-gray-300"
                  } hover:text-white hover:bg-gray-600`}
                  onClick={() => setSelectedEpisode(ep.mal_id)}
                >
                  {ep.mal_id}. {ep.title_english || ep.title}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="flex-1">
          <div className="relative">
            {/* <video
              className="w-full rounded-lg"
              controls
              src="https://example.com/video.mp4"
            ></video> */}
            <iframe
              className="w-full h-[450px]"
              src="https://www.youtube.com/embed/UmfqCrWEpn4?si=lXTRoGJfwUwlSUHb"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            {showEp && (
              <p className="absolute bottom-2 left-4 bg-black/70 p-2 rounded-md text-pink-400">
                You are watching Episode {selectedEpisode}
              </p>
            )}
          </div>
          <h1 className="text-3xl font-bold mt-4">{anime.title_english}</h1>
          <div className="flex gap-2 mt-2">
            <span className="bg-gray-700 px-2 py-1 rounded">HD</span>
            <span className="bg-gray-700 px-2 py-1 rounded">
              {formatRating(anime.rating)}
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded">
              {anime.duration}
            </span>
          </div>
          <p className="text-gray-400 mt-2 max-h-13 overflow-hidden text-ellipsis">
            {anime.synopsis}
          </p>

          <Link
            to={`/movie/${anime.mal_id}`}
            className="flex items-center justify-center w-[160px] h-[50px]  hover:bg-[#484765] mt-4 bg-pink-500 text-white px-6 py-2 rounded-full"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[20px] w-[20px]"
              viewBox="0 0 320 512"
            >
              <path
                fill="white"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256L34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
