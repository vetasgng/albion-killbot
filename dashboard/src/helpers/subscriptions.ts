import banner1 from "assets/subscriptions/subscription_banner_1.png";
import banner2 from "assets/subscriptions/subscription_banner_2.png";
import banner3 from "assets/subscriptions/subscription_banner_3.png";
import banner4 from "assets/subscriptions/subscription_banner_4.png";
import { Limits } from "types/limits";
import {
  ISubscription,
  ISubscriptionBase,
  ISubscriptionExtended,
  SubscriptionPrice,
} from "types/subscription";

export const DEFAULT_PREMIUM_LIMITS: Limits = {
  players: 10,
  guilds: 1,
  alliances: 1,
};

export interface SubscriptionPriceFeature {
  label: string;
}

function parseLimitMetadata(
  value: string | undefined,
  fallback: number
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getSubscriptionPriceLimits(price: SubscriptionPrice): Limits {
  const { metadata } = price;
  return {
    players: parseLimitMetadata(
      metadata.players,
      DEFAULT_PREMIUM_LIMITS.players
    ),
    guilds: parseLimitMetadata(metadata.guilds, DEFAULT_PREMIUM_LIMITS.guilds),
    alliances: parseLimitMetadata(
      metadata.alliances,
      DEFAULT_PREMIUM_LIMITS.alliances
    ),
  };
}

export function getSubscriptionPriceFeatures(
  price: SubscriptionPrice
): SubscriptionPriceFeature[] {
  const limits = getSubscriptionPriceLimits(price);

  const formatSlotLabel = (count: number, entity: string) =>
    `${count} ${entity} slot${count === 1 ? "" : "s"}`;

  return [
    { label: formatSlotLabel(limits.players, "Player") },
    { label: formatSlotLabel(limits.guilds, "Guild") },
    { label: formatSlotLabel(limits.alliances, "Alliance") },
    { label: "Premium support" },
    { label: "Transferable" },
  ];
}

const banners = [
  {
    name: "subscription_banner_1",
    banner: banner1,
  },
  {
    name: "subscription_banner_2",
    banner: banner2,
  },
  {
    name: "subscription_banner_3",
    banner: banner3,
  },
  {
    name: "subscription_banner_4",
    banner: banner4,
  },
];

export const isSubscriptionActive = (subscription: ISubscriptionBase) => {
  if (subscription.expires === "never") return true;
  return new Date(subscription.expires).getTime() > new Date().getTime();
};

export const isSubscriptionActiveAndUnassiged = (
  subscription: ISubscriptionExtended | ISubscription
) => {
  return isSubscriptionActive(subscription) && !subscription.server;
};

export const getSubscriptionStatus = (subscription: ISubscriptionBase) => {
  if (subscription.expires === "never") return "free";
  if (new Date(subscription.expires).getTime() > new Date().getTime())
    return "active";
  return "expired";
};

export const getSubscriptionPriceBanner = (price: SubscriptionPrice) => {
  if (price.metadata.banner) {
    const banner = banners.find((b) => b.name === price.metadata.banner);
    if (banner) return banner.banner;
  }

  return banners[0].banner;
};
