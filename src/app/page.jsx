import Image from "next/image";
import styles from "./page.module.css";
import AccordionTransition from '../../components/accordion';
import CheckIcon from '@mui/icons-material/Check';
import Card from '../../components/Card/card'
import Form from '../../components/Form/form'
import Contacts from '../../components/Contacts/contacts'
import DescriptionCard from '../../components/DescriptionCard/descriptionCard'

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.photoWrapper}>
        <div className={styles.photoCover}> 
          <Image
            className={styles.photo}
            src="/photo_2025-12-26_00-55-17.webp"
            quality={100}
            fill
            loading="lazy"
            alt="Портрет психолога Ірини Комарової"
          />
        </div>
        <div className={styles.photoDescription}>
          <h1>Привіт, я Ірина Комарова, умію допомогти і підтримати</h1>
          <ul className={styles.phtoDescriptionList}>
            <li>
              <CheckIcon />
              <span>Підтримую в усвідомленні себе, своїх внутрішніх дозволів і заборон у повсякденному житті, взаєминах і тілесних відчуттях.</span>
            </li>
             <li>
              <CheckIcon />
              <span>Навчитися проживати життя без постійної тривоги, відмовитися від обмежувальних програм і бути в балансі з собою та світом.</span>
            </li>
             <li>
              <CheckIcon />
              <span>Підтримую пари та індивідуальних клієнтів у періоди особистих викликів і змін.</span>
            </li>
             <li>
              <CheckIcon />
              <span>Супровід і підтримка під час переїзду та життя за кордоном.</span>
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
          <p>Я — практикуючий психолог з орієнтацією на тілесний індивідуальний процес клієнта. Працюю з емоційними станами, внутрішніми конфліктами та життєвими кризами, допомагаю краще усвідомити себе, свої потреби й межі. Наразі навчаюся гештальт-терапії, що дозволяє поглиблювати роботу з переживаннями та досвідом «тут і тепер».</p>
        </div>
      </section>
      <section className={styles.whatWeDo} id="offers">
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
      <section className={styles.offers} id="price">
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
            photo="Lechenie-psihologicheskogo-besplodiya-800x532.webp" 
            checkName="Робота, що спрямована на отримання змін у житті клієнта:" 
            items={
              [
                "Сесії проводяться один або два рази на тиждень, залежно від потреб клієнта.",
                "Місце, де можна вільно дослідити свої почуття та краще зрозуміти власні потреби.",
                "Ми не здатні переписати минуле, проте можемо обрати, як жити тут і зараз."
              ]}
          />
          <Card 
            name="Парна терапія" 
            price="80хв /3300 грн" 
            photo="bipolar-disorder2.webp" 
            checkName="Допомога у вирішенні проблем в житті пари:" 
            items={
              [
                "Пошук способів подолати труднощі у стосунках.",
                "З дорослішанням дітей, переживанням втрат, правди і брехні.",
                "Місце, де можна побачити один одного та вирішити, як далі будувати життя — разом або на відстані."
            ]} 
          />
        </div>
      </section>
      <section className={styles.whereWeMakeCall} id="contacts">
        <Contacts/>
      </section>
        <Form />
      <section className={styles.faq} id="faq">
        <div className={styles.faqWrapepr}>
          <h2>Часті запитання</h2>
          <AccordionTransition />
        </div>
      </section> 
    </main>
  );
}
