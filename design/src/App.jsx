import { useState, useEffect } from 'react'
import './App.css'

/* ─── Icons (inline SVG) ─── */
const Icon = ({ name, size = 24 }) => {
  const icons = {
    camera: <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
    scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    back: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    sun: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>,
    crop: <><path d="M6.13 1 6 16a2 2 0 0 0 2 2h15" /><path d="M1 6.13 16 6a2 2 0 0 1 2 2v15" /></>,
    wand: <path d="m15 4-1.5 1.5 3 3L18 7l-3-3zM4 20l4-4 1.5 1.5-4 4H4v-1.5z" />,
    pdf: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><text x="8" y="17" fontSize="5" fill="currentColor" fontWeight="700">PDF</text></>,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
    flash: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    rotate: <><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

/* ─── Mock document preview ─── */
const DocPreview = ({ variant = 'clean', className = '' }) => {
  const styles = {
    raw: { filter: 'brightness(0.85) contrast(0.9)', transform: 'rotate(-2deg)' },
    processing: { filter: 'brightness(0.95) contrast(1.05)', opacity: 0.7 },
    clean: { filter: 'brightness(1.05) contrast(1.1)' },
  }
  return (
    <div className={`doc-preview ${className}`} style={styles[variant]}>
      <div className="doc-preview__paper">
        <div className="doc-preview__header" />
        <div className="doc-preview__line w90" />
        <div className="doc-preview__line w75" />
        <div className="doc-preview__line w85" />
        <div className="doc-preview__line w60" />
        <div className="doc-preview__line w80" />
        <div className="doc-preview__line w70" />
        <div className="doc-preview__signature" />
      </div>
      {variant === 'raw' && <div className="doc-preview__shadow" />}
    </div>
  )
}

/* ─── Status bar ─── */
const StatusBar = ({ dark = false }) => (
  <div className={`status-bar ${dark ? 'status-bar--dark' : ''}`}>
    <span>9:41</span>
    <div className="status-bar__icons">
      <span className="status-bar__signal" />
      <span className="status-bar__wifi" />
      <span className="status-bar__battery" />
    </div>
  </div>
)

/* ─── Tab bar ─── */
const TabBar = ({ active, onNavigate }) => (
  <nav className="tab-bar">
    {[
      { id: 'home', icon: 'home', label: 'Главная' },
      { id: 'library', icon: 'folder', label: 'Документы' },
      { id: 'settings', icon: 'settings', label: 'Настройки' },
    ].map(tab => (
      <button
        key={tab.id}
        className={`tab-bar__item ${active === tab.id ? 'tab-bar__item--active' : ''}`}
        onClick={() => onNavigate(tab.id)}
      >
        <Icon name={tab.icon} size={22} />
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>
)

/* ─── Screens ─── */

function OnboardingScreen({ onComplete }) {
  const [slide, setSlide] = useState(0)
  const slides = [
    {
      title: 'Сканируйте документы',
      desc: 'Сфотографируйте или выберите из галереи — DocDoc сделает остальное',
      visual: 'camera',
    },
    {
      title: 'Умная реставрация',
      desc: 'Убираем тени, выравниваем перспективу и отбеливаем фон автоматически',
      visual: 'wand',
    },
    {
      title: 'PDF и Share',
      desc: 'Конвертируйте в PDF и сразу отправьте по почте, в мессенджер или облако',
      visual: 'share',
    },
  ]

  return (
    <div className="screen onboarding">
      <StatusBar />
      <div className="onboarding__content">
        <div className="onboarding__visual">
          {slide === 0 && (
            <div className="onboarding__phone-mock">
              <div className="onboarding__camera-frame">
                <DocPreview variant="raw" />
                <div className="onboarding__scan-corners" />
              </div>
            </div>
          )}
          {slide === 1 && (
            <div className="onboarding__compare">
              <div className="onboarding__compare-before">
                <span>До</span>
                <DocPreview variant="raw" />
              </div>
              <div className="onboarding__compare-arrow">→</div>
              <div className="onboarding__compare-after">
                <span>После</span>
                <DocPreview variant="clean" />
              </div>
            </div>
          )}
          {slide === 2 && (
            <div className="onboarding__pdf-mock">
              <div className="onboarding__pdf-file">
                <Icon name="pdf" size={40} />
                <span>Договор_2026.pdf</span>
                <span className="onboarding__pdf-size">248 KB</span>
              </div>
              <div className="onboarding__share-row">
                {['mail', 'message', 'cloud', 'share'].map((ic, i) => (
                  <div key={i} className="onboarding__share-icon"><Icon name={ic} size={20} /></div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="onboarding__text">
          <h1>{slides[slide].title}</h1>
          <p>{slides[slide].desc}</p>
        </div>
        <div className="onboarding__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`onboarding__dot ${i === slide ? 'onboarding__dot--active' : ''}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
      <div className="onboarding__actions">
        {slide < slides.length - 1 ? (
          <>
            <button className="btn-text" onClick={onComplete}>Пропустить</button>
            <button className="btn-primary" onClick={() => setSlide(s => s + 1)}>Далее</button>
          </>
        ) : (
          <button className="btn-primary btn-primary--full" onClick={onComplete}>Начать</button>
        )}
      </div>
    </div>
  )
}

function HomeScreen({ onNavigate }) {
  const recentDocs = [
    { id: 1, name: 'Паспорт — стр. 2-3', date: 'Сегодня, 14:32', pages: 2 },
    { id: 2, name: 'Договор аренды', date: 'Вчера', pages: 5 },
    { id: 3, name: 'Справка с работы', date: '28 июн', pages: 1 },
  ]

  return (
    <div className="screen home">
      <StatusBar />
      <header className="home__header">
        <div>
          <p className="home__greeting">Добрый день</p>
          <h1>DocDoc</h1>
        </div>
        <button className="icon-btn" onClick={() => onNavigate('settings')}>
          <Icon name="settings" size={22} />
        </button>
      </header>

      <div className="home__hero">
        <button className="home__scan-btn" onClick={() => onNavigate('camera')}>
          <div className="home__scan-icon">
            <Icon name="camera" size={32} />
          </div>
          <span>Сканировать</span>
        </button>
        <div className="home__quick-actions">
          <button className="home__quick-btn" onClick={() => onNavigate('gallery')}>
            <Icon name="image" size={20} />
            <span>Галерея</span>
          </button>
          <button className="home__quick-btn" onClick={() => onNavigate('library')}>
            <Icon name="folder" size={20} />
            <span>Документы</span>
          </button>
        </div>
      </div>

      <section className="home__recent">
        <div className="section-header">
          <h2>Недавние</h2>
          <button className="btn-text" onClick={() => onNavigate('library')}>Все</button>
        </div>
        <div className="home__recent-list">
          {recentDocs.map(doc => (
            <button key={doc.id} className="doc-card" onClick={() => onNavigate('editor')}>
              <div className="doc-card__thumb">
                <DocPreview variant="clean" />
              </div>
              <div className="doc-card__info">
                <span className="doc-card__name">{doc.name}</span>
                <span className="doc-card__meta">{doc.date} · {doc.pages} стр.</span>
              </div>
              <Icon name="share" size={18} />
            </button>
          ))}
        </div>
      </section>

      <TabBar active="home" onNavigate={onNavigate} />
    </div>
  )
}

function CameraScreen({ onNavigate }) {
  return (
    <div className="screen camera">
      <StatusBar dark />
      <div className="camera__viewfinder">
        <DocPreview variant="raw" className="camera__bg-doc" />
        <div className="camera__overlay">
          <div className="camera__top-bar">
            <button className="icon-btn icon-btn--light" onClick={() => onNavigate('home')}>
              <Icon name="x" size={24} />
            </button>
            <button className="icon-btn icon-btn--light">
              <Icon name="flash" size={22} />
            </button>
          </div>
          <div className="camera__frame">
            <div className="camera__corner camera__corner--tl" />
            <div className="camera__corner camera__corner--tr" />
            <div className="camera__corner camera__corner--bl" />
            <div className="camera__corner camera__corner--br" />
            <div className="camera__scan-line" />
          </div>
          <p className="camera__hint">Наведите на документ</p>
          <div className="camera__bottom">
            <button className="camera__gallery-btn" onClick={() => onNavigate('gallery')}>
              <div className="camera__gallery-thumb">
                <DocPreview variant="clean" />
              </div>
            </button>
            <button className="camera__shutter" onClick={() => onNavigate('processing')} />
            <button className="icon-btn icon-btn--light">
              <Icon name="rotate" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryScreen({ onNavigate }) {
  const photos = Array.from({ length: 12 }, (_, i) => i)
  const [selected, setSelected] = useState([2, 5])

  const toggle = (i) => {
    setSelected(s =>
      s.includes(i) ? s.filter(x => x !== i) : [...s, i]
    )
  }

  return (
    <div className="screen gallery">
      <StatusBar />
      <header className="screen-header">
        <button className="icon-btn" onClick={() => onNavigate('home')}>
          <Icon name="x" size={22} />
        </button>
        <h2>Галерея</h2>
        <button
          className="btn-text"
          disabled={selected.length === 0}
          onClick={() => onNavigate('processing')}
        >
          Готово ({selected.length})
        </button>
      </header>
      <div className="gallery__grid">
        {photos.map(i => (
          <button
            key={i}
            className={`gallery__item ${selected.includes(i) ? 'gallery__item--selected' : ''}`}
            onClick={() => toggle(i)}
          >
            <DocPreview variant={i % 3 === 0 ? 'raw' : 'clean'} />
            {selected.includes(i) && (
              <span className="gallery__check"><Icon name="check" size={14} /></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function ProcessingScreen({ onNavigate }) {
  const [step, setStep] = useState(0)
  const steps = ['Обнаружение границ', 'Выравнивание', 'Удаление теней', 'Отбеливание фона']

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setStep(i + 1), (i + 1) * 800)
    )
    const done = setTimeout(() => onNavigate('editor'), steps.length * 800 + 600)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [])

  return (
    <div className="screen processing">
      <StatusBar />
      <div className="processing__content">
        <div className="processing__preview">
          <DocPreview variant={step < 2 ? 'raw' : step < 4 ? 'processing' : 'clean'} />
          <div className="processing__spinner" />
        </div>
        <h2>Реставрация...</h2>
        <ul className="processing__steps">
          {steps.map((s, i) => (
            <li key={i} className={i < step ? 'processing__step--done' : i === step ? 'processing__step--active' : ''}>
              {i < step ? <Icon name="check" size={16} /> : <span className="processing__step-dot" />}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function EditorScreen({ onNavigate }) {
  const [brightness, setBrightness] = useState(70)
  const [contrast, setContrast] = useState(55)
  const [whiten, setWhiten] = useState(80)
  const [activeTab, setActiveTab] = useState('enhance')

  return (
    <div className="screen editor">
      <StatusBar dark />
      <header className="editor__header">
        <button className="icon-btn icon-btn--light" onClick={() => onNavigate('home')}>
          <Icon name="back" size={22} />
        </button>
        <h2>Редактор</h2>
        <button className="btn-text btn-text--light" onClick={() => onNavigate('export')}>
          Далее
        </button>
      </header>

      <div className="editor__canvas">
        <DocPreview variant="clean" />
        <div className="editor__page-badge">1 / 3</div>
      </div>

      <div className="editor__pages">
        {[1, 2, 3].map(p => (
          <button key={p} className={`editor__page-thumb ${p === 1 ? 'editor__page-thumb--active' : ''}`}>
            <DocPreview variant="clean" />
          </button>
        ))}
        <button className="editor__page-add" onClick={() => onNavigate('camera')}>
          <Icon name="plus" size={20} />
        </button>
      </div>

      <div className="editor__toolbar">
        <div className="editor__tabs">
          {[
            { id: 'enhance', icon: 'wand', label: 'Улучшение' },
            { id: 'crop', icon: 'crop', label: 'Обрезка' },
            { id: 'rotate', icon: 'rotate', label: 'Поворот' },
          ].map(t => (
            <button
              key={t.id}
              className={`editor__tab ${activeTab === t.id ? 'editor__tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <Icon name={t.icon} size={18} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'enhance' && (
          <div className="editor__sliders">
            <div className="slider-row">
              <Icon name="sun" size={18} />
              <span>Яркость</span>
              <input type="range" min="0" max="100" value={brightness} onChange={e => setBrightness(+e.target.value)} />
            </div>
            <div className="slider-row">
              <span className="slider-icon">◐</span>
              <span>Контраст</span>
              <input type="range" min="0" max="100" value={contrast} onChange={e => setContrast(+e.target.value)} />
            </div>
            <div className="slider-row">
              <span className="slider-icon">□</span>
              <span>Отбеливание</span>
              <input type="range" min="0" max="100" value={whiten} onChange={e => setWhiten(+e.target.value)} />
            </div>
            <button className="btn-secondary btn-secondary--full">
              <Icon name="wand" size={18} />
              Авто-улучшение
            </button>
          </div>
        )}

        {activeTab === 'crop' && (
          <div className="editor__crop-hint">
            <p>Перетащите углы для обрезки документа</p>
            <div className="editor__crop-preview">
              <div className="editor__crop-frame" />
            </div>
          </div>
        )}

        {activeTab === 'rotate' && (
          <div className="editor__rotate-actions">
            <button className="btn-secondary">↺ −90°</button>
            <button className="btn-secondary">↻ +90°</button>
            <button className="btn-secondary">⟳ 180°</button>
          </div>
        )}
      </div>
    </div>
  )
}

function ExportScreen({ onNavigate }) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => { setExporting(false); setDone(true) }, 1500)
  }

  return (
    <div className="screen export">
      <StatusBar />
      <header className="screen-header">
        <button className="icon-btn" onClick={() => onNavigate('editor')}>
          <Icon name="back" size={22} />
        </button>
        <h2>Экспорт PDF</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="export__preview">
        <div className="export__pdf-icon">
          <Icon name="pdf" size={48} />
        </div>
        <h3>Договор аренды</h3>
        <p>3 страницы · A4 · ~420 KB</p>
      </div>

      <div className="export__options">
        <label className="export__option">
          <span>Качество</span>
          <select defaultValue="high">
            <option value="high">Высокое</option>
            <option value="medium">Среднее</option>
            <option value="low">Низкое (меньше размер)</option>
          </select>
        </label>
        <label className="export__option">
          <span>Ориентация</span>
          <select defaultValue="auto">
            <option value="auto">Авто</option>
            <option value="portrait">Книжная</option>
            <option value="landscape">Альбомная</option>
          </select>
        </label>
        <label className="export__option export__option--toggle">
          <span>Сжатие PDF</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>

      {!done ? (
        <button className="btn-primary btn-primary--full export__btn" onClick={handleExport} disabled={exporting}>
          {exporting ? (
            <><span className="spinner" /> Создание PDF...</>
          ) : (
            <><Icon name="pdf" size={20} /> Создать PDF</>
          )}
        </button>
      ) : (
        <div className="export__done">
          <div className="export__done-badge">
            <Icon name="check" size={24} />
            <span>PDF готов!</span>
          </div>
          <button className="btn-primary btn-primary--full" onClick={() => onNavigate('share')}>
            <Icon name="share" size={20} />
            Поделиться
          </button>
          <button className="btn-secondary btn-secondary--full" onClick={() => onNavigate('library')}>
            Сохранить в документы
          </button>
        </div>
      )}
    </div>
  )
}

function ShareScreen({ onNavigate }) {
  const options = [
    { icon: 'mail', label: 'Почта', color: '#4A90D9' },
    { icon: 'message', label: 'Сообщения', color: '#34C759' },
    { icon: 'cloud', label: 'iCloud', color: '#5AC8FA' },
    { icon: 'copy', label: 'Копировать', color: '#8E8E93' },
    { icon: 'share', label: 'Ещё...', color: '#636366' },
  ]

  return (
    <div className="screen share">
      <div className="share__backdrop" onClick={() => onNavigate('home')} />
      <div className="share__sheet">
        <div className="share__handle" />
        <div className="share__file">
          <Icon name="pdf" size={36} />
          <div>
            <strong>Договор_аренды.pdf</strong>
            <span>420 KB</span>
          </div>
        </div>
        <div className="share__grid">
          {options.map((o, i) => (
            <button key={i} className="share__option">
              <div className="share__option-icon" style={{ background: o.color }}>
                <Icon name={o.icon} size={22} />
              </div>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
        <button className="btn-secondary btn-secondary--full" onClick={() => onNavigate('home')}>
          Готово
        </button>
      </div>
    </div>
  )
}

function LibraryScreen({ onNavigate }) {
  const docs = [
    { id: 1, name: 'Паспорт — стр. 2-3', date: '3 июл 2026', pages: 2, size: '1.2 MB' },
    { id: 2, name: 'Договор аренды', date: '2 июл 2026', pages: 5, size: '420 KB' },
    { id: 3, name: 'Справка с работы', date: '28 июн 2026', pages: 1, size: '180 KB' },
    { id: 4, name: 'Мед. полис', date: '15 июн 2026', pages: 2, size: '310 KB' },
  ]

  return (
    <div className="screen library">
      <StatusBar />
      <header className="home__header">
        <h1>Документы</h1>
        <button className="icon-btn" onClick={() => onNavigate('camera')}>
          <Icon name="plus" size={22} />
        </button>
      </header>

      <div className="library__search">
        <input type="text" placeholder="Поиск документов..." />
      </div>

      <div className="library__list">
        {docs.map(doc => (
          <button key={doc.id} className="library__item" onClick={() => onNavigate('editor')}>
            <div className="library__thumb">
              <DocPreview variant="clean" />
            </div>
            <div className="library__info">
              <span className="library__name">{doc.name}</span>
              <span className="library__meta">{doc.date} · {doc.pages} стр. · {doc.size}</span>
            </div>
            <button className="icon-btn" onClick={e => { e.stopPropagation(); onNavigate('share') }}>
              <Icon name="share" size={18} />
            </button>
          </button>
        ))}
      </div>

      <TabBar active="library" onNavigate={onNavigate} />
    </div>
  )
}

function SettingsScreen({ onNavigate }) {
  return (
    <div className="screen settings">
      <StatusBar />
      <header className="home__header">
        <h1>Настройки</h1>
      </header>

      <div className="settings__group">
        <h3>Сканирование</h3>
        <label className="settings__row">
          <span>Авто-улучшение после съёмки</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="settings__row">
          <span>Авто-обрезка границ</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="settings__row">
          <span>Качество PDF по умолчанию</span>
          <select defaultValue="high"><option>Высокое</option><option>Среднее</option></select>
        </label>
      </div>

      <div className="settings__group">
        <h3>Хранение</h3>
        <label className="settings__row">
          <span>Сохранять оригиналы</span>
          <input type="checkbox" />
        </label>
        <div className="settings__row settings__row--info">
          <span>Использовано</span>
          <span className="settings__value">24 MB / 1 GB</span>
        </div>
      </div>

      <div className="settings__group">
        <h3>О приложении</h3>
        <div className="settings__row settings__row--info">
          <span>Версия</span>
          <span className="settings__value">1.0.0 (прототип)</span>
        </div>
      </div>

      <TabBar active="settings" onNavigate={onNavigate} />
    </div>
  )
}

/* ─── Screen map ─── */
const SCREENS = {
  onboarding: OnboardingScreen,
  home: HomeScreen,
  camera: CameraScreen,
  gallery: GalleryScreen,
  processing: ProcessingScreen,
  editor: EditorScreen,
  export: ExportScreen,
  share: ShareScreen,
  library: LibraryScreen,
  settings: SettingsScreen,
}

const SCREEN_LABELS = {
  onboarding: 'Онбординг',
  home: 'Главная',
  camera: 'Камера',
  gallery: 'Галерея',
  processing: 'Обработка',
  editor: 'Редактор',
  export: 'Экспорт PDF',
  share: 'Share',
  library: 'Документы',
  settings: 'Настройки',
}

export default function App() {
  const [screen, setScreen] = useState('onboarding')
  const [seenOnboarding, setSeenOnboarding] = useState(false)

  const navigate = (target) => {
    if (target === 'home' && !seenOnboarding) {
      setSeenOnboarding(true)
    }
    setScreen(target)
  }

  const handleOnboardingComplete = () => {
    setSeenOnboarding(true)
    setScreen('home')
  }

  const Screen = SCREENS[screen]
  const props = screen === 'onboarding'
    ? { onComplete: handleOnboardingComplete }
    : { onNavigate: navigate }

  return (
    <div className="prototype-wrapper">
      <aside className="prototype-sidebar">
        <h2>DocDoc Prototype</h2>
        <p className="prototype-sidebar__desc">
          Кликабельный мобильный прототип. Нажимайте на элементы внутри телефона или выберите экран слева.
        </p>
        <nav className="prototype-nav">
          {Object.entries(SCREEN_LABELS).map(([id, label]) => (
            <button
              key={id}
              className={`prototype-nav__item ${screen === id ? 'prototype-nav__item--active' : ''}`}
              onClick={() => setScreen(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="prototype-flow">
          <h3>User Flow</h3>
          <code>Онбординг → Главная → Камера/Галерея → Обработка → Редактор → PDF → Share</code>
        </div>
      </aside>

      <div className="phone-frame">
        <div className="phone-frame__notch" />
        <div className="phone-frame__screen">
          <Screen {...props} />
        </div>
        <div className="phone-frame__home-indicator" />
      </div>
    </div>
  )
}
