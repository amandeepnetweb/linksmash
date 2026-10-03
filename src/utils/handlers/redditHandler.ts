import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on www.reddit.com, reddit.com, old.reddit.com and
// redd.it lists com.reddit.frontpage (handle_all_urls). The iOS AASA claims
// /r/*, /u/*, /user/*, /comments/*, /search/* and, for redd.it, every path.
const android = androidIntent("com.reddit.frontpage");

export const redditHandler: AppScheme = {
  name: "Reddit",
  domains: ["www.reddit.com", "reddit.com", "old.reddit.com"],
  patterns: [
    {
      // 📝 Subreddit, post (/r/sub/comments/ID/…) and share links (/r/sub/s/ID)
      regex: /^\/r\/([^/]+)(?:\/.*)?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 👤 User (/u/name, /user/name)
      regex: /^\/(?:u|user)\/([^/]+)(?:\/.*)?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🔗 Post by id (/comments/ID)
      regex: /^\/comments\/([^/]+)(?:\/.*)?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};

// redd.it short links (redd.it/POST_ID)
export const redditShortHandler: AppScheme = {
  name: "Reddit",
  domains: ["redd.it"],
  patterns: [
    {
      regex: /^\/([a-z0-9]+)\/?$/i,
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};
