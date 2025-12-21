import Image from "next/image";
import styles from "./page.module.css";
import AccordionTransition from '../../components/accordion'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import Card from '../../components/Card/card'
import Form from '../../components/Form/form'
import Contacts from '../../components/Contacts/contacts'
import DescriptionCard from '../../components/DescriptionCard/descriptionCard'

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.photoWrapper}>
        <div className={styles.photoCover}> 
          <Image
            className={styles.photo}
            src="/6919a50384b3346f2a0cc6f1_optimized_737_c737x959-0x0.webp"
            quality={100}
            fill
            alt="Портрет психолога Ірини Комарової"
          />
        </div>
        <div className={styles.photoDescription}>
          <h1>Привіт, я Ірина Комарова, умію допомогти і підтримати</h1>
          <ul className={styles.phtoDescriptionList}>
            <li>
              <CheckIcon />
              <span>Допомагаю усвідомити себе, свої "так" і "ні" - у житті, в стосунках, в тілі..</span>
            </li>
             <li>
              <CheckIcon />
              <span>Зменшити тривожність, звільнитися від старих програм і жити в гармонії з собою і світом.</span>
            </li>
             <li>
              <CheckIcon />
              <span>Працюю з парами та людьми в особистих кризах.</span>
            </li>
             <li>
              <CheckIcon />
              <span>Підтримка в еміграції.</span>
            </li>
          </ul>
          {/* <List>
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
                <ListItemText primary='Підтримка в еміграції.' />
              </ListItemButton>
            </ListItem>
          </List> */}
        </div>
      </section>
      <section className={styles.aboutSection}>
        <div className={styles.aboutSectionWrapper}>
          <h1 className={styles.sectionName}>Про мене</h1>
          <h1>Ірина Комарова</h1>
          <p>Я - практикуючий психолог з орієнтацією на тілесний індивідуальний процес клієнта, психолог-сексолог, гештальт-терапевт в процесі навчання. Викладач на курсах Академії сексології та сексуального виховання. Ведуча бранчів на тему сексуальності.</p>
        </div>
      </section>
      <section className={styles.whatWeDo}>
        <div className={styles.whatWeDoOffersMainHeader}>
          <h2 className={styles.whatWeDoSectionName}>ПОСЛУГИ</h2>
          <div className={styles.whatWeDoOffersHeaderDescription}>
            <span>Приходьте на консультацію, якщо у вас:</span>
          </div>
        </div>
        <div className={styles.descriptionCardWrapper}>
          <DescriptionCard
          photo="1.webp"
          name="Тривожність"
          />
          <DescriptionCard
            photo="2.webp"
            name="Любовна залежність"
          />
          <DescriptionCard
            photo="3.webp"
            name="Труднощі в міжособистих взаєминах"
          />
          <DescriptionCard
            photo="4.webp"
            name="Невпевненість у собі"
          />
          <DescriptionCard
            photo="5.webp"
            name="Почуття самотності"
          />
          <DescriptionCard
            photo="6.webp"
            name="Бажання краще пізнати себе"
          />
        </div>
      </section>
      <section className={styles.offers} id="offers">
        <div className={styles.offersMainHeader}>
          <h2 className={styles.sectionName}>вартість</h2>
          <div className={styles.offersHeaderDescription}>
            <span>Вартість терапії</span>
            {/* <span>Я надаю послуги для дорослих та сімейних пар.</span> */}
          </div>
        </div>
        <div className={styles.offersCards}>
          <Card
            name="Індивідуальна терапія" 
            price="60хв /1900 грн" 
            photo="644766939d13bf000c4a9cb6_optimized_1396.webp" 
            checkName="Робота, що спрямована на отримання змін у житті клієнта:" 
            items={
              [
                "Зустрічі (психотерапевтичні сесії) проходять один раз або двічі на тиждень",
                "Безпечний простір, де можна зрозуміти свої почуття і знайти розуміння своїх бажань",
                "Минуле ми не можемо змінити, але можемо знайти шлях як жити зараз"
              ]}
          />
          <Card 
            name="Парна терапія" 
            price="80хв /3300 грн" 
            photo="6447662c03c327000d49aa94_optimized_931.webp" 
            checkName="Допомога у вирішенні проблем в житті пари:" 
            items={
              [
                "Пошук шляхів подолання труднощів у взаємовідносинах.",
                "З дорослішанням дітей і розставанням, правдою і брехнею, горем і втратою…",
                "Простір, де можна побачити один одного face-to-face і далі вирішувати як з цим жити: разом чи уже на відстані.."
            ]} 
          />
        </div>
      </section>
      <section className={styles.whereWeMakeCall} id="contacts">
        <Contacts/>
      </section>
        <Form />
      <section className={styles.faq}>
        <div className={styles.faqWrapepr}>
          <h1>Часті запитання</h1>
          <AccordionTransition />
        </div>
      </section>
    </div>
  );
}
