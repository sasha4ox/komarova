import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const SITE_URL = "https://ikomarova.com";

const paths = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/quiz", changeFrequency: "monthly" as const, priority: 0.9 },
  {
    path: "/polityka-konfidentsiynosti",
    changeFrequency: "yearly" as const,
    priority: 0.8,
  },
  { path: "/oferta", changeFrequency: "yearly" as const, priority: 0.5 },
];

function localePrefix(locale: string) {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${localePrefix(locale)}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
  );
}
