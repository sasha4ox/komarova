import type { Metadata } from "next";
import {
  SITE_URL,
  hreflangLanguages,
  localizedUrl,
  ogLocale,
} from "./locale";

type BuildPageMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  index?: boolean;
  siteName?: string;
  imageAlt?: string;
};

const DEFAULT_OG_IMAGE = "/mainImage.jpg";

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  index = true,
  siteName = "Irina Komarova",
  imageAlt,
}: BuildPageMetadataInput): Metadata {
  const url = localizedUrl(path, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflangLanguages(path),
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type,
      locale: ogLocale(locale),
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export { SITE_URL };
