import { AppLinkHandler } from "@/types/link-handlers";

export const youtubeHandler: AppLinkHandler = {
  name: "YouTube",
  domains: ["youtube.com", "www.youtube.com"],
  patterns: [
    {
      regex: /^\/watch$/,
      iosScheme: (_, url) => {
        const videoId = url.searchParams.get("v");
        if (!videoId) throw new Error("Missing video ID");
        return `vnd.youtube://watch/${videoId}`;
      },
      androidScheme: (_, url) => {
        const videoId = url.searchParams.get("v");
        if (!videoId) throw new Error("Missing video ID");
        return `intent://watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      },
    },
    {
      regex: /^\/shorts\/([^/]+)/,
      iosScheme: (match) => `vnd.youtube://watch/${match[1]}`,
      androidScheme: (match) =>
        `intent://watch?v=${match[1]}#Intent;package=com.google.android.youtube;scheme=https;end`,
    },
    {
      regex: /^\/(@[^/]+|channel\/[^/]+)$/,
      iosScheme: (match) => `vnd.youtube://${match[1]}`,
      androidScheme: (match) =>
        `intent://${match[1]}#Intent;package=com.google.android.youtube;scheme=https;end`,
    },
    {
      regex: /^\/playlist$/,
      iosScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `vnd.youtube://playlist/${playlistId}`;
      },
      androidScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `intent://playlist?list=${playlistId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      },
    },
  ],
};
