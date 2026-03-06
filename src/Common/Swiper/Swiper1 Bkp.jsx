import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

const Swiper1 = () => {
  return (
    <div className="w-full h-[70vh]">
      <Swiper
        centeredSlides={true}
        autoplay={{ delay: 15000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {Array.from({ length: 10 }).map((d) => {
          return (
            <SwiperSlide className="h-full w-full">
              <SingleSlide />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Swiper1;

const SingleSlide = () => {
  return (
    <div className="flex items-center flex-row-reverse relative h-full">
      <div className="absolute w-[45%] left-[3%] top-[30%] z-1 flex flex-col justify-between items-start gap-[35px]">
        <div className="text-[1rem] text-[#ffbade]">#1 Spotlight</div>
        <div className="text-[2rem] text-white font-semibold">Wind Breaker</div>
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-[5px] text-white text-[1rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[20px] w-[20px]"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5z"
              />
            </svg>
            TV
          </div>
          <div className="flex items-center gap-[5px] text-white  text-[1rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[20px] w-[20px]"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm2.5 14.5L9 11V4h2v6l3 3z"
              />
            </svg>
            23m
          </div>
          <div className="flex items-center gap-[5px]  text-white text-[1rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[20px] w-[20px]"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V192H32ZM480 87.77A23.8 23.8 0 0 0 456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448Z"
              />
            </svg>
            Apr 5,2024
          </div>
          <div className="flex items-center justify-center gap-[5px]">
            <div className="bg-[#ffbade] text-black font-bold rounded-[3px] px-[2px]">
              HD
            </div>
            <div className="bg-[#B0E3AF] text-black font-bold rounded-[3px] px-[2px] flex items-center gap-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[20px] w-[20px]"
                viewBox="0 0 2368 1664"
              >
                <path
                  fill="currentColor"
                  d="M2368 192v1280q0 78-57 135t-135 57H192q-77 0-134.5-57T0 1472V192q0-77 57.5-134.5T192 0h1984q78 0 135 57.5t57 134.5zM1219 835q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64h-147q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T1691 363q-128 0-237 63t-172 172t-63 237zm-1019 1q0 128 63 237t172 172t237 63q152 0 269.5-78t167.5-212q26-64-18-64H944q-16 0-25.5 3.5t-13 6.5t-11.5 15.5t-14 19.5q-37 47-92 75t-118 28q-110 0-188-78t-78-188t78-188t188-78q63 0 118 28t92 75q5 7 11.5 16.5t9.5 13t9 8t13.5 5.5t20.5 1h147q44 0 18-64q-50-134-167.5-211.5T672 364q-128 0-237 63T263 599t-63 237z"
                />
              </svg>
              13
            </div>
            <div className="bg-[#B9E7FF] text-black font-bold rounded-[3px] px-[2px] flex items-center gap-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[20px] w-[20px]"
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
              13
            </div>
          </div>
        </div>
        <div className="w-full max-h-[58px] text-white text-justify overflow-hidden text-ellipsis line-clamp-2">
          From an early age, Haruka Sakura was made an outcast due to his
          unconventional appearance and lack of social skills. However, the
          rough treatment turned him into a proficient fighter, which is now the
          only thing he prides himself on. Starting at Furin High School, where
          it is rumored that strength is valued over academics, Sakura has only
          one goal—taking the top spot.
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="w-[148px] h-[41px] flex items-center justify-center bg-[#ffbade] text-black px-[5px] rounded-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[20px] w-[20px]"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5z"
              />
            </svg>
            Watch Now
          </div>
          <div className="flex items-center justify-center w-[95px] h-[41px] bg-[#3a3951] hover:bg-[#484765] px-[10px] text-white rounded-[30px]">
            Detail
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
          </div>
        </div>
      </div>
      <div className="imgwrapper !h-full">
        <img className="!h-full !object-cover" src="https://cdn.noitatnemucod.net/thumbnail/1366x768/100/599af186ad72e94caab6223b23fc22c6.jpg" />
      </div>
      {/* <div className="dot">.</div>
      <div className="tv">TV</div> */}
    </div>
  );
};
