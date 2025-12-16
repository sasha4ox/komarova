'use client'

import * as React from 'react';
import Accordion, {
  AccordionSlots,
  accordionClasses,
} from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import styles from './../src/app/page.module.css'

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        // slots={{ transition }}
        slotProps={{ transition: { timeout: 400 } }}
        classes={styles.qustions}
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
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Що можна очікувати від першої консультації?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Перша зустріч - це завжди знайомство. Не потрібно готуватися до неї: видихніть, не створюйте собі рамок.
            Ви можете починати говорити про що завгодно, на першій зустрічі емоції можуть переповнювати і стримувати їх не варто,
            важко визначити одну проблему, усе може перемішуватися в голові, в процесі сесії я Вам допоможу віднайти Ваш запит.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Чи може одна зустріч з психологом кардинально змінити життя?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Це популярний міф. Наша психіка формувалася роками під впливом сімʼї та оточення.
            Тому для зміни сталих патернів поведінки і мислення однієї сесії замало.
            В атмосфері безпечного терапевтичного альянсу, який будується поступово, клієнт може відкритися та дійти до глибинних причин своїх проблем.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Як часто мені доведеться ходити на сесії?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Зазвичай ми зустрічаємося один раз на тиждень.
            Після закінчення терапії можна підтримувати своє психічне здоров’я сесією раз на 2 тижні/місяць ( так звана «психогігієна»).
            Тривалість сесії становить 50 хв для консультування та індивідуальної терапії та 80 хвидин для роботи з парами.
            Детальніше про формати косультації і їх тривалість тут
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography component="span">Як проходить терапевтична сесія?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Наша з вами робота буде заснована насамперед на діалозі.
            Саме він дозволяє перетворити сесію на спільне дослідження Вашого внутрішнього світу.
            Ви розповідатимете про себе і свій дискомфорт у житті, а я – не просто слухатиму, 
            а і прояснюватиму, уточнюватиму, ставитиму запитання, можливо іноди і не зручні.
            Діалог дає можливість не лише побачити себе очима іншого, а й зрозуміти,
            як ви з іншими взаємодієте. Зі мною можна і потрібно обговорювати все,
            що подобається, а що не подобається у нашій роботі, що не влаштовує.
            Я гарантую Вам повну конфіденційність.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography component="span">Як зрозуміти, що терапія працює?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Змінюється Ваша поведінка, Ви використовуєте в житті навички, отримані в процесі терапії,
            ви усвідомлені та екологічні в контакті з собою та з іншими. Ви стали краще чути себе,
            усвідомлювати мотиви своєї поведінки, відслідковуєте свої автоматичні думки та реакції,
            розумієте «чого я хочу?», розрізняєте свої почуття.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <Typography component="span">Чому Ви мені задаєте ці незрозумілі питання ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Робота зі мною передбачає діалог.
            В голові я завжди тримаю фокус на Вашому випадку, формую первну гіпотезу і пдтверджую чи спростовую її, задаючи питання. 
            Усі питання, які я ставлю, спрямовані на розширення усвідомлення того, що вібдувається з Вами и навколо Вас.
            І цими питаннями я підсвічую «сліпі зони», які Ви не помічали. Часто цього достатньо, щоби Ви почали робити щось інакше в своєму житті.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7-content"
          id="panel7-header"
        >
          <Typography component="span">Чи можна записати на консультацію родича, чоловіка?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Дорослих я записую на консультацію тільки на їхнє власне прохання.
            Самостійне звернення - це свідчення власної мотивації до роботи та перший крок до вирішення проблем. 
            Це говорить про готовність щось робити для покращення якості свого життя. Робота з психотерапевтом – процес виключно добровільний. 
            Тут неможливе «чуже бажання, щоб інша людина змінилася».
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}