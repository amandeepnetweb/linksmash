export interface AppLinkHandler {
  name: string;
  domains: string[];
  patterns: {
    regex: RegExp;
    iosScheme: (match: RegExpMatchArray, url: URL) => string;
    androidScheme: (match: RegExpMatchArray, url: URL) => string;
  }[];
}
