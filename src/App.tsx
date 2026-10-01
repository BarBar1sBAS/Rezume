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
        <img className="texture" src="/Rezume/assets/optimized/hero-texture-1200.webp" srcSet="/Rezume/assets/optimized/hero-texture-640.webp 640w, /Rezume/assets/optimized/hero-texture-800.webp 800w, /Rezume/assets/optimized/hero-texture-1200.webp 1200w" sizes="(max-width: 767px) 90vw, 50vw" alt="" />
        <figure className="shot shot-main">
          <img src="/Rezume/assets/optimized/vk-marusya-1200.webp" srcSet="/Rezume/assets/optimized/vk-marusya-640.webp 640w, /Rezume/assets/optimized/vk-marusya-1200.webp 1200w" sizes="(max-width: 767px) 86vw, 43vw" alt="Интерфейс проекта VK Маруся" width="1440" height="900" fetchPriority="high" />
        </figure>
        <figure className="shot shot-top">
          <img src="/Rezume/assets/sense/datepicker-640.webp" alt="Компонент DatePickerV2 из дизайн-системы SENSE" width="640" height="452" data-sense-asset />
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

function SenseCase() {
  return (
    <Reveal>
      <section className="case sense-case" id="work">
        <div className="sense-masthead">
          <img src="/Rezume/assets/sense/logo.svg" alt="SENSE" width="106" height="32" />
          <div><span>Frontend-разработчик</span><span>сентябрь 2025 - июнь 2026</span></div>
        </div>
        <div className="sense-intro">
          <p className="eyebrow">Коммерческий продукт</p>
          <h2>Дизайн-система,<br />которая работает<br />в продукте</h2>
          <p>В SENSE я развивал общую UI-библиотеку и доводил её компоненты до продуктовых HR-сценариев: форм, гридов, фильтров, навигации и состояний загрузки.</p>
        </div>
        <figure className="sense-artifact sense-primary">
          <picture>
            <source media="(max-width: 767px)" srcSet="/Rezume/assets/sense/datepicker-640.webp" />
            <img src="/Rezume/assets/sense/datepicker.webp" alt="Открытый DatePickerV2 с календарём и выбором месяца из Storybook SENSE" width="1120" height="790" loading="lazy" data-sense-asset />
          </picture>
          <figcaption><strong>DatePickerV2</strong><span>Календарь, диапазоны и проверенные состояния</span></figcaption>
        </figure>
        <div className="sense-artifacts-secondary">
          <figure className="sense-artifact sense-pagination">
            <picture>
              <source media="(max-width: 767px)" srcSet="/Rezume/assets/sense/pagination-640.webp" />
              <img src="/Rezume/assets/sense/pagination.webp" alt="Компонент Pagination со статистикой записей из Storybook SENSE" width="1200" height="163" loading="lazy" data-sense-asset />
            </picture>
            <figcaption><strong>Pagination</strong><span>Единое управление большими выборками</span></figcaption>
          </figure>
          <figure className="sense-artifact sense-skeleton">
            <picture>
              <source media="(max-width: 767px)" srcSet="/Rezume/assets/sense/skeleton-640.webp" />
              <img src="/Rezume/assets/sense/skeleton.webp" alt="Табличное состояние загрузки Skeleton из Storybook SENSE" width="1080" height="480" loading="lazy" data-sense-asset />
            </picture>
            <figcaption><strong>Skeleton</strong><span>Загрузка повторяет структуру контента</span></figcaption>
          </figure>
        </div>
        <div className="sense-contributions">
          <article><span>Система</span><h3>Системные компоненты</h3><p>Развивал DatePickerV2, Pagination, Skeleton, HeaderContent и документировал состояния в Storybook.</p></article>
          <article><span>Качество</span><h3>Тесты как часть разработки</h3><p>Покрывал компоненты, hooks и utilities unit-тестами на Vitest. Работал в TDD-контуре.</p></article>
          <article><span>Продукт</span><h3>Интеграция в HR-сценарии</h3><p>Интегрировал общую пагинацию, loaders, sidebar, формы, гриды, фильтры и валидацию.</p></article>
        </div>
        <div className="impact-row">
          <div><strong>≈25%</strong><span>быстрее повторная сборка экранов благодаря Storybook</span></div>
          <div><strong>≈15%</strong><span>быстрее code review с едиными правилами компонентов</span></div>
          <div><strong>≈30%</strong><span>меньше регрессий после покрытия критичных компонентов тестами</span></div>
        </div>
        <div className="sense-disclosure"><span>Коммерческий проект. Исходники закрыты.</span><span>Оценки приведены примерно, по данным из резюме.</span></div>
      </section>
    </Reveal>
  )
}

function MuseumCase() {
  return (
    <Reveal>
      <section className="case museum-case" aria-labelledby="museum-title" data-museum-case>
        <div className="museum-masthead">
          <div className="museum-wordmark" aria-label="Музей криптографии">музей<br />крипто<br />графии</div>
          <div><span>Автор V2, Frontend-разработчик</span><span>2026</span></div>
        </div>

        <div className="museum-intro">
          <p className="eyebrow">Публичный проект без NDA</p>
          <h2 id="museum-title">Музей криптографии:<br />от V1 к V2</h2>
          <div>
            <p>V1 команда представила без моего заметного участия. После обратной связи о необходимости переработать дизайн я полностью взял V2 на себя.</p>
            <p>Провёл аудит первой версии и материалов музея, выделил устойчивые визуальные приёмы и пересобрал интерфейс как цельный цифровой экспонат.</p>
          </div>
        </div>

        <div className="museum-comparison" aria-label="Сравнение первой и второй версий проекта">
          <figure className="museum-frame museum-v1">
            <picture>
              <source media="(max-width: 767px)" srcSet="/Rezume/assets/museum/v1-720.webp" />
              <img src="/Rezume/assets/museum/v1-1200.webp" srcSet="/Rezume/assets/museum/v1-720.webp 720w, /Rezume/assets/museum/v1-1200.webp 1200w" sizes="(max-width: 767px) 100vw, 34vw" alt="Стартовый экран первой версии проекта Музея криптографии" width="1200" height="750" loading="lazy" data-museum-asset />
            </picture>
            <figcaption><strong>V1</strong><span>Компактный сценарий до дизайн-аудита</span></figcaption>
          </figure>
          <figure className="museum-frame museum-v2">
            <picture>
              <source media="(max-width: 767px)" srcSet="/Rezume/assets/museum/v2-start-720.webp" />
              <img src="/Rezume/assets/museum/v2-start-1200.webp" srcSet="/Rezume/assets/museum/v2-start-720.webp 720w, /Rezume/assets/museum/v2-start-1200.webp 1200w" sizes="(max-width: 767px) 100vw, 66vw" alt="Стартовый экран V2 с новой композицией и пиксельной иллюстрацией" width="1200" height="771" loading="lazy" data-museum-asset />
            </picture>
            <figcaption><strong>V2</strong><span>Визуальная система работает на историю и механику</span></figcaption>
          </figure>
        </div>

        <div className="museum-process">
          <article><span>Аудит</span><h3>Нашёл разрыв между брендом и интерфейсом</h3><p>Сверил V1 с сайтом и материалами музея, разобрал иерархию, композицию, типографику и состояния.</p></article>
          <article><span>Система</span><h3>Собрал узнаваемый визуальный язык</h3><p>Halvar, светлая и тёмная палитры, прямоугольная геометрия и пиксельные сцены стали правилами, а не декором.</p></article>
          <article><span>Реализация</span><h3>Обновил продукт, сохранив его логику</h3><p>React, TypeScript, токены, UI kit, Storybook и TDD позволили менять представление быстро и контролируемо.</p></article>
        </div>

        <div className="museum-gallery">
          <figure className="museum-frame museum-dark">
            <img src="/Rezume/assets/museum/v2-dark-1200.webp" srcSet="/Rezume/assets/museum/v2-dark-720.webp 720w, /Rezume/assets/museum/v2-dark-1200.webp 1200w" sizes="(max-width: 767px) 100vw, 62vw" alt="Тёмная тема стартового экрана V2 Музея криптографии" width="1200" height="771" loading="lazy" data-museum-asset />
            <figcaption><strong>Две темы</strong><span>Иллюстрации меняются вместе с освещением интерфейса</span></figcaption>
          </figure>
          <figure className="museum-frame museum-mobile">
            <img src="/Rezume/assets/museum/v2-mobile.webp" alt="Мобильная игровая сцена V2 с вопросом о безопасной оплате" width="390" height="1296" loading="lazy" data-museum-asset />
            <figcaption><strong>390 px</strong><span>Полный сценарий без горизонтального скролла</span></figcaption>
          </figure>
          <figure className="museum-frame museum-final">
            <img src="/Rezume/assets/museum/v2-final-1200.webp" srcSet="/Rezume/assets/museum/v2-final-720.webp 720w, /Rezume/assets/museum/v2-final-1200.webp 1200w" sizes="(max-width: 767px) 100vw, 76vw" alt="Финальный экран V2 с расшифрованным посланием и наградой" width="1200" height="898" loading="lazy" data-museum-asset />
            <figcaption><strong>Финал</strong><span>Результат, три ключа и понятное завершение истории</span></figcaption>
          </figure>
        </div>

        <div className="museum-evidence" aria-label="Подтверждённые показатели качества V2">
          <div className="museum-evidence-lead"><span>Проверено в репозитории</span><strong>Качество не заявлено на словах. Оно зафиксировано тестами и аудитом.</strong></div>
          <dl>
            <div><dt>Vitest</dt><dd>150+ тестов</dd></div>
            <div><dt>Coverage</dt><dd>100%</dd></div>
            <div><dt>Playwright</dt><dd>23 сценария</dd></div>
            <div><dt>Lighthouse: Perf / A11y / BP</dt><dd>95 / 100 / 100</dd></div>
            <div><dt>Impeccable</dt><dd>18 / 20</dd></div>
          </dl>
        </div>

        <div className="museum-footer">
          <p>Командный учебный проект в рамках Skillbox. V2, дизайн-аудит и реализация выполнены мной самостоятельно.</p>
          <div className="museum-links">
            <a className="button button-primary" href="https://barbar1sbas.github.io/skillbox_museum_v2/" target="_blank" rel="noreferrer">Открыть V2 <Arrow /></a>
            <a className="text-link" href="https://github.com/BarBar1sBAS/skillbox_museum_v2" target="_blank" rel="noreferrer">Код V2 <Arrow /></a>
            <a className="text-link" href="https://barbar1sbas.github.io/skillbox_museum/" target="_blank" rel="noreferrer">Сравнить с V1 <Arrow /></a>
          </div>
        </div>
      </section>
    </Reveal>
  )
}

function KodiCase() {
  return (
    <Reveal>
      <section className="case kodi-case">
        <div className="kodi-copy">
          <div className="section-number">Product architecture</div>
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
      <main id="main"><Hero /><Evidence /><SenseCase /><MuseumCase /><KodiCase /><ProjectGallery /><Experience /><Skills /><Contact /></main>
      <footer><span>Борис Басов © 2026</span><a href="#top">Наверх ↑</a></footer>
    </>
  )
}
