export type ProjectCase = {
  title: string
  eyebrow: string
  description: string
  image: string
  alt: string
  stack: string[]
  href: string
  live?: string
  layout: 'wide' | 'standard' | 'compact'
}

export type ExperienceItem = {
  period: string
  company: string
  role: string
  description: string
}

export type ContactLink = {
  label: string
  value: string
  href?: string
}

export const projects: ProjectCase[] = [
  {
    title: 'VK Маруся',
    eyebrow: 'Голосовой интерфейс · React',
    description: 'Интерфейс каталога фильмов с голосовым сценарием, поиском и работой с внешним API.',
    image: '/Rezume/assets/optimized/vk-marusya.webp',
    alt: 'Тёмный интерфейс каталога фильмов проекта VK Маруся',
    stack: ['React', 'TypeScript', 'API'],
    href: 'https://github.com/BarBar1sBAS/React_final_work',
    layout: 'wide',
  },
  {
    title: 'Evcklid',
    eyebrow: 'Адаптивный лендинг',
    description: 'Точная адаптивная вёрстка строительного сайта: слайдер, аккордеон, доступная навигация.',
    image: '/Rezume/assets/optimized/evcklid.webp',
    alt: 'Главная страница строительной компании Evcklid',
    stack: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://github.com/BarBar1sBAS/evcklid',
    layout: 'standard',
  },
  {
    title: '3D',
    eyebrow: 'Творческая веб-разработка',
    description: 'Промостраница с насыщенной визуальной композицией и аккуратным поведением на разных экранах.',
    image: '/Rezume/assets/optimized/3d.webp',
    alt: 'Яркая главная страница образовательного проекта о 3D-моделировании',
    stack: ['React', 'CSS', 'Responsive'],
    href: 'https://github.com/BarBar1sBAS/React_final_work',
    live: 'https://barbar1sbas.github.io/React_final_work/',
    layout: 'standard',
  },
]

export const experience: ExperienceItem[] = [
  {
    period: 'сен. 2025 — июнь 2026',
    company: 'SENSE',
    role: 'Frontend-разработчик',
    description: 'Продуктовые HR-интерфейсы и UI-библиотека: формы, гриды, фильтры, DatePicker, Pagination, Skeleton и тесты.',
  },
  {
    period: 'дек. 2024 — авг. 2025',
    company: 'ЦЭК',
    role: 'Frontend-разработчик',
    description: 'Корпоративные сайты и CMS. Шаблонизация ускорила типовые UI-правки примерно на 20%, единый адаптивный подход — согласование примерно в 1,5 раза.',
  },
  {
    period: 'янв. — авг. 2024',
    company: 'Администрация',
    role: 'Специалист',
    description: 'Работа с цифровыми материалами и внутренними процессами — опыт, который научил ясно видеть реальные задачи пользователей.',
  },
]

export const contacts: ContactLink[] = [
  { label: 'Телефон', value: '+7 (986) 744-96-45', href: 'tel:+79867449645' },
  { label: 'Email', value: 'borbasov2003@yandex.ru', href: 'mailto:borbasov2003@yandex.ru' },
  { label: 'Telegram', value: '@BarBarIs_BAS', href: 'https://t.me/BarBarIs_BAS' },
  { label: 'GitHub', value: 'BarBar1sBAS', href: 'https://github.com/BarBar1sBAS' },
  { label: 'Город', value: 'Нижний Новгород' },
  { label: 'Дата рождения', value: '03.09.2003' },
]
