import { Link } from "@/i18n/navigation";
import styles from "./contentPage.module.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.name}-${index}`}>
            {index > 0 ? <span aria-hidden="true"> / </span> : null}
            {isLast || !item.href ? (
              <span>{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
