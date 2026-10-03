import { AppScheme } from "@/types/link-handlers";

// Verified against https://www.threads.com/.well-known/assetlinks.json
// (package com.instagram.barcelona) and /.well-known/apple-app-site-association
// (applinks claim "/*" for the Threads iOS app, com.burbn.barcelona).
const PACKAGE = "com.instagram.barcelona";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${PACKAGE};scheme=https;end`;

export const threadsHandler: AppScheme = {
  name: "Threads",
  domains: ["threads.com", "www.threads.com", "threads.net", "www.threads.net"],
  patterns: [
    {
      // 🧵 Post (/@username/post/POST_ID)
      regex: /^\/@([^/]+)\/post\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🔗 Short post link (/t/POST_ID)
      regex: /^\/t\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 👤 Profile (/@username)
      regex: /^\/@([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
