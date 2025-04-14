import { AppScheme } from "@/types/link-handlers";
import { youtubeHandler } from "./youtubeHandler";
import { instagramHandler } from "./instagramHandler";

export const handlers: AppScheme[] = [youtubeHandler, instagramHandler];
