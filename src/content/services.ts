import type { ServiceRecord } from "./types";
import { ARTICLE_SLUGS_BY_SERVICE, SERVICE_PHOTOS } from "./catalog";

const L = (uk: string, ru: string, en: string) => ({ uk, ru, en });

function faq(
  rows: [string, string, string, string, string, string][],
): ServiceRecord["faq"] {
  return {
    uk: rows.map(([qUk, aUk]) => ({ question: qUk, answer: aUk })),
    ru: rows.map((row) => ({ question: row[2], answer: row[3] })),
    en: rows.map((row) => ({ question: row[4], answer: row[5] })),
  };
}

export const SERVICES: ServiceRecord[] = [
  {
    id: "anxiety",
    photo: SERVICE_PHOTOS.anxiety,
    name: L("Тривожність", "Тревожность", "Anxiety"),
    title: L(
      "Психолог при тривожності онлайн — Ірина Комарова",
      "Психолог при тревожности онлайн — Ирина Комарова",
      "Online psychologist for anxiety — Irina Komarova",
    ),
    description: L(
      "Онлайн-допомога психолога при тривожності: що це, ознаки, причини та як гештальт-терапія допомагає повернути спокій.",
      "Онлайн-помощь психолога при тревожности: что это, признаки, причины и как гештальт-терапия помогает вернуть спокойствие.",
      "Online psychological help for anxiety: what it is, signs, causes, and how Gestalt therapy can restore a sense of calm.",
    ),
    h1: L(
      "Психологічна допомога при тривожності",
      "Психологическая помощь при тревожности",
      "Psychological help for anxiety",
    ),
    intro: L(
      "Тривожність — це не «слабкість характеру». Це стан, у якому тіло й увага постійно шукають небезпеку, навіть коли зовні все відносно спокійно.",
      "Тревожность — это не «слабость характера». Это состояние, в котором тело и внимание постоянно ищут опасность, даже когда внешне всё относительно спокойно.",
      "Anxiety is not a character flaw. It is a state where body and attention keep scanning for danger, even when life looks relatively calm.",
    ),
    definition: L(
      "Тривожність — це стійке внутрішнє напруження, очікування поганого й утруднене розслаблення. Вона може бути фоновою або спалахувати хвилями.",
      "Тревожность — это устойчивое внутреннее напряжение, ожидание плохого и трудность расслабиться. Она может быть фоновой или вспыхивать волнами.",
      "Anxiety is persistent inner tension, a sense that something bad is coming, and difficulty relaxing. It can sit in the background or arrive in waves.",
    ),
    symptoms: {
      uk: ["Напруга в тілі, комок у горлі, серцебиття", "Нав’язливі думки «а раптом»", "Порушення сну", "Уникнення справ і рішень", "Подразливість або виснаження"],
      ru: ["Напряжение в теле, ком в горле, сердцебиение", "Навязчивые мысли «а вдруг»", "Нарушения сна", "Избегание дел и решений", "Раздражительность или истощение"],
      en: ["Body tension, throat tightness, racing heart", "What-if thoughts that will not stop", "Sleep disruption", "Avoiding tasks and decisions", "Irritability or exhaustion"],
    },
    causes: {
      uk: ["Тривала невизначеність і стрес", "Переїзд, війна, втрати", "Високі вимоги до себе", "Конфлікти в стосунках", "Звичний спосіб контролювати життя через тривогу"],
      ru: ["Длительная неопределённость и стресс", "Переезд, война, потери", "Высокие требования к себе", "Конфликты в отношениях", "Привычный способ контролировать жизнь через тревогу"],
      en: ["Long uncertainty and stress", "Relocation, war, loss", "Harsh self-demands", "Relationship conflict", "Using worry as a way to stay in control"],
    },
    howTherapyHelps: L(
      "У терапії ми не «вимикаємо» тривогу наказом. Ми досліджуємо, що саме вона намагається захистити, і вчимося спиратися на себе в моменті — тілом, диханням, вибором, а не катастрофічними сценаріями.",
      "В терапии мы не «выключаем» тревогу приказом. Мы исследуем, что именно она пытается защитить, и учимся опираться на себя в моменте — телом, дыханием, выбором, а не катастрофическими сценариями.",
      "Therapy does not switch anxiety off by command. We explore what it is trying to protect, and practice relying on yourself in the present — through the body, breath, and choice, not catastrophe scripts.",
    ),
    methods: {
      uk: ["Гештальт-терапія «тут і тепер»", "Робота з тілесними сигналами тривоги", "Розрізнення реальної загрози і звичної напруги", "Підтримка в рішеннях без поспіху"],
      ru: ["Гештальт-терапия «здесь и сейчас»", "Работа с телесными сигналами тревоги", "Различение реальной угрозы и привычного напряжения", "Поддержка в решениях без спешки"],
      en: ["Gestalt therapy in the here and now", "Working with bodily anxiety signals", "Telling real threat from habitual tension", "Support for decisions without rushing"],
    },
    format: L(
      "Онлайн, 60 хвилин. Zoom, Google Meet або Telegram. Конфіденційно, без черги.",
      "Онлайн, 60 минут. Zoom, Google Meet или Telegram. Конфиденциально, без очереди.",
      "Online, 60 minutes. Zoom, Google Meet, or Telegram. Confidential, no waiting list.",
    ),
    faq: faq([
      ["Чи можна працювати з тривогою онлайн?", "Так. Для тривожності онлайн-формат часто навіть зручніший: ви залишаєтесь у своєму просторі й можете одразу помічати, як тіло реагує.", "Можно ли работать с тревогой онлайн?", "Да. Для тревожности онлайн-формат часто даже удобнее: вы остаётесь в своём пространстве и сразу замечаете реакции тела.", "Can anxiety be treated online?", "Yes. For anxiety, online sessions are often even more convenient: you stay in your own space and can notice body reactions immediately."],
      ["Скільки сесій потрібно?", "Перші зміни в самоспостереженні часто з’являються за кілька зустрічей. Стійкіші зміни потребують регулярної роботи — психіка формувалась роками.", "Сколько сессий нужно?", "Первые изменения в самонаблюдении часто появляются за несколько встреч. Более устойчивые изменения требуют регулярной работы — психика формировалась годами.", "How many sessions will I need?", "Early shifts in self-observation often appear within a few meetings. Lasting change needs regular work — the psyche was shaped over years."],
      ["Це вже розлад чи просто стрес?", "Діагноз ставить лікар. Психолог допомагає зрозуміти, як тривога впливає на життя і що з цим робити, навіть якщо ви ще не були в психіатра.", "Это уже расстройство или просто стресс?", "Диагноз ставит врач. Психолог помогает понять, как тревога влияет на жизнь и что с этим делать, даже если вы ещё не были у психиатра.", "Is this a disorder or just stress?", "A medical diagnosis is made by a doctor. A psychologist helps you see how anxiety affects your life and what to do, even before you see a psychiatrist."],
      ["Що якщо тривога дуже сильна?", "Якщо є думки про самоушкодження, різка втрата сну чи апетиту, варто паралельно звернутися по медичну допомогу. Терапія може йти разом із цим.", "Что если тревога очень сильная?", "Если есть мысли о самоповреждении, резкая потеря сна или аппетита, стоит параллельно обратиться за медицинской помощью. Терапия может идти вместе с этим.", "What if the anxiety is very intense?", "If there are thoughts of self-harm or a sharp collapse of sleep or appetite, seek medical help in parallel. Therapy can continue alongside that."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.anxiety.slice(0, 4),
  },
  {
    id: "panic-attacks",
    photo: SERVICE_PHOTOS["panic-attacks"],
    name: L("Панічні атаки", "Панические атаки", "Panic attacks"),
    title: L(
      "Психолог при панічних атаках онлайн — Ірина Комарова",
      "Психолог при панических атаках онлайн — Ирина Комарова",
      "Online psychologist for panic attacks — Irina Komarova",
    ),
    description: L(
      "Допомога при панічних атаках: що відбувається з тілом, як відрізнити паніку від тривоги та як терапія зменшує страх наступного нападу.",
      "Помощь при панических атаках: что происходит с телом, как отличить панику от тревоги и как терапия снижает страх следующего приступа.",
      "Help with panic attacks: what happens in the body, how panic differs from anxiety, and how therapy reduces fear of the next attack.",
    ),
    h1: L(
      "Психологічна допомога при панічних атаках",
      "Психологическая помощь при панических атаках",
      "Psychological help for panic attacks",
    ),
    intro: L(
      "Панічна атака відчувається як раптова загроза життю: серце, дихання, запаморочення. Після цього часто з’являється страх, що напад повториться.",
      "Паническая атака ощущается как внезапная угроза жизни: сердце, дыхание, головокружение. После этого часто появляется страх, что приступ повторится.",
      "A panic attack feels like sudden danger to life: heart, breath, dizziness. Afterwards, fear that it will happen again often takes over.",
    ),
    definition: L(
      "Панічна атака — це короткий інтенсивний сплеск страху з сильними тілесними симптомами. Сама по собі вона не є «божевіллям» і не означає, що ви втрачаєте контроль назавжди.",
      "Паническая атака — это короткий интенсивный всплеск страха с сильными телесными симптомами. Сама по себе она не является «безумием» и не значит, что вы навсегда теряете контроль.",
      "A panic attack is a short, intense surge of fear with strong bodily symptoms. It is not “going crazy” and does not mean you have lost control forever.",
    ),
    symptoms: {
      uk: ["Раптове серцебиття й нестача повітря", "Піт, тремтіння, нудота", "Страх смерті або «я зараз зійду з розуму»", "Уникнення місць, де вже було погано", "Постійне прислуховування до тіла"],
      ru: ["Внезапное сердцебиение и нехватка воздуха", "Пот, дрожь, тошнота", "Страх смерти или «я сейчас сойду с ума»", "Избегание мест, где уже было плохо", "Постоянное прислушивание к телу"],
      en: ["Sudden racing heart and shortness of breath", "Sweating, shaking, nausea", "Fear of dying or “going crazy”", "Avoiding places where it happened before", "Constantly monitoring the body"],
    },
    causes: {
      uk: ["Накопичений стрес і виснаження", "Різкі зміни в житті", "Страх самих тілесних відчуттів", "Тривожний фон, який довго ігнорували", "Спроба «тримати все всередині»"],
      ru: ["Накопленный стресс и истощение", "Резкие изменения в жизни", "Страх самих телесных ощущений", "Тревожный фон, который долго игнорировали", "Попытка «держать всё внутри»"],
      en: ["Accumulated stress and exhaustion", "Sudden life changes", "Fear of the bodily sensations themselves", "A long-ignored anxiety background", "Trying to hold everything inside"],
    },
    howTherapyHelps: L(
      "Ми вчимося не боротися з тілом як із ворогом, а бути з відчуттями безпечніше. Коли страх самої атаки слабшає, напади зазвичай стають рідшими й коротшими.",
      "Мы учимся не бороться с телом как с врагом, а быть с ощущениями безопаснее. Когда страх самой атаки слабеет, приступы обычно становятся реже и короче.",
      "We learn not to fight the body as an enemy, but to stay safer with the sensations. As fear of the attack itself eases, episodes often become rarer and shorter.",
    ),
    methods: {
      uk: ["Гештальт-підхід до страху й контролю", "Опора на дихання і тілесну присутність", "Розбір уникання", "Відновлення відчуття безпеки в повсякденні"],
      ru: ["Гештальт-подход к страху и контролю", "Опора на дыхание и телесную присутственность", "Разбор избегания", "Восстановление ощущения безопасности в повседневности"],
      en: ["A Gestalt approach to fear and control", "Breath and bodily presence", "Working with avoidance", "Rebuilding everyday safety"],
    },
    format: L(
      "Онлайн, 60 хвилин. Можна починати навіть якщо ви боїтеся, що атака трапиться під час сесії — це теж можна прожити в контакті.",
      "Онлайн, 60 минут. Можно начинать даже если вы боитесь, что атака случится во время сессии — это тоже можно прожить в контакте.",
      "Online, 60 minutes. You can start even if you fear an attack during the session — that, too, can be lived through in contact.",
    ),
    faq: faq([
      ["Панічна атака — це інфаркт?", "Симптоми можуть бути схожі, тому медичне обстеження корисне, щоб виключити соматичні причини. Якщо серце перевірене, далі працюємо зі страхом і нервовою системою.", "Паническая атака — это инфаркт?", "Симптомы могут быть похожи, поэтому медицинское обследование полезно, чтобы исключить соматические причины. Если сердце проверено, дальше работаем со страхом и нервной системой.", "Is a panic attack a heart attack?", "Symptoms can look similar, so a medical check is useful to rule out physical causes. If the heart is fine, we work with fear and the nervous system."],
      ["Чи можна зупинити атаку самостійно?", "Можна зменшити інтенсивність: сісти, спертися ногами, подовжити видих. Це не завжди «вимикає» напад, але знижує відчуття катастрофи.", "Можно ли остановить атаку самостоятельно?", "Можно снизить интенсивность: сесть, опереться ногами, удлинить выдох. Это не всегда «выключает» приступ, но снижает ощущение катастрофы.", "Can I stop an attack on my own?", "You can reduce intensity: sit, feel your feet, lengthen the exhale. It may not switch the attack off, but it lowers the sense of catastrophe."],
      ["Чому атаки приходять «на рівному місці»?", "Часто тіло накопичує напругу довго, а сплеск відбувається, коли контроль трохи слабшає — у транспорті, в магазині, перед сном.", "Почему атаки приходят «на ровном месте»?", "Часто тело копит напряжение долго, а всплеск случается, когда контроль чуть слабеет — в транспорте, в магазине, перед сном.", "Why do attacks come out of nowhere?", "The body often stores tension for a long time. The surge happens when control slips a little — on transport, in a shop, before sleep."],
      ["Чи потрібні ліки?", "Це вирішує лікар. Психотерапія працює зі страхом повторення й униканням. Іноді поєднують обидва шляхи.", "Нужны ли лекарства?", "Это решает врач. Психотерапия работает со страхом повторения и избеганием. Иногда сочетают оба пути.", "Do I need medication?", "A doctor decides that. Psychotherapy works with fear of recurrence and avoidance. Sometimes both paths are combined."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE["panic-attacks"].slice(0, 4),
  },
  {
    id: "depression",
    photo: SERVICE_PHOTOS.depression,
    name: L("Депресія", "Депрессия", "Depression"),
    title: L(
      "Психолог при депресії онлайн — Ірина Комарова",
      "Психолог при депрессии онлайн — Ирина Комарова",
      "Online psychologist for depression — Irina Komarova",
    ),
    description: L(
      "Онлайн-підтримка при зниженому настрої та депресії: ознаки, відмінність від смутку, коли звертатися і як терапія повертає опору.",
      "Онлайн-поддержка при сниженном настроении и депрессии: признаки, отличие от грусти, когда обращаться и как терапия возвращает опору.",
      "Online support for low mood and depression: signs, how it differs from sadness, when to seek help, and how therapy restores support.",
    ),
    h1: L("Психологічна допомога при депресії", "Психологическая помощь при депрессии", "Psychological help for depression"),
    intro: L(
      "Депресія — це не «просто поганий настрій». Часто зникає смак до життя, сили й відчуття, що від вас щось залежить.",
      "Депрессия — это не «просто плохое настроение». Часто пропадает вкус к жизни, силы и ощущение, что от вас что-то зависит.",
      "Depression is not “just a bad mood”. Taste for life, energy, and the sense that your actions matter often fade.",
    ),
    definition: L(
      "Депресивний стан — це стійке зниження настрою, енергії та інтересу, яке триває тижнями й змінює сон, апетит, самооцінку й контакти з людьми.",
      "Депрессивное состояние — это устойчивое снижение настроения, энергии и интереса, которое длится неделями и меняет сон, аппетит, самооценку и контакты с людьми.",
      "A depressive state is a lasting drop in mood, energy, and interest that continues for weeks and changes sleep, appetite, self-worth, and contact with people.",
    ),
    symptoms: {
      uk: ["Порожнеча або важкість замість емоцій", "Втома навіть після відпочинку", "Втрата інтересу до звичних справ", "Самозвинувачення", "Відкладання найпростіших дій"],
      ru: ["Пустота или тяжесть вместо эмоций", "Усталость даже после отдыха", "Потеря интереса к привычным делам", "Самообвинение", "Откладывание самых простых действий"],
      en: ["Emptiness or heaviness instead of feeling", "Tiredness even after rest", "Loss of interest in usual things", "Self-blame", "Putting off the simplest actions"],
    },
    causes: {
      uk: ["Втрати й не прожиті емоції", "Тривале виснаження", "Ізоляція", "Жорстка самокритика", "Кризи ідентичності та сенсу"],
      ru: ["Потери и непрожитые эмоции", "Длительное истощение", "Изоляция", "Жёсткая самокритика", "Кризисы идентичности и смысла"],
      en: ["Loss and unlived emotion", "Long exhaustion", "Isolation", "Harsh self-criticism", "Crises of identity and meaning"],
    },
    howTherapyHelps: L(
      "У безпечному контакті з’являється місце для важкого, без вимоги «взяти себе в руки». Поступово повертається опора: маленькі кроки, живі почуття, менше самозвинувачення.",
      "В безопасном контакте появляется место для тяжёлого, без требования «взять себя в руки». Постепенно возвращается опора: маленькие шаги, живые чувства, меньше самообвинения.",
      "In safe contact there is room for the heavy, without being told to “pull yourself together”. Support returns gradually: small steps, live feeling, less self-blame.",
    ),
    methods: {
      uk: ["Гештальт-терапія контакту й підтримки", "Робота з самокритикою", "Відновлення тілесної чутливості", "Опора в щоденних діях без насильства над собою"],
      ru: ["Гештальт-терапия контакта и поддержки", "Работа с самокритикой", "Восстановление телесной чувствительности", "Опора в ежедневных действиях без насилия над собой"],
      en: ["Gestalt therapy of contact and support", "Working with self-criticism", "Restoring bodily sensitivity", "Daily actions without violence toward yourself"],
    },
    format: L(
      "Онлайн, 60 хвилин. Якщо стан дуже важкий, терапія не замінює психіатра — можна поєднувати.",
      "Онлайн, 60 минут. Если состояние очень тяжёлое, терапия не заменяет психиатра — можно сочетать.",
      "Online, 60 minutes. If the state is very severe, therapy does not replace a psychiatrist — both can run together.",
    ),
    faq: faq([
      ["Чим депресія відрізняється від смутку?", "Смуток рухається й пов’язаний із подією. Депресивний стан тримається, забирає сили й часто позбавляє навіть смутку — лишається порожнеча.", "Чем депрессия отличается от грусти?", "Грусть движется и связана с событием. Депрессивное состояние держится, забирает силы и часто лишает даже грусти — остаётся пустота.", "How is depression different from sadness?", "Sadness moves and is tied to an event. A depressive state persists, drains energy, and often takes sadness away too — leaving emptiness."],
      ["Чи можна вийти самій?", "Підтримка близьких і режим допомагають, але при стійкому стані потрібен спеціаліст. Це не слабкість, а турбота.", "Можно ли выйти самой?", "Поддержка близких и режим помогают, но при устойчивом состоянии нужен специалист. Это не слабость, а забота.", "Can I get out of it alone?", "Support and routine help, but a lasting state needs a specialist. That is care, not weakness."],
      ["Онлайн підійде, якщо немає сил виходити?", "Так. Саме тому багато людей починають онлайн: менше бар’єру, ніж дістатися кабінету.", "Онлайн подойдёт, если нет сил выходить?", "Да. Именно поэтому многие начинают онлайн: барьер ниже, чем добраться до кабинета.", "Is online work OK if I cannot leave home?", "Yes. That is why many people start online: the barrier is lower than reaching an office."],
      ["Що якщо є думки, що життя не має сенсу?", "Це важливий сигнал звернутися по допомогу терміново, зокрема медичну. У терапії ми тримаємо цей біль разом, не лишаючи вас наодинці.", "Что если есть мысли, что жизнь не имеет смысла?", "Это важный сигнал обратиться за помощью срочно, в том числе медицинской. В терапии мы держим эту боль вместе, не оставляя вас наедине.", "What if life feels meaningless?", "That is a signal to seek help urgently, including medical help. In therapy we hold that pain together so you are not alone with it."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.depression.slice(0, 4),
  },
  {
    id: "relationships",
    photo: SERVICE_PHOTOS.relationships,
    name: L("Стосунки", "Отношения", "Relationships"),
    title: L(
      "Психолог для стосунків онлайн — Ірина Комарова",
      "Психолог для отношений онлайн — Ирина Комарова",
      "Online psychologist for relationships — Irina Komarova",
    ),
    description: L(
      "Індивідуальна та парна робота зі стосунками: конфлікти, дистанція, повторення сценаріїв, тривога в парі.",
      "Индивидуальная и парная работа с отношениями: конфликты, дистанция, повторение сценариев, тревога в паре.",
      "Individual and couples work on relationships: conflict, distance, repeating scripts, anxiety in the pair.",
    ),
    h1: L("Психологічна допомога в стосунках", "Психологическая помощь в отношениях", "Psychological help with relationships"),
    intro: L(
      "Стосунки часто болять не тому, що «вам не пощастило з людьми», а тому, що в парі зустрічаються два способи захищатися.",
      "Отношения часто болят не потому, что «вам не повезло с людьми», а потому что в паре встречаются два способа защищаться.",
      "Relationships often hurt not because you are “unlucky with people”, but because two ways of protecting the self meet in a pair.",
    ),
    definition: L(
      "Труднощі в стосунках — це повторювані цикли сварки, дистанції, образи чи злиття, у яких важко бути собою й бути разом одночасно.",
      "Трудности в отношениях — это повторяющиеся циклы ссоры, дистанции, обиды или слияния, в которых трудно быть собой и быть вместе одновременно.",
      "Relationship difficulty is a repeating cycle of fighting, distance, resentment, or fusion, where it is hard to be yourself and together at once.",
    ),
    symptoms: {
      uk: ["Одні й ті самі сварки", "Страх близькості або покинутості", "Мовчання замість розмови", "Ревнощі, контроль, перевірка", "Відчуття, що вас не чують"],
      ru: ["Одни и те же ссоры", "Страх близости или покинутости", "Молчание вместо разговора", "Ревность, контроль, проверка", "Ощущение, что вас не слышат"],
      en: ["The same fights on repeat", "Fear of closeness or abandonment", "Silence instead of talking", "Jealousy, control, checking", "Feeling unheard"],
    },
    causes: {
      uk: ["Ранні моделі прив’язаності", "Непроговорені очікування", "Тривога і контроль", "Втома й дефіцит підтримки", "Кризи (переїзд, діти, війна)"],
      ru: ["Ранние модели привязанности", "Непроговорённые ожидания", "Тревога и контроль", "Усталость и дефицит поддержки", "Кризисы (переезд, дети, война)"],
      en: ["Early attachment patterns", "Unspoken expectations", "Anxiety and control", "Fatigue and lack of support", "Crises (move, children, war)"],
    },
    howTherapyHelps: L(
      "Ми дивимось не «хто винен», а як ви зустрічаєтесь. З’являється мова бажань і меж, менше захисту й більше живого контакту.",
      "Мы смотрим не «кто виноват», а как вы встречаетесь. Появляется язык желаний и границ, меньше защиты и больше живого контакта.",
      "We look not at “who is to blame”, but at how you meet. A language of wants and limits appears, with less defence and more live contact.",
    ),
    methods: {
      uk: ["Індивідуальна гештальт-терапія", "Парна терапія 80 хвилин", "Робота з циклом конфлікту", "Контакт із почуттями замість звинувачень"],
      ru: ["Индивидуальная гештальт-терапия", "Парная терапия 80 минут", "Работа с циклом конфликта", "Контакт с чувствами вместо обвинений"],
      en: ["Individual Gestalt therapy", "Couples therapy, 80 minutes", "Working the conflict cycle", "Contact with feeling instead of blame"],
    },
    format: L(
      "Індивідуально 60 хв / 1900 грн або парна зустріч 80 хв / 3300 грн. Онлайн.",
      "Индивидуально 60 мин / 1900 грн или парная встреча 80 мин / 3300 грн. Онлайн.",
      "Individual 60 min / 1900 UAH or couples 80 min / 3300 UAH. Online.",
    ),
    faq: faq([
      ["Чи можна прийти без партнера?", "Так. Індивідуальна робота зі стосунками часто змінює пару, бо змінюється ваша частина циклу.", "Можно ли прийти без партнёра?", "Да. Индивидуальная работа с отношениями часто меняет пару, потому что меняется ваша часть цикла.", "Can I come without a partner?", "Yes. Individual work on relationships often changes the pair, because your part of the cycle changes."],
      ["Парна терапія — це щоб «полагодити» партнера?", "Ні. Це простір для двох. Якщо хтось хоче лише довести провину іншого, ми зупиняємось і шукаємо інший запит.", "Парная терапия — это чтобы «починить» партнёра?", "Нет. Это пространство для двоих. Если кто-то хочет только доказать вину другого, мы останавливаемся и ищем другой запрос.", "Is couples therapy for fixing my partner?", "No. It is a space for two. If someone only wants to prove the other guilty, we pause and look for another request."],
      ["Ми на межі розставання. Чи пізно?", "Не обов’язково. Іноді терапія допомагає розійтись гідно. Іноді — побачити, що ще живе між вами.", "Мы на грани расставания. Поздно?", "Не обязательно. Иногда терапия помогает разойтись достойно. Иногда — увидеть, что ещё живо между вами.", "We are close to breaking up. Is it too late?", "Not necessarily. Sometimes therapy helps you part with dignity. Sometimes it shows what is still alive between you."],
      ["Скільки триває парна сесія?", "80 хвилин. Цього часу зазвичай достатньо, щоб почути обох і не обірвати процес на середині.", "Сколько длится парная сессия?", "80 минут. Этого времени обычно достаточно, чтобы услышать обоих и не оборвать процесс на середине.", "How long is a couples session?", "80 minutes. That is usually enough to hear both people without cutting the process in half."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.relationships.slice(0, 4),
  },
  {
    id: "self-esteem",
    photo: SERVICE_PHOTOS["self-esteem"],
    name: L("Самооцінка", "Самооценка", "Self-esteem"),
    title: L(
      "Психолог при низькій самооцінці онлайн — Ірина Комарова",
      "Психолог при низкой самооценке онлайн — Ирина Комарова",
      "Online psychologist for low self-esteem — Irina Komarova",
    ),
    description: L(
      "Робота з невпевненістю, самокритикою та відчуттям «я недостатня»: як формується самооцінка і як терапія змінює внутрішній голос.",
      "Работа с неуверенностью, самокритикой и ощущением «я недостаточна»: как формируется самооценка и как терапия меняет внутренний голос.",
      "Work with self-doubt, self-criticism, and “I am not enough”: how self-esteem forms and how therapy changes the inner voice.",
    ),
    h1: L("Психологічна допомога при низькій самооцінці", "Психологическая помощь при низкой самооценке", "Psychological help for low self-esteem"),
    intro: L(
      "Низька самооцінка рідко лікується компліментами. Всередині звучить суддя, якому зовнішні успіхи не зараховуються.",
      "Низкая самооценка редко лечится комплиментами. Внутри звучит судья, которому внешние успехи не засчитываются.",
      "Low self-esteem is rarely healed by compliments. An inner judge keeps the score, and outer success does not count.",
    ),
    definition: L(
      "Низька самооцінка — це стійке відчуття власної неповноцінності, залежність від оцінки інших і труднощі спиратися на свої потреби.",
      "Низкая самооценка — это устойчивое ощущение собственной неполноценности, зависимость от оценки других и трудность опираться на свои потребности.",
      "Low self-esteem is a stable sense of not being enough, depending on others’ evaluation, and struggling to stand on your own needs.",
    ),
    symptoms: {
      uk: ["Порівняння себе з усіма", "Відкладання через страх помилки", "Важко сказати «ні»", "Сором за свої бажання", "Успіх не радує надовго"],
      ru: ["Сравнение себя со всеми", "Откладывание из-за страха ошибки", "Трудно сказать «нет»", "Стыд за свои желания", "Успех не радует надолго"],
      en: ["Comparing yourself with everyone", "Delaying from fear of mistakes", "Hard to say no", "Shame about your wants", "Success does not last as joy"],
    },
    causes: {
      uk: ["Умовна любов у дитинстві", "Критика й порівняння", "Булінг або токсичні стосунки", "Перфекціонізм як захист", "Міграція й втрата статусу"],
      ru: ["Условная любовь в детстве", "Критика и сравнения", "Буллинг или токсичные отношения", "Перфекционизм как защита", "Миграция и потеря статуса"],
      en: ["Conditional love in childhood", "Criticism and comparison", "Bullying or toxic relationships", "Perfectionism as protection", "Migration and loss of status"],
    },
    howTherapyHelps: L(
      "Ми зустрічаємо внутрішнього критика не війною, а інтересом: кого він захищав. Поступово з’являється право бути живою, а не ідеальною.",
      "Мы встречаем внутреннего критика не войной, а интересом: кого он защищал. Постепенно появляется право быть живой, а не идеальной.",
      "We meet the inner critic with interest, not war: who was it protecting? Gradually you gain the right to be alive, not perfect.",
    ),
    methods: {
      uk: ["Гештальт-діалог із внутрішнім суддею", "Опора на тілесне «я хочу / я не хочу»", "Межі в стосунках", "Досвід прийняття в контакті з терапевтом"],
      ru: ["Гештальт-диалог с внутренним судьёй", "Опора на телесное «я хочу / я не хочу»", "Границы в отношениях", "Опыт принятия в контакте с терапевтом"],
      en: ["Gestalt dialogue with the inner judge", "Body-based I want / I don’t want", "Boundaries in relationships", "An experience of being received in contact"],
    },
    format: L(
      "Індивідуальні онлайн-сесії 60 хвилин. Темп м’який: без «прокачки впевненості» через насильство над собою.",
      "Индивидуальные онлайн-сессии 60 минут. Темп мягкий: без «прокачки уверенности» через насилие над собой.",
      "Individual online sessions, 60 minutes. A gentle pace: no “confidence training” through self-violence.",
    ),
    faq: faq([
      ["Чому афірмації не допомагають?", "Бо внутрішня частина, яка не вірить, стає ще голоснішою. Потрібен контакт із нею, а не шар позитиву зверху.", "Почему аффирмации не помогают?", "Потому что внутренняя часть, которая не верит, становится ещё громче. Нужен контакт с ней, а не слой позитива сверху.", "Why don’t affirmations help?", "Because the part that does not believe gets louder. It needs contact, not a layer of positivity on top."],
      ["Це невпевненість чи характер?", "Характер — це те, як ви навчилися виживати. У терапії можна навчитися інакше, не ламаючи себе.", "Это неуверенность или характер?", "Характер — это то, как вы научились выживать. В терапии можно научиться иначе, не ломая себя.", "Is this shyness or personality?", "Personality here is how you learned to survive. Therapy can teach another way without breaking you."],
      ["Чи допоможе, якщо я «функціоную»?", "Так. Багато людей із низькою самооцінкою зовні успішні. Всередині — порожнеча після кожного досягнення.", "Поможет ли, если я «функционирую»?", "Да. Многие люди с низкой самооценкой внешне успешны. Внутри — пустота после каждого достижения.", "Will it help if I still function?", "Yes. Many people with low self-esteem look successful. Inside, each achievement is followed by emptiness."],
      ["Скільки часу займає зміна самооцінки?", "Це не тиждень. Але вже на початку з’являється інше ставлення до внутрішнього голосу — і від цього стає легше дихати.", "Сколько времени занимает изменение самооценки?", "Это не неделя. Но уже в начале появляется другое отношение к внутреннему голосу — и от этого становится легче дышать.", "How long does self-esteem work take?", "Not a week. Early on, though, your relationship to the inner voice already shifts — and breathing gets easier."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE["self-esteem"].slice(0, 4),
  },
  {
    id: "burnout",
    photo: SERVICE_PHOTOS.burnout,
    name: L("Вигорання", "Выгорание", "Burnout"),
    title: L(
      "Психолог при вигоранні онлайн — Ірина Комарова",
      "Психолог при выгорании онлайн — Ирина Комарова",
      "Online psychologist for burnout — Irina Komarova",
    ),
    description: L(
      "Допомога при емоційному вигоранні: ознаки, відмінність від депресії, межі, відновлення ресурсу в терапії.",
      "Помощь при эмоциональном выгорании: признаки, отличие от депрессии, границы, восстановление ресурса в терапии.",
      "Help with burnout: signs, how it differs from depression, boundaries, and restoring resource in therapy.",
    ),
    h1: L("Психологічна допомога при вигоранні", "Психологическая помощь при выгорании", "Psychological help for burnout"),
    intro: L(
      "Вигорання приходить не від «ліні», а від довгого життя без відновлення: робота, дім, турбота про інших, війна, еміграція.",
      "Выгорание приходит не от «лени», а от долгой жизни без восстановления: работа, дом, забота о других, война, эмиграция.",
      "Burnout does not come from laziness. It comes from living too long without recovery: work, home, caring, war, emigration.",
    ),
    definition: L(
      "Вигорання — це виснаження емоцій, цинізм або відчуженість до справи й падіння відчуття ефективності. Це сигнал системи, а не вирок «ви слабкі».",
      "Выгорание — это истощение эмоций, цинизм или отстранённость к делу и падение ощущения эффективности. Это сигнал системы, а не приговор «вы слабые».",
      "Burnout is emotional exhaustion, cynicism or detachment from the work, and a drop in felt effectiveness. It is a system signal, not a verdict that you are weak.",
    ),
    symptoms: {
      uk: ["Байдужість там, де раніше було включення", "Дратівливість до колег і близьких", "Погіршення сну й концентрації", "Відчуття, що «мене немає»", "Тілесна втома, якої не знімає вихідний"],
      ru: ["Равнодушие там, где раньше было включение", "Раздражительность к коллегам и близким", "Ухудшение сна и концентрации", "Ощущение, что «меня нет»", "Телесная усталость, которую не снимает выходной"],
      en: ["Indifference where you used to care", "Irritability with colleagues and family", "Worse sleep and focus", "A sense that “I am gone”", "Body fatigue a weekend cannot fix"],
    },
    causes: {
      uk: ["Хронічне перевантаження", "Відсутність меж", "Відповідальність за всіх", "Відсутність визнання", "Тривалий стрес середовища"],
      ru: ["Хроническая перегрузка", "Отсутствие границ", "Ответственность за всех", "Отсутствие признания", "Длительный стресс среды"],
      en: ["Chronic overload", "No boundaries", "Responsibility for everyone", "Lack of recognition", "Long environmental stress"],
    },
    howTherapyHelps: L(
      "Ми шукаємо, де ви зникаєте заради функції. Повертаємо право на межу, відпочинок і «достатньо» — без сорому.",
      "Мы ищем, где вы исчезаете ради функции. Возвращаем право на границу, отдых и «достаточно» — без стыда.",
      "We look for where you disappear into a function. We restore the right to a limit, rest, and “enough” — without shame.",
    ),
    methods: {
      uk: ["Гештальт-робота з межами", "Контакт із тілесною втомою", "Відділення своїх потреб від чужих очікувань", "Відновлення сенсу без самопожертви"],
      ru: ["Гештальт-работа с границами", "Контакт с телесной усталостью", "Отделение своих потребностей от чужих ожиданий", "Восстановление смысла без самопожертвования"],
      en: ["Gestalt work with boundaries", "Contact with bodily fatigue", "Separating your needs from others’ expectations", "Meaning without self-sacrifice"],
    },
    format: L(
      "Онлайн 60 хвилин. Можна почати навіть якщо здається, що «на терапію теж немає сил» — темп підлаштовуємо.",
      "Онлайн 60 минут. Можно начать даже если кажется, что «на терапию тоже нет сил» — темп подстраиваем.",
      "Online, 60 minutes. You can start even if it feels like there is no energy for therapy either — we adjust the pace.",
    ),
    faq: faq([
      ["Вигорання і депресія — це одне?", "Ні. Вони можуть накладатися, але вигорання частіше прив’язане до ролі й навантаження. Якщо є стійка порожнеча й безнадія — потрібна ширша оцінка.", "Выгорание и депрессия — это одно?", "Нет. Они могут накладываться, но выгорание чаще привязано к роли и нагрузке. Если есть устойчивая пустота и безнадёжность — нужна более широкая оценка.", "Are burnout and depression the same?", "No. They can overlap, but burnout is more tied to role and load. Lasting emptiness and hopelessness need a wider assessment."],
      ["Чи допоможе відпустка?", "Коротко — так. Якщо за тиждень ви знову в тому ж режимі, потрібна зміна способу жити, не лише «відіспатися».", "Поможет ли отпуск?", "Кратко — да. Если через неделю вы снова в том же режиме, нужна смена способа жить, не только «отоспаться».", "Will a holiday fix it?", "Briefly, yes. If a week later you are back in the same regime, you need a different way of living, not only sleep."],
      ["Я допомагаю іншим. Це нормально, що я порожня?", "Так, це часте вигорання тих, хто тримає інших. Ваше виснаження — не доказ, що ви «погана».", "Я помогаю другим. Это нормально, что я пустая?", "Да, это частое выгорание тех, кто держит других. Ваше истощение — не доказательство, что вы «плохая».", "I help others. Is it normal to feel empty?", "Yes. This is common burnout in people who hold others. Exhaustion is not proof that you are bad."],
      ["Чи треба звільнятися?", "Не завжди. Спочатку дивимось на межі, сенс і відновлення. Рішення про роботу — ваше, не «домашнє завдання терапевта».", "Нужно ли увольняться?", "Не всегда. Сначала смотрим на границы, смысл и восстановление. Решение о работе — ваше, не «домашнее задание терапевта».", "Do I have to quit my job?", "Not always. First we look at limits, meaning, and recovery. The job decision is yours, not a therapist homework task."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.burnout.slice(0, 4),
  },
  {
    id: "divorce",
    photo: SERVICE_PHOTOS.divorce,
    name: L("Розлучення", "Развод", "Divorce"),
    title: L(
      "Психолог при розлученні онлайн — Ірина Комарова",
      "Психолог при разводе онлайн — Ирина Комарова",
      "Online psychologist during divorce — Irina Komarova",
    ),
    description: L(
      "Підтримка під час і після розлучення: горе, вина, злість, життя після розриву, емоції, якщо є діти.",
      "Поддержка во время и после развода: горе, вина, злость, жизнь после разрыва, эмоции, если есть дети.",
      "Support during and after divorce: grief, guilt, anger, life after the break, and emotions when children are involved.",
    ),
    h1: L("Психологічна допомога при розлученні", "Психологическая помощь при разводе", "Psychological help during divorce"),
    intro: L(
      "Розлучення — це не лише папери. Це втрата спільного світу, навіть якщо розрив був потрібним.",
      "Развод — это не только бумаги. Это потеря общего мира, даже если разрыв был нужен.",
      "Divorce is not only paperwork. It is the loss of a shared world, even when the break was needed.",
    ),
    definition: L(
      "Емоційне переживання розлучення — це горе, хаос ролей, коливання між полегшенням і порожнечею. Це нормальний процес, який можна пройти не наодинці.",
      "Эмоциональное переживание развода — это горе, хаос ролей, колебания между облегчением и пустотой. Это нормальный процесс, который можно пройти не в одиночку.",
      "The emotional process of divorce is grief, role chaos, and swings between relief and emptiness. It is a normal process you do not have to walk alone.",
    ),
    symptoms: {
      uk: ["Хвилі сліз, злості, апатії", "Порушення сну й апетиту", "Зацикленість на колишніх", "Провина або сором", "Страх самотності й майбутнього"],
      ru: ["Волны слёз, злости, апатии", "Нарушения сна и аппетита", "Зацикленность на бывших", "Вина или стыд", "Страх одиночества и будущего"],
      en: ["Waves of tears, anger, apathy", "Sleep and appetite changes", "Rumination about the ex-partner", "Guilt or shame", "Fear of loneliness and the future"],
    },
    causes: {
      uk: ["Втрата прив’язаності", "Зруйновані очікування", "Конфлікт лояльності, якщо є діти", "Тиск оточення", "Повтор ранніх покинутостей"],
      ru: ["Потеря привязанности", "Разрушенные ожидания", "Конфликт лояльности, если есть дети", "Давление окружения", "Повтор ранних покинутостей"],
      en: ["Loss of attachment", "Shattered expectations", "Loyalty conflict when there are children", "Social pressure", "Repeating early abandonment"],
    },
    howTherapyHelps: L(
      "Ми даємо місце горю без суду «треба вже відпустити». Збираємо опору: хто ви тепер, чого хочете, як не зруйнувати себе в боротьбі.",
      "Мы даём место горю без суда «надо уже отпустить». Собираем опору: кто вы теперь, чего хотите, как не разрушить себя в борьбе.",
      "We make room for grief without the verdict that you “should be over it”. We gather support: who you are now, what you want, how not to destroy yourself in the fight.",
    ),
    methods: {
      uk: ["Гештальт-робота з втратою", "Контакт зі злістю й виною", "Межі після розриву", "Підтримка батьківської ролі без війни"],
      ru: ["Гештальт-работа с потерей", "Контакт со злостью и виной", "Границы после разрыва", "Поддержка родительской роли без войны"],
      en: ["Gestalt work with loss", "Contact with anger and guilt", "Boundaries after the break", "Support for the parental role without war"],
    },
    format: L(
      "Індивідуальні онлайн-сесії 60 хвилин. Парний формат — лише за згодою обох і якщо це безпечно.",
      "Индивидуальные онлайн-сессии 60 минут. Парный формат — только с согласия обоих и если это безопасно.",
      "Individual online sessions, 60 minutes. Couples format only with both people’s consent and if it is safe.",
    ),
    faq: faq([
      ["Я ініціатор розлучення. Чому мені так погано?", "Тому що ви теж втрачаєте спільне життя. Полегшення і горе можуть жити разом.", "Я инициатор развода. Почему мне так плохо?", "Потому что вы тоже теряете общую жизнь. Облегчение и горе могут жить вместе.", "I initiated the divorce. Why do I feel so bad?", "Because you are also losing a shared life. Relief and grief can live together."],
      ["Колишній не дає спокою. Що робити?", "Спочатку межі й безпека. Терапія допоможе не входити в старий цикл, але не замінює юридичний захист.", "Бывший не даёт покоя. Что делать?", "Сначала границы и безопасность. Терапия поможет не входить в старый цикл, но не заменяет юридическую защиту.", "My ex will not leave me alone. What now?", "Boundaries and safety first. Therapy helps you stay out of the old cycle, but it does not replace legal protection."],
      ["Як говорити з дітьми?", "Чесно, коротко, без звинувачень другого з батьків. Дітям потрібна стабільність і дозвіл любити обох, якщо це безпечно.", "Как говорить с детьми?", "Честно, коротко, без обвинений второго родителя. Детям нужна стабильность и разрешение любить обоих, если это безопасно.", "How do I talk to the children?", "Honestly, briefly, without blaming the other parent. Children need stability and permission to love both, if it is safe."],
      ["Скільки триває «відхід»?", "Немає правильного терміну. Якщо через місяці життя стоїть на місці — варто прийти в терапію, не чекаючи «саме мине».", "Сколько длится «отход»?", "Нет правильного срока. Если спустя месяцы жизнь стоит — стоит прийти в терапию, не ожидая, что «само пройдёт».", "How long does getting over it take?", "There is no correct deadline. If life is still frozen after months, come to therapy rather than waiting for it to pass by itself."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.divorce.slice(0, 4),
  },
  {
    id: "codependency",
    photo: SERVICE_PHOTOS.codependency,
    name: L("Емоційна залежність", "Эмоциональная зависимость", "Codependency"),
    title: L(
      "Психолог при емоційній залежності онлайн — Ірина Комарова",
      "Психолог при эмоциональной зависимости онлайн — Ирина Комарова",
      "Online psychologist for codependency — Irina Komarova",
    ),
    description: L(
      "Робота з емоційною залежністю та співзалежністю: втрата себе в стосунках, страх покинутості, межі, відновлення «я».",
      "Работа с эмоциональной зависимостью и созависимостью: потеря себя в отношениях, страх покинутости, границы, восстановление «я».",
      "Work with emotional dependence and codependency: losing yourself in a relationship, fear of abandonment, boundaries, restoring a self.",
    ),
    h1: L(
      "Психологічна допомога при емоційній залежності",
      "Психологическая помощь при эмоциональной зависимости",
      "Psychological help for codependency",
    ),
    intro: L(
      "Емоційна залежність — це коли ваш внутрішній стан тримається на іншій людині: її відповіді, настрої, присутності.",
      "Эмоциональная зависимость — это когда ваше внутреннее состояние держится на другом человеке: его ответе, настроении, присутствии.",
      "Codependency is when your inner state hangs on another person: their reply, mood, presence.",
    ),
    definition: L(
      "Емоційна залежність / співзалежність — це спосіб будувати близькість через розчинення, контроль або порятунок. Свої потреби відходять на другий план.",
      "Эмоциональная зависимость / созависимость — это способ строить близость через растворение, контроль или спасение. Свои потребности уходят на второй план.",
      "Emotional dependence / codependency is building closeness through fusion, control, or rescuing. Your own needs move to the back.",
    ),
    symptoms: {
      uk: ["Тривога, коли немає повідомлення", "Втрата інтересів поза стосунками", "Виправдання партнера", "Важко бути наодинці", "Почуття, що без цієї людини «мене немає»"],
      ru: ["Тревога, когда нет сообщения", "Потеря интересов вне отношений", "Оправдание партнёра", "Трудно быть наедине", "Чувство, что без этого человека «меня нет»"],
      en: ["Anxiety when there is no message", "Losing interests outside the relationship", "Excusing the partner", "Hard to be alone", "Feeling that without this person “I do not exist”"],
    },
    causes: {
      uk: ["Нестабільна прив’язаність", "Роль «зручної» в сім’ї", "Страх відкинення", "Низька опора на себе", "Стосунки, де любов змішана з тривогою"],
      ru: ["Нестабильная привязанность", "Роль «удобной» в семье", "Страх отвержения", "Низкая опора на себя", "Отношения, где любовь смешана с тревогой"],
      en: ["Insecure attachment", "The “easy” role in the family", "Fear of rejection", "Little self-support", "Relationships where love is mixed with anxiety"],
    },
    howTherapyHelps: L(
      "Ми збираємо «я» окремо від «ми». З’являється право хотіти, злитися, піти, лишитися — не лише тримати іншого.",
      "Мы собираем «я» отдельно от «мы». Появляется право хотеть, злиться, уйти, остаться — не только удерживать другого.",
      "We gather an “I” separate from “we”. You gain the right to want, to be angry, to leave, to stay — not only to hold the other.",
    ),
    methods: {
      uk: ["Гештальт-контакт із власними потребами", "Межі без жорстокості", "Робота зі страхом самотності", "Вихід із ролі рятівника"],
      ru: ["Гештальт-контакт с собственными потребностями", "Границы без жестокости", "Работа со страхом одиночества", "Выход из роли спасателя"],
      en: ["Gestalt contact with your own needs", "Boundaries without cruelty", "Work with fear of being alone", "Leaving the rescuer role"],
    },
    format: L(
      "Індивідуальна онлайн-терапія 60 хвилин. Партнера приводити не обов’язково — зміна починається з вас.",
      "Индивидуальная онлайн-терапия 60 минут. Партнёра приводить не обязательно — изменение начинается с вас.",
      "Individual online therapy, 60 minutes. You do not have to bring a partner — change starts with you.",
    ),
    faq: faq([
      ["Це любов чи залежність?", "Любов лишає простір бути окремим. Залежність вимагає постійного підтвердження, що вас не кинуть.", "Это любовь или зависимость?", "Любовь оставляет пространство быть отдельным. Зависимость требует постоянного подтверждения, что вас не бросят.", "Is this love or dependence?", "Love leaves room to be separate. Dependence demands constant proof that you will not be left."],
      ["Чому я обираю «недоступних»?", "Часто знайоме напруження з дитинства відчувається як хімія. У терапії це стає видимим — і з’являється вибір.", "Почему я выбираю «недоступных»?", "Часто знакомое напряжение из детства ощущается как химия. В терапии это становится видимым — и появляется выбор.", "Why do I choose unavailable people?", "Familiar childhood tension often feels like chemistry. In therapy it becomes visible — and choice appears."],
      ["Як перестати писати першою?", "Волевим «не писати» рідко виходить надовго. Потрібно наповнити паузу собою, а не порожнечею.", "Как перестать писать первой?", "Волевым «не писать» редко получается надолго. Нужно наполнить паузу собой, а не пустотой.", "How do I stop texting first?", "A willpower ban rarely lasts. The pause needs to be filled with you, not with emptiness."],
      ["Чи можна змінити партнера?", "Ні. Можна змінити свою участь у танці. Іноді після цього змінюється й пара — або стає ясно, що танцю більше немає.", "Можно ли изменить партнёра?", "Нет. Можно изменить своё участие в танце. Иногда после этого меняется и пара — или становится ясно, что танца больше нет.", "Can I change my partner?", "No. You can change your part in the dance. Sometimes the pair then changes — or it becomes clear the dance is over."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.codependency.slice(0, 4),
  },
  {
    id: "loneliness",
    photo: SERVICE_PHOTOS.loneliness,
    name: L("Самотність", "Одиночество", "Loneliness"),
    title: L(
      "Психолог при самотності онлайн — Ірина Комарова",
      "Психолог при одиночестве онлайн — Ирина Комарова",
      "Online psychologist for loneliness — Irina Komarova",
    ),
    description: L(
      "Допомога при самотності: різниця між бути наодинці й бути самотнім, після переїзду, у стосунках, як терапія повертає контакт.",
      "Помощь при одиночестве: разница между быть наедине и быть одиноким, после переезда, в отношениях, как терапия возвращает контакт.",
      "Help with loneliness: the difference between being alone and feeling lonely, after a move, in relationships, and how therapy restores contact.",
    ),
    h1: L("Психологічна допомога при самотності", "Психологическая помощь при одиночестве", "Psychological help for loneliness"),
    intro: L(
      "Самотність буває в натовпі й у парі. Це не завжди відсутність людей — часто відсутність відчуття, що вас хтось тримає.",
      "Одиночество бывает в толпе и в паре. Это не всегда отсутствие людей — часто отсутствие ощущения, что вас кто-то держит.",
      "Loneliness can exist in a crowd and in a couple. It is not always a lack of people — often a lack of feeling that someone holds you.",
    ),
    definition: L(
      "Самотність — це біль від розриву контакту: з іншими, зі світом або з собою. Вона може бути ситуативною або хронічною.",
      "Одиночество — это боль от разрыва контакта: с другими, с миром или с собой. Оно может быть ситуативным или хроническим.",
      "Loneliness is the pain of broken contact: with others, with the world, or with yourself. It can be situational or chronic.",
    ),
    symptoms: {
      uk: ["Порожнеча вечорами", "Відчуття, що ви «зайві»", "Стид просити про зустріч", "Залежність від телефона", "Втома від поверхневого спілкування"],
      ru: ["Пустота по вечерам", "Ощущение, что вы «лишние»", "Стыд просить о встрече", "Зависимость от телефона", "Усталость от поверхностного общения"],
      en: ["Emptiness in the evenings", "Feeling extra, not needed", "Shame about asking to meet", "Phone dependence", "Tiredness from shallow talk"],
    },
    causes: {
      uk: ["Переїзд і еміграція", "Втрата стосунків", "Захисна дистанція з дитинства", "Сором бути «занадто»", "Вигорання соціального ресурсу"],
      ru: ["Переезд и эмиграция", "Потеря отношений", "Защитная дистанция с детства", "Стыд быть «слишком»", "Выгорание социального ресурса"],
      en: ["Moving and emigration", "Loss of a relationship", "Protective distance from childhood", "Shame about being “too much”", "Burnout of social resource"],
    },
    howTherapyHelps: L(
      "Терапія сама є досвідом контакту: вас чують без оцінки. Звідси легше будувати живі зв’язки зовні, а не лише «знайомих».",
      "Терапия сама является опытом контакта: вас слышат без оценки. Отсюда легче строить живые связи снаружи, а не только «знакомых».",
      "Therapy itself is an experience of contact: you are heard without scoring. From there it is easier to build live ties outside, not only acquaintances.",
    ),
    methods: {
      uk: ["Гештальт-контакт і присутність", "Робота зі соромом", "Відновлення бажання бути з людьми", "Опора на себе в самоті без самознищення"],
      ru: ["Гештальт-контакт и присутствие", "Работа со стыдом", "Восстановление желания быть с людьми", "Опора на себя в одиночестве без самобичевания"],
      en: ["Gestalt contact and presence", "Work with shame", "Restoring the wish to be with people", "Self-support in aloneness without self-attack"],
    },
    format: L(
      "Онлайн 60 хвилин. Підходить, якщо ви в іншій країні або ще не маєте кола підтримки поруч.",
      "Онлайн 60 минут. Подходит, если вы в другой стране или пока нет круга поддержки рядом.",
      "Online, 60 minutes. Suitable if you are in another country or do not yet have a support circle nearby.",
    ),
    faq: faq([
      ["Самотність і бути наодинці — одне й те саме?", "Ні. Наодинці можна бути в ресурсі. Самотність — це біль відсутності значущого контакту.", "Одиночество и быть наедине — одно и то же?", "Нет. Наедине можно быть в ресурсе. Одиночество — это боль отсутствия значимого контакта.", "Are loneliness and being alone the same?", "No. Aloneness can be resourcing. Loneliness is the pain of missing meaningful contact."],
      ["Чому після переїзду так порожньо?", "Зникли звичні обличчя, мова, роль. Це горе втрати середовища, не доказ, що з вами щось не так.", "Почему после переезда так пусто?", "Исчезли привычные лица, язык, роль. Это горе потери среды, не доказательство, что с вами что-то не так.", "Why is it so empty after a move?", "Familiar faces, language, and role disappeared. That is grief for a lost environment, not proof that something is wrong with you."],
      ["Я в стосунках і все одно самотня.", "Так буває, коли немає емоційної зустрічі. Тоді працюємо не лише з «знайти людей», а з якістю контакту.", "Я в отношениях и всё равно одинока.", "Так бывает, когда нет эмоциональной встречи. Тогда работаем не только с «найти людей», а с качеством контакта.", "I am in a relationship and still lonely.", "That happens when there is no emotional meeting. Then we work not only on finding people, but on the quality of contact."],
      ["Чи не зроблю я терапевта своїм єдиним другом?", "Ми стежимо за цим. Терапія — місце, з якого ви йдете в живе життя, а не заміна всіх стосунків.", "Не сделаю ли я терапевта своим единственным другом?", "Мы следим за этим. Терапия — место, из которого вы идёте в живую жизнь, а не замена всех отношений.", "Will I make the therapist my only friend?", "We watch for that. Therapy is a place you leave toward live life, not a substitute for every relationship."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE.loneliness.slice(0, 4),
  },
  {
    id: "family-conflicts",
    photo: SERVICE_PHOTOS["family-conflicts"],
    name: L("Сімейні конфлікти", "Семейные конфликты", "Family conflicts"),
    title: L(
      "Психолог при сімейних конфліктах онлайн — Ірина Комарова",
      "Психолог при семейных конфликтах онлайн — Ирина Комарова",
      "Online psychologist for family conflicts — Irina Komarova",
    ),
    description: L(
      "Робота з сімейними конфліктами дорослих: повтор сварки, ролі, батьки й дорослі діти, кризи, межі.",
      "Работа с семейными конфликтами взрослых: повтор ссоры, роли, родители и взрослые дети, кризисы, границы.",
      "Work with adult family conflicts: repeating fights, roles, parents and adult children, crises, boundaries.",
    ),
    h1: L("Психологічна допомога при сімейних конфліктах", "Психологическая помощь при семейных конфликтах", "Psychological help for family conflicts"),
    intro: L(
      "У сім’ї конфлікт часто не про «останню фразу». Він про старі ролі: хто винний, хто рятує, хто мовчить.",
      "В семье конфликт часто не про «последнюю фразу». Он про старые роли: кто виноват, кто спасает, кто молчит.",
      "In a family, conflict is often not about the last sentence. It is about old roles: who is guilty, who rescues, who goes silent.",
    ),
    definition: L(
      "Сімейний конфлікт — це повторюване зіткнення потреб і лояльностей, у якому важко лишатися дорослим поруч із близькими.",
      "Семейный конфликт — это повторяющееся столкновение потребностей и лояльностей, в котором трудно оставаться взрослым рядом с близкими.",
      "Family conflict is a repeating clash of needs and loyalties, where it is hard to stay adult next to people you love.",
    ),
    symptoms: {
      uk: ["Вибухи або крижане мовчання", "Розмови, що завжди зводяться до минулого", "Трикутники (хто з ким проти кого)", "Сором і вина після візитів", "Відчуття, що вас знову зробили дитиною"],
      ru: ["Взрывы или ледяное молчание", "Разговоры, которые всегда сводятся к прошлому", "Треугольники (кто с кем против кого)", "Стыд и вина после визитов", "Ощущение, что вас снова сделали ребёнком"],
      en: ["Explosions or icy silence", "Talk that always returns to the past", "Triangles of who is with whom against whom", "Shame and guilt after visits", "Feeling turned back into a child"],
    },
    causes: {
      uk: ["Незавершені дитячі ролі", "Різні цінності поколінь", "Кризи (війна, гроші, хвороба)", "Порушені межі", "Німий біль, який виходить сваркою"],
      ru: ["Незавершённые детские роли", "Разные ценности поколений", "Кризисы (война, деньги, болезнь)", "Нарушенные границы", "Немая боль, которая выходит ссорой"],
      en: ["Unfinished childhood roles", "Different generational values", "Crises (war, money, illness)", "Broken boundaries", "Mute pain that comes out as a fight"],
    },
    howTherapyHelps: L(
      "Ми вчимося говорити від дорослого «я», а не з ролі ображеної дитини чи судді. Межі стають яснішими, контакт — чеснішим.",
      "Мы учимся говорить от взрослого «я», а не из роли обиженного ребёнка или судьи. Границы становятся яснее, контакт — честнее.",
      "We learn to speak from an adult “I”, not from the hurt child or the judge. Limits get clearer, contact more honest.",
    ),
    methods: {
      uk: ["Гештальт-робота з сімейними ролями", "Межі без розриву зв’язку, де це можливо", "Індивідуальна терапія дорослого", "За потреби — парна/сімейна зустріч"],
      ru: ["Гештальт-работа с семейными ролями", "Границы без разрыва связи, где это возможно", "Индивидуальная терапия взрослого", "При необходимости — парная/семейная встреча"],
      en: ["Gestalt work with family roles", "Boundaries without cutting the bond where possible", "Individual therapy for the adult", "Couples/family meeting if needed"],
    },
    format: L(
      "Частіше починаємо з індивідуальної роботи. Спільна сесія — тільки якщо всі згодні й немає насильства.",
      "Чаще начинаем с индивидуальной работы. Совместная сессия — только если все согласны и нет насилия.",
      "We usually start with individual work. A joint session only if everyone consents and there is no violence.",
    ),
    faq: faq([
      ["Батьки «ніколи не зміняться». Навіщо тоді терапія?", "Щоб змінилася ваша участь. Від цього часто змінюється й система — або ви менше руйнуєтесь у ній.", "Родители «никогда не изменятся». Зачем тогда терапия?", "Чтобы изменилось ваше участие. От этого часто меняется и система — или вы меньше разрушаетесь в ней.", "My parents will never change. Why bother?", "So that your part changes. The system often shifts after that — or you are less destroyed inside it."],
      ["Чи треба кликати всю сім’ю?", "Не обов’язково. Багато сімейних вузлів розв’язуються в індивідуальній роботі дорослої людини.", "Нужно ли звать всю семью?", "Не обязательно. Многие семейные узлы распутываются в индивидуальной работе взрослого.", "Do I have to invite the whole family?", "Not necessarily. Many family knots loosen in an adult’s individual work."],
      ["Після сварки мене заливає вина.", "Вина часто тримає стару лояльність. У терапії відрізняємо турботу від самопокарання.", "После ссоры меня заливает вина.", "Вина часто держит старую лояльность. В терапии отличаем заботу от самонаказания.", "After a fight I drown in guilt.", "Guilt often holds old loyalty. In therapy we tell care apart from self-punishment."],
      ["Це сімейна терапія для дітей?", "Ні, я працюю з дорослими. Якщо в конфлікті є неповнолітні, ми говоримо про вашу батьківську позицію, не про «лікування дитини онлайн».", "Это семейная терапия для детей?", "Нет, я работаю со взрослыми. Если в конфликте есть несовершеннолетние, мы говорим о вашей родительской позиции, не о «лечении ребёнка онлайн».", "Is this family therapy for children?", "No. I work with adults. If minors are involved, we talk about your parental stance, not about treating a child online."],
    ]),
    relatedArticleSlugs: ARTICLE_SLUGS_BY_SERVICE["family-conflicts"].slice(0, 4),
  },
];

export function getService(id: string): ServiceRecord | undefined {
  return SERVICES.find((service) => service.id === id);
}

