"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./accordion.module.css";

export default function AccordionTransition() {
  const t = useTranslations("faq");
  const items = t.raw("items");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={styles.questions}>
      {items.map((item, index) => (
        <Accordion
          key={item.question}
          expanded={index === 0 ? expanded : undefined}
          onChange={index === 0 ? handleExpansion : undefined}
          slotProps={{ transition: { timeout: 400 } }}
          classes={{ root: styles.accordion }}
          sx={
            index === 0
              ? [
                  expanded
                    ? {
                        [`& .${accordionClasses.region}`]: { height: "auto" },
                        [`& .${accordionDetailsClasses.root}`]: {
                          display: "block",
                        },
                      }
                    : {
                        [`& .${accordionClasses.region}`]: { height: 0 },
                        [`& .${accordionDetailsClasses.root}`]: {
                          display: "none",
                        },
                      },
                ]
              : undefined
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography component="span">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
