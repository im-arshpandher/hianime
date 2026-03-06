import React from "react";

const Btns = () => {
  return (
    <div className="w-[389.84px] h-[70px] flex flex-row items-center justify-center text-sm">
      <div class="w-[92.71px] h-[40px] flex flex-col items-center justify-center mr-[20px] cursor-pointer">
        <img className="w-[20px] h-[20px] " src="https://hianime.to/images/live.svg" alt="" />
        <div className="hover:text-[#ffbade] text-white">Watch2gether</div>
      </div>
      <div class=" w-[55.51px] h-[40px] flex flex-col items-center justify-center mr-[20px] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 768 668"
          >
            <path
              fill="#ffbade"
              d="M0 497v64c0 9 7 16 16 16h92c54 0 99-25 136-63c38-38 69-89 100-138c25-40 50-78 76-107c25-30 50-48 80-48h85v73c0 23 16 27 35 12l139-116c12-10 12-29 0-39L620 36c-19-16-35-12-35 12v77h-85c-55 0-98 24-136 63c-37 38-71 89-101 137c-26 41-50 80-76 109c-25 29-50 47-79 47H16c-9 0-16 7-16 16zm0-357v64c0 9 7 16 16 16h92c45 0 81 44 120 101c1-3 2-5 3-7c1-1 4-3 5-5c15-25 32-49 48-75c-24-31-47-59-77-78c-29-20-61-31-99-31H16c-11 0-16 5-16 15zm585 339h-85c-44 0-82-43-120-99c-2 3-3 5-4 7c-2 2-3 4-5 7c-7 12-16 25-23 37c-8 11-16 24-23 35c23 31 47 58 76 77c28 20 61 33 99 33h85v70c0 23 16 28 35 12l139-117c12-10 12-28 0-38L620 388c-19-15-35-12-35 12v79z"
            />
          </svg>
        
        <div className="hover:text-[#ffbade] text-white">Random</div>
      </div>
      <div class="w-[84.59px] h-[40px] flex flex-col items-center justify-center mr-[20px] cursor-pointer">
        <div class="btnimg flex flex-row justify-center">
          <div className="jp w-[26px] h-[18px] !text-black bg-plum-600 flex justify-center items-center bg-[#ffbade] rounded-l-sm">EN</div>
          <div className="jp w-[26px] h-[18px] bg-black text-white flex justify-center items-center rounded-r-sm">JP</div>
        </div>
        <div className="hover:text-[#ffbade] text-white">Anime Name</div>
      </div>
      <div class="w-[77.03px] h-[40px] flex flex-col items-center justify-center mr-[20px] cursor-pointer">
        <div class="btnimg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="#ffbade"
              d="M14 14.2c0-.6 2-1.8 2-3.1c0-1.5-1.4-2.7-3.1-3.2c.7-.8 1.1-1.7 1.1-2.8C14 2.3 11.1 0 7.4 0C3.9 0 0 2.1 0 5.1c0 2.1 1.6 3.6 2.3 4.2c-.1 1.2-.6 1.7-.6 1.7L.5 12H2c1.6 0 2.9-.5 3.7-1.1v.2c0 2 2.2 3.6 5 3.6h.6c.4.5 1.7 1.4 3.4 1.4c.1-.1-.7-.5-.7-1.9zM7.4 1C10.5 1 13 2.9 13 5.1s-2.6 4.1-5.8 4.1H6.1l-.1.2c-.3.4-1.5 1.2-3.1 1.5c.1-.4.1-1 .1-1.8v-.3C2 8 .9 6.6.9 5.2C.9 3 4.1 1 7.4 1z"
            />
          </svg>
        </div>
        <div className="hover:text-[#ffbade] text-white">Community</div>
      </div>
    </div>
  );
};

export default Btns;
