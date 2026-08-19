import { Link } from "@/i18n/navigation";
import JsonLd from "../JsonLd/JsonLd";
import { buildJsonLdGraph } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./contentPage.module.css";

export default function HubPage({
  locale,
  path,
  title,
  description,
  h1,
  intro,
  items,
  crumbs,
}) {
  const jsonLd = buildJsonLdGraph({
    locale,
    path,
    title,
    description,
    breadcrumbs: crumbs.map((crumb) => ({
      name: crumb.name,
      path: crumb.href || path,
    })),
  });

  return (
    <main className={styles.page}>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />
      <header className={styles.hero}>
        <h1>{h1}</h1>
        <p className={styles.intro}>{intro}</p>
      </header>
      <ul className={styles.hubGrid}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.hubCard}>
              <h2>{item.name}</h2>
              {item.text ? <p>{item.text}</p> : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
