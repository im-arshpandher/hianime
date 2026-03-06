import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import axios from "axios";

// SearchItem Component to display individual anime items
const SearchItem = ({ movie }) => {
  const fullResImage = movie.images.jpg.large_image_url.replace("_l.jpg", ".jpg");

  return (
    <Link to={`/movie/${movie.mal_id}`} className="anime-item">
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
      </div>
    </Link>
  );
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [animeList, setAnimeList] = useState([]); // For storing search results
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const [genres, setGenres] = useState([]); // For genre filters
  const [selectedGenre, setSelectedGenre] = useState(""); // To track selected genre filter
  const location = useLocation();

  // Get search term from query params in the URL
  const getSearchTermFromUrl = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("query") || "";
  };

  // Fetch anime results from Jikan API
  const fetchAnimeResults = async (term, retryCount = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${term}&limit=20&order_by=score&sort=desc`
      );
      setAnimeList(response.data.data);
      setLoading(false);
    } catch (error) {
      if (retryCount < 10) {
        console.warn(`Retrying fetchAnimeResults... Attempt ${retryCount + 1}`);
        setTimeout(() => fetchAnimeResults(term, retryCount + 1), 2000);
      } else {
        setError("Error fetching search results after 10 attempts.");
        setLoading(false);
      }
    }
  };

  // Fetch genres for filtering
  const fetchGenres = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/genres/anime");
      setGenres(response.data.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  // Handle genre filter change
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchFilteredAnimeResults(genreId);
  };

  // Fetch filtered anime results based on selected genre
  const fetchFilteredAnimeResults = async (genreId) => {
    if (genreId) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=20&order_by=score&sort=desc`
        );
        setAnimeList(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching filtered results.");
        setLoading(false);
      }
    } else {
      fetchAnimeResults(searchTerm); // If no genre selected, fetch based on search term
    }
  };

  // Effect to update search term and fetch anime results when searchTerm changes
  useEffect(() => {
    const termFromUrl = getSearchTermFromUrl();
    setSearchTerm(termFromUrl); // Set search term from URL on initial render or URL change

    if (termFromUrl.trim()) {
      fetchAnimeResults(termFromUrl); // Fetch results based on the search term
    } else {
      setAnimeList([]); // Clear the anime list if search term is empty
    }
  }, [location.search]); // Listen to search term changes in URL

  // Effect to fetch genres when the component mounts
  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-none"></div>
      <div className="lowerflex">
        <div className="left">
          <div className="topbar">
            <h1>Search Results for "{searchTerm}"</h1>
          </div>
          <div className="contentcard">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="row-1 flex-wrap">
                {animeList.map((movie) => (
                  <SearchItem key={movie.mal_id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Genre Filter */}
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
              {genres.map((genre) => (
                <div
                  key={genre.mal_id}
                  className="genre-item"
                  style={{
                    fontSize: "0.9rem", // Reduce text size
                    wordBreak: "break-word",
                  }}
                  onClick={() => handleGenreChange(genre.mal_id)}
                >
                  <div className="cursor-pointer">{genre.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
