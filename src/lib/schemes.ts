export const defaultScheme = (match: RegExpMatchArray, url: URL) => {
  return url.pathname + url.search; // return the full path and query string
};

export const youtubeScheme = {
  // https://www.youtube.com/watch?v=jGhobd9nGoU
  iosScheme: (match: RegExpMatchArray, url: URL) => {
    const videoId = url.searchParams.get("v");
    if (!videoId) throw new Error("Missing video ID");
    return `vnd.youtube://watch/${videoId}`;
  },
  androidScheme: (match: RegExpMatchArray, url: URL) => {
    const videoId = url.searchParams.get("v");
    if (!videoId) throw new Error("Missing video ID");
    return `intent://watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
  },
};

export const youtubeShortsScheme = {
  // https://www.youtube.com/shorts/4z4U1SInjVU
  iosScheme: (match: RegExpMatchArray) => {
    const videoId = match[1];
    if (!videoId) throw new Error("Missing Shorts video ID");
    return `vnd.youtube://watch/${videoId}`;
  },
  androidScheme: (match: RegExpMatchArray) => {
    const videoId = match[1];
    if (!videoId) throw new Error("Missing Shorts video ID");
    return `intent://watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
  },
};

export const youtubeChannelScheme = {
  // https://www.youtube.com/channel/UCISCA3u0nQ-Cxk-hI07g78A or https://www.youtube.com/@piyushgargdev
  iosScheme: (match: RegExpMatchArray) => {
    const channel = match[1];
    if (!channel) throw new Error("Missing channel info");
    return `vnd.youtube://${channel}`;
  },
  androidScheme: (match: RegExpMatchArray) => {
    const channel = match[1];
    if (!channel) throw new Error("Missing channel info");
    return `intent://${channel}#Intent;package=com.google.android.youtube;scheme=https;end`;
  },
};

export const youtubePlaylistScheme = {
  // https://www.youtube.com/playlist?list=PLlNdnoKwDZdwwEWvKXdR9qwDSlnkGtOjq
  iosScheme: (match: RegExpMatchArray, url: URL) => {
    const playlistId = url.searchParams.get("list");
    if (!playlistId) throw new Error("Missing playlist ID");
    return `vnd.youtube://playlist/${playlistId}`;
  },
  androidScheme: (match: RegExpMatchArray, url: URL) => {
    const playlistId = url.searchParams.get("list");
    if (!playlistId) throw new Error("Missing playlist ID");
    return `intent://playlist?list=${playlistId}#Intent;package=com.google.android.youtube;scheme=https;end`;
  },
};
