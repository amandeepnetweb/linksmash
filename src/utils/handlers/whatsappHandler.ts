import { AppScheme } from "@/types/link-handlers";
import { androidIntent, httpsLink } from "./helpers";

// Verified: assetlinks.json on wa.me, chat.whatsapp.com, api.whatsapp.com and
// www.whatsapp.com lists com.whatsapp (handle_all_urls). The iOS AASA for the
// same hosts claims "*" for net.whatsapp.WhatsApp.
const android = androidIntent("com.whatsapp");

export const whatsappHandler: AppScheme = {
  name: "WhatsApp",
  domains: ["wa.me", "chat.whatsapp.com", "api.whatsapp.com"],
  patterns: [
    {
      // 💬 Chat (wa.me/911234567890), business link (wa.me/message/CODE),
      // group invite (chat.whatsapp.com/CODE), api.whatsapp.com/send?phone=…
      regex: /^\/(.+)$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};

export const whatsappChannelHandler: AppScheme = {
  name: "WhatsApp",
  domains: ["whatsapp.com", "www.whatsapp.com"],
  patterns: [
    {
      // 📢 Channel (whatsapp.com/channel/ID)
      regex: /^\/channel\/([^/]+)\/?$/,
      iosScheme: httpsLink,
      androidScheme: android,
    },
  ],
};
