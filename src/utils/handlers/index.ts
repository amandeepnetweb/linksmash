import { AppScheme } from "@/types/link-handlers";
import { youtubeHandler } from "./youtubeHandler";
import { instagramHandler } from "./instagramHandler";
import { twitterHandler } from "./twitterHandler";

export const handlers: AppScheme[] = [
  youtubeHandler,
  instagramHandler,
  twitterHandler,
];
