"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import AccordionTransition from '../../components/accordion';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Card from '../../components/Card/card';
import Form from '../../components/Form/form';
import Contacts from '../../components/Contacts/contacts';
import DescriptionCard from '../../components/DescriptionCard/descriptionCard';
import ScrollTop from '../../components/ScrollTop/scrollTop';
import TypeWriter from '../../components/Typewriter/typewriter';
import ReviewsSlider from '../../components/ReviewsSlider/reviewsSlider';

export default function Home() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const consultationModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    maxHeight: {
      xs: '90vh',
      sm: '90vh',
    },
    overflowY: {
      xs: 'auto',
      sm: 'auto',
    },
    width: {
      xs: '90%',
      sm: '90%',
      md: '420px',
    },
  };

  const reviews = [
    {
      id: 1,
      text: "Я вдячна за підтримку в дуже непростий період. Після консультацій з'явилося більше опори на себе і стало легше приймати рішення.",
      author: "Марія Б.",
    },
    {
      id: 2,
      text: "Після сесій я навчилась краще розуміти свої емоції. Відчуваю, що тривоги стало менше, а внутрішнього спокою - більше.",
      author: "Олена К.",
    },
    {
      id: 3,
      text: "На консультаціях було безпечно говорити про складне. Дуже ціную уважність, делікатність і професійний супровід у процесі змін.",
      author: "Наталія Ш.",
    },
    {
      id: 4,
      text: "Завдяки роботі вдалося побачити повторювані сценарії у стосунках і поступово змінити їх. Відчуваю більше ясності та впевненості.",
      author: "Анна С.",
    },
    {
      id: 5,
      text: "Прийшла з виснаженням і постійною напругою. Поступово повернула контакт із тілом, навчилась помічати власні межі та потреби.",
      author: "Тетяна К.",
    },
    {
      id: 6,
      text: "Терапія допомогла розкласти по поличках те, що довго не вдавалося зрозуміти. З'явилося відчуття напрямку і внутрішньої стабільності.",
      author: "Андрій Л.",
    },
    {
      id: 7,
      text: "Щиро дякую за теплий контакт і глибоку роботу. Після кожної зустрічі залишалося відчуття, що мене чують і розуміють.",
      author: "Катерина Р.",
    },
    {
      id: 8,
      text: "Робота в терапії допомогла пройти складний період переїзду. Стало легше справлятися з невизначеністю та тримати опору в собі.",
      author: "Ірина Г.",
    },
    {
      id: 9,
      text: "Відчуваю значні зміни у ставленні до себе: менше критики, більше прийняття. Це вплинуло і на стосунки з близькими.",
      author: "Оксана М.",
    },
    {
      id: 10,
      text: "Професійно, м'яко і водночас дуже точно. Рекомендую тим, хто хоче глибше зрозуміти себе та вийти з емоційного глухого кута.",
      author: "Софія Н.",
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.photoWrapper}>
        <div className={styles.photoCover}>
          <Image
            className={styles.photo}
            src="/mainImage.jpg"
            quality={100}
            fill
            loading="lazy"
            alt="Портрет психолога Ірини Комарової"
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>ПСИХОЛОГ ОНЛАЙН · ІРИНА КОМАРОВА</p>
          <h1 className={styles.heroTitle}>Психолог онлайн — безпечний <span>простір для змін</span> </h1>
          {/* <h2>
            Безпечний простір,<br />
            щоб краще <span>зрозуміти себе</span>
          </h2> */}
          <p className={styles.heroLead}>
            Індивідуальна та парна терапія онлайн. Працюю з тривогою,
            стосунками та життєвими кризами. <strong>Zoom</strong>,{" "}
            <strong>Meet</strong> або <strong>Telegram</strong> — де вам зручно.
          </p>
          <ul className={styles.heroTrustList}>
            <li>
              <CheckIcon />
              <span>Конфіденційно</span>
            </li>
            <li>
              <CheckIcon />
              <span>Без черги</span>
            </li>
            <li>
              <CheckIcon />
              <span><strong>1900 грн</strong> / сесія</span>
            </li>
          </ul>
          <button
            type="button"
            className={styles.heroCta}
            onClick={() => setIsConsultationModalOpen(true)}
          >
            Записатись на консультацію →
          </button>
          <Link href="/quiz" className={styles.heroCtaSecondary}>
            Пройти квіз →
          </Link>
        </div>
      </section>
      <section className={styles.aboutSection}>
        <div className={styles.aboutSectionWrapper}>
          <h2 className={styles.sectionName}>Про мене</h2>
          <p>Мене звати Ірина. Я психолог, який допомагає краще розуміти себе, свої реакції та стосунки з іншими.
Працюю з тривогою, емоційними станами, внутрішніми конфліктами та життєвими кризами. Мій підхід — індивідуальний: я не даю готових відповідей, а допомагаю вам самим їх знайти.
Практикую гештальт-терапію, яка дозволяє працювати з переживаннями тут і тепер — без зайвого аналізу минулого.</p>
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
      <TypeWriter/>
      <section className={styles.whereWeMakeCall} id="contacts">
        <Contacts/>
      </section>
      <Form />
      <ReviewsSlider reviews={reviews} />
      <section className={styles.faq} id="faq">
        <div className={styles.faqWrapepr}>
          <h2>Часті запитання</h2>
          <AccordionTransition />
        </div>
      </section>
      <Modal
        open={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        aria-labelledby="consultation-modal-title"
      >
        <Box sx={consultationModalStyle}>
          <CloseIcon
            onClick={() => setIsConsultationModalOpen(false)}
            style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}
          />
          <Form />
        </Box>
      </Modal>
      <ScrollTop />
    </main>
  );
}
