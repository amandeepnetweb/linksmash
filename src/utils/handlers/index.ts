import { AppScheme } from "@/types/link-handlers";
import { youtubeHandler } from "./youtubeHandler";
import { instagramHandler } from "./instagramHandler";
import { twitterHandler } from "./twitterHandler";
import { linkedinHandler } from "./linkedinHandler";
import { spotifyHandler } from "./spotifyHandler";
import { googleMapsHandler } from "./googleMapsHandler";
import { quoraHandler } from "./quoraHandler";
import { threadsHandler } from "./threadsHandler";
import { discordHandler, discordInviteHandler } from "./discordHandler";
import { amazonHandler } from "./amazonHandler";
import { flipkartHandler } from "./flipkartHandler";
import { zomatoHandler } from "./zomatoHandler";
import { swiggyHandler } from "./swiggyHandler";
import { whatsappHandler, whatsappChannelHandler } from "./whatsappHandler";
import { telegramHandler } from "./telegramHandler";
import { redditHandler, redditShortHandler } from "./redditHandler";
import { snapchatHandler } from "./snapchatHandler";
import { twitchHandler } from "./twitchHandler";
import { airbnbHandler } from "./airbnbHandler";
import { netflixHandler } from "./netflixHandler";
import { hotstarHandler } from "./hotstarHandler";
import { myntraHandler } from "./myntraHandler";
import { zeptoHandler } from "./zeptoHandler";

export const handlers: AppScheme[] = [
  youtubeHandler,
  instagramHandler,
  twitterHandler,
  linkedinHandler,
  spotifyHandler,
  googleMapsHandler,
  quoraHandler,
  threadsHandler,
  discordHandler,
  discordInviteHandler,
  amazonHandler,
  flipkartHandler,
  zomatoHandler,
  swiggyHandler,
  whatsappHandler,
  whatsappChannelHandler,
  telegramHandler,
  redditHandler,
  redditShortHandler,
  snapchatHandler,
  twitchHandler,
  airbnbHandler,
  netflixHandler,
  hotstarHandler,
  myntraHandler,
  zeptoHandler,
];
