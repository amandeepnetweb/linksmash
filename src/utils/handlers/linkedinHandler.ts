import { AppScheme } from "@/types/link-handlers";

export const linkedinHandler: AppScheme = {
  name: "LinkedIn",
  domains: ["linkedin.com", "www.linkedin.com"],
  patterns: [
    {
      // 🎯 LinkedIn Profile: /in/username or /pub/username
      regex: /^\/(in|pub)\/([^/]+)/,
      iosScheme: (match) => `linkedin://in/${match[2]}`,
      androidScheme: (match) =>
        `intent://in/${match[2]}#Intent;package=com.linkedin.android;scheme=linkedin;end`,
    },
    {
      // 🎯 LinkedIn Post (activity): /feed/update/urn:li:activity:<id>
      regex: /^\/feed\/update\/urn:li:activity:(\d+)/,
      iosScheme: (match) => `linkedin://activity/${match[1]}`,
      androidScheme: (match) =>
        `intent://activity/${match[1]}#Intent;package=com.linkedin.android;scheme=linkedin;end`,
    },
  ],
};
