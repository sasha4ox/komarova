  'use client'

  import Link from 'next/link';
  import classNames from 'classnames';
  import styles from './header.module.css';
  import Menu from '../components/Menu/menu';
  import useScrollDirection from '../helpers/scrollDirection';

  export default function HeaderComponent() {
    const isScrollToBottom = useScrollDirection();
    
    return (
     <header className= {classNames({
      [styles.header]: !isScrollToBottom,
      [styles.hideHeader]: isScrollToBottom,
    })}>
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
