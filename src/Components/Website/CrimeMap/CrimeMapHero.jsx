import React from "react";

function CrimeMapHero() {
  return (
    <>
      <div className="bg-[#FFFFFF] px-4 py-16 md:px-[112px] md:py-[96px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#444CE7] font-semibold text-[16px] mb-3">
            Crime Heat Map
          </h1>
          <span className="text-[#181D27] font-semibold text-5xl text-center px-4 lg:px-[128px] mb-6">
            How Hot is Your Area?
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-[#3538CD] text-white py-[20px] px-4">
        <p><span className="underline">Log in</span> to see detailed reports, filters, and incident history</p>
      </div>
    </>
  );
}

export default CrimeMapHero;
