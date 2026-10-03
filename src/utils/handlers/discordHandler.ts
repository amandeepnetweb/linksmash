import { AppScheme } from "@/types/link-handlers";

// Verified against https://discord.com/.well-known/assetlinks.json and
// https://discord.gg/.well-known/assetlinks.json (package com.discord), and
// https://discord.com/.well-known/apple-app-site-association which claims
// /app, /invite/*, /gifts/*, /template/*, /users/*, /channels/*, /events/*
// for the iOS app (com.hammerandchisel.discord). discord.gg claims "*".
const PACKAGE = "com.discord";

const universalLink = (_match: RegExpMatchArray, url: URL) => url.href;
const androidIntent = (_match: RegExpMatchArray, url: URL) =>
  `intent://${url.host}${url.pathname}${url.search}#Intent;package=${PACKAGE};scheme=https;end`;

export const discordHandler: AppScheme = {
  name: "Discord",
  domains: ["discord.com", "www.discord.com"],
  patterns: [
    {
      // 📨 Invite (/invite/CODE)
      regex: /^\/invite\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 💬 Server / channel / message / DM (/channels/GUILD_ID/CHANNEL_ID/MESSAGE_ID, /channels/@me/ID)
      regex: /^\/channels\/(@me|\d+)(?:\/(\d+))?(?:\/(\d+))?\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 👤 User profile (/users/USER_ID)
      regex: /^\/users\/(\d+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🎁 Gift (/gifts/CODE)
      regex: /^\/gifts\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
    {
      // 🧩 Server template (/template/CODE)
      regex: /^\/template\/([^/]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};

// discord.gg/CODE short invite links
export const discordInviteHandler: AppScheme = {
  name: "Discord",
  domains: ["discord.gg"],
  patterns: [
    {
      regex: /^\/([\w-]+)\/?$/,
      iosScheme: universalLink,
      androidScheme: androidIntent,
    },
  ],
};
