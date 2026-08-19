import type { ArticleRecord, ServiceId } from "../types";
import { ARTICLES as anxiety } from "./anxiety";
import { ARTICLES as panic } from "./panic";
import { ARTICLES as depression } from "./depression";
import { ARTICLES as relationships } from "./relationships";
import { ARTICLES as selfEsteem } from "./self-esteem";
import { ARTICLES as burnout } from "./burnout";
import { ARTICLES as divorce } from "./divorce";
import { ARTICLES as codependency } from "./codependency";
import { ARTICLES as loneliness } from "./loneliness";
import { ARTICLES as familyConflicts } from "./family-conflicts";

export const ARTICLES: ArticleRecord[] = [
  ...anxiety,
  ...panic,
  ...depression,
  ...relationships,
  ...selfEsteem,
  ...burnout,
  ...divorce,
  ...codependency,
  ...loneliness,
  ...familyConflicts,
];

export function getArticle(slug: string): ArticleRecord | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByService(serviceId: ServiceId): ArticleRecord[] {
  return ARTICLES.filter((article) => article.serviceId === serviceId);
}
