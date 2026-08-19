import { Link } from "@/i18n/navigation";
import styles from "./contentPage.module.css";

export default function RelatedLinks({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <ul className={styles.related}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
