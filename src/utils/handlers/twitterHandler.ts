import { AppScheme } from "@/types/link-handlers";

export const twitterHandler: AppScheme = {
  name: "Twitter",
  domains: ["twitter.com", "www.twitter.com", "x.com", "www.x.com"],
  patterns: [
    {
      // 🎯 Tweet detail: /username/status/1234567890
      regex: /^\/[^/]+\/status\/(\d+)/,
      iosScheme: (match) => `twitter://status?id=${match[1]}`,
      androidScheme: (match) =>
        `intent://status?id=${match[1]}#Intent;package=com.twitter.android;scheme=twitter;end`,
    },
    {
      // 🎯 Profile: /@username or /username
      regex: /^\/@?([^/]+)$/,
      iosScheme: (match) => `twitter://user?screen_name=${match[1]}`,
      androidScheme: (match) =>
        `intent://user?screen_name=${match[1]}#Intent;package=com.twitter.android;scheme=twitter;end`,
    },
    {
      // 🎯 Community: /i/communities/<community_id>
      regex: /^\/i\/communities\/(\d+)/,
      iosScheme: (match) => `https://x.com/i/communities/${match[1]}`,
      androidScheme: (match) => `https://x.com/i/communities/${match[1]}`,
    },
  ],
};
