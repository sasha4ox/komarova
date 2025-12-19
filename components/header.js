  'use client'

  import styles from './header.module.css'
  import Menu from '../components/Menu/menu'

  export default function HeaderComponent() {
    return (
     <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <section className={styles.name}>
            <h1>Ірина Комарова</h1>
            <p>Психолог для дорослих</p>
          </section>
          <section className={styles.linkWrapper}>
            <Menu />
          </section>
        </div>
      </header>
    );
  }
