import { AppScheme } from "@/types/link-handlers";

export const spotifyHandler: AppScheme = {
  name: "Spotify",
  domains: ["open.spotify.com", "spotify.link"],
  patterns: [
    {
      // 🎯 Artist (e.g., /artist/1wRPtKGflJrBx9BmLsSwlU)
      regex: /^\/artist\/([^/]+)/,
      iosScheme: (match) => `spotify://artist/${match[1]}`,
      androidScheme: (match) => `spotify://artist/${match[1]}`,
    },
    {
      // 🎯 Track (e.g., /track/4bD9z9qa4qg9BhryvYWB7c)
      regex: /^\/track\/([^/]+)/,
      iosScheme: (match) => `spotify://track/${match[1]}`,
      androidScheme: (match) => `spotify://track/${match[1]}`,
    },
    {
      // 🎯 Playlist (e.g., /playlist/37i9dQZF1DWXtlo6ENS92N)
      regex: /^\/playlist\/([^/]+)/,
      iosScheme: (match) => `spotify://playlist/${match[1]}`,
      androidScheme: (match) => `spotify://playlist/${match[1]}`,
    },
    {
      // 🎯 Podcast (Show) (e.g., /show/5EqqB52m2bsr4k1Ii7sStc)
      regex: /^\/show\/([^/]+)/,
      iosScheme: (match) => `spotify://show/${match[1]}`,
      androidScheme: (match) => `spotify://show/${match[1]}`,
    },
    {
      // 🎯 Episode (e.g., /episode/3dDxJflQWtZSztzWdkNBAA)
      regex: /^\/episode\/([^/]+)/,
      iosScheme: (match) => `spotify://episode/${match[1]}`,
      androidScheme: (match) => `spotify://episode/${match[1]}`,
    },
    {
      // 🎯 Album (e.g., /album/0Rkv5iqjF2uenfL0OVB8hg)
      regex: /^\/album\/([^/]+)/,
      iosScheme: (match) => `spotify://album/${match[1]}`,
      androidScheme: (match) => `spotify://album/${match[1]}`,
    },
  ],
};
