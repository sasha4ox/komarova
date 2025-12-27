'use client'

import * as React from 'react';
import Accordion, {
  accordionClasses,
} from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './../src/app/page.module.css'

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={styles.questions}>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        // slots={{ transition }}
        slotProps={{ transition: { timeout: 400 } }}
        classes={ {root: styles.accordion}}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: 'auto',
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'block',
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'none',
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Чого варто очікувати під час першої зустрічі з психологом?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Перша зустріч — це передусім знайомство. До неї не потрібно спеціально готуватися:
              дозвольте собі розслабитися й не ставити внутрішніх обмежень. Ви можете почати з будь-якої теми.
              На першій сесії емоції часто бувають інтенсивними — стримувати їх не обов’язково. Інколи складно 
              одразу сформулювати одну конкретну проблему: думки можуть плутатися, а переживання накладатися одне на одне.
                У процесі нашої роботи я допоможу вам поступово окреслити ваш запит.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Чи здатна одна консультація з психологом суттєво вплинути на життя?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Існує поширене уявлення, що одна консультація здатна повністю змінити життя, проте це міф. 
            Наша психіка формувалася роками під впливом сім’ї, досвіду та оточення.
             Тому для змін усталених способів мислення й поведінки потрібен час.
             У безпечному терапевтичному просторі, який вибудовується поступово, 
             з’являється можливість відкритості та доступу до глибинних причин труднощів.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">З якою регулярністю зазвичай проходять терапевтичні зустрічі?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Найчастіше зустрічі відбуваються один раз на тиждень.
             Після завершення активної терапії можливі підтримувальні сесії раз на два тижні або раз на місяць 
             — як форма турботи про психічне здоров’я. Тривалість індивідуальної консультації або терапії становить 50 хвилин,
             а сесії для пар — 80 хвилин. Детальніше про формати роботи та їхню тривалість можна дізнатися окремо.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography component="span">Як зазвичай відбувається психотерапевтична сесія?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Наша робота ґрунтується передусім на діалозі.
             Саме через розмову сесія стає спільним дослідженням вашого внутрішнього світу. 
             Ви ділитеся своїми переживаннями та труднощами, а я не лише слухаю,
              а й уточнюю, прояснюю, ставлю запитання — інколи не зовсім зручні. 
              Такий діалог допомагає краще побачити себе й зрозуміти, як ви будуєте стосунки з іншими. 
            У процесі роботи важливо говорити про все — і про те, що вам підходить, і про те, що викликає дискомфорт. Конфіденційність гарантована.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography component="span">За якими ознаками можна відчути або зрозуміти ефективність терапії?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Поступово змінюється ваша поведінка та спосіб реагування. 
            Ви починаєте застосовувати в повсякденному житті навички,
             набуті в терапії, стаєте більш усвідомленими 
             й уважними до себе та інших. З’являється здатність краще чути себе,
             розуміти мотиви своїх дій, помічати автоматичні думки 
             й реакції. Ви чіткіше усвідомлюєте свої бажання та розрізняєте власні почуття.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <Typography component="span">Навіщо під час сесії ставляться запитання, які можуть здаватися незрозумілими?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Робота зі мною передбачає діалог. У процесі я тримаю фокус на вашій ситуації,
             формую первинні припущення й перевіряю їх через запитання.
              Усі питання спрямовані на розширення усвідомлення того,
               що відбувається з вами та навколо вас. Таким чином виявляються так звані «сліпі зони» — те,
             що раніше залишалося поза увагою. Часто саме цього достатньо,
              щоб з’явилися нові способи дій і змін у житті.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion  classes={ {root: styles.accordion}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7-content"
          id="panel7-header"
        >
          <Typography component="span">Чи можливо записати на консультацію близьку людину або партнера?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Дорослих клієнтів я приймаю лише за їхнім власним запитом.
            Самостійне звернення свідчить про внутрішню готовність до роботи та є важливим першим кроком до змін.
             Психотерапія — це процес,
            який можливий лише за добровільної участі. Неможливо працювати з бажанням «щоб хтось інший змінився»,
             якщо сама людина до цього не готова.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}