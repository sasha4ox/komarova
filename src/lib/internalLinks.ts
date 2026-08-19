import { RELATED_SERVICES, relatedArticleSlugs, serviceIdByArticleSlug } from "../content/catalog";
import { getArticle, getArticlesByService, getService } from "../content";
import type { ServiceId } from "../content/types";

export function getRelatedArticlesForSlug(slug: string, limit = 4) {
  return relatedArticleSlugs(slug, limit)
    .map((item) => getArticle(item))
    .filter((article) => article != null);
}

export function getRelatedServiceForArticle(slug: string) {
  const serviceId = serviceIdByArticleSlug(slug);
  return serviceId ? getService(serviceId) : undefined;
}

export function getRelatedServices(serviceId: ServiceId) {
  return RELATED_SERVICES[serviceId].map((id) => getService(id)).filter(Boolean);
}

export function getServiceArticles(serviceId: ServiceId) {
  return getArticlesByService(serviceId);
}
