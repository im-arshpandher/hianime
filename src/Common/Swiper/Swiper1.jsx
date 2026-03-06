import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "../../utils/cookies";
import { fetchSwipe1Anime } from "../../redux/reducers/swipe1animeSlice";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Swiper1 = () => {
  return (
    <div className="w-full h-[70vh]">
      <Swipe1AnimeList />
    </div>
  );
};

const Swipe1AnimeList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.swipe1);

  useEffect(() => {
    dispatch(fetchSwipe1Anime());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <Swiper
      centeredSlides={true}
      autoplay={{ delay: 15000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-full w-full"
      loop={true}
    >
      {list.map((movie, index) => (
        <SwiperSlide className="h-full w-full" key={movie.mal_id}>
          <SingleSlide movie={movie} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swiper1;

const SingleSlide = ({ movie, index }) => {
  const [backdropImage, setBackdropImage] = useState("");

  const formatDate = (aired) => {
    if (!aired?.prop?.from) return "Unknown";
    const { day, month, year } = aired.prop.from;
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day ? String(day).padStart(2, "0") : "??"} ${month ? monthsShort[month - 1] : "??"} ${year ? year : "????"}`;
  };

  useEffect(() => {
    const fetchBackdrop = async () => {
      try {
        const token = getCookies("anime_access_token");
        const kitsuRes = await axios.get("https://kitsu.io/api/edge/anime", {
          params: { "filter[text]": movie.title },
          headers: { Authorization: `Bearer ${token}` },
        });
        const kitsuCover = kitsuRes.data.data[0]?.attributes?.coverImage?.original;
        if (kitsuCover) setBackdropImage(kitsuCover);
      } catch (error) {
        console.error("Error fetching backdrop:", error);
      }
    };

    fetchBackdrop();
  }, [movie.title]);

  return (
    <div className="flex items-center flex-row-reverse relative h-full">
      <div className="absolute w-[45%] left-[3%] top-[30%] z-1 flex flex-col justify-between items-start gap-[35px]">
        <div className="text-[1rem] text-[#ffbade]">#{index + 1} Spotlight</div>
        <div className="text-[2rem] text-white font-semibold truncate w-full">
          {movie.title_english || movie.title}
        </div>
        <div className="text-white">{formatDate(movie.aired)}</div>
        <div className="w-full max-h-[58px] text-white text-justify overflow-hidden text-ellipsis line-clamp-2">
          {movie.synopsis}
        </div>
        <div className="flex items-center gap-[20px]">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to={`/watch/${movie.mal_id}`} className="flex items-center gap-2 text-white bg-blue-600 p-2 rounded-md shadow-md hover:bg-blue-700">
              <FaPlay /> Watch Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to={`/movie/${movie.mal_id}`} className="flex items-center gap-2 text-white bg-gray-600 p-2 rounded-md shadow-md hover:bg-gray-700">
              <FaInfoCircle /> Details
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="imgwrapper !h-full">
        <img className="!h-full !object-cover" src={backdropImage || movie.images.webp.large_image_url} alt={movie.title} />
      </div>
    </div>
  );
};
