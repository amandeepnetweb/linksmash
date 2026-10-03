import { AppScheme } from "@/types/link-handlers";

// Verified against https://www.flipkart.com/.well-known/assetlinks.json and
// https://dl.flipkart.com/.well-known/assetlinks.json (package com.flipkart.android,
// handle_all_urls), and the iOS AASA which claims paths ["*"] for both
// flipkart.com and dl.flipkart.com. dl.flipkart.com/dl/... is Flipkart's
// documented app-deep-link host (https://affiliate.flipkart.com/tools/mobile-tracking-info).
const PACKAGE = "com.flipkart.android";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${PACKAGE};scheme=https;end`;

export const flipkartHandler: AppScheme = {
  name: "Flipkart",
  domains: [
    "flipkart.com",
    "www.flipkart.com",
    "dl.flipkart.com",
  ],
  patterns: [
    {
      // 🛍️ Product (/product-name/p/itmXXXX, optionally prefixed with /dl)
      regex: /^(?:\/dl)?\/[^/]+\/p\/(itm[a-z0-9]+)\/?$/i,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🔍 Search (/search?q=query)
      regex: /^(?:\/dl)?\/search\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🗂️ Category / listing / any other page (app claims all paths)
      regex: /^(?:\/dl)?\/[^/]+(?:\/.*)?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
