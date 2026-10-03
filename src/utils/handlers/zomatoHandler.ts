import { AppScheme } from "@/types/link-handlers";

// Verified against https://www.zomato.com/.well-known/assetlinks.json
// (package com.application.zomato, handle_all_urls) and
// https://www.zomato.com/.well-known/apple-app-site-association, which claims
// every path EXCEPT: /hygiene/*, /clients/*, /payments_service/*, /*/order/*,
// /blog/*, /tldr/*, /partner_with_us/*, /partners/invite/*, /stories/*, /gift/*.
// The negative lookahead below mirrors that exclusion list.
const PACKAGE = "com.application.zomato";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${PACKAGE};scheme=https;end`;

export const zomatoHandler: AppScheme = {
  name: "Zomato",
  domains: ["zomato.com", "www.zomato.com"],
  patterns: [
    {
      // 🍽️ City, restaurant, menu, reviews, user profiles, etc.
      regex:
        /^(?!\/(?:hygiene|clients|payments_service|blog|tldr|partner_with_us|stories|gift)(?:\/|$))(?!\/partners\/invite\/)(?!.*\/order\/)\/([^/]+)(?:\/.*)?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
