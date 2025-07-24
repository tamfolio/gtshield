import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="px-4 py-4 md:py-[96px] md:px-[112px] bg-[#FFFFFF]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-5">
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src="/assets/Logomark.svg" alt="" />
            <h3 className="font-bold text-xl">Gateway Shield</h3>
          </div>
          <div className="w-[320px] text-[#535862]">
            <p className="mb-3">
              Nigeria Police Force, State Headquarters, Elerewan, Abeokuta.
            </p>
            <p className="mb-3">+2348000009111</p>
            <p>support@gatewayshield.com</p>
          </div>
          <div className="mt-8 flex gap-4 md:gap-8 items-center justify-start font-semibold text-[16px] text-[#535862]">
            <span>Home</span>
            <span>About</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
        <div>
          <h1 className="text-[#3538CD] font-semibold">Get the app</h1>
          <div className="flex flex-row md:flex-col gap-4">
            <img src="/assets/app_store.png" alt="" className="my-4" />
            <img src="/assets/google_play.png" alt="" className="my-4" />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E9EAEB] mt-16 mb-8"></div>
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between gap-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Gateway Shield. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a href="https://x.com/gatewayshield" target="blank">
            <img src="/assets/Social icon.png" alt="" />
          </a>
          {/* <a href="">
            <img src="/assets/Social icon (1).png" alt="" />
          </a> */}
          <a href="https://www.facebook.com/profile.php?id=61578132210959/" target="blank">
            <img src="/assets/Social icon (2).png" alt="" />
          </a>
          <a href="https://www.instagram.com/gatewayshield" target="blank">
            <img src="/assets/Social icon (3).png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
