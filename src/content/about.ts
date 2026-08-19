import type { AboutRecord } from "./types";

const L = (uk: string, ru: string, en: string) => ({ uk, ru, en });

export const ABOUT: AboutRecord = {
  title: L(
    "Про психолога Ірину Комарову — освіта, методи, досвід",
    "О психологе Ирине Комаровой — образование, методы, опыт",
    "About psychologist Irina Komarova — education, methods, experience",
  ),
  description: L(
    "Хто така Ірина Комарова: гештальт-підхід, онлайн-терапія для дорослих, формат роботи. Освіта та сертифікати будуть додані.",
    "Кто такая Ирина Комарова: гештальт-подход, онлайн-терапия для взрослых, формат работы. Образование и сертификаты будут добавлены.",
    "Who Irina Komarova is: a Gestalt approach, online therapy for adults, how sessions work. Education and certificates will be added.",
  ),
  h1: L("Про спеціалістку", "О специалисте", "About the specialist"),
  intro: L(
    "Мене звати Ірина Комарова. Я психолог для дорослих. Працюю онлайн — з людьми в Україні та за кордоном.",
    "Меня зовут Ирина Комарова. Я психолог для взрослых. Работаю онлайн — с людьми в Украине и за границей.",
    "My name is Irina Komarova. I am a psychologist for adults. I work online — with people in Ukraine and abroad.",
  ),
  biography: {
    uk: [
      "Я допомагаю краще розуміти себе, свої реакції та стосунки з іншими.",
      "Працюю з тривогою, емоційними станами, внутрішніми конфліктами та життєвими кризами.",
      "Мій підхід індивідуальний: я не даю готових відповідей, а допомагаю вам самим їх знайти.",
      "Юридично послуги надає ФОП Комарова Ірина Володимирівна.",
    ],
    ru: [
      "Я помогаю лучше понимать себя, свои реакции и отношения с другими.",
      "Работаю с тревогой, эмоциональными состояниями, внутренними конфликтами и жизненными кризисами.",
      "Мой подход индивидуальный: я не даю готовых ответов, а помогаю вам самим их найти.",
      "Юридически услуги оказывает ФОП Комарова Ирина Владимировна.",
    ],
    en: [
      "I help people understand themselves, their reactions, and their relationships.",
      "I work with anxiety, emotional states, inner conflicts, and life crises.",
      "The approach is individual: I do not hand over ready-made answers. I help you find your own.",
      "Services are provided by FOP Komarova Irina Volodymyrivna.",
    ],
  },
  methodsTitle: L("Методи терапії", "Методы терапии", "Therapy methods"),
  methods: {
    uk: [
      "Практикую гештальт-терапію: роботу з переживаннями тут і тепер, без зайвого аналізу минулого заради аналізу.",
      "Важливий живий контакт: що відбувається між нами в сесії, часто відображає те, що відбувається у вашому житті.",
      "Увага до тіла, меж, вибору й відповідальності — не до ярликів.",
      "Формат індивідуальний (60 хв) або парний (80 хв).",
    ],
    ru: [
      "Практикую гештальт-терапию: работу с переживаниями здесь и сейчас, без лишнего анализа прошлого ради анализа.",
      "Важен живой контакт: то, что происходит между нами на сессии, часто отражает то, что происходит в вашей жизни.",
      "Внимание к телу, границам, выбору и ответственности — не к ярлыкам.",
      "Формат индивидуальный (60 мин) или парный (80 мин).",
    ],
    en: [
      "I practice Gestalt therapy: working with experience here and now, without analysing the past for its own sake.",
      "Live contact matters: what happens between us in the session often mirrors what happens in your life.",
      "Attention goes to the body, limits, choice, and responsibility — not to labels.",
      "Format: individual (60 min) or couples (80 min).",
    ],
  },
  format: {
    uk: [
      "Онлайн: Zoom, Google Meet або Telegram.",
      "Конфіденційно. Без черги.",
      "Індивідуальна сесія — 1900 грн / 60 хв. Парна — 3300 грн / 80 хв.",
    ],
    ru: [
      "Онлайн: Zoom, Google Meet или Telegram.",
      "Конфиденциально. Без очереди.",
      "Индивидуальная сессия — 1900 грн / 60 мин. Парная — 3300 грн / 80 мин.",
    ],
    en: [
      "Online: Zoom, Google Meet, or Telegram.",
      "Confidential. No waiting list.",
      "Individual session — 1900 UAH / 60 min. Couples — 3300 UAH / 80 min.",
    ],
  },
  educationPlaceholder: L(
    "Освіта буде додана. Тут з’явиться перелік навчальних закладів і кваліфікацій.",
    "Образование будет добавлено. Здесь появится список учебных заведений и квалификаций.",
    "Education will be added. A list of institutions and qualifications will appear here.",
  ),
  certificatesPlaceholder: L(
    "Сертифікати будуть додані. Тут з’являться підтверджені програми підвищення кваліфікації.",
    "Сертификаты будут добавлены. Здесь появятся подтверждённые программы повышения квалификации.",
    "Certificates will be added. Confirmed professional development programmes will appear here.",
  ),
  experiencePlaceholder: L(
    "Деталі професійного досвіду будуть додані: роки практики та фокус роботи.",
    "Детали профессионального опыта будут добавлены: годы практики и фокус работы.",
    "Professional experience details will be added: years of practice and focus of work.",
  ),
  diplomasPlaceholder: L(
    "Фото дипломів буде додано. Зараз галерея порожня — документи з’являться після завантаження.",
    "Фото дипломов будет добавлено. Сейчас галерея пустая — документы появятся после загрузки.",
    "Diploma photos will be added. The gallery is empty for now — documents will appear after upload.",
  ),
  faq: {
    uk: [
      {
        question: "З ким ви працюєте?",
        answer: "З дорослими. Індивідуально та в парі. Онлайн.",
      },
      {
        question: "Який у вас підхід?",
        answer:
          "Гештальт-терапія: опора на переживання в моменті, контакт і відповідальність, а не готові поради.",
      },
      {
        question: "Де можна подивитися дипломи?",
        answer:
          "Розділ із фото документів готується. Коли файли будуть додані, вони з’являться на цій сторінці.",
      },
      {
        question: "Як записатися?",
        answer:
          "Залиште заявку на сайті. Після підтвердження email зі мною зв’яжуться щодо зручного часу.",
      },
    ],
    ru: [
      {
        question: "С кем вы работаете?",
        answer: "Со взрослыми. Индивидуально и в паре. Онлайн.",
      },
      {
        question: "Какой у вас подход?",
        answer:
          "Гештальт-терапия: опора на переживание в моменте, контакт и ответственность, а не готовые советы.",
      },
      {
        question: "Где можно посмотреть дипломы?",
        answer:
          "Раздел с фото документов готовится. Когда файлы будут добавлены, они появятся на этой странице.",
      },
      {
        question: "Как записаться?",
        answer:
          "Оставьте заявку на сайте. После подтверждения email со мной свяжутся по удобному времени.",
      },
    ],
    en: [
      {
        question: "Who do you work with?",
        answer: "Adults. Individually and as a couple. Online.",
      },
      {
        question: "What is your approach?",
        answer:
          "Gestalt therapy: staying with experience in the moment, contact and responsibility, not ready-made advice.",
      },
      {
        question: "Where can I see diplomas?",
        answer:
          "The document gallery is being prepared. When files are added, they will appear on this page.",
      },
      {
        question: "How do I book?",
        answer:
          "Leave a request on the site. After email confirmation, we will arrange a time.",
      },
    ],
  },
};
