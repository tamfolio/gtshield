import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

function Hero() {
  return (
    <>
      <div className="px-4 md:!px-[10px] lg:!px-[208px]  bg-white flex flex-col items-center justify- pt-16 md:pt-[96px]">
        <h1 className="font-semibold !mt-10 text-4xl lg:text-6xl text-center leading-[44px] lg:leading-[72px] mb-4 md:mb-8 px-4 md:px-[96px]">
          Report Incidents. Save Lives. Stay Informed
        </h1>
        <p className="px-4 md:!px-[128px] text-[20px] text-center text-[#535862]">
          Gateway Shield is your secure line to the police. Report crimes, get
          alerts, and keep your community safe.
        </p>
        <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-3 mt-8 md:mt-12 px-4 mb-16">
          <div className="w-full md:w-1/3 lg:w-1/4 border-solid border-[1px] border-[#D5D7DA] rounded-md px-4 py-2 flex items-center justify-center gap-2">
            <p
              className="text-[16px] text-[#414651] font-semibold cursor-pointer"
              onClick={() => {
                const section = document.getElementById("How-it-Works");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
               How It Works
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 text-white border-solid border-[1px] border-[#444CE7] bg-[#444CE7] rounded-md px-4 py-2 flex items-center justify-center">
            <p className="text-[16px] text-white font-semibold">Report Now</p>
          </div>
        </div>
        <img src="/assets/Container.png" alt="" className="hidden md:block" />
        <img
          src="/assets/Container (2).png"
          alt=""
          className="block md:hidden"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center bg-[#FAFAFA] px-4 lg:px-[112px] py-16 lg:py-[96px] gap-8 lg:gap-20">
        <div className="flex flex-col items-center w-full lg:w-[384px] text-center gap-3">
          <h1 className="text-[48px] lg:text-6xl text-[#444CE7] font-semibold">
            1,000+
          </h1>
          <p className="font-medium text-[18px] text-[#181D27]">
            Reports Submitted
          </p>
          <span className="font-normal text-[16px] text-[#535862]">
            Real incidents logged by citizens across the platform
          </span>
        </div>
        <div className="flex flex-col items-center w-full lg:w-[384px] text-center gap-3">
          <h1 className="text-[48px] lg:text-6xl text-[#444CE7] font-semibold">
            10k
          </h1>
          <p className="font-medium text-[18px] text-[#181D27]">
            Citizens Registered
          </p>
          <span className="font-normal text-[16px] text-[#535862]">
            Available on web, iOS and Android - trusted in every part of Ogun
            State
          </span>
        </div>
        <div className="flex flex-col items-center  w-full lg:w-[384px] text-center gap-3">
          <h1 className="text-[48px] lg:text-6xl text-[#444CE7] font-semibold">
            60+
          </h1>
          <p className="font-medium text-[18px] text-[#181D27]">
            Cities Protected
          </p>
          <span className="font-normal text-[16px] text-[#535862]">
            Keeping communities safer with real-time alerts and police
            collaboration
          </span>
        </div>
      </div>
    </>
  );
}

export default Hero;
