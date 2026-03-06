import React, { useState } from "react";
import { XMarkIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


const Sidebarbtn = () => {
  const [sidebar, setSidebar] = useState(false);
 

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-[#1e1e2e] text-white transition-transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } z-50 shadow-lg`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebar(!sidebar)}
          className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white cursor-pointer"
        >
          <XMarkIcon className="w-6 h-6" />
          <span>Close menu</span>
        </button>

        {/* Community Button */}
        <button className="flex items-center justify-center gap-2 w-[90%] mx-auto my-4 py-2 text-lg font-medium bg-[#5a5477] rounded-xl hover:bg-[#6b6391] transition">
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          Community
        </button>

        {/* Navigation Links */}
        <nav className="mt-4">
          {[
            { name: "Home", path: "/" },
            { name: "Subbed Anime", path: "/subbed-anime" },
            { name: "Dubbed Anime", path: "/dubbed-anime" },
            { name: "Most Popular", path: "/most-popular" },
            { name: "Movies", path: "/movies" },
            { name: "TV Series", path: "/tv-series" },
            { name: "OVAs", path: "/ovas" },
            { name: "ONAs", path: "/onas" },
            { name: "Specials", path: "/specials" },
            { name: "Events", path: "/events" },
            // { name: "HiAnime App", path: "/hianime-app" },
          ].map((item, index) => (
            <Link
            
              key={index}
              to={item.path}
              className="block px-6 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-[#2a2a3a] transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className="h-[20px] w-[20px] text-white cursor-pointer"
        
        onClick={() => {
          setSidebar(!sidebar);
          console.log(sidebar);
        }}
      >
        <svg
          width="21px"
          height="24.8px"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z"></path>{" "}
            <path d="M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z"></path>{" "}
            <path d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z"></path>{" "}
          </g>
        </svg>
      </div>
    </>
  );
};

export default Sidebarbtn;
