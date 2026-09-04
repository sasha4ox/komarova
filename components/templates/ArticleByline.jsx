import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { authorForLocale } from "@/lib/author";
import styles from "./contentPage.module.css";

export default function ArticleByline({ locale, dateModified, copy }) {
  const author = authorForLocale(locale);

  return (
    <div className={styles.authorByline}>
      <div className={styles.authorPhoto}>
        <Image
          src={author.imagePath}
          alt={copy.photoAlt}
          fill
          sizes="44px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.authorText}>
        <Link href={author.aboutPath} className={styles.authorName}>
          {author.name}
        </Link>
        <span className={styles.authorRole}>{copy.authorRole}</span>
        <time className={styles.authorUpdated} dateTime={dateModified}>
          {copy.authorUpdated}
        </time>
      </div>
    </div>
  );
}

