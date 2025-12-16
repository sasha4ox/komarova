import Image from "next/image";
import styles from "./page.module.css";
import AccordionTransition from '../../components/accordion'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.photoWrapper}>
        <section className={styles.photo}> 
          <Image
          className={styles.photo}
            src="/6919a50384b3346f2a0cc6f1_optimized_737_c737x959-0x0.webp"
            quality={100}
            // width={737}
            // height={959}
             width={475}
            height={507}
            alt="Picture of the author"
          />
        </section>
        <section className={styles.photoDescription}>
          <h1>Привіт, я Ірина Комарвоа, умію допомогти і підтримати</h1>

          <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Допомагаю усвідомити себе, свої "так" і "ні" - у житті, в стосунках, в тілі..' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Зменшити тривожність, звільнитися від старих програм і жити в гармонії з собою і світом.' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Працюю з парами та людьми в особистих кризах.' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary='Підтримка в еміграціїї.' />
            </ListItemButton>
          </ListItem>
        </List>
        </section>
      </section>
      <section className={styles.aboutSection}>
        <div className={styles.aboutSectionWrapper}>
          <h1>Ірина Комарова</h1>
          <p>Я - практикуючий психолог з орієнтацією на тілесний індивідуальний процес клієнта, психолог-сексолог, гештальт-терапевт в процесі навчання. Викладач на курсах Академії сексології та сексуального виховання. Ведуча бранчів на тему сексуальності.</p>
        </div>
      </section>
       <section className={styles.whereWeMakeCall}>
        <div className={styles.whereWeMaCallWrapper}>
          <section>
          <p>Контакти</p>
          <p>Де проходять зустрічі?</p>
          <button>Записатися</button>
          </section>
          <section>
            <p>Онлайн сесії</p>
            <p>Zoom; Google Meet; Telegram;Де Вам зручно!</p>
          </section>
        </div>
       </section>
       <section className={styles.faq}>
        <div className={styles.qustions}>
          <h1>Часті запитання</h1>
          <AccordionTransition />
        </div>
       </section>
    </div>
  );
}
