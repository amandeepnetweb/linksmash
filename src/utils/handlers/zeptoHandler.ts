import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on www.zepto.com and www.zeptonow.com lists
// com.zeptoconsumerapp (handle_all_urls). The iOS AASA (www.zepto.com) claims
// "*" except /investor-relations/*, /bestsellers, /delivery-in-*, /ProcessOrder,
// /buy-*, /lite, /category/*, /brand/*.
export const zeptoHandler: AppScheme = {
  name: "Zepto",
  domains: ["www.zepto.com", "www.zeptonow.com"],
  patterns: [
    {
      // 🛒 Product (/pn/product-name/pvid/UUID), stores, search, etc.
      regex:
        /^\/(?!(?:investor-relations|bestsellers|ProcessOrder|lite)(?:\/|$)|delivery-in-|buy-|category\/|brand\/).+$/,
      iosScheme: httpsLink,
      androidScheme: androidIntent("com.zeptoconsumerapp"),
    },
  ],
};
