const supportedApps = [
  {
    name: "Instagram",
    domains: ["www.instagram.com", "instagram.com"],
    regex: /^\/([^/]+)\/?$/,
    scheme: (match: RegExpMatchArray) =>
      `instagram://user?username=${match[1]}`,
  },
  {
    name: "WhatsApp",
    domains: ["wa.me", "www.whatsapp.com"],
    regex: /^\/(\+?\d+)(\?text=.*)?$/,
    scheme: (match: RegExpMatchArray) =>
      `whatsapp://send?phone=${match[1]}${match[2] || ""}`,
  },
  {
    name: "Facebook",
    domains: ["www.facebook.com", "facebook.com"],
    regex: /^\/([^/]+)\/?$/,
    scheme: (match: RegExpMatchArray) => `fb://profile/${match[1]}`,
  },
  {
    name: "YouTube",
    domains: ["www.youtube.com", "youtube.com"],
    regex: /^\/watch$/, // just match the path
    scheme: (match: RegExpMatchArray, url: URL) => {
      const videoId = url.searchParams.get("v");
      if (!videoId) throw new Error("Missing video ID");
      return `vnd.youtube://watch/${videoId}`;
    },
  },
  {
    name: "YouTube Short",
    domains: ["youtu.be"],
    regex: /^\/([^/]+)/,
    scheme: (match: RegExpMatchArray) => `vnd.youtube://watch/${match[1]}`,
  },
  {
    name: "Twitter/X",
    domains: ["www.twitter.com", "twitter.com", "x.com", "www.x.com"],
    regex: /^\/([^/]+)\/?$/,
    scheme: (match: RegExpMatchArray) =>
      `twitter://user?screen_name=${match[1]}`,
  },
  {
    name: "Reddit",
    domains: ["www.reddit.com", "reddit.com"],
    regex: /^\/r\/([^/]+)\/?/,
    scheme: (match: RegExpMatchArray) => `reddit://r/${match[1]}`,
  },
  {
    name: "Telegram",
    domains: ["t.me"],
    regex: /^\/([^/]+)\/?/,
    scheme: (match: RegExpMatchArray) => `tg://resolve?domain=${match[1]}`,
  },
  {
    name: "LinkedIn",
    domains: ["www.linkedin.com", "linkedin.com"],
    regex: /^\/in\/([^/]+)\/?/,
    scheme: (match: RegExpMatchArray) => `linkedin://profile/${match[1]}`,
  },
  {
    name: "TikTok",
    domains: ["www.tiktok.com", "tiktok.com"],
    regex: /^\/@([^/]+)\/?/,
    scheme: (match: RegExpMatchArray) => `tiktok://user/${match[1]}`,
  },
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

    const scheme = app.scheme(match, url);
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
