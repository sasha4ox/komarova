"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FEATURED_ARTICLE_SLUGS, KB_CATEGORY_ORDER } from "@/content/kbHub";
import Breadcrumbs from "../templates/Breadcrumbs";
import CategoryIcon, {
  BookIcon,
  ClockIcon,
  SearchIcon,
} from "./CategoryIcon";
import styles from "./knowledgeBase.module.css";

function normalize(value) {
  return value.toLowerCase().trim();
}

function ArticleCard({ article, featured, readingLabel, typeLabel }) {
  return (
    <Link
      href={article.href}
      className={featured ? `${styles.card} ${styles.featuredCard}` : styles.card}
      title={article.h1}
      aria-label={article.h1}
    >
      <h3 className={styles.cardTitle}>{article.cardTitle}</h3>
      <p className={styles.cardExcerpt}>{article.excerpt}</p>
      <div className={styles.cardMeta}>
        <span className={styles.metaItem}>
          <ClockIcon />
          {readingLabel}
        </span>
        <span className={styles.metaItem}>
          <BookIcon />
          {typeLabel}
        </span>
      </div>
    </Link>
  );
}

export default function KnowledgeBaseHub({ h1, intro, crumbs, articles }) {
  const t = useTranslations("templates");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return articles;
    return articles.filter((article) =>
      normalize(`${article.cardTitle} ${article.h1} ${article.keywords}`).includes(
        needle,
      ),
    );
  }, [articles, query]);

  const featured = FEATURED_ARTICLE_SLUGS.map((slug) =>
    filtered.find((article) => article.slug === slug),
  ).filter(Boolean);

  const grouped = KB_CATEGORY_ORDER.map((id) => ({
    id,
    name: t(`kbCategory.${id}`),
    items: filtered.filter((article) => article.categoryId === id),
  })).filter((group) => group.items.length > 0);

  const hasQuery = Boolean(query.trim());
  const visibleTopicIds = new Set(grouped.map((group) => group.id));

  return (
    <main className={styles.page}>
      <Breadcrumbs items={crumbs} />
      <header className={styles.hero}>
        <h1>{h1}</h1>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.search} role="search">
          <label htmlFor="kb-search" className={styles.srOnly}>
            {t("kbSearchLabel")}
          </label>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            id="kb-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("kbSearchPlaceholder")}
            className={styles.searchInput}
            autoComplete="off"
          />
        </div>
        <p className={styles.matchCount} aria-live="polite">
          {hasQuery ? t("kbMatchCount", { count: filtered.length }) : null}
        </p>
      </header>

      {filtered.length === 0 ? (
        <p className={styles.empty}>{t("kbNoResults")}</p>
      ) : (
        <>
          <nav aria-label={t("kbTopics")}>
            <ul className={styles.topics}>
              {KB_CATEGORY_ORDER.filter((id) => visibleTopicIds.has(id)).map(
                (id) => (
                  <li key={id}>
                    <a href={`#kb-${id}`} className={styles.topicChip}>
                      <CategoryIcon name={id} />
                      {t(`kbCategory.${id}`)}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {featured.length > 0 ? (
            <section className={styles.section} aria-labelledby="kb-recommended">
              <div className={styles.sectionHeader}>
                <span className={styles.iconWrap}>
                  <BookIcon />
                </span>
                <h2 id="kb-recommended">{t("kbRecommended")}</h2>
              </div>
              <ul className={styles.featuredGrid}>
                {featured.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard
                      article={article}
                      featured
                      readingLabel={t("kbReadingTime", {
                        minutes: article.readingMinutes,
                      })}
                      typeLabel={t("kbArticleType")}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {grouped.map((group) => (
            <section
              key={group.id}
              id={`kb-${group.id}`}
              className={styles.section}
              aria-labelledby={`kb-heading-${group.id}`}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.iconWrap}>
                  <CategoryIcon name={group.id} />
                </span>
                <h2 id={`kb-heading-${group.id}`}>
                  {group.name}
                  <span className={styles.sectionCount}>
                    {" "}
                    · {group.items.length}
                  </span>
                </h2>
              </div>
              <ul className={styles.grid}>
                {group.items.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard
                      article={article}
                      readingLabel={t("kbReadingTime", {
                        minutes: article.readingMinutes,
                      })}
                      typeLabel={t("kbArticleType")}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
