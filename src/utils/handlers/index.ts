import { AppScheme } from "@/types/link-handlers";
import { youtubeHandler } from "./youtubeHandler";
import { instagramHandler } from "./instagramHandler";
import { twitterHandler } from "./twitterHandler";
import { linkedinHandler } from "./linkedinHandler";
import { spotifyHandler } from "./spotifyHandler";
import { googleMapsHandler } from "./googleMapsHandler";
import { quoraHandler } from "./quoraHandler";

export const handlers: AppScheme[] = [
  youtubeHandler,
  instagramHandler,
  twitterHandler,
  linkedinHandler,
  spotifyHandler,
  googleMapsHandler,
  quoraHandler,
];
