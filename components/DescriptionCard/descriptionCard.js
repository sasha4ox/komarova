'use client'
import Image from "next/image";
import styles from "./descriptionCard.module.css";

  export default function DescriptionCard({ name, photo}) {
    return (
        <div className={styles.descriptionCard}>
          <p className={styles.descriptionCardName}>{name}</p>
          <div className={styles.descriptionCardPhotoCover}>
            <Image
            className={styles.photo}
            src={`/${photo}`}
            quality={100}
            fill
            alt={name}
          />
          </div>
        </div>
    );
  }
