import { AppScheme } from "@/types/link-handlers";

export const quoraHandler: AppScheme = {
  name: "Quora",
  domains: ["www.quora.com", "quora.com"],
  patterns: [
    {
      // 👤 Profile (e.g., /profile/First-Last)
      regex: /^\/profile\/([^/?#]+)/,
      iosScheme: (match) => `quora://profile/${match[1]}`,
      androidScheme: (match) =>
        `intent://quora.com/profile/${match[1]}#Intent;package=com.quora.android;scheme=https;end`,
    },
    {
      // 📝 Post (e.g., /What-is-the-best-way-to-learn-JavaScript)
      regex: /^\/([^/?#]+)$/,
      iosScheme: (match) => `quora://question/${match[1]}`,
      androidScheme: (match) =>
        `intent://quora.com/${match[1]}#Intent;package=com.quora.android;scheme=https;end`,
    },
  ],
};
