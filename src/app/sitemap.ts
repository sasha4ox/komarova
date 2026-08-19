import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { SERVICE_IDS, STATIC_LAST_MODIFIED, allArticleSlugs } from "../content/catalog";
import { hreflangLanguages, localizedUrl } from "../lib/locale";

const STATIC_PATHS = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/knowledge-base", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/quiz", changeFrequency: "monthly" as const, priority: 0.7 },
  {
    path: "/polityka-konfidentsiynosti",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  { path: "/cookie-policy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/oferta", changeFrequency: "yearly" as const, priority: 0.3 },
];

function entries(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const sitemapPath = path === "/" ? "" : path;
  return routing.locales.map((locale) => ({
    url: localizedUrl(sitemapPath, locale),
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency,
    priority,
    alternates: {
      languages: hreflangLanguages(sitemapPath),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.flatMap(({ path, changeFrequency, priority }) =>
    entries(path, changeFrequency, priority),
  );

  const serviceEntries = SERVICE_IDS.flatMap((id) =>
    entries(`/services/${id}`, "monthly", 0.8),
  );

  const articleEntries = allArticleSlugs().flatMap((slug) =>
    entries(`/knowledge-base/${slug}`, "monthly", 0.7),
  );

  return [...staticEntries, ...serviceEntries, ...articleEntries];
}
