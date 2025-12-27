'use client'

import styles from './footer.module.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Menu from '../../components/Menu/menu';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
return (
    <> 
        <footer className={styles.footer}>
            <section className={styles.name}>
            <h2>Ірина Комарова</h2>
            <div>
                <a href="tel:+0931524517" aria-label='Набрати психолога Ірина Комарова'>+380 (93) 152 45 17</a>
            </div>
            </section>
            <div className={styles.links}>
                <a href="https://t.me/KonungFox" target="_blank"  className={styles.link} aria-label="Приєднуйтесь до Telegram">
                    <TelegramIcon fontSize='large'/>
                </a>
                <a className={styles.link} href="https://www.facebook.com/" target="_blank" aria-label="Приєднуйтесь до Facebook">
                    <FacebookIcon fontSize='large'/>
                </a>
                <a className={styles.link} href="https://www.instagram.com/" target="_blank" aria-label="Приєднуйтесь до Instagram">
                    <InstagramIcon fontSize='large'/>
                </a>
            </div>
        </footer>
        <div className={styles.foxWrapper}>
            <a href="https://t.me/KonungFox" target="_blank"  className={styles.foxLink} aria-label="Приєднуйтесь до Telegram розробника">
                <CopyrightIcon/>
                 Розроблено by Fox
                <TelegramIcon fontSize='large'/>
            </a>
        </div>
    </>
    
);
}
