import { useEffect } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/ng/app/gateway-shield-app/id6755301579";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.thegatewayshield.app&pcampaignid=web_share";

function Download() {
  useEffect(() => {
    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
      window.location.replace(PLAY_STORE_URL);
    } else if (/iphone|ipad|ipod/i.test(ua)) {
      window.location.replace(APP_STORE_URL);
    }
    // Desktop users stay on the page and see both badges
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-6">
      <img src="/assets/Logomark.svg" alt="Gateway Shield" className="h-12" />

      <h1 className="text-2xl font-semibold text-[#181D27] text-center">
        Download Gateway Shield
      </h1>
      <p className="text-[#535862] text-center max-w-sm">
        Report incidents, get alerts, and keep your community safe — right from
        your phone.
      </p>

      <div className="flex flex-row items-center gap-4 mt-2">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <img
            src="/assets/app_store.png"
            alt="Download on the App Store"
            className="h-12 w-auto"
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
            className="h-12 w-auto"
          />
        </a>
      </div>
    </div>
  );
}

export default Download;