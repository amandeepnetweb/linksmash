import { AppScheme } from "@/types/link-handlers";

export const linkedinHandler: AppScheme = {
  name: "LinkedIn",
  domains: ["linkedin.com", "www.linkedin.com"],
  patterns: [
    {
      // 🎯 LinkedIn Shared Post: /posts/...activity-<id>...
      regex: /^\/posts\/.*activity-(\d+)-[^/]+/,
      iosScheme: (match) => `linkedin://activity/${match[1]}`,
      androidScheme: (match) => `linkedin://activity/${match[1]}`,
    },
    {
      // 🎯 LinkedIn Post (activity): /feed/update/urn:li:activity:<id>
      regex: /^\/feed\/update\/urn:li:activity:(\d+)/,
      iosScheme: (match) => `linkedin://activity/${match[1]}`,
      androidScheme: (match) => `linkedin://activity/${match[1]}`,
    },
    {
      // 🎯 LinkedIn Profile: /in/<username>
      regex: /^\/in\/([^/]+)/,
      iosScheme: (match) => `linkedin://profile/${match[1]}`,
      androidScheme: (match) => `linkedin://profile/${match[1]}`,
    },
  ],
};
