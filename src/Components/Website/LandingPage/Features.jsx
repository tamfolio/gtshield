import React from "react";

function Features() {
  return (
    <div className="px-4 lg:px-[112px] bg-white py-8 lg:py-14 w-full">
      <div className="w-full lg:max-w-[768px]">
        <h1 className="text-[#3538CD] text-[14px] lg:text-[16px] font-semibold mb-3">
          Features
        </h1>
        <span className="text-[30px] lg:!text-[36px] text-[#181D27] font-bold tracking-0 leading-[38px]">
          More than reporting. It's accountability, action, and awareness
        </span>
      </div>
      <div className="flex flex-col md:flex-row mt-16 items-center justify-center gap-12 md:gap-0">
        <div className="w-full md:w-1/2  flex flex-col">
          <div className="border-l-4 border-[#444CE7] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              SOS Button for Immediate Emergencies
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              Crime Maps & Hotspot Alerts
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              Track Your Report and Get Status Updates
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              Submit Feedback on Police Performance
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              Community Hub with Safety Tips and Polls
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              Anonymous Reporting Options
            </span>
          </div>
          <div className="border-l-4 border-[#F5F5F5] pl-4 h-[60px] flex items-center justify-start">
            <span className="text-[18px] font-semibold ml-3">
              SLA-driven Case Escalation System
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/assets/features.png" alt="" className="hidden md:block" />
          <img src="/assets/features-mobile.png" alt="" className="block md:hidden" />
        </div>
      </div>
    </div>
  );
}

export default Features;
