import { AppScheme } from "@/types/link-handlers";

export const googleMapsHandler: AppScheme = {
  name: "Google Maps",
  domains: ["www.google.com", "maps.google.com", "google.com"],
  patterns: [
    {
      // 📍 Place by coordinates or name
      regex: /^\/maps\/place\/([^/]+)\/@([^/]+),([^/]+),(\d+)z\/?$/,
      iosScheme: (match) =>
        `comgooglemaps://?q=${decodeURIComponent(match[1])}&center=${
          match[2]
        },${match[3]}&zoom=${match[4]}`,
      androidScheme: (match) =>
        `intent://maps/place/${match[1]}/@${match[2]},${match[3]},${match[4]}z#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    },
    {
      // 🗺️ Coordinates only
      regex: /^\/maps\/@([^/]+),([^/]+),(\d+)z\/?$/,
      iosScheme: (match) =>
        `comgooglemaps://?center=${match[1]},${match[2]}&zoom=${match[3]}`,
      androidScheme: (match) =>
        `intent://maps/@${match[1]},${match[2]},${match[3]}z#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    },
    {
      // 🔍 Search
      regex: /^\/maps\/search\/([^/]+)\/?$/,
      iosScheme: (match) =>
        `comgooglemaps://?q=${decodeURIComponent(match[1])}`,
      androidScheme: (match) =>
        `intent://maps/search/${match[1]}#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    },
  ],
};
