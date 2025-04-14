import { handlers } from "@/utils/handlers";

const resolveDeepLink = (universalLink: string) => {
  try {
    const url = new URL(universalLink);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname;

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    for (const handler of handlers) {
      if (!handler.domains.includes(hostname)) continue;

      for (const { regex, iosScheme, androidScheme } of handler.patterns) {
        const match = pathname.match(regex);
        if (match) {
          const scheme = isIOS
            ? iosScheme(match, url)
            : isAndroid
            ? androidScheme(match, url)
            : universalLink;
          return { scheme, universalLink, appName: handler.name };
        }
      }
    }

    return { error: "Unsupported app or link pattern" };
  } catch (err: unknown) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Invalid URL" };
  }
};

export { resolveDeepLink };
