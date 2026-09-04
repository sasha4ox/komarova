export type ContentLocale = "uk" | "ru" | "en";

export type LocalizedString = Record<ContentLocale, string>;

export type LocalizedList = Record<ContentLocale, string[]>;

export type LocalizedFaq = Record<
  ContentLocale,
  { question: string; answer: string }[]
>;

export type ServiceId =
  | "anxiety"
  | "panic-attacks"
  | "depression"
  | "relationships"
  | "self-esteem"
  | "burnout"
  | "divorce"
  | "codependency"
  | "loneliness"
  | "family-conflicts";

export type ServiceRecord = {
  id: ServiceId;
  photo: string;
  name: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  h1: LocalizedString;
  intro: LocalizedString;
  definition: LocalizedString;
  symptoms: LocalizedList;
  causes: LocalizedList;
  howTherapyHelps: LocalizedString;
  methods: LocalizedList;
  format: LocalizedString;
  faq: LocalizedFaq;
  relatedArticleSlugs: string[];
};

export type ArticleRecord = {
  slug: string;
  serviceId: ServiceId;
  title: LocalizedString;
  description: LocalizedString;
  h1: LocalizedString;
  shortAnswer: LocalizedString;
  definition: LocalizedString;
  symptoms: LocalizedList;
  causes: LocalizedList;
  selfHelp: LocalizedList;
  whenToSeekHelp: LocalizedString;
  faq: LocalizedFaq;
  relatedArticleSlugs: string[];
  datePublished: string;
  dateModified: string;
  seoTitle: LocalizedString;
};

export type AboutRecord = {
  title: LocalizedString;
  description: LocalizedString;
  h1: LocalizedString;
  intro: LocalizedString;
  biography: LocalizedList;
  methodsTitle: LocalizedString;
  methods: LocalizedList;
  format: LocalizedList;
  educationPlaceholder: LocalizedString;
  certificatesPlaceholder: LocalizedString;
  experiencePlaceholder: LocalizedString;
  diplomasPlaceholder: LocalizedString;
  faq: LocalizedFaq;
};
