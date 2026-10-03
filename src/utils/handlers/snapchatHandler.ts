import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on snapchat.com / www.snapchat.com lists
// com.snapchat.android (handle_all_urls). The iOS AASA claims "/*" except
// /scan/*, /referral/*, /w/*.
export const snapchatHandler: AppScheme = {
  name: "Snapchat",
  domains: ["snapchat.com", "www.snapchat.com"],
  patterns: [
    {
      // 👻 Add friend (/add/username), Spotlight, Discover, Lens, story links, etc.
      regex: /^\/(?!(?:scan|referral|w)(?:\/|$)).+$/,
      iosScheme: httpsLink,
      androidScheme: androidIntent("com.snapchat.android"),
    },
  ],
};
