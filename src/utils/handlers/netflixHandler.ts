import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on netflix.com / www.netflix.com lists
// com.netflix.mediaclient (handle_all_urls). The iOS AASA (www.netflix.com)
// claims "/?*" with login/signup/account/settings/tv… excluded, so title,
// watch, browse and search pages are handled by the app. Optional locale
// prefix (e.g. /in/title/…) is accepted.
const android = androidIntent("com.netflix.mediaclient");
const LOCALE = "(?:\\/[a-z]{2}(?:-[a-z]{2})?)?";

export const netflixHandler: AppScheme = {
  name: "Netflix",
  domains: ["www.netflix.com", "netflix.com"],
  patterns: [
    {
      // 🎬 Title page (/title/80057281)
      regex: new RegExp(`^${LOCALE}\\/title\\/(\\d+)\\/?$`, "i"),
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // ▶️ Watch (/watch/80057281)
      regex: new RegExp(`^${LOCALE}\\/watch\\/(\\d+)\\/?$`, "i"),
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🔍 Browse / search (/browse, /browse/genre/ID, /search?q=…)
      regex: new RegExp(`^${LOCALE}\\/(?:browse|search)(?:\\/.*)?$`, "i"),
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};
