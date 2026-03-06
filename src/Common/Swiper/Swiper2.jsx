import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { fetchSwipe2Anime } from "../../redux/reducers/swipe2animeSlice";
import { Link } from "react-router-dom";

const SingleSlider = ({ movie, index }) => {
  const fullResImage = movie.images.jpg.large_image_url.replace(
    "_l.jpg",
    ".jpg"
  );
  return (
    <Link to={`/movie/${movie.mal_id}`}>
      <div className="w-[208px] h-[245px] text-center text-lg flex relative cursor-pointer overflow-visible">
        <div className="!-z-[10] flex">
          <div className="h-full flex flex-col items-center justify-end relative p-1.5">
            <h5 className="absolute bottom-11 left-8 origin-bottom-left transform -rotate-90 text-white text-left truncate w-50">
              {movie.title_english || movie.title}
            </h5>
            <h2 className="text-2xl text-[#ffbade]">
              {index < 9 ? `0${index + 1}` : index + 1}
            </h2>
          </div>
          <div className="w-[168.3px] h-[239.5px]">
            <img
              className="w-[168.3px] h-[239.5px] object-cover"
              src={movie.images.webp.large_image_url || fullResImage}
              alt={movie.title}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Swiper2 = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.swipe2anime);

  useEffect(() => {
    dispatch(fetchSwipe2Anime());
  }, [dispatch]);

  // Display loading state
  if (status === "loading") {
    return (
      <div className="text-white text-center text-xl mt-4">
        Loading...
      </div>
    );
  }

  // Display error state
  if (status === "failed") {
    return (
      <div className="text-red-500 text-center text-xl mt-4">
        Error: {error || "Failed to load data."}
      </div>
    );
  }

  return (
    <div className="!pl-4 w-[100%]">
      <div className="w-full block text-[#ffbade] self-start font-bold text-xl mb-[24px] ml-2">
        Trending
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        style={{ overflow: "visible !important" }}
        className="mySwiper2 relative !w-[100%] !h-[245px] !pr-[60px]"
      >
        {list.map((movie, index) => (
          <SwiperSlide key={movie.mal_id}>
            <SingleSlider movie={movie} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swiper2;
