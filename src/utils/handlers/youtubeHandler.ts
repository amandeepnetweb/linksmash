import { AppScheme } from "@/types/link-handlers";

export const youtubeHandler: AppScheme = {
  name: "YouTube",
  domains: ["www.youtube.com", "youtube.com", "youtu.be"],
  patterns: [
    {
      // https://www.youtube.com/watch?v=abc or youtu.be/abc
      regex:
        /^https:\/\/(www\.)?youtube\.com\/watch\?v=[^&]+(&[^#]*)?$|^https:\/\/(www\.)?youtu\.be\/[^/?#]+(\?.*)?$/,
      iosScheme: (match, url) => {
        const videoId = url.searchParams.get("v") || match[1];
        if (!videoId) throw new Error("Missing video ID");
        return `vnd.youtube://watch/${videoId}`;
      },
      androidScheme: (match, url) => {
        const videoId = url.searchParams.get("v") || match[1];
        if (!videoId) throw new Error("Missing video ID");
        return `intent://watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      },
    },
    {
      // https://www.youtube.com/shorts/abc123
      regex: /^\/shorts\/([^/]+)/,
      iosScheme: (match) => `vnd.youtube://watch/${match[1]}`,
      androidScheme: (match) =>
        `intent://watch?v=${match[1]}#Intent;package=com.google.android.youtube;scheme=https;end`,
    },
    {
      // https://www.youtube.com/channel/UCxxxx or /@username
      regex: /^\/(@[^/]+|channel\/[^/]+)$/,
      iosScheme: (match) => `vnd.youtube://${match[1]}`,
      androidScheme: (match) =>
        `intent://${match[1]}#Intent;package=com.google.android.youtube;scheme=https;end`,
    },
    {
      // https://www.youtube.com/playlist?list=xxxx
      regex: /^\/playlist$/,
      iosScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `vnd.youtube://playlist?list=${playlistId}`;
      },
      androidScheme: (_, url) => {
        const playlistId = url.searchParams.get("list");
        if (!playlistId) throw new Error("Missing playlist ID");
        return `intent://playlist?list=${playlistId}#Intent;package=com.google.android.youtube;scheme=https;end`;
      },
    },
  ],
};
