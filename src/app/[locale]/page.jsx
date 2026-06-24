"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./page.module.css";
import AccordionTransition from "../../../components/accordion";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/material/Modal";
import Card from "../../../components/Card/card";
import Form from "../../../components/Form/form";
import ConsultationModalBox from "../../../components/Form/ConsultationModalBox";
import Contacts from "../../../components/Contacts/contacts";
import DescriptionCard from "../../../components/DescriptionCard/descriptionCard";
import ScrollTop from "../../../components/ScrollTop/scrollTop";
import TypeWriter from "../../../components/Typewriter/typewriter";
import ReviewsSlider from "../../../components/ReviewsSlider/reviewsSlider";

const SERVICE_PHOTOS = [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
];

export default function Home() {
  const t = useTranslations();
  const tHero = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tServices = useTranslations("services");
  const tPricing = useTranslations("pricing");
  const tFaq = useTranslations("faq");
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const reviews = t.raw("reviews.items").map((review, index) => ({
    id: index + 1,
    ...review,
  }));

  const serviceItems = tServices.raw("items");
  const individual = tPricing.raw("individual");
  const couples = tPricing.raw("couples");

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
            alt={tHero("imageAlt")}
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{tHero("eyebrow")}</p>
          <h1 className={styles.heroTitle}>
            {tHero("title")}
            <span>{tHero("titleHighlight")}</span>
          </h1>
          <p className={styles.heroLead}>{tHero("lead")}</p>
          <ul className={styles.heroTrustList}>
            <li>
              <CheckIcon />
              <span>{tHero("trustConfidential")}</span>
            </li>
            <li>
              <CheckIcon />
              <span>{tHero("trustNoQueue")}</span>
            </li>
            <li>
              <CheckIcon />
              <span>{tHero("trustPrice")}</span>
            </li>
          </ul>
          <button
            type="button"
            className={styles.heroCta}
            onClick={() => setIsConsultationModalOpen(true)}
          >
            {tHero("ctaBook")}
          </button>
          <Link href="/quiz" className={styles.heroCtaSecondary}>
            {tHero("ctaQuiz")}
          </Link>
        </div>
      </section>
      <section className={styles.aboutSection}>
        <div className={styles.aboutSectionWrapper}>
          <h2 className={styles.sectionName}>{tAbout("title")}</h2>
          <p>{tAbout("text")}</p>
        </div>
      </section>
      <section className={styles.whatWeDo} id="offers">
        <div className={styles.whatWeDoOffersMainHeader}>
          <h2 className={styles.whatWeDoSectionName}>{tServices("title")}</h2>
          <div className={styles.whatWeDoOffersHeaderDescription}>
            <span>{tServices("subtitle")}</span>
          </div>
        </div>
        <div className={styles.descriptionCardWrapper}>
          {serviceItems.map((name, index) => (
            <DescriptionCard
              key={name}
              photo={SERVICE_PHOTOS[index]}
              name={name}
            />
          ))}
        </div>
      </section>
      <section className={styles.offers} id="price">
        <div className={styles.offersMainHeader}>
          <h2 className={styles.sectionName}>{tPricing("title")}</h2>
          <div className={styles.offersHeaderDescription}>
            <span>{tPricing("subtitle")}</span>
          </div>
        </div>
        <div className={styles.offersCards}>
          <Card
            name={individual.name}
            price={individual.price}
            photo="Lechenie-psihologicheskogo-besplodiya-800x532.webp"
            checkName={individual.checkName}
            items={individual.items}
          />
          <Card
            name={couples.name}
            price={couples.price}
            photo="bipolar-disorder2.webp"
            checkName={couples.checkName}
            items={couples.items}
          />
        </div>
      </section>
      <TypeWriter />
      <section className={styles.whereWeMakeCall} id="contacts">
        <Contacts />
      </section>
      <Form />
      <ReviewsSlider reviews={reviews} />
      <section className={styles.faq} id="faq">
        <div className={styles.faqWrapepr}>
          <h2>{tFaq("title")}</h2>
          <AccordionTransition />
        </div>
      </section>
      <Modal
        open={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        aria-labelledby="consultation-modal-title"
      >
        <ConsultationModalBox
          onClose={() => setIsConsultationModalOpen(false)}
        />
      </Modal>
      <ScrollTop />
    </main>
  );
}
