import { AppScheme } from "@/types/link-handlers";

export const instagramHandler: AppScheme = {
  name: "Instagram",
  domains: ["www.instagram.com", "instagram.com"],
  patterns: [
    {
      // 🎯 Instagram Post (/p/postId)
      regex: /^\/p\/([^/]+)\/?$/,
      iosScheme: (match) => `instagram://www.instagram.com/p/${match[1]}`,
      androidScheme: (match) =>
        `intent://instagram.com/p/${match[1]}#Intent;package=com.instagram.android;scheme=https;end`,
    },
  ],
};
