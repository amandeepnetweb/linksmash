import { AppScheme } from "@/types/link-handlers";

// Verified against each store's /.well-known/assetlinks.json and
// /.well-known/apple-app-site-association:
//  - amazon.in  -> in.amazon.mShop.android.shopping
//  - amazon.com -> com.amazon.mShop.android.shopping
// The iOS AASA lists these path shapes for the shopping app:
//  /dp/ASIN, /*/dp/ASIN, /gp/product/ASIN, /gp/aw/d/ASIN, /s, /gp/aw/s, /stores/*
const packageFor = (url: URL) =>
  url.hostname.endsWith("amazon.in")
    ? "in.amazon.mShop.android.shopping"
    : "com.amazon.mShop.android.shopping";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${packageFor(
    url
  )};scheme=https;end`;

export const amazonHandler: AppScheme = {
  name: "Amazon",
  domains: ["amazon.in", "www.amazon.in", "amazon.com", "www.amazon.com"],
  patterns: [
    {
      // 🛍️ Product (/dp/ASIN, /Product-Name/dp/ASIN, /gp/product/ASIN, /gp/aw/d/ASIN)
      regex:
        /^(?:\/-\/[^/]+)?(?:\/[^/]+)?\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})(?:\/.*)?$/i,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🔍 Search (/s?k=query, /gp/aw/s?k=query)
      regex: /^\/(?:gp\/aw\/)?s\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🏬 Brand store (/stores/...)
      regex: /^\/stores\/.+$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
