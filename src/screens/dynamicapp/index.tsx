import { useEffect } from "react";

const ANDROID_PACKAGE = "com.moringa.plem";
const IOS_APP_STORE_LINK = "https://apps.apple.com/app/id6739004329"; // Replace with your real App Store URL
const FALLBACK_PLAY_STORE = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

export default function DynamicAppRedirect() {
  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor;

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    const fallbackUrl = isAndroid ? FALLBACK_PLAY_STORE : IOS_APP_STORE_LINK;

    const timer = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000); // fallback after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30vh" }}>
      <h2>Opening the app...</h2>
      <p>If nothing happens, you’ll be redirected to the {`App Store`}</p>
    </div>
  );
}
