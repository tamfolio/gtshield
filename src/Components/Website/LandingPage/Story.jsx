import React from "react";

function Story() {
  return (
    <div className="px-4 lg:px-[112px] bg-white py-8 lg:py-14 w-full" id="about-section">
      <div className="w-full lg:max-w-[768px]">
        <h1 className="text-[#3538CD] text-[14px] lg:text-[16px] font-semibold mb-3">Our Story</h1>
        <span className="text-[30px] lg:!text-[36px] text-[#181D27] font-bold tracking-0 leading-[38px]">
          Built by people who care about safety, justice, and trust.
        </span>
      </div>
      <div className="flex flex-col lg:flex-row mt-8 lg:mt-16 items-start justify-center gap-8 lg:gap-16 w-full">
        <div className="flex flex-col w-full md:w-1/2 gap-5">
          <p className="leading-[28px] font-normal text-[18px] text-[#535862]">
            Gateway Shield is the official community safety and intelligence
            platform of the Ogun State Police Command. Developed to enhance
            public safety across the state, the platform allows residents to
            report incidents, track safety trends, and support law enforcement
            efforts through real-time digital engagement.
          </p>
          <p className="leading-[28px] font-normal text-[18px] text-[#535862]">
            As part of the Command's broader push for modern policing, Gateway
            Shield strengthens coordination between citizens and security
            operatives, ensuring faster response time and better resource
            deployment. From traffic violations and emergencies to violent
            crimes and grievous harm, every report contributes to a safer, more
            informed Ogun State.
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-5">
          <p className="leading-[28px] font-normal text-[18px] text-[#535862]">
            By leveraging data, technology, and public participation, Gateway
            Shield represents a new chapter in community policing, one where
            trust, transparency, and accountability take centre stage
          </p>
          <p className="leading-[28px] font-normal text-[18px] text-[#535862]">
            This is Ogun State's commitment to proactive, people-centered
            security, powered by the police, for the people.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Story;
