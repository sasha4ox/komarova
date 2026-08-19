import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { routing } from "../i18n/routing";

const DISALLOW = routing.locales.flatMap((locale) => [
  `/${locale}/form-confirmation`,
  `/${locale}/email-pending`,
]);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
