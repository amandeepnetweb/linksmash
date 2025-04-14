import { AppScheme } from "@/types/link-handlers";

export const linkedinHandler: AppScheme = {
  name: "LinkedIn",
  domains: ["linkedin.com", "www.linkedin.com"],
  patterns: [
    {
      // 🎯 LinkedIn Shared Post: /posts/...activity-<id>...
      regex: /^\/posts\/.*activity-(\d+)-[^/]+/,
      iosScheme: (match) => `linkedin://activity/${match[1]}`,
      androidScheme: (match) =>
        `linkedin://posts/${match[1]}#Intent;package=com.linkedin.android;scheme=linkedin;end`,
    },
    {
      // 🎯 LinkedIn Post (activity): /feed/update/urn:li:activity:<id>
      regex: /^\/feed\/update\/urn:li:activity:(\d+)/,
      iosScheme: (match) => `linkedin://activity/${match[1]}`,
      androidScheme: (match) =>
        `linkedin://activity/${match[1]}#Intent;package=com.linkedin.android;scheme=linkedin;end`,
    },
  ],
};
