import React from "react";
import { FaDiscord, FaRedditAlien, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="w-[148px] h-[40px] flex flex-row justify-center items-center gap-2">
      <a
        href="#"
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#5865F2] text-white hover:opacity-80 transition-opacity"
      >
        <FaDiscord size={18} />
      </a>
      <a
        href="#"
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#FF4500] text-white hover:opacity-80 transition-opacity"
      >
        <FaRedditAlien size={18} />
      </a>
      <a
        href="#"
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-black text-white hover:opacity-80 transition-opacity"
      >
        <FaXTwitter size={16} />
      </a>
      <a
        href="#"
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#0088cc] text-white hover:opacity-80 transition-opacity"
      >
        <FaTelegramPlane size={18} />
      </a>
    </div>
  );
};

export default Social;

