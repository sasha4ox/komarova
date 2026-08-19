import Image from "next/image";
import JsonLd from "../JsonLd/JsonLd";
import { buildJsonLdGraph } from "@/lib/schema";
import ConsultCta from "./ConsultCta";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./FaqList";
import styles from "./contentPage.module.css";

export default function AboutPage({ locale, path, copy, about, crumbs }) {
  const jsonLd = buildJsonLdGraph({
    locale,
    path,
    title: about.title,
    description: about.description,
    faq: about.faq,
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
          <h1>{about.h1}</h1>
          <p className={styles.intro}>{about.intro}</p>
        </header>
        <div className={styles.aboutPhoto}>
          <Image
            src="/mainImage.jpg"
            alt={copy.photoAlt}
            fill
            sizes="220px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <section className={styles.section}>
          <h2>{copy.biography}</h2>
          {about.biography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section className={styles.section}>
          <h2>{about.methodsTitle}</h2>
          <ul>
            {about.methods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>{copy.format}</h2>
          <ul>
            {about.format.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <FaqList title={copy.faq} items={about.faq} />
        <ConsultCta />
      </article>
    </main>
  );
}
