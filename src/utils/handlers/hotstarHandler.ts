import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: https://www.hotstar.com/.well-known/assetlinks.json lists
// in.startv.hotstar (handle_all_urls). The iOS AASA claims "*" except
// /account/delete and /capture/*. (jiohotstar.com 301-redirects to hotstar.com.)
export const hotstarHandler: AppScheme = {
  name: "Hotstar",
  domains: ["www.hotstar.com"],
  patterns: [
    {
      // 📺 Shows, movies, sports, channels (/in/shows/…/ID, /in/movies/…/ID)
      regex: /^\/(?!account\/delete(?:\/|$)|capture\/).+$/,
      iosScheme: httpsLink,
      androidScheme: androidIntent("in.startv.hotstar"),
    },
  ],
};
