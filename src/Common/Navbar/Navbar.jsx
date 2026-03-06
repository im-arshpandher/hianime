import React from "react";
import Sidebarbtn from "./Sidebarbtn";
import Mainlogo from "./Mainlogo";
import Searchbtn from "./Searchbtn";
import Social from "./Social";
import Btns from "./Btns";
import Loginbtn from "./Loginbtn";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 h-[70px] w-full flex flex-row items-center pr-[15px] pl-[15px] justify-between z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#201f31]/70" : "bg-transparent"
      }`}
    >
      <div className="flex flex-row items-center gap-[20px]">
        <Sidebarbtn />
        <Link to={"/"}>
          <Mainlogo />
        </Link>
        <Searchbtn />
        <Social />
        {/* <Btns />  */}
      </div>
      <Loginbtn />
    </div>
  );
};

export default Navbar;
