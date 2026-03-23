import React, { useMemo } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/ng/app/gateway-shield-app/id6755301579";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.thegatewayshield.app&pcampaignid=web_share";

function getAppStoreInfo() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return { href: PLAY_STORE_URL, src: "/assets/google_play.png", alt: "Get it on Google Play" };
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    return { href: APP_STORE_URL, src: "/assets/app_store.png", alt: "Download on the App Store" };
  }
  // Desktop / unknown — show both
  return null;
}

function Hero() {
  const store = useMemo(() => getAppStoreInfo(), []);

  return (
    <>
      {/* ── Hero Section ── */}
      <div className="w-full bg-white flex flex-col items-center pt-16 md:pt-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 2xl:px-64">
        <h1 className="mt-10 font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center leading-tight mb-4 md:mb-8 max-w-5xl">
          Report Incidents. Save Lives. Stay Informed
        </h1>

        <p className="max-w-2xl xl:max-w-3xl text-lg sm:text-xl text-center text-[#535862]">
          Gateway Shield is your secure line to the police. Report crimes, get
          alerts, and keep your community safe.
        </p>

        {/* CTA Buttons */}
        <div className="w-full flex flex-col-reverse sm:flex-row justify-center gap-3 mt-8 md:mt-12 max-w-xl xl:max-w-2xl">
          <button
            className="w-full sm:w-1/2 border border-[#D5D7DA] rounded-md px-4 py-2.5 text-[16px] text-[#414651] font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => {
              const section = document.getElementById("How-it-Works");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How It Works
          </button>

          <button className="w-full sm:w-1/2 border border-[#444CE7] bg-[#444CE7] hover:bg-[#3640d4] transition-colors rounded-md px-4 py-2.5 text-[16px] text-white font-semibold">
            Report Now
          </button>
        </div>

        {/* App Download Badge(s) */}
        <div className="flex flex-col items-center mt-6 mb-16 gap-3">
          <p className="text-sm text-[#535862] font-medium">
            Also available on mobile
          </p>
          <div className="flex flex-row items-center gap-3">
            {store ? (
              // Mobile: single relevant badge
              <a
                href={store.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img src={store.src} alt={store.alt} className="h-10 w-auto" />
              </a>
            ) : (
              // Desktop: show both
              <>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <img
                    src="/assets/app_store.png"
                    alt="Download on the App Store"
                    className="h-10 w-auto"
                  />
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <img
                    src="/assets/google_play.png"
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                  />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Hero Images */}
        <img
          src="/assets/Content.png"
          alt="Platform preview"
          className="hidden md:block w-full max-w-6xl object-contain"
        />
        <img
          src="/assets/Container (2).png"
          alt="Platform preview"
          className="block md:hidden w-full object-contain"
        />
      </div>

      {/* ── Stats Section ── */}
      <div className="w-full bg-[#FAFAFA] flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-24 px-4 sm:px-8 md:px-16 lg:px-28 xl:px-40 2xl:px-64 py-16 lg:py-24">
        {[
          {
            stat: "2,000+",
            label: "Reports Submitted",
            desc: "Real incidents logged by citizens across the platform",
          },
          {
            stat: "1,000+",
            label: "Villages/Towns/Cities Protected",
            desc: "Keeping communities safer with real-time alerts and police collaboration",
          },
          {
            stat: "4,000+",
            label: "Users Registered",
            desc: "Available on web, iOS and Android — trusted in every part of Ogun State",
          },
        ].map(({ stat, label, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center w-full md:w-1/3 max-w-sm text-center gap-2"
          >
            <span className="text-5xl lg:text-6xl xl:text-7xl text-[#444CE7] font-semibold">
              {stat}
            </span>
            <p className="font-medium text-lg text-[#181D27]">{label}</p>
            <span className="font-normal text-base text-[#535862]">{desc}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hero;