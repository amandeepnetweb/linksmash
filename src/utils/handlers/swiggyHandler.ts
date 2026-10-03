import { AppScheme } from "@/types/link-handlers";

// Verified against https://www.swiggy.com/.well-known/assetlinks.json
// (package in.swiggy.android) and
// https://www.swiggy.com/.well-known/apple-app-site-association, where the
// main Swiggy iOS app claims these path prefixes: /restaurants/*, /menu/*,
// /stores/*, /instamart/*, /city/*, /cityguides/*, /collections/*, /dineout/*,
// /track-order/*, /direct/brand/*, /handpicked/*, /eatlist/*.
const PACKAGE = "in.swiggy.android";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${PACKAGE};scheme=https;end`;

export const swiggyHandler: AppScheme = {
  name: "Swiggy",
  domains: ["swiggy.com", "www.swiggy.com"],
  patterns: [
    {
      // 🍔 Restaurant (/restaurants/name-city-restID) and menu (/menu/...)
      regex: /^\/(?:restaurants|menu)\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🛒 Instamart (/instamart/..., /stores/instamart/...)
      regex: /^\/(?:stores\/)?instamart(?:\/.*)?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🏙️ Stores, city pages, collections, dineout, order tracking, etc.
      regex:
        /^\/(?:stores|city|cityguides|collections|dineout|track-order|direct\/brand|handpicked|eatlist)\/.+$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
