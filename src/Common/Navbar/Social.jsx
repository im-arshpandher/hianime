import React from "react";

const Social = () => {
  return (
    <div className="w-[148px] h-[40px] flex flex-row justify-center items-center gap-1">
      <div class="socialpic w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer">
        <a href="">
          <img
            className="w-[32px] h-[32px] overflow-hidden"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgeekflare.com%2Fwp-content%2Fuploads%2F2022%2F06%2FUntitled-design-4-1-1500x1125.png&f=1&nofb=1&ipt=9bb40106a09b77c96228cf04f9f2df8184562b31cbbd88d51bd0ba020ded6a01&ipo=images"
            alt=""
          />
        </a>
      </div>
      <div class="socialpic w-[32px] h-[32px] rounded-full cursor-pointer overflow-hidden flex items-center justify-center">
        <a href="">
          <img
            className="w-[32px] h-[32px] object-center"
            src="https://static.vecteezy.com/system/resources/previews/008/385/701/large_2x/reddit-social-media-logo-design-icon-symbol-illustration-free-vector.jpg"
            alt=""
          />
        </a>
      </div>
      <div class="socialpic w-[32px] h-[32px] rounded-full cursor-pointer overflow-hidden flex items-center justify-center ">
        <a href="">
          <img
            className="w-[32px] h-[32px]"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2023%2F08%2FX-Logo.jpg&f=1&nofb=1&ipt=454b6b641959971e31e1df89a4679206eaeb9b2eae7c35f812d1439b32fb0e98&ipo=images"
            alt=""
          />
        </a>
      </div>
      <div class="socialpic w-[32px] h-[32px] rounded-full  cursor-pointer overflow-hidden flex items-center justify-center">
        <a href="">
          <img
            className="w-[36px] h-[32px]"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechcrunch.com%2Fwp-content%2Fuploads%2F2016%2F12%2Ffb-math.png&f=1&nofb=1&ipt=09fa9ab531b9aa18cc16a2c3e3747869f0bc4888dccaeb614434654b031fc452&ipo=images"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default Social;
