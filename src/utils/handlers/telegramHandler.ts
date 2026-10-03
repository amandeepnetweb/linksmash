import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on t.me and telegram.me lists
// org.telegram.messenger (handle_all_urls). The iOS AASA claims every path
// except /auth, /api, /css, /js, /iv, /i, /r.
export const telegramHandler: AppScheme = {
  name: "Telegram",
  domains: ["t.me", "telegram.me"],
  patterns: [
    {
      // 👤 Username, 📢 channel post (/channel/123), ➕ invite (/+CODE, /joinchat/CODE),
      // 🔒 private channel post (/c/ID/123), 🎁 stickers (/addstickers/NAME)
      regex: /^\/(?!(?:auth|api|css|js|iv|i|r)(?:\/|$)).+$/,
      iosScheme: httpsLink,
      androidScheme: androidIntent("org.telegram.messenger"),
    },
  ],
};
