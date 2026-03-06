import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast
import { motion } from "framer-motion"; // Importing framer-motion
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const MovieDetails = () => {
  const { mid } = useParams();

  return (
    <div className="min-h-screen w-full">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <Navbar />
      <div className="h-[70px]"></div>
      <AnimeDetail malId={mid} />
    </div>
  );
};

export default MovieDetails;

const AnimeDetail = ({ malId }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchAnime = async (attempt = 1) => {
      try {
        console.log(`Fetching attempt ${attempt}...`);
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${malId}`
        );
        const data = response.data.data;
        console.log({ data });

        if (data.episodes === null && attempt >= 10) {
          console.warn("Episodes are null, switching to backup API...");
          const backupResponse = await axios.get(
            `https://api.anime-db.com/v1/anime/${malId}`
          );
          setAnime(backupResponse.data);
        } else {
          setAnime(data);
        }
      } catch (error) {
        console.error(
          `Attempt ${attempt}: Error fetching anime details`,
          error
        );
        if (attempt < 10) {
          setTimeout(() => fetchAnime(attempt + 1), 2000); // Retry after 2 seconds
        } else {
          console.error("Max retries reached.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [malId]);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  if (!anime) return <p className="text-white text-center">Anime not found.</p>;

  // Handle adding anime to the list
  const handleAddToList = async () => {
    try {
      // Make API call to add anime to the user's list
      const response = await axios.post(
        "http://localhost:5000/api/users/watchlist", // Replace with actual API endpoint
        { malId }, // Sending MAL ID
        {
          headers: {
            Authorization: `Bearer ${getCookies("anime_access_token")}`, // Send the token for authorization
          },
        }
      );

      if (response.data.success) {
        // Success toast notification
        toast.success("Anime added to your watchlist!");
      } else {
        toast.error("Failed to add anime to your watchlist.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the anime to your watchlist.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-screen p-10">
      <div className="max-w-7xl mx-auto flex gap-10">
        {/* Left Section: Image & Watch Together */}
        <div className="w-[250px] flex flex-col items-center">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title_english}
            className="rounded-lg"
          />
          <button className="mt-4 w-full bg-black/50 text-pink-400 p-2 rounded-md flex items-center justify-center">
            <span className="mr-2">🎧</span> Watch2gether
          </button>
        </div>

        {/* Right Section: Anime Info */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Breadcrumb */}
          <p className="text-gray-400">Home • TV • {anime.title_english}</p>

          {/* Title */}
          <h1 className="text-5xl font-bold mt-2">{anime.title_english}</h1>

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            <span className="bg-gray-700 px-2 py-1 rounded">
              {anime.rating}
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded">{anime.type}</span>
            <span className="bg-gray-700 px-2 py-1 rounded">
              {anime.duration}
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded">
              Score: {anime.score}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-5">
            <Link
              to={`/watch/${malId}`}
              className="bg-pink-500 text-white px-6 py-2 rounded-full flex items-center"
            >
              ▶ Watch now
            </Link>
            <button
              onClick={handleAddToList} // Add to list functionality
              className="bg-white text-black px-6 py-2 rounded-full flex items-center"
            >
              ➕ Add to List
            </button>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-300">{anime.synopsis}</p>

          {/* Additional Info */}
          <div className="mt-6">
            <p>
              <strong>Japanese:</strong> {anime.title_japanese}
            </p>
            <p>
              <strong>Premiered:</strong> {anime.aired.string}
            </p>
            <p>
              <strong>Status:</strong> {anime.status}
            </p>
            <p>
              <strong>MAL Score:</strong> {anime.score}
            </p>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
