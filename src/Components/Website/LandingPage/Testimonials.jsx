import React from "react";

function Testimonials() {
  return (
    <div className="px-4 lg:px-[112px] bg-white py-[96px]">
      <div className="w-full text-center flex flex-col items-center justify-center px-4 md:px-0">
        <h1 className="text-[#3538CD] font-semibold text-[16px] mb-3">
          Testimonials
        </h1>
        <p className="text-4xl font-semibold text-=[#181D27] mb-5">
          Don't just take our word for it
        </p>
        <span className="text-lg text-[#535862] font-normal block">
          Hear first hand from our incredible community of users
        </span>
      </div>
      <div className="relative">
        <div className="mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="w-full border border-[#E9EAEB] rounded-[12px] p-6 sm:p-8"
              >
                <p className="text-[#535862] text-[16px] mb-8 sm:mb-12">
                  Untitled has been a lifesaver for our team—everything we need
                  is right at our fingertips, and it helps us jump right into
                  new design projects.
                </p>
                <div className="flex items-center gap-3">
                  <img src="/assets/Avatar.png" alt="" />
                  <div>
                    <div className="flex gap-1 items-center">
                      <span className="font-semibold text-[16px]">
                        Nikolas Gibbons
                      </span>
                      <img
                        src="/assets/Verified tick.png"
                        alt=""
                        className="w-4 h-4"
                      />
                    </div>
                    <p className="text-[#535862] text-[16px]">
                      City They come from
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}

export default Testimonials;
