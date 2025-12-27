  'use client'

  import Link from 'next/link'
  import styles from './header.module.css'
  import Menu from '../components/Menu/menu'

  export default function HeaderComponent() {
    return (
     <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.name} href='/' aria-label='Logo for Iryna Komarova'>
            <h1>Ірина Комарова</h1>
            <p>Психолог для дорослих</p>
          </Link>
          <section className={styles.linkWrapper}>
            <Menu />
          </section>
        </div>
      </header>
    );
  }
