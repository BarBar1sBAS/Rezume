import { useEffect, useRef, useState, type ReactNode } from 'react'
import { contacts, experience, projects } from './content'

const Arrow = () => <span aria-hidden="true">↗</span>

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && node.dataset.visible !== 'true' && (node.dataset.visible = 'true'),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#171c24' : '#f4f5f2')
  }, [dark])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="BB©26 — Борис Басов, наверх">BB<span>©26</span></a>
      <nav id="mobile-nav" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Главная навигация">
        <a href="#work" onClick={closeMenu}>Проекты</a>
        <a href="#experience" onClick={closeMenu}>Опыт</a>
        <a href="#contact" onClick={closeMenu}>Контакты</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={() => setDark(!dark)} aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}>
          <span aria-hidden="true">{dark ? '☼' : '◐'}</span>
        </button>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? 'Закрыть' : 'Меню'}</span>
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow hero-in">React Frontend Developer · Нижний Новгород</p>
        <h1 className="hero-in">Борис<br /><em>Басов</em></h1>
        <p className="hero-lead hero-in">Проектирую и собираю продуктовые интерфейсы, в которых сложная логика остаётся понятной пользователю.</p>
        <div className="hero-actions hero-in">
          <a className="button button-primary" href="mailto:borbasov2003@yandex.ru">Написать мне <Arrow /></a>
          <a className="button button-quiet" href="#work">Смотреть проекты <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-stage hero-in" aria-label="Коллаж из реальных интерфейсов проектов">
        <img className="texture" src="/Rezume/assets/optimized/hero-texture-1200.webp" srcSet="/Rezume/assets/optimized/hero-texture-640.webp 640w, /Rezume/assets/optimized/hero-texture-1200.webp 1200w" sizes="(max-width: 767px) 90vw, 50vw" alt="" />
        <figure className="shot shot-main">
          <img src="/Rezume/assets/optimized/vk-marusya-1200.webp" srcSet="/Rezume/assets/optimized/vk-marusya-640.webp 640w, /Rezume/assets/optimized/vk-marusya-1200.webp 1200w" sizes="(max-width: 767px) 86vw, 43vw" alt="Интерфейс проекта VK Маруся" width="1440" height="900" fetchPriority="high" />
        </figure>
        <figure className="shot shot-top">
          <img src="/Rezume/assets/optimized/kodi-ai-640.webp" alt="Экран входа Коди.АИ" width="1440" height="900" />
        </figure>
        <span className="stage-note">Сделано руками,<br />проверено тестами</span>
      </div>
    </section>
  )
}

function Evidence() {
  return (
    <Reveal className="evidence-wrap">
      <section className="evidence" aria-label="Ключевые компетенции">
        <p className="evidence-intro">От идеи и архитектуры<br />до предсказуемого релиза.</p>
        <div><strong>2+ года</strong><span>в веб-разработке</span></div>
        <div><strong>React + TS</strong><span>основной стек</span></div>
        <div><strong>Storybook</strong><span>UI как система</span></div>
        <div><strong>Vitest · TDD</strong><span>уверенность в изменениях</span></div>
      </section>
    </Reveal>
  )
}

function SenseDemo() {
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState('2026-09-26')

  const reload = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 650)
  }

  return (
    <div className="component-lab">
      <div className="lab-bar">
        <span><i /> Component lab</span>
        <button type="button" onClick={reload}>Обновить</button>
      </div>
      <div className="lab-header">
        <div><small>План найма</small><h3>Frontend-команда</h3></div>
        <label>Дата встречи<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      </div>
      <div className="lab-grid" aria-live="polite">
        {loading ? Array.from({ length: 4 }, (_, index) => <div className="skeleton" key={index} />) : [
          ['Открытые позиции', '04'], ['Кандидаты', '18'], ['Интервью', '07'], ['Офферы', '02'],
        ].map(([label, value]) => <div className="lab-cell" key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </div>
      <div className="pagination" aria-label="Пагинация демонстрации">
        <button type="button" onClick={() => setPage(Math.max(1, page - 1))} aria-label="Предыдущая страница">←</button>
        {[1, 2, 3].map((item) => <button type="button" className={item === page ? 'active' : ''} onClick={() => setPage(item)} aria-current={item === page ? 'page' : undefined} key={item}>{item}</button>)}
        <button type="button" onClick={() => setPage(Math.min(3, page + 1))} aria-label="Следующая страница">→</button>
      </div>
    </div>
  )
}

function SenseCase() {
  return (
    <Reveal>
      <section className="case sense-case" id="work">
        <div className="section-number">01 / Selected work</div>
        <div className="case-heading">
          <div><p className="eyebrow">SENSE · обезличенный кейс</p><h2>UI-система для<br />HR-продукта</h2></div>
          <p>Развивал продуктовые сценарии и библиотеку компонентов: от форм и гридов до сложного DatePicker. Ниже — заново собранная демонстрация на вымышленных данных, без корпоративного кода.</p>
        </div>
        <SenseDemo />
        <div className="impact-row">
          <div><strong>≈25%</strong><span>быстрее повторная сборка экранов благодаря Storybook</span></div>
          <div><strong>≈15%</strong><span>быстрее code review с едиными правилами компонентов</span></div>
          <div><strong>≈30%</strong><span>меньше регрессий после покрытия критичных компонентов тестами</span></div>
        </div>
        <p className="case-footnote">Оценки приведены примерно, по данным из резюме.</p>
      </section>
    </Reveal>
  )
}

function KodiCase() {
  return (
    <Reveal>
      <section className="case kodi-case">
        <div className="kodi-copy">
          <div className="section-number">02 / Product architecture</div>
          <p className="eyebrow">Коди.АИ · MVP</p>
          <h2>Полный продукт,<br />а не только экран</h2>
          <p>Архитектура MVP с типобезопасной маршрутизацией, авторизацией, серверной частью и компонентным контуром. Проект показывает, как я мыслю системой — от модели данных до состояния кнопки.</p>
          <ul className="stack-list" aria-label="Технологии Коди.АИ">
            {['React 19', 'TanStack Router', 'Hono', 'Better Auth', 'Drizzle', 'Storybook', 'Tests'].map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="text-link" href="https://github.com/BarBar1sBAS/KodiAimvp" target="_blank" rel="noreferrer">Код на GitHub <Arrow /></a>
        </div>
        <figure className="kodi-visual">
          <img src="/Rezume/assets/optimized/kodi-ai-1200.webp" srcSet="/Rezume/assets/optimized/kodi-ai-640.webp 640w, /Rezume/assets/optimized/kodi-ai-1200.webp 1200w" sizes="(max-width: 767px) 90vw, 50vw" alt="Экран входа в MVP Коди.АИ" width="1440" height="900" loading="lazy" />
          <figcaption><span>Auth / UI / Architecture</span><span>2026</span></figcaption>
        </figure>
      </section>
    </Reveal>
  )
}

function ProjectGallery() {
  return (
    <Reveal>
      <section className="projects" aria-labelledby="projects-title">
        <div className="projects-heading"><div><p className="eyebrow">Публичная витрина</p><h2 id="projects-title">Интерфейсы<br />в работе</h2></div><p>Каждый кадр снят с работающего проекта. Декоративных концептов здесь нет.</p></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project project-${project.layout}`} key={project.title}>
              <a className="project-image" href={project.live ?? project.href} target="_blank" rel="noreferrer" aria-label={`${project.title}: открыть проект`}>
                <img src={project.image} alt={project.alt} width="1440" height="900" loading="lazy" />
              </a>
              <div className="project-meta">
                <div><p>{project.eyebrow}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div>
                <div className="project-links">
                  <a href={project.href} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">Открыть <Arrow /></a>}
                </div>
              </div>
              <ul className="tag-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

function Experience() {
  return (
    <Reveal>
      <section className="experience" id="experience">
        <div className="experience-title"><p className="eyebrow">Опыт и основа</p><h2>Работаю<br />в контексте</h2><p>Интересуюсь не только тем, как собрать интерфейс, но и зачем он нужен продукту.</p></div>
        <div className="timeline">
          {experience.map((item, index) => <article key={item.company}><span className="timeline-index">0{index + 1}</span><time>{item.period}</time><div><h3>{item.company}</h3><p className="role">{item.role}</p><p>{item.description}</p></div></article>)}
          <article><span className="timeline-index">04</span><time>2025</time><div><h3>Case Lab</h3><p className="role">Bitrix</p><p>Практика решения продуктовой задачи в командном формате.</p></div></article>
          <article><span className="timeline-index">05</span><time>2023</time><div><h3>СПО</h3><p className="role">Среднее профессиональное образование</p><p>Техническая база, с которой начался профессиональный путь.</p></div></article>
        </div>
      </section>
    </Reveal>
  )
}

function Skills() {
  const groups = [
    ['Основа', 'React · TypeScript · JavaScript · HTML · CSS'],
    ['Интерфейс', 'Storybook · UI-библиотеки · адаптивность · доступность'],
    ['Качество', 'Vitest · TDD · ESLint · Git'],
    ['Инструменты', 'Vite · Webpack · REST API · Figma'],
  ]
  return <Reveal><section className="skills"><p className="eyebrow">Рабочий набор</p><div>{groups.map(([title, value]) => <article key={title}><span>{title}</span><h3>{value}</h3></article>)}</div></section></Reveal>
}

function Contact() {
  return (
    <Reveal>
      <section className="contact" id="contact">
        <div className="contact-lead"><p className="eyebrow">Открыт к разговору</p><h2>Давайте соберём<br /><em>что-то полезное.</em></h2><a className="button button-primary" href="mailto:borbasov2003@yandex.ru">Написать Борису <Arrow /></a></div>
        <div className="contact-data">
          {contacts.map((contact) => <div key={contact.label}><span>{contact.label}</span>{contact.href ? <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{contact.value} <Arrow /></a> : <strong>{contact.value}</strong>}</div>)}
          <div className="downloads"><span>Резюме</span><a href="/Rezume/downloads/Boris_Basov_Frontend_Developer_React.pdf" download>PDF ↓</a><a href="/Rezume/downloads/Boris_Basov_Frontend_Developer_React.docx" download>DOCX ↓</a></div>
        </div>
      </section>
    </Reveal>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">К основному содержанию</a>
      <Header />
      <main id="main"><Hero /><Evidence /><SenseCase /><KodiCase /><ProjectGallery /><Experience /><Skills /><Contact /></main>
      <footer><span>Борис Басов © 2026</span><a href="#top">Наверх ↑</a></footer>
    </>
  )
}
