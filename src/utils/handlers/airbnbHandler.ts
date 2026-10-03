import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on airbnb.com, www.airbnb.com, airbnb.co.in and
// www.airbnb.co.in lists com.airbnb.android (handle_all_urls). The iOS AASA
// (com.airbnb.app) claims /rooms/*, /experiences/*, /s/*/homes, /wishlists/*,
// /users/show/*, /l/????????, /slink/* and more.
const android = androidIntent("com.airbnb.android");

export const airbnbHandler: AppScheme = {
  name: "Airbnb",
  domains: [
    "www.airbnb.com",
    "airbnb.com",
    "www.airbnb.co.in",
    "airbnb.co.in",
  ],
  patterns: [
    {
      // 🏠 Listing (/rooms/ID)
      regex: /^\/rooms\/(\d+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🎟️ Experience (/experiences/ID)
      regex: /^\/experiences\/(\d+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🔍 Search (/s/Place/homes, /s/Place/experiences, /s/Place/services)
      regex: /^\/s\/([^/]+)\/(?:homes|experiences|services|all)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // ❤️ Wishlist (/wishlists/ID)
      regex: /^\/wishlists\/(\d+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 👤 Profile (/users/show/ID)
      regex: /^\/users\/show\/(\d+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
    {
      // 🔗 Short links (/l/XXXXXXXX, /slink/…)
      regex: /^\/(?:l\/[A-Za-z0-9]{8}|slink\/.+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};
