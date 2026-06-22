import styles from "./legalDocument.module.css";

export default function LegalDocument({ title, intro, sections, footer, className = "" }) {
  return (
    <section className={`${styles.document} ${className}`.trim()}>
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
      {sections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.listSections?.map((listSection) => (
            <div key={listSection.title}>
              <h3>{listSection.title}</h3>
              <ul>
                {listSection.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      {footer?.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
  );
}
