import React from "react";
import Navbar from "./Common/Navbar/Navbar";
import Swiper1 from "./Common/Swiper/Swiper1";
import PopularFlex from "./components/PopularFlex";
import Swiper2 from "./Common/Swiper/Swiper2";

import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Lowerflex from "./components/Lowerflex";
import Totopbtn from "./components/Totopbtn";
import Footer from "./components/Footer";


const Mainpage = () => {

  return (
    <div className="w-full flex flex-col items-start gap-8 overflow-hidden">
      
      <Navbar />
      <Swiper1 />
      {/* <PopularFlex/> */}
      <Swiper2 />
      <div className="flex items-center gap-2 mt-16 mb-8 w-full p-4">
        <div className="gif h-16 w-16">
          <img
            src="https://hianime.to/images/share-icon.gif"
            alt=""
            className="h-16 w-16 rounded-full"
          />
        </div>
        <div className="righttxt flex flex-col">
          <div className="upper text-purple-300">Share Hianime</div>
          <div className="lower text-white">to your friends</div>
        </div>
      </div>
      <Testimonials />
      <Stats />
      <Lowerflex />
      <Totopbtn />
      <Footer />
    </div>
  );
};

export default Mainpage;
