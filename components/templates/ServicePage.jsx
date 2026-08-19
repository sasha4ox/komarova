import JsonLd from "../JsonLd/JsonLd";
import { buildJsonLdGraph } from "@/lib/schema";
import ConsultCta from "./ConsultCta";
import Breadcrumbs from "./Breadcrumbs";
import RelatedLinks from "./RelatedLinks";
import FaqList from "./FaqList";
import styles from "./contentPage.module.css";

export default function ServicePage({
  locale,
  path,
  copy,
  service,
  relatedArticles,
  relatedServices,
  crumbs,
}) {
  const jsonLd = buildJsonLdGraph({
    locale,
    path,
    title: service.title,
    description: service.description,
    faq: service.faq,
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
          <p className={styles.eyebrow}>{copy.serviceEyebrow}</p>
          <h1>{service.h1}</h1>
          <p className={styles.intro}>{service.intro}</p>
        </header>
        <section className={styles.definition}>
          <dl>
            <dt>{copy.whatIs}</dt>
            <dd>
              <dfn>{service.definition}</dfn>
            </dd>
          </dl>
        </section>
        <section className={styles.section}>
          <h2>{copy.symptoms}</h2>
          <ul>
            {service.symptoms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.causes}</h2>
          <ul>
            {service.causes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.howTherapyHelps}</h2>
          <p>{service.howTherapyHelps}</p>
        </section>
        <section className={styles.section}>
          <h2>{copy.methods}</h2>
          <ul>
            {service.methods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.format}</h2>
          <p>{service.format}</p>
        </section>
        <section className={styles.section}>
          <h2>{copy.pricing}</h2>
          <p>{copy.pricingBody}</p>
        </section>
        <FaqList title={copy.faq} items={service.faq} />
        <RelatedLinks title={copy.relatedArticles} items={relatedArticles} />
        <RelatedLinks title={copy.relatedServices} items={relatedServices} />
        <p className={styles.disclaimer}>{copy.disclaimer}</p>
        <ConsultCta defaultText={service.h1} />
      </article>
    </main>
  );
}
