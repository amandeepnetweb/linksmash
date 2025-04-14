import { AppScheme } from "@/types/link-handlers";

export const instagramHandler: AppScheme = {
  name: "Instagram",
  domains: ["www.instagram.com", "instagram.com"],
  patterns: [
    {
      // 👤 Profile (@username)
      regex: /^\/@?([^/]+)\/?$/,
      iosScheme: (match: RegExpMatchArray) =>
        `instagram://user?username=${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 🎯 Post
      regex: /^\/p\/([^/]+)\/?$/,
      iosScheme: (match: RegExpMatchArray) =>
        `https://www.instagram.com/p/${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/p/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 🎞️ Reels
      regex: /^\/reel\/([^/]+)\/?$/,
      iosScheme: (match: RegExpMatchArray) =>
        `https://www.instagram.com/reel/${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/reel/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 🔊 Reels Audio Page
      regex: /^\/reels\/audio\/([^/]+)\/?$/,
      iosScheme: (match) => `https://www.instagram.com/reels/audio/${match[1]}`,
      androidScheme: (match) =>
        `intent://instagram.com/reels/audio/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 📖 Story (only works if username has an active story)
      regex: /^\/stories\/([^/]+)\/(\d+)\/?$/,
      iosScheme: (match: RegExpMatchArray) =>
        `https://www.instagram.com/stories/${match[1]}/${match[2]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/stories/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
  ],
};
