import styles from "./contentPage.module.css";

export default function FaqList({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className={`${styles.section} ${styles.faq}`}>
      <h2>{title}</h2>
      {items.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </section>
  );
}
