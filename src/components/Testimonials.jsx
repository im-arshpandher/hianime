import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const SingleSlide = () => {
  return (
    <div>
      <div className="topbar">
        <div className="left">
          <img
            width={200}
            height={200}
            src="https://cdn.noitatnemucod.net/avatar/100x100/dragon_ball_chibi/beerus.png"
            alt=""
          />
        </div>
        <div className="right">
          <div className="upper">Luffy</div>
          <div className="lower">~3 minutes ago</div>
        </div>
      </div>
      <div className="midtxt">Made it at 03/11/2025 at 11:03 PM Finally</div>
      <div className="lowerlink">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M6 3v26h20V9.594l-.28-.313l-6-6l-.314-.28H6zm2 2h10v6h6v16H8V5zm12 1.438L22.563 9H20V6.437zM11 13v2h10v-2H11zm0 4v2h10v-2H11zm0 4v2h10v-2H11z"
            />
          </svg>
        </div>
        <div>One Piece</div>
      </div>
    </div>
  );
};
const SingleSlide2 = () => {
  return (
    <div>
      <div className="topbar">
        <div className="left">
          <img
            src="https://cdn.noitatnemucod.net/avatar/100x100/dragon_ball_chibi/beerus.png"
            alt=""
          />
        </div>
        <div className="right">
          <div className="upper">cdn</div>
          <div className="lower">~3 minutes ago</div>
        </div>
      </div>
      <div className="midtxt truncate">
        Made it at 03/11/2025 at 11:03 PM Finally
      </div>
      <div className="lowerlink">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M6 3v26h20V9.594l-.28-.313l-6-6l-.314-.28H6zm2 2h10v6h6v16H8V5zm12 1.438L22.563 9H20V6.437zM11 13v2h10v-2H11zm0 4v2h10v-2H11zm0 4v2h10v-2H11z"
            />
          </svg>
        </div>
        <div>cheecha wao</div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState(1);

  return (
    <div className={`showcomments ${active ? "active" : ""}`}>
      <div className="emptybox">
        <div className="leftimg">
          <img src="https://hianime.to/images/discussion.png" alt="" />
        </div>
        <div className="rightcontent">
          <div className="topbar">
            <div className="left">
              <div
                onClick={() => setTab(1)}
                className={`newcomments text-white ${tab == 1 ? "active" : ""}`}
              >
                Newest Comments
              </div>
              <div
                onClick={() => setTab(2)}
                className={`topcomments text-white ${tab == 2 ? "active" : ""}`}
              >
                Top Comments
              </div>
            </div>
            <div className="right text-white">
              Show Comments
              <div className="checkbox-wrapper-3">
                <input
                  type="checkbox"
                  id="cbx-3"
                  onClick={() => {
                    setActive(!active);
                  }}
                />
                <label htmlFor="cbx-3" className="toggle">
                  <span />
                </label>
              </div>
            </div>
          </div>
          <div className="showcomments-slider">
            {tab == 1 ? (
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                // breakpoints={{
                //   640: {
                //     slidesPerView: 2,
                //     spaceBetween: 20,
                //   },
                //   768: {
                //     slidesPerView: 4,
                //     spaceBetween: 40,
                //   },
                //   1024: {
                //     slidesPerView: 6,
                //     spaceBetween: 50,
                //   },
                // }}
                // navigation={true}
                // modules={[Navigation]}
                className="mySwiper2 !w-full p-4"
              >
                {[1, 2, 4, 5, 78, 8, 9].map((element, index) => {
                  return (
                    <SwiperSlide className="">
                      <SingleSlide />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <Swiper
                slidesPerView={6}
                spaceBetween={5}
                // breakpoints={{
                //   640: {
                //     slidesPerView: 2,
                //     spaceBetween: 20,
                //   },
                //   768: {
                //     slidesPerView: 4,
                //     spaceBetween: 40,
                //   },
                // 1024: {
                //   slidesPerView: 6,
                //   spaceBetween: 50,
                // },
                // }}
                // navigation={true}
                // modules={[Navigation]}
                className="mySwiper2 !w-full p-4"
              >
                {[1, 2, 4, 5, 78, 8, 9].map((element, index) => {
                  return (
                    <SwiperSlide className="">
                      <SingleSlide2 />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
