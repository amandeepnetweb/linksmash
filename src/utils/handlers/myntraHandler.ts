import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: https://www.myntra.com/.well-known/assetlinks.json lists
// com.myntra.android (handle_all_urls). The iOS AASA claims "*" except
// /checkout/payment/otp, /checkout/confirm, /shop/smartbuy.
export const myntraHandler: AppScheme = {
  name: "Myntra",
  domains: ["www.myntra.com"],
  patterns: [
    {
      // 👗 Product (/shirts/brand/name/12345678/buy), listings, brands, etc.
      regex: /^\/(?!checkout\/(?:payment\/otp|confirm)(?:\/|$)|shop\/smartbuy(?:\/|$)).+$/,
      iosScheme: httpsLink,
      androidScheme: androidIntent("com.myntra.android"),
    },
  ],
};
