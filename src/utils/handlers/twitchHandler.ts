import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on twitch.tv / www.twitch.tv lists
// tv.twitch.android.app (handle_all_urls). The iOS AASA claims, among others,
// /<channel>, /<channel>/{videos,clip,clips,about,schedule,chat}, /videos/<id>,
// /directory/game/<name>, /directory/category/<name>, /search.
const android = androidIntent("tv.twitch.android.app");

// Top-level paths the iOS AASA explicitly excludes (or that are not channels).
const RESERVED =
  "about|activate|auth|authorize|bits|blog|broadcast|broadcasts|claim|contact|directory|downloads|event|events|ext|friends|help|inbox|jobs|legal|login|messages|music|oauth|partner|prime|privacy|products|redeem|search|settings|store|stream|streams|subscriptions|support|team|turbo|upload|user|video|videos|watch";

export const twitchHandler: AppScheme = {
  name: "Twitch",
  domains: ["twitch.tv", "www.twitch.tv"],
  patterns: [
    {
      // 🎬 VOD (/videos/ID)
      regex: /^\/videos\/(\d+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // ✂️ Clip (/channel/clip/SLUG)
      regex: /^\/([^/]+)\/clip\/([^/]+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🎮 Category / game (/directory/category/NAME, /directory/game/NAME)
      regex: /^\/directory\/(?:category|game)\/([^/]+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 📺 Channel sub-pages (/channel/videos, /clips, /about, /schedule)
      regex: /^\/([^/]+)\/(?:videos|clips|about|schedule)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 👤 Channel / live stream (/channel)
      regex: new RegExp(`^\\/(?!(?:${RESERVED})(?:\\/|$))([A-Za-z0-9_]{1,25})\\/?$`, "i"),
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};
