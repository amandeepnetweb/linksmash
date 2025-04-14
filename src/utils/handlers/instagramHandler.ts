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
        `instagram://instagram.com/p/${match[1]}`,
      // `instagram://media?id=${match[1]}`,
      // iosScheme: (match: RegExpMatchArray) =>
      //   `instagram://www.instagram.com/p/${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/p/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 🎞️ Reels
      regex: /^\/reel\/([^/]+)\/?$/,
      iosScheme: (match: RegExpMatchArray) => `instagram://reel?id=${match[1]}`,
      // iosScheme: (match: RegExpMatchArray) =>
      //   `instagram://www.instagram.com/reel/${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/reel/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
    {
      // 📖 Story (only works if username has an active story)
      regex: /^\/stories\/([^/]+)\/\d+\/?$/,
      iosScheme: (match: RegExpMatchArray) =>
        `instagram://instagram.com/stories/${match[1]}`,
      // iosScheme: (match: RegExpMatchArray) =>
      //   `instagram://story-viewer?username=${match[1]}`,
      androidScheme: (match: RegExpMatchArray) =>
        `intent://instagram.com/stories/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
  ],
};
