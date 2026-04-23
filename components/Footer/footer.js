'use client'

import styles from './footer.module.css';

export default function Footer() {
const showSocialLinks = false;
return (
    <> 
        <footer className={styles.footer}>
            <section className={styles.name}>
            <h2>Ірина Комарова</h2>
            <div>
                <a href="tel:+0931524517" aria-label='Набрати психолога Ірина Комарова'>+380 (93) 152 45 17</a>
            </div>
            </section>
            {showSocialLinks && (
                <div className={styles.links}>
                    {/* Social links are intentionally hidden for now */}
                </div>
            )}
        </footer>
        {showSocialLinks && (
            <div className={styles.foxWrapper}>
                {/* Developer social link is intentionally hidden for now */}
            </div>
        )}
    </>
    
);
}
