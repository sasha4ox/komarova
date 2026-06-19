"use client";

import { useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Form from "../Form/form";
import { questions, results, catLabels } from "./quizData";
import styles from "./quiz.module.css";

const consultationModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  maxHeight: {
    xs: "90vh",
    sm: "90vh",
  },
  overflowY: {
    xs: "auto",
    sm: "auto",
  },
  width: {
    xs: "90%",
    sm: "90%",
    md: "420px",
  },
};

function computeScores(answers) {
  const scores = { anxiety: 0, relations: 0, selfcrisis: 0, burnout: 0, self: 0 };
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === undefined) return;
    const category = questions[questionIndex].opts[answerIndex].cat;
    scores[category]++;
  });
  return scores;
}

function buildQuizMessage(winnerKey, scores) {
  const total = questions.length;
  const winner = results[winnerKey];
  const scoreSummary = Object.entries(scores)
    .map(([cat, score]) => `${catLabels[cat]}: ${score}/${total}`)
    .join(", ");
  return `Результат квізу: ${winner.cat} (${scoreSummary})`;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const winnerKey = useMemo(
    () => Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0],
    [scores]
  );
  const result = results[winnerKey];
  const total = questions.length;
  const progress = ((current + 1) / total) * 100;
  const hasSelection = answers[current] !== undefined;
  const isLastQuestion = current === total - 1;

  const selectOption = (index) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = index;
      return next;
    });
  };

  const goNext = () => {
    if (answers[current] === undefined) return;
    if (current < total - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResults(false);
    setIsConsultationModalOpen(false);
  };

  if (showResults) {
    return (
      <div className={styles.quizWrap}>
        <div className={styles.resultWrap}>
          <div className={styles.resultEmoji}>{result.emoji}</div>
          <div className={styles.resultCat}>{result.cat}</div>
          <div className={styles.resultTitle}>{result.title}</div>
          <div className={styles.resultDesc}>{result.desc}</div>
          <div className={styles.resultBars}>
            {Object.entries(scores).map(([cat, score]) => (
              <div key={cat} className={styles.barRow}>
                <div className={styles.barLabel}>
                  <span>{catLabels[cat]}</span>
                  <span>
                    {score}/{total}
                  </span>
                </div>
                <div className={styles.barBg}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${Math.round((score / total) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.ctaBtn}
            onClick={() => setIsConsultationModalOpen(true)}
          >
            Записатися на консультацію
          </button>
          <button type="button" className={styles.restartBtn} onClick={restart}>
            Пройти ще раз
          </button>
          <p className={styles.disclaimer}>
            Це не клінічний інструмент і не замінює консультацію спеціаліста.
          </p>
        </div>
        <Modal
          open={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
          aria-labelledby="quiz-consultation-modal-title"
        >
          <Box sx={consultationModalStyle}>
            <CloseIcon
              onClick={() => setIsConsultationModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", cursor: "pointer" }}
            />
            <Form
              compact
              defaultText={buildQuizMessage(winnerKey, scores)}
            />
          </Box>
        </Modal>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className={styles.quizWrap}>
      <h2 className={styles.srOnly}>Квіз психічного здоров&apos;я від психолога Ірини Комарової</h2>
      <div className={styles.progressBarBg}>
        <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.stepLabel}>
        Питання {current + 1} з {total}
      </div>
      <div className={styles.question}>{question.q}</div>
      <div className={styles.options}>
        {question.opts.map((option, index) => (
          <button
            key={option.text}
            type="button"
            className={`${styles.optionBtn}${answers[current] === index ? ` ${styles.selected}` : ""}`}
            onClick={() => selectOption(index)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className={styles.nav}>
        <button
          type="button"
          className={`${styles.btnBack}${current === 0 ? ` ${styles.btnBackHidden}` : ""}`}
          onClick={goBack}
        >
          ← Назад
        </button>
        <button
          type="button"
          className={`${styles.btnNext}${hasSelection ? ` ${styles.active}` : ""}`}
          onClick={goNext}
        >
          {isLastQuestion ? "Показати результат →" : "Далі →"}
        </button>
      </div>
      <p className={styles.disclaimer}>
        Це не клінічний інструмент і не замінює консультацію спеціаліста.
      </p>
    </div>
  );
}
