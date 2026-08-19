import type { ServiceId } from "./types";

export const SERVICE_IDS: ServiceId[] = [
  "anxiety",
  "panic-attacks",
  "depression",
  "relationships",
  "self-esteem",
  "burnout",
  "divorce",
  "codependency",
  "loneliness",
  "family-conflicts",
];

export const SERVICE_PHOTOS: Record<ServiceId, string> = {
  anxiety: "1.webp",
  "panic-attacks": "2.webp",
  depression: "3.webp",
  relationships: "4.webp",
  "self-esteem": "5.webp",
  burnout: "6.webp",
  divorce: "1.webp",
  codependency: "2.webp",
  loneliness: "3.webp",
  "family-conflicts": "4.webp",
};

export const ARTICLE_SLUGS_BY_SERVICE: Record<ServiceId, string[]> = {
  anxiety: [
    "what-is-anxiety",
    "anxiety-symptoms",
    "anxiety-causes",
    "what-to-do-with-anxiety",
    "when-to-see-psychologist-for-anxiety",
    "anxiety-myths",
    "anxiety-vs-panic-attacks",
    "how-therapy-helps-anxiety",
    "living-with-anxiety",
    "anxiety-and-relationships",
  ],
  "panic-attacks": [
    "what-is-a-panic-attack",
    "panic-attack-symptoms",
    "panic-attack-causes",
    "what-to-do-during-a-panic-attack",
    "when-to-seek-help-for-panic-attacks",
    "panic-attack-myths",
    "panic-attacks-vs-anxiety",
    "how-therapy-helps-panic-attacks",
    "panic-attacks-and-avoidance",
    "panic-attacks-and-the-body",
  ],
  depression: [
    "what-is-depression",
    "depression-symptoms",
    "depression-causes",
    "what-to-do-if-you-feel-depressed",
    "when-to-see-a-psychologist-for-depression",
    "depression-myths",
    "depression-vs-sadness",
    "how-therapy-helps-depression",
    "depression-and-daily-functioning",
    "depression-and-relationships",
  ],
  relationships: [
    "relationship-problems-what-is-happening",
    "signs-of-relationship-trouble",
    "why-relationships-get-stuck",
    "what-to-do-when-you-keep-fighting",
    "when-to-see-a-couples-psychologist",
    "relationship-therapy-myths",
    "relationships-and-anxiety",
    "how-therapy-helps-relationships",
    "repeating-relationship-patterns",
    "after-a-relationship-crisis",
  ],
  "self-esteem": [
    "what-is-low-self-esteem",
    "signs-of-low-self-esteem",
    "why-self-esteem-drops",
    "how-to-stop-harsh-self-criticism",
    "when-to-see-a-psychologist-for-self-esteem",
    "self-esteem-myths",
    "self-esteem-and-relationships",
    "how-therapy-helps-self-esteem",
    "self-esteem-at-work",
    "confidence-vs-self-worth",
  ],
  burnout: [
    "what-is-burnout",
    "burnout-symptoms",
    "burnout-causes",
    "what-to-do-about-burnout",
    "when-to-seek-help-for-burnout",
    "burnout-myths",
    "burnout-vs-depression",
    "how-therapy-helps-burnout",
    "burnout-and-boundaries",
    "burnout-after-helping-others",
  ],
  divorce: [
    "emotional-side-of-divorce",
    "signs-you-are-struggling-after-separation",
    "why-divorce-hurts-so-much",
    "how-to-cope-with-divorce",
    "when-to-see-a-psychologist-during-divorce",
    "divorce-therapy-myths",
    "divorce-and-children-emotions",
    "how-therapy-helps-after-divorce",
    "life-after-divorce",
    "guilt-and-anger-in-divorce",
  ],
  codependency: [
    "what-is-codependency",
    "codependency-symptoms",
    "why-codependency-develops",
    "how-to-stop-losing-yourself-in-a-relationship",
    "when-to-seek-help-for-codependency",
    "codependency-myths",
    "codependency-vs-care",
    "how-therapy-helps-codependency",
    "codependency-and-boundaries",
    "codependency-after-a-breakup",
  ],
  loneliness: [
    "what-is-loneliness",
    "signs-of-chronic-loneliness",
    "why-people-feel-lonely",
    "what-to-do-when-you-feel-lonely",
    "when-to-see-a-psychologist-for-loneliness",
    "loneliness-myths",
    "loneliness-vs-being-alone",
    "how-therapy-helps-loneliness",
    "loneliness-after-relocation",
    "loneliness-and-self-worth",
  ],
  "family-conflicts": [
    "what-are-family-conflicts",
    "signs-of-unhealthy-family-conflict",
    "why-family-fights-repeat",
    "how-to-talk-during-family-conflict",
    "when-to-see-a-psychologist-for-family-conflict",
    "family-therapy-myths",
    "family-conflict-and-adult-children",
    "how-therapy-helps-family-conflicts",
    "family-roles-and-conflict",
    "family-conflict-after-crisis",
  ],
};

export const RELATED_SERVICES: Record<ServiceId, ServiceId[]> = {
  anxiety: ["panic-attacks", "self-esteem", "relationships"],
  "panic-attacks": ["anxiety", "burnout", "self-esteem"],
  depression: ["anxiety", "burnout", "loneliness"],
  relationships: ["codependency", "family-conflicts", "anxiety"],
  "self-esteem": ["anxiety", "loneliness", "codependency"],
  burnout: ["depression", "anxiety", "self-esteem"],
  divorce: ["relationships", "loneliness", "family-conflicts"],
  codependency: ["relationships", "self-esteem", "loneliness"],
  loneliness: ["depression", "self-esteem", "relationships"],
  "family-conflicts": ["relationships", "divorce", "codependency"],
};

export function allArticleSlugs(): string[] {
  return SERVICE_IDS.flatMap((id) => ARTICLE_SLUGS_BY_SERVICE[id]);
}

export function serviceIdByArticleSlug(slug: string): ServiceId | undefined {
  return SERVICE_IDS.find((id) => ARTICLE_SLUGS_BY_SERVICE[id].includes(slug));
}

export function relatedArticleSlugs(slug: string, limit = 4): string[] {
  const serviceId = serviceIdByArticleSlug(slug);
  if (!serviceId) return [];
  return ARTICLE_SLUGS_BY_SERVICE[serviceId]
    .filter((item) => item !== slug)
    .slice(0, limit);
}

export const STATIC_LAST_MODIFIED = "2026-08-19";
