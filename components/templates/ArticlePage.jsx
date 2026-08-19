import JsonLd from "../JsonLd/JsonLd";
import { buildJsonLdGraph } from "@/lib/schema";
import ConsultCta from "./ConsultCta";
import Breadcrumbs from "./Breadcrumbs";
import RelatedLinks from "./RelatedLinks";
import FaqList from "./FaqList";
import styles from "./contentPage.module.css";

export default function ArticlePage({
  locale,
  path,
  copy,
  article,
  relatedArticles,
  relatedService,
  crumbs,
}) {
  const jsonLd = buildJsonLdGraph({
    locale,
    path,
    title: article.title,
    description: article.description,
    faq: article.faq,
    article: { headline: article.h1 },
    breadcrumbs: crumbs.map((crumb) => ({
      name: crumb.name,
      path: crumb.href || path,
    })),
  });

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <article>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{copy.articleEyebrow}</p>
          <h1>{article.h1}</h1>
        </header>
        <section className={styles.definition}>
          <dl>
            <dt>{copy.shortAnswer}</dt>
            <dd>{article.shortAnswer}</dd>
          </dl>
        </section>
        <section className={styles.section}>
          <h2>{copy.whatIs}</h2>
          <p>
            <dfn>{article.definition}</dfn>
          </p>
        </section>
        <section className={styles.section}>
          <h2>{copy.symptoms}</h2>
          <ul>
            {article.symptoms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.causes}</h2>
          <ul>
            {article.causes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.selfHelp}</h2>
          <ul>
            {article.selfHelp.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.whenToSeekHelp}</h2>
          <p>{article.whenToSeekHelp}</p>
        </section>
        <FaqList title={copy.faq} items={article.faq} />
        {relatedService ? (
          <RelatedLinks title={copy.relatedService} items={[relatedService]} />
        ) : null}
        <RelatedLinks title={copy.relatedArticles} items={relatedArticles} />
        <p className={styles.disclaimer}>{copy.disclaimer}</p>
        <ConsultCta defaultText={article.h1} />
      </article>
    </main>
  );
}
