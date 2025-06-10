import React from "react";
import { FiSearch } from "react-icons/fi";

function NewsHero() {
  return (
    <div className="bg-[#FFFFFF] px-4 py-16 md:px-[112px] md:py-[96px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[#444CE7] font-semibold text-[16px] mb-3">News</h1>
        <span className="text-[#181D27] font-semibold text-5xl text-center px-4 lg:px-[128px] mb-6">
          Stay informed with real stories from across Nigeria
        </span>
        <span className="px-4 lg:px-[256px] text-center">
          Read updates on public safety, community impact, platform features,
          and interviews with citizens and officers using Gateway Shield to make
          a difference
        </span>
        <div className="relative w-full max-w-sm mt-10">
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-2 py-2 border border-[#D5D7DA] rounded-md placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsHero;
