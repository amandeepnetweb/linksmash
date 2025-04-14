interface SchemeHandler {
  regex: RegExp;
  iosScheme: (match: RegExpMatchArray, url: URL) => string;
  androidScheme: (match: RegExpMatchArray, url: URL) => string;
}

export interface AppScheme {
  name: string;
  domains: string[];
  patterns: SchemeHandler[];
}
