import { SITE_URL, contentLocale, localizedUrl } from "./locale";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ReviewItem = {
  author: string;
  text: string;
};

type GraphOptions = {
  locale: string;
  path: string;
  title: string;
  description: string;
  faq?: FaqItem[];
  breadcrumbs?: { name: string; path: string }[];
  article?: {
    headline: string;
    datePublished?: string;
    dateModified?: string;
  };
  reviews?: ReviewItem[];
};

const PERSON_ID = `${SITE_URL}/#person`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PERSON_NAMES = {
  uk: "Ірина Комарова",
  ru: "Ирина Комарова",
  en: "Irina Komarova",
} as const;

const JOB_TITLES = {
  uk: "Психолог для дорослих",
  ru: "Психолог для взрослых",
  en: "Psychologist for adults",
} as const;

const BUSINESS_NAMES = {
  uk: "Психолог Ірина Комарова — онлайн-консультації",
  ru: "Психолог Ирина Комарова — онлайн-консультации",
  en: "Psychologist Irina Komarova — online consultations",
} as const;

const KNOWS_ABOUT = {
  uk: [
    "тривожність",
    "панічні атаки",
    "депресія",
    "стосунки",
    "емоційна залежність",
    "розлучення",
    "вигорання",
    "самооцінка",
    "самотність",
    "сімейні конфлікти",
    "гештальт-терапія",
  ],
  ru: [
    "тревожность",
    "панические атаки",
    "депрессия",
    "отношения",
    "эмоциональная зависимость",
    "развод",
    "выгорание",
    "самооценка",
    "одиночество",
    "семейные конфликты",
    "гештальт-терапия",
  ],
  en: [
    "anxiety",
    "panic attacks",
    "depression",
    "relationships",
    "codependency",
    "divorce",
    "burnout",
    "self-esteem",
    "loneliness",
    "family conflicts",
    "Gestalt therapy",
  ],
} as const;

function personNode(locale: string) {
  const lang = contentLocale(locale);
  return {
    "@type": ["Person", "Psychologist"],
    "@id": PERSON_ID,
    name: PERSON_NAMES[lang],
    alternateName: Object.values(PERSON_NAMES).filter((name) => name !== PERSON_NAMES[lang]),
    jobTitle: JOB_TITLES[lang],
    url: localizedUrl("/", locale),
    image: `${SITE_URL}/mainImage.jpg`,
    email: "mailto:irinavfox@gmail.com",
    knowsLanguage: ["uk", "ru", "en"],
    knowsAbout: [...KNOWS_ABOUT[lang]],
    hasOccupation: {
      "@type": "Occupation",
      name: JOB_TITLES[lang],
    },
    worksFor: { "@id": BUSINESS_ID },
  };
}

function businessNode(locale: string) {
  const lang = contentLocale(locale);
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: BUSINESS_NAMES[lang],
    url: localizedUrl("/", locale),
    image: `${SITE_URL}/mainImage.jpg`,
    email: "irinavfox@gmail.com",
    priceRange: "1900-3300 UAH",
    currenciesAccepted: "UAH",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UA",
    },
    areaServed: [
      { "@type": "Country", "name": "Ukraine" },
      { "@type": "AdministrativeArea", name: "Online" },
    ],
    availableLanguage: ["Ukrainian", "Russian", "English"],
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
  };
}

function websiteNode(locale: string) {
  const lang = contentLocale(locale);
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: localizedUrl("/", locale),
    name: BUSINESS_NAMES[lang],
    inLanguage: lang === "uk" ? "uk" : lang,
    publisher: { "@id": PERSON_ID },
  };
}

export function buildJsonLdGraph({
  locale,
  path,
  title,
  description,
  faq,
  breadcrumbs,
  article,
  reviews,
}: GraphOptions) {
  const pageUrl = localizedUrl(path, locale);
  const pageId = `${pageUrl}#webpage`;
  const graph: Record<string, unknown>[] = [
    websiteNode(locale),
    personNode(locale),
    businessNode(locale),
    {
      "@type": "WebPage",
      "@id": pageId,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      inLanguage: contentLocale(locale) === "uk" ? "uk" : contentLocale(locale),
    },
  ];

  if (article) {
    graph.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: article.headline,
      description,
      url: pageUrl,
      inLanguage: contentLocale(locale),
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      mainEntityOfPage: { "@id": pageId },
      datePublished: article.datePublished || "2026-08-01",
      dateModified: article.dateModified || "2026-08-19",
    });
  }

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: localizedUrl(crumb.path, locale),
      })),
    });
  }

  if (reviews?.length) {
    graph.push(
      ...reviews.map((review, index) => ({
        "@type": "Review",
        "@id": `${pageUrl}#review-${index + 1}`,
        reviewBody: review.text,
        author: {
          "@type": "Person",
          name: review.author,
        },
        itemReviewed: { "@id": BUSINESS_ID },
      })),
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
