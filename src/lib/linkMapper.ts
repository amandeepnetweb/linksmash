import {
  defaultScheme,
  youtubeChannelScheme,
  youtubePlaylistScheme,
  youtubeScheme,
  youtubeShortsScheme,
} from "./schemes";

interface ISupportedApps {
  name: string;
  domains: string[];
  regex: RegExp;
  scheme: (match: RegExpMatchArray, url: URL) => string;
  iosScheme: (match: RegExpMatchArray, url: URL) => string;
  androidScheme: (match: RegExpMatchArray, url: URL) => string;
}

const supportedApps: ISupportedApps[] = [
  // {
  //   name: "Instagram",
  //   domains: ["www.instagram.com", "instagram.com"],
  //   regex: /^\/([^/]+)\/?$/,
  //   scheme: (match: RegExpMatchArray) =>
  //     `instagram://user?username=${match[1]}`,
  // },
  // {
  //   name: "WhatsApp",
  //   domains: ["wa.me", "www.whatsapp.com"],
  //   regex: /^\/(\+?\d+)(\?text=.*)?$/,
  //   scheme: (match: RegExpMatchArray) =>
  //     `whatsapp://send?phone=${match[1]}${match[2] || ""}`,
  // },
  // {
  //   name: "Facebook",
  //   domains: ["www.facebook.com", "facebook.com"],
  //   regex: /^\/([^/]+)\/?$/,
  //   scheme: (match: RegExpMatchArray) => `fb://profile/${match[1]}`,
  // },
  {
    name: "YouTube",
    domains: ["www.youtube.com", "youtube.com"],
    regex: /^\/watch$/, // just match the path
    scheme: defaultScheme,
    iosScheme: youtubeScheme.iosScheme,
    androidScheme: youtubeScheme.androidScheme,
  },
  {
    name: "YouTube Shorts",
    domains: ["www.youtube.com", "youtube.com"],
    regex: /^\/shorts\/([^/]+)/,
    scheme: defaultScheme,
    iosScheme: youtubeShortsScheme.iosScheme,
    androidScheme: youtubeShortsScheme.androidScheme,
  },
  {
    name: "YouTube Channel",
    domains: ["www.youtube.com", "youtube.com"],
    regex: /^\/(@[^/]+|channel\/[^/]+)$/, // captures @username or /channel/ID
    scheme: defaultScheme,
    iosScheme: youtubeChannelScheme.iosScheme,
    androidScheme: youtubeChannelScheme.androidScheme,
  },
  {
    name: "YouTube Playlist",
    domains: ["www.youtube.com", "youtube.com"],
    regex: /^\/playlist$/, // only matches the /playlist path
    scheme: defaultScheme,
    iosScheme: youtubePlaylistScheme.iosScheme,
    androidScheme: youtubePlaylistScheme.androidScheme,
  },
  // {
  //   name: "YouTube Shorts",
  //   domains: ["www.youtube.com", "youtube.com"],
  //   regex: /^\/shorts\/([^/]+)/, // captures the Shorts video ID from path
  //   iosScheme: (match: RegExpMatchArray) => {
  //     const videoId = match[1];
  //     if (!videoId) throw new Error("Missing Shorts video ID");
  //     return `vnd.youtube://watch/${videoId}`;
  //   },
  //   androidScheme: (match: RegExpMatchArray) => {
  //     const videoId = match[1];
  //     if (!videoId) throw new Error("Missing Shorts video ID");
  //     return `intent://watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
  //   },
  // },
  // {
  //   name: "Twitter/X",
  //   domains: ["www.twitter.com", "twitter.com", "x.com", "www.x.com"],
  //   regex: /^\/([^/]+)\/?$/,
  //   scheme: (match: RegExpMatchArray) =>
  //     `twitter://user?screen_name=${match[1]}`,
  // },
  // {
  //   name: "Reddit",
  //   domains: ["www.reddit.com", "reddit.com"],
  //   regex: /^\/r\/([^/]+)\/?/,
  //   scheme: (match: RegExpMatchArray) => `reddit://r/${match[1]}`,
  // },
  // {
  //   name: "Telegram",
  //   domains: ["t.me"],
  //   regex: /^\/([^/]+)\/?/,
  //   scheme: (match: RegExpMatchArray) => `tg://resolve?domain=${match[1]}`,
  // },
  // {
  //   name: "LinkedIn",
  //   domains: ["www.linkedin.com", "linkedin.com"],
  //   regex: /^\/in\/([^/]+)\/?/,
  //   scheme: (match: RegExpMatchArray) => `linkedin://profile/${match[1]}`,
  // },
  // {
  //   name: "TikTok",
  //   domains: ["www.tiktok.com", "tiktok.com"],
  //   regex: /^\/@([^/]+)\/?/,
  //   scheme: (match: RegExpMatchArray) => `tiktok://user/${match[1]}`,
  // },
];

const mapLinkToScheme = (universalLink: string) => {
  try {
    const url = new URL(universalLink);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname;

    const app = supportedApps.find((app) => app.domains.includes(hostname));
    console.log(app, "app app");
    if (!app) {
      return { error: "Unsupported app or domain" };
    }

    const match = pathname.match(app.regex);
    if (!match) {
      return { error: `Invalid link format for ${app.name}` };
    }

    // detect ios or android
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    const scheme = isIOS
      ? app.iosScheme(match, url)
      : isAndroid
      ? app.androidScheme(match, url)
      : app.scheme(match, url); // Fallback to default scheme if neither iOS nor Android
    return { scheme, universalLink, appName: app.name };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    // Handle the case where the error is not an instance of Error
    return { error: "Invalid URL" };
  }
};

export { mapLinkToScheme };
