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
    {
      // 🧭 Path-based directions
      regex: /^\/maps\/dir\/([^/]+)\/([^/?]+)/,
      iosScheme: (match) =>
        `comgooglemaps://?saddr=${decodeURIComponent(
          match[1]
        )}&daddr=${decodeURIComponent(match[2])}`,
      androidScheme: (match) =>
        `intent://maps/dir/${match[1]}/${match[2]}#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    },
    // {
    //   // 🧭 Directions with query param (?destination=...)
    //   regex: /^\/maps\/dir\/\?api=1&destination=([^&]+)/,
    //   iosScheme: (match) =>
    //     `comgooglemaps://?daddr=${decodeURIComponent(match[1])}`,
    //   androidScheme: (match) =>
    //     `intent://maps/dir/?api=1&destination=${match[1]}#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    // },
    // {
    //   // 🧭 Directions with from/to segments
    //   // https://www.google.com/maps/dir/31.6566367,74.8599381/Chandigarh/@31.1986543,75.1604195,9z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x390fed0be66ec96b:0xa5ff67f9527319fe!2m2!1d76.7794179!2d30.7333148?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D
    //   regex: /^\/maps\/dir\/([^/]+)\/([^/?]+)/,
    //   iosScheme: (match) =>
    //     `comgooglemaps://?saddr=${decodeURIComponent(
    //       match[1]
    //     )}&daddr=${decodeURIComponent(match[2])}`,
    //   androidScheme: (match) =>
    //     `intent://maps/dir/${match[1]}/${match[2]}#Intent;package=com.google.android.apps.maps;scheme=https;end`,
    // },
  ],
};
