import { AppScheme } from "@/types/link-handlers";

export const youtubeHandler: AppScheme = {
  name: "YouTube",
  domains: ["www.youtube.com", "youtube.com", "youtu.be"],
  patterns: [
    {
      // 🎯 Shorts (e.g. /shorts/abc123)
      regex: /^\/shorts\/([^/]+)/,
      iosScheme: (match) => `vnd.youtube://watch/${match[1]}`,
      androidScheme: (match) =>
        `intent://watch/${match[1]}#Intent;package=com.google.android.youtube;scheme=vnd.youtube;end`,
    },
    {
      // 🎯 Channel (/channel/xyz or /@username)
      regex: /^\/(channel\/[^/]+|@[^/]+)$/,
      // iosScheme: (match) => `vnd.youtube://channel/${match[1]}`,
      iosScheme: (match) => `youtube://www.youtube.com/${match[1]}`,
      androidScheme: (match) =>
        `intent://www.youtube.com/${match[1]}#Intent;package=com.google.android.youtube;scheme=vnd.youtube;end`,
    },
    {
      // 🎯 Playlist
      regex: /^\/playlist$/,
      iosScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `vnd.youtube://playlist?list=${playlistId}`;
      },
      androidScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `intent://playlist?list=${playlistId}#Intent;package=com.google.android.youtube;scheme=vnd.youtube;end`;
      },
    },
    {
      // 🎯 Standard video: /watch?v=abc123
      regex: /^\/watch$/,
      iosScheme: (_, url) => {
        const videoId = url.searchParams.get("v");
        if (!videoId) throw new Error("Missing video ID");
        return `vnd.youtube://watch/${videoId}`;
      },
      androidScheme: (_, url) => {
        const videoId = url.searchParams.get("v");
        if (!videoId) throw new Error("Missing video ID");
        return `intent://watch/${videoId}#Intent;package=com.google.android.youtube;scheme=vnd.youtube;end`;
      },
    },
    {
      // 🎯 youtu.be short link (must not be shorts/channel/playlist/@)
      regex: /^\/([a-zA-Z0-9_-]+)$/, // match /abc123 only
      iosScheme: (match, url) => {
        const path = url.pathname.toLowerCase();
        if (
          path.includes("shorts") ||
          path.includes("channel") ||
          path.includes("@") ||
          path.includes("playlist")
        ) {
          throw new Error("Not a standard video link");
        }
        return `vnd.youtube://watch/${match[1]}`;
      },
      androidScheme: (match, url) => {
        const path = url.pathname.toLowerCase();
        if (
          path.includes("shorts") ||
          path.includes("channel") ||
          path.includes("@") ||
          path.includes("playlist")
        ) {
          throw new Error("Not a standard video link");
        }
        return `intent://watch/${match[1]}#Intent;package=com.google.android.youtube;scheme=vnd.youtube;end`;
      },
    },
  ],
};
