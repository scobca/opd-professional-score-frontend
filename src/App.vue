<script setup lang="ts">
import Header from "./components/AppHeader.vue";
import PopUp from "./components/PopUp.vue";
import type {CreateProfessionDto} from "./api/resolvers/profession/dto/CreateProfession.dto.ts";
import {ProfessionResolver} from "./api/resolvers/profession/profession.resolver.ts";
import {onMounted} from "vue";
import type {CreatePvkDto} from "./api/resolvers/pvk/dto/CreatePvk.dto.ts";
import {PvkResolver} from "./api/resolvers/pvk/pvk.resolver.ts";

const professionResolver = new ProfessionResolver()
const pvkResolver = new PvkResolver()
const professionsData: CreateProfessionDto[] = [
  {
    name: "Backend-Разработчик",
    description: "Разработчик создает серверные приложения для взаимодействия веб-сайта и базы данных. Владение языками программирования, такими как PHP, JavaScript, Java, SQL, Git, и понимание принципов работы баз данных — ключевые навыки.",
    requirements: "Навыки: PHP, JavaScript, Java, SQL, Git. Средняя зарплата: от 180 000 руб.",
    sphere: "IT",
  },
  {
    name: "Frontend-Разработчик",
    description: "Разработчик создает клиентское приложение, внешний вид веб-сайтов. Владение технологиями, такими как HTML, CSS, JavaScript, Git, и понимание принципов работы взаимодействия пользователя и браузера с содержимым веб-страниц.",
    requirements: "Навыки: HTML, CSS, JavaScript, Git. Средняя зарплата: от 170 000 руб.",
    sphere: "IT",
  },
  {
    name: "Дизайнер",
    description: "Дизайнер создает визуальные концепции, интерфейсы и графику. Работа с инструментами, такими как Adobe Photoshop, Figma, и понимание основ UX/UI — важные аспекты профессии.",
    requirements: "Навыки: Figma, Adobe Photoshop, Illustrator, UX/UI. Средняя зарплата: от 70 000 руб.",
    sphere: "IT",
  }
]

const pvkData: CreatePvkDto[] = [
  {
    name: "ReadinessToDefendHomeland",
    description: "Готовность к защите Родины с оружием в руках",
    pcType: "PERSONAL"
  },
  {
    name: "MilitaryProfessionalOrientation",
    description: "Военно-профессиональная направленность",
    pcType: "PERSONAL"
  },
  {
    name: "DirectInternalMilitaryMotives",
    description: "Прямые внутренние мотивы военно-профессиональной деятельности",
    pcType: "PERSONAL"
  },
  {
    name: "StrivingForProfessionalExcellence",
    description: "Стремление к профессиональному совершенству",
    pcType: "PERSONAL"
  },
  {
    name: "AdequateSelfEsteem",
    description: "Адекватная самооценка",
    pcType: "PERSONAL"
  },
  {
    name: "Independence",
    description: "Самостоятельность",
    pcType: "PERSONAL"
  },
  {
    name: "PunctualityPedantry",
    description: "Пунктуальность, педантичность",
    pcType: "PERSONAL"
  },
  {
    name: "Discipline",
    description: "Дисциплинированность",
    pcType: "PERSONAL"
  },
  {
    name: "AccuracyAtWork",
    description: "Аккуратность в работе",
    pcType: "PERSONAL"
  },
  {
    name: "OrganizationSelfDiscipline",
    description: "Организованность, самодисциплина",
    pcType: "PERSONAL"
  },
  {
    name: "DiligenceExecutiveAbility",
    description: "Старательность, исполнительность",
    pcType: "PERSONAL"
  },
  {
    name: "Responsibility",
    description: "Ответственность",
    pcType: "PERSONAL"
  },
  {
    name: "Industriousness",
    description: "Трудолюбие",
    pcType: "PERSONAL"
  },
  {
    name: "Initiative",
    description: "Инициативность",
    pcType: "PERSONAL"
  },
  {
    name: "SelfCriticism",
    description: "Самокритичность",
    pcType: "PERSONAL"
  },
  {
    name: "OptimismPositiveEmotions",
    description: "Оптимизм, доминирование положительных эмоций",
    pcType: "PERSONAL"
  },
  {
    name: "SelfControlEmotionalBalance",
    description: "Самообладание, эмоциональная уравновешенность, выдержка",
    pcType: "PERSONAL"
  },
  {
    name: "SelfControlSelfObservation",
    description: "Самоконтроль, способность к самонаблюдению",
    pcType: "PERSONAL"
  },
  {
    name: "Foresight",
    description: "Предусмотрительность",
    pcType: "PERSONAL"
  },
  {
    name: "FrustrationTolerance",
    description: "Фрустрационная толерантность (отсутствие агрессивности или депрессивности в ситуациях неудач)",
    pcType: "PERSONAL"
  },
  {
    name: "SelfMobilizingReactionToObstacles",
    description: "Самомобилизующийся тип реакции на препятствия, возникающие на пути к достижению цели",
    pcType: "PERSONAL"
  },
  {
    name: "Internality",
    description: "Интернальность (погруженность в себя, самодостаточность, необщительность)",
    pcType: "PERSONAL"
  },
  {
    name: "Externality",
    description: "Экстернальность (ориентация на взаимодействие с людьми, общительность)",
    pcType: "PERSONAL"
  },
  {
    name: "Intrapunitiveness",
    description: "Интрапунитивность (ориентация на собственные силы, уверенность в себе, чувство самоэффективности)",
    pcType: "PERSONAL"
  },
  {
    name: "Extrapunitiveness",
    description: "Экстрапунитивность (ориентация на помощь других людей, надежда на благоприятные обстоятельства, неуверенность в себе)",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToPlanActivities",
    description: "Способность планировать свою деятельность во времени",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToOrganizeActivities",
    description: "Способность организовывать свою деятельность в условиях большого потока информации и разнообразия поставленных задач",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToTakeResponsibility",
    description: "Способность брать на себя ответственность за принимаемые решения и действия",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToMakeDecisionsInUnusualSituations",
    description: "Способность принимать решение в нестандартных ситуациях",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToActRationallyInExtremeSituations",
    description: "Способность рационально действовать в экстремальных ситуациях",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToActEffectivelyInTimePressure",
    description: "Способность эффективно действовать (также быстро принимать решения) в условиях дефицита времени",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToTolerateUnpleasantSensations",
    description: "Способность переносить неприятные ощущения (дурной запах, шум, грязь, холодная вода, ожог, царапина, удар электрического тока и т.д.) без потрясений",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToDefendOpinion",
    description: "Способность аргументировано отстаивать свое мнение",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToSwitchActivities",
    description: "Способность к переключениям с одной деятельности на другую",
    pcType: "PERSONAL"
  },
  {
    name: "AbilityToOvercomeFear",
    description: "Способность преодолевать страх",
    pcType: "PERSONAL"
  },
  {
    name: "Decisiveness",
    description: "Решительность",
    pcType: "PERSONAL"
  },
  {
    name: "StrongWill",
    description: "Сильная воля",
    pcType: "PERSONAL"
  },
  {
    name: "Courage",
    description: "Смелость",
    pcType: "PERSONAL"
  },
  {
    name: "SenseOfDuty",
    description: "Чувство долга",
    pcType: "PERSONAL"
  },
  {
    name: "Honesty",
    description: "Честность",
    pcType: "PERSONAL"
  },
  {
    name: "Decency",
    description: "Порядочность",
    pcType: "PERSONAL"
  },
  {
    name: "Comradeship",
    description: "Товарищество",
    pcType: "PERSONAL"
  },
  {
    name: "VisualSizeEstimation",
    description: "Зрительная оценка размеров предметов",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualDistancePerception",
    description: "Зрительное восприятие расстояний между предметами",
    pcType: "INTELLECTUAL"
  },
  {
    name: "EyeMeasurement",
    description: "Глазомер: линейный, угловой, объемный",
    pcType: "INTELLECTUAL"
  },
  {
    name: "DynamicEyeMeasurement",
    description: "Глазомер динамический (способность оценивать направление и скорость движения предмета)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToDistinguishFigureOnLowContrastBackground",
    description: "Способность к различению фигуры (предмета, отметки, сигнала и пр.) на малоконтрастном фоне",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToDistinguishDisguisedObjects",
    description: "Способность различать и опознавать замаскированные объекты",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToPerceiveSpatialRelationships",
    description: "Способность к восприятию пространственного соотношения предметов",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AccuracyOfSoundSourceDirection",
    description: "Точность и оценка направления на источник звука",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToRecognizeRhythms",
    description: "Способность узнавать и различать ритмы",
    pcType: "INTELLECTUAL"
  },
  {
    name: "SpeechHearing",
    description: "Речевой слух (восприятие устной речи)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "TimeIntervalDiscrimination",
    description: "Различение отрезков времени",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToRecognizeDeviationsVisually",
    description: "Способность к распознаванию небольших отклонений параметров технологических процессов от заданных значений по визуальным признакам",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToRecognizeDeviationsAudibly",
    description: "Способность к распознаванию небольших отклонений параметров технологических процессов от заданных значений по акустическим признакам",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToRecognizeDeviationsKinesthetically",
    description: "Способность к распознаванию небольших отклонений параметров технологических процессов от заданных значений по кинестетическим признакам",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToVisualRepresentations",
    description: "Способность к зрительным представлениям",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToSpatialImagination",
    description: "Способность к пространственному воображению",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToFigurativeRepresentation",
    description: "Способность к образному представлению предметов, процессов и явлений",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToVisualizeNewPhenomenon",
    description: "Способность наглядно представлять себе новое явление, ранее, не встречающееся в опыте, или старое, но в новых условиях",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToTranslateImageToVerbalDescription",
    description: "Способность к переводу образа в словесное описание",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbilityToRecreateImageFromVerbalDescription",
    description: "Способность к воссозданию образа по словесному описанию",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AnalyticalThinking",
    description: "Аналитичность (способность выделять отдельные элементы действительности, способность к классификации)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "SyntheticThinking",
    description: "Синтетичность (способность к обобщениям, установлению связей, закономерностей, формирование понятий)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "TranssonanceThinking",
    description: "Транссонантность (способность к актуализации и вовлечению в процесс мышления информации, хранящейся в памяти, ассоциативность мышления)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "LogicalThinking",
    description: "Логичность",
    pcType: "INTELLECTUAL"
  },
  {
    name: "CreativeThinking",
    description: "Креативность (способность порождать необычные идеи, отклоняться от традиционных схем мышления)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "OperativeThinking",
    description: "Оперативность (скорость мыслительных процессов, интеллектуальная лабильность)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "ObjectivityOfThinking",
    description: "Предметность (объекты реального мира и их признаки)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "ImageryOfThinking",
    description: "Образность (наглядные образы, схемы, планы и т.д.)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AbstractnessOfThinking",
    description: "Абстрактность (абстрактные образы, понятия)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VerbalityOfThinking",
    description: "Вербальность (устная и письменная речь)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "CalculativeThinking",
    description: "Калькулятивность (цифровой материал)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemoryFaces",
    description: "на лица",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemoryObjects",
    description: "на образы предметного мира",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemorySymbols",
    description: "на условные обозначения (знаки, символы, планы, схемы, графики)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemoryNumbersDates",
    description: "на цифры, даты",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemoryWordsPhrases",
    description: "на слова и фразы",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualLongTermMemoryTextSemantics",
    description: "на семантику текста",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemoryFaces",
    description: "на лица",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemoryObjects",
    description: "на образы предметного мира",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemorySymbols",
    description: "на условные обозначения (знаки, символы, планы, схемы, графики)",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemoryNumbersDates",
    description: "на цифры, даты",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemoryWordsPhrases",
    description: "на слова и фразы",
    pcType: "INTELLECTUAL"
  },
  {
    name: "VisualShortTermMemoryTextSemantics",
    description: "на семантику текста",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryLongTermMemoryVoices",
    description: "на голоса",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryLongTermMemoryNumbers",
    description: "на цифры",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryLongTermMemorySignals",
    description: "на условные сигналы",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryLongTermMemoryMelodies",
    description: "на мелодии",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryLongTermMemoryMessageSemantics",
    description: "на семантику сообщений",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryShortTermMemoryNumbers",
    description: "на цифры",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AuditoryShortTermMemoryMessageSemantics",
    description: "на семантику сообщений",
    pcType: "INTELLECTUAL"
  },
  {
    name: "KinestheticMemorySimpleMovements",
    description: "на простые движения",
    pcType: "INTELLECTUAL"
  },
  {
    name: "KinestheticMemoryComplexMovements",
    description: "на сложные движения",
    pcType: "INTELLECTUAL"
  },
  {
    name: "KinestheticMemoryBodyPosition",
    description: "на положение и перемещение тела в пространстве",
    pcType: "INTELLECTUAL"
  },
  {
    name: "TactileMemory",
    description: "Тактильная память",
    pcType: "INTELLECTUAL"
  },
  {
    name: "OlfactoryMemory",
    description: "Обонятельная память",
    pcType: "INTELLECTUAL"
  },
  {
    name: "GustatoryMemory",
    description: "Вкусовая память",
    pcType: "INTELLECTUAL"
  },
  {
    name: "AnthropometricCharacteristics",
    description: "Антропометрические характеристики (в соответствии с требованиями профессии)",
    pcType: "physical"
  },
  {
    name: "BodyType",
    description: "Особенности телосложения (в соответствии с требованиями профессии)",
    pcType: "physical"
  },
  {
    name: "GoodPhysicalDevelopment",
    description: "Хорошее общее физическое развитие – выносливость, координированность, сила, быстрота",
    pcType: "physical"
  },
  {
    name: "PhysicalConditioning",
    description: "Физическая подготовленность к воздействию неблагоприятных факторов профессиональной деятельности",
    pcType: "physical"
  },
  {
    name: "DynamicLoadTolerance",
    description: "Переносимость динамических физических нагрузок",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "StaticLoadTolerance",
    description: "Переносимость статических физических нагрузок",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "RapidTransitionToWork",
    description: "Быстрый переход из состояния покоя к интенсивной работе",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "SleepDeprivationTolerance",
    description: "Сохранение работоспособности при недостатке сна",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "FatigueTolerance",
    description: "Сохранение работоспособности при развивающемся утомлении",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "MonotonyTolerance",
    description: "Сохранение бдительности в условиях однообразной деятельности (монотонии)",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "VigilanceInAnticipation",
    description: "Сохранение бдительности в режиме ожидания",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "TemperatureTolerance",
    description: "Сохранение работоспособности в некомфортных температурных условиях",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "GLoadTolerance",
    description: "Сохранение работоспособности в условиях знакопеременных перегрузок (в том числе укачивания)",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "VibrationTolerance",
    description: "Сохранение работоспособности в условиях воздействия вибрации",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "MultiDirectionalGLoadTolerance",
    description: "Сохранение работоспособности в условиях воздействия разнонаправленных перегрузок",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "BarometricTolerance",
    description: "Сохранение работоспособности в условиях гипо(гипер) барометрических колебаний",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "HypoxiaTolerance",
    description: "Сохранение работоспособности в условиях пониженного парциального давления кислорода",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "HypocapniaTolerance",
    description: "Сохранение работоспособности в условиях пониженного парциального давления углекислого газа",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "BasicNeedsDeprivationTolerance",
    description: "Сохранение работоспособности в условиях ограничения возможностей удовлетворения базовых жизненных потребностей (голод, жажда, отдых, сексуальная потребность)",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "ClimaticTolerance",
    description: "Сохранение работоспособности в разных природно-климатических условиях",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "EnvironmentalAdaptability",
    description: "Способность переадаптироваться к новым средовым условиям",
    pcType: "PHYSIOLOGICAL"
  },
  {
    name: "EnergyVitality",
    description: "Энергичность, витальность (активность)",
    pcType: "PSYCHOPHYSIOLOGICAL"
  },
  {
    name: "MentalEfficiency",
    description: "Умственная работоспособность",
    pcType: "PSYCHOPHYSIOLOGICAL"
  },
  {
    name: "PhysicalEndurance",
    description: "Физическая работоспособность (выносливость)",
    pcType: "PSYCHOPHYSIOLOGICAL"
  },
  {
    name: "EmotionalStability",
    description: "Нервно-эмоциональная устойчивость, выносливость по отношению к эмоциональным нагрузкам",
    pcType: "PSYCHOPHYSIOLOGICAL"
  },
  {
    name: "VisualAcuity",
    description: "Острота зрения",
    pcType: "OPERATIONAL"
  },
  {
    name: "VisualAdaptation",
    description: "Адаптация зрения к темноте, свету",
    pcType: "OPERATIONAL"
  },
  {
    name: "ContrastSensitivity",
    description: "Контрастная чувствительность монохроматического зрения",
    pcType: "OPERATIONAL"
  },
  {
    name: "ColorDiscrimination",
    description: "Цветовая дифференциальная чувствительность",
    pcType: "OPERATIONAL"
  },
  {
    name: "VisualStability",
    description: "Устойчивость зрительной чувствительности во времени",
    pcType: "OPERATIONAL"
  },
  {
    name: "AuditoryAcuity",
    description: "Острота слуха",
    pcType: "OPERATIONAL"
  },
  {
    name: "AuditoryContrastSensitivity",
    description: "Контрастная чувствительность слуха",
    pcType: "OPERATIONAL"
  },
  {
    name: "AuditoryDiscrimination",
    description: "Слуховая дифференциальная чувствительность (способность различать: тембр, длительность, высоту, силу звука, ритм, фоновые или разнообразные шумы)",
    pcType: "OPERATIONAL"
  },
  {
    name: "SoundTolerance",
    description: "Переносимость длительно действующего звукового раздражителя",
    pcType: "OPERATIONAL"
  },
  {
    name: "TactileSensitivity",
    description: "Чувствительность (осязание) пальцев",
    pcType: "OPERATIONAL"
  },
  {
    name: "VibrationSensitivity",
    description: "Вибрационная чувствительность",
    pcType: "OPERATIONAL"
  },
  {
    name: "KinestheticSensitivity",
    description: "Мышечно-суставная чувствительность усилий или сопротивления",
    pcType: "OPERATIONAL"
  },
  {
    name: "BalanceSensation",
    description: "Ощущение равновесия",
    pcType: "OPERATIONAL"
  },
  {
    name: "AccelerationSensation",
    description: "Ощущение ускорения",
    pcType: "OPERATIONAL"
  },
  {
    name: "OlfactorySensitivity",
    description: "Обонятельная чувствительность",
    pcType: "OPERATIONAL"
  },
  {
    name: "TasteDiscrimination",
    description: "Способность узнавать и различать вкусовые ощущения",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionSpan",
    description: "Объем внимания (количество объектов, на которые может быть направлено внимание при их одновременном восприятии)",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionConcentration",
    description: "Концентрированность внимания",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionStability",
    description: "Устойчивость внимания во времени",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionSwitching",
    description: "Переключаемость внимания (способность быстрого переключения внимания с одного объекта на другой или с одной деятельности на другую)",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionDistribution",
    description: "Способность к распределению внимания между несколькими объектами или видами деятельности",
    pcType: "OPERATIONAL"
  },
  {
    name: "AttentionResistanceToInterference",
    description: "Помехоустойчивость внимания",
    pcType: "OPERATIONAL"
  },
  {
    name: "ChangeDetection",
    description: "Способность подмечать изменения в окружающей обстановке, не сосредотачивая сознательно на них внимание",
    pcType: "OPERATIONAL"
  },
  {
    name: "NoticingSubtleChanges",
    description: "Умение подмечать незначительные (малозаметные) изменения в исследуемом объекте, в показаниях приборов",
    pcType: "OPERATIONAL"
  },
  {
    name: "VisualMotorReaction",
    description: "Способность реагировать на неожиданный зрительный сигнал посредством определённых движений",
    pcType: "OPERATIONAL"
  },
  {
    name: "AuditoryMotorReaction",
    description: "Способность реагировать на неожиданный слуховой сигнал посредством определённых движений",
    pcType: "OPERATIONAL"
  },
  {
    name: "SensorimotorCoordination",
    description: "Согласованность движений с процессами восприятия (сложноорганизованная деятельность)",
    pcType: "OPERATIONAL"
  },
  {
    name: "SensorimotorTracking",
    description: "Способность к сенсомоторному слежению за движущимся объектом",
    pcType: "OPERATIONAL"
  },
  {
    name: "FineMotorSkills",
    description: "Способность к выполнению мелких точных движений",
    pcType: "OPERATIONAL"
  },
  {
    name: "ComplexMotorSkills",
    description: "Способность к выполнению сложных двигательных действий (актов)",
    pcType: "OPERATIONAL"
  },
  {
    name: "SmoothMotorMovements",
    description: "Способность к выполнению плавных соразмерных движений",
    pcType: "OPERATIONAL"
  },
  {
    name: "DominantHandCoordination",
    description: "Координация движений ведущей руки",
    pcType: "OPERATIONAL"
  },
  {
    name: "BimanualCoordination",
    description: "Координация движений обеих рук",
    pcType: "OPERATIONAL"
  },
  {
    name: "HandFootCoordination",
    description: "Координация движений рук и ног",
    pcType: "OPERATIONAL"
  },
  {
    name: "HandFingerCoordination",
    description: "Координация работы кистей рук и пальцев",
    pcType: "OPERATIONAL"
  },
  {
    name: "HandStability",
    description: "Твердость руки, устойчивость кистей рук (низкий тремор)",
    pcType: "OPERATIONAL"
  },
  {
    name: "RapidWriting",
    description: "Умение быстро записывать",
    pcType: "OPERATIONAL"
  },
  {
    name: "GoodHandwriting",
    description: "Красивый почерк",
    pcType: "OPERATIONAL"
  },
  {
    name: "PhysicalStrength",
    description: "Физическая сила",
    pcType: "OPERATIONAL"
  },
  {
    name: "RapidSkillAcquisition",
    description: "Способность к быстрой выработке сенсомоторных навыков",
    pcType: "OPERATIONAL"
  },
  {
    name: "RapidSkillAdaptation",
    description: "Способность к быстрой перестройке сенсомоторных навыков",
    pcType: "OPERATIONAL"
  },
  {
    name: "MovementPlasticity",
    description: "Пластичность и выразительность движений",
    pcType: "OPERATIONAL"
  },
  {
    name: "ClearSpeech",
    description: "Отсутствие дефектов речи, хорошая дикция",
    pcType: "OPERATIONAL"
  }
]


onMounted(async () => {
  const loadedProfessions = await professionResolver.getAll()
  const loadedProfChars = await pvkResolver.getAll()
  if (loadedProfessions.length == 0) {
    professionResolver.createPullOfProfessions(professionsData)
    window.location.reload()
  }
  if (loadedProfChars.data.length == 0) {
    pvkResolver.createPullOfProfChar(pvkData)
    window.location.reload()
  } else {
    console.log(loadedProfChars)
  }
})

</script>

<template>
  <div class="app_container">
    <Header class="app_header"/>
    <PopUp/>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.app_header {
  width: 100%;
  margin-bottom: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
