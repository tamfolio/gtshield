import React from "react";

function Join() {
  return (
    <div className="px-4 md:px-[112px] py-[36px] md:py-[96px] bg-[#FAFAFA] w-full flex flex-col items-center justify-center">
      <h1 className="font-semibold text-center text-4xl text-[#181D27] mb-5">Join Gateway Shield. Be Heard. Be Protected.</h1>
      <span className="text-[#535862] text-[20px] mb-10">Create an account to get started</span>
      <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center justify-center md:flex-row gap-3">
        <a  href="/sign-up" className="w-full flex items-center justify-center border-solid border-[1px] border-[#D5D7DA] rounded-md px-4 py-2">
          Sign Up
        </a>
        <a  href="/login" className="w-full flex items-center justify-center text-white border-solid border-[1px] border-[#444CE7] bg-[#444CE7] rounded-md px-4 py-2">
          Login
        </a>
      </div>
    </div>
  );
}

export default Join;
