import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Searchbtn = () => {
  const [searchTerm, setSearchTerm] = useState(""); // To store the search term
  const [results, setResults] = useState([]); // To store the search results
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To store error messages

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSearchSubmit = () => {
    // Navigate to SearchPage and pass the search term as a query parameter
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Retry fetch with delay function
  const fetchDataWithRetry = async (retryCount = 0) => {
    if (retryCount >= 10) {
      setError("Failed to fetch after multiple attempts.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResults(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(true);
      setTimeout(() => fetchDataWithRetry(retryCount + 1), 2000); // Retry with 2 seconds delay
    }
  };

  // Fetch data when the search term changes
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setLoading(true);
      setError(null); // Reset any previous error
      fetchDataWithRetry(); // Call the retry function
    } else {
      setResults([]); // Clear results when search term is empty
    }
  }, [searchTerm]);

  const [isFocused, setIsFocused] = useState(false); // To track input focus state

  // Handle click on search result to navigate to movie details page
  const handleResultClick = (mal_id) => {
    navigate(`/movie/${mal_id}`);
  };

  return (
    <div className="w-[360px] h-[40px] flex flex-row relative bg-white">
      <input
        className="w-[360px] h-[40px] pl-[10px] !text-black"
        type="text"
        placeholder="Search anime..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)} // Set focus state to false
      />
      <div className="h-[40px] flex flex-row justify-center items-center absolute top-[0px] right-[7px]">
        <div className="pr-[10px] pl-[10px] text-black cursor-pointer">
          <svg
            onClick={handleSearchSubmit}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16.8"
            viewBox="0 0 1664 1664"
          >
            <path
              fill="black"
              d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90z"
            />
          </svg>
        </div>
        <div className="filterbtn bg-black cc text-sm text-white pr-[6px] pl-[6px] rounded-[6px] hover:bg-[#FFBADE] hover:text-black cursor-pointer">
          <button type="filter" className="w-[41.33px] h-[26px] cursor-pointer">
            Filter
          </button>
        </div>
      </div>

{/* Dropdown for search results */}
{isFocused && searchTerm && results.length > 0 && (
  <div className="absolute top-[40px] left-0 w-[360px] bg-[#201f31]/90 shadow-md max-h-[370px] overflow-y-auto">
    <ul>
      {loading ? (
        <li className="text-white text-center">Loading...</li>
      ) : (
        results.slice(0, 5).map((result) => ( // Limit to 5 items
          <motion.li
            key={result.mal_id}
            className="p-2 hover:bg-[#1E1E1E] cursor-pointer flex gap-4 items-center text-white rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => handleResultClick(result.mal_id)} // Use onMouseDown to trigger navigation
          >
            <img
              // Use the high-quality large image URL
              src={result.images.jpg.large_image_url}
              alt={result.title_english || result.title}
              className="w-14 h-14 object-cover rounded-md" // Adjusted the thumbnail size
              style={{ objectFit: 'cover' }} // Ensure thumbnails are not stretched or distorted
            />
            <span className="text-sm truncate p-2">{result.title_english || result.title}</span> {/* Ensure the text size fits well */}
          </motion.li>
        ))
      )}
    </ul>
  </div>
)}


      {/* Display error message if the request fails after retries */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Searchbtn;
