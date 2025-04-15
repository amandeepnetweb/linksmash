import { AppScheme } from "@/types/link-handlers";

export const linkedinHandler: AppScheme = {
  name: "LinkedIn",
  domains: ["linkedin.com", "www.linkedin.com"],
  patterns: [
    {
      // 👤 Profile (/in/username)
      regex: /^\/in\/([^/]+)\/?$/,
      iosScheme: (match) => `https://www.linkedin.com/in/${match[1]}`,
      androidScheme: (match) =>
        `intent://linkedin.com/in/${match[1]}#Intent;package=com.linkedin.android;scheme=https;end`,
    },
    {
      // 📬 LinkedIn Post (/posts/...activity-12345)
      regex: /^\/posts\/[^/]*activity-(\d+)[^/]*\/?$/,
      iosScheme: (match) =>
        `https://www.linkedin.com/feed/update/urn:li:activity:${match[1]}`,
      androidScheme: (match) =>
        `intent://linkedin.com/feed/update/urn:li:activity:${match[1]}#Intent;package=com.linkedin.android;scheme=https;end`,
    },
  ],
};
