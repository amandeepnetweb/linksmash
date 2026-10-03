// Shared builders for handlers whose app is opened through its verified
// https App Link / Universal Link (see each handler for the files it was
// checked against).

// iOS: hand the original https URL to the system so the Universal Link opens the app.
export const httpsLink = (_match: RegExpMatchArray, url: URL) => url.href;

// Android: intent restricted to the app's verified package.
export const androidIntent =
  (packageName: string) => (_match: RegExpMatchArray, url: URL) =>
    `intent://${url.host}${url.pathname}${url.search}#Intent;package=${packageName};scheme=https;end`;
