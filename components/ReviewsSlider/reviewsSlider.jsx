"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import styles from "./reviewsSlider.module.css";

const AUTO_PLAY_DELAY_MS = 5000;

export default function ReviewsSlider({ reviews }) {
  const autoplayRef = useRef(
    Autoplay({
      delay: AUTO_PLAY_DELAY_MS,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      slidesToScroll: 2,
      breakpoints: {
        "(max-width: 950px)": { slidesToScroll: 1 },
      },
    },
    [autoplayRef.current],
  );

  const stopAutoplay = useCallback(() => {
    autoplayRef.current?.stop();
  }, []);

  const goToPrev = useCallback(() => {
    stopAutoplay();
    emblaApi?.scrollPrev();
  }, [emblaApi, stopAutoplay]);

  const goToNext = useCallback(() => {
    stopAutoplay();
    emblaApi?.scrollNext();
  }, [emblaApi, stopAutoplay]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    emblaApi.on("pointerDown", stopAutoplay);

    return () => {
      emblaApi.off("pointerDown", stopAutoplay);
    };
  }, [emblaApi, stopAutoplay]);

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewsWrapper}>
        <div className={styles.reviewsHeader}>
          <h2 className={styles.sectionName}>відгуки</h2>
          <h3>Що кажуть клієнти</h3>
          <div className={styles.reviewsRating}>
            <span className={styles.reviewsScore}>4.9</span>
            <span className={styles.reviewsStars}>★★★★★</span>
            <span className={styles.reviewsCount}>на основі 260+ відгуків</span>
          </div>
        </div>

        <div className={styles.sliderShell}>
          <button
            type="button"
            className={`${styles.controlButton} ${styles.controlButtonLeft}`}
            onClick={goToPrev}
            aria-label="Попередній відгук"
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </button>

          <div className={styles.sliderViewport} ref={emblaRef}>
            <div className={styles.slidesTrack}>
              {reviews.map((review) => (
                <div className={styles.slide} key={review.id}>
                  <article className={styles.reviewCard}>
                    <div className={styles.reviewCardStars}>★★★★★</div>
                    <p>{review.text}</p>
                    <span className={styles.reviewAuthor}>{review.author}</span>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.controlButton} ${styles.controlButtonRight}`}
            onClick={goToNext}
            aria-label="Наступний відгук"
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </button>
        </div>

        <div className={styles.mobileControls}>
          <button type="button" className={styles.mobileControlButton} onClick={goToPrev}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </button>
          <button type="button" className={styles.mobileControlButton} onClick={goToNext}>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </section>
  );
}
