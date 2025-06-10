import React from "react";

function GetApp() {
  return (
    <div className="px-4 py-16 lg:px-[112px] flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-[#181D27] text-[30px] lg:text-5xl font-semibold lg:max-w-[576px] mb-8 tracking-[-2%]">Growth performance Letter spacing made easy</h1>
        <p className="text-[#717680] text-[20px] mb-10">Start your 30-day free trial today.</p>
        <div className="flex items-center gap-4">
            <img src="/assets/app_store.png" alt="" />
            <img src="/assets/google_play.png" alt="" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img src="/assets/get_app.png" alt="" className="hidden md:block"/>
        <img src="/assets/get_app_mobile.png" alt="" className="block md:hidden mt-16   " />
      </div>
    </div>
  );
}

export default GetApp;
