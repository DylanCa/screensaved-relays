import { useState, useEffect, useCallback } from 'react'

// Screensaved marketing site. Screenshots live in public/screenshots/ —
// <Shot> renders the image when present and a gradient placeholder when the
// file 404s, so the site ships before every capture exists.

const WIDGETS = [
  {
    name: 'Clock',
    desc: 'The time, big and readable — plus world clocks across the timezones you care about.',
    shot: 'widget-clock.png',
    details: [
      'Local time front and center, styled to be readable from the couch.',
      'Add world clocks for the cities you care about — each geocoded by name and tinted by day or night at that location.',
      'No configuration required: it works out of the box.',
    ],
  },
  {
    name: 'Weather',
    desc: 'Current conditions and highs/lows for your location, with a forecast, sun & moon, air quality, or a second city.',
    shot: 'widget-weather.png',
    details: [
      'Current conditions, temperature, and daily high/low for your location or any city you type.',
      'Pick one enhancement: a 3-day forecast, sunrise/sunset with moon phase, air quality with pollen, or a full second location.',
      'Weather data from Open-Meteo — no account needed.',
    ],
  },
  {
    name: 'Calendar',
    desc: 'Your agenda at a glance: upcoming events from Google Calendar and iCloud, merged.',
    shot: 'widget-calendar.png',
    details: [
      'Connects to Google Calendar and iCloud Calendar — both at once if you like — and merges everything into one agenda.',
      'Per-calendar toggles let you hide the calendars you don’t want on the big screen.',
      'Can expand to fill a whole side of the screen, with day separators between Today, Tomorrow and later.',
      'Read-only access; events go straight from your calendar provider to your TV.',
    ],
  },
  {
    name: 'Music',
    desc: 'Now playing from Spotify or Apple Music — artwork, progress, and remote controls.',
    shot: 'widget-music.png',
    details: [
      'Shows the current track with artwork, artist, album and a live progress bar.',
      'Remote controls: play/pause and skip from the Apple TV remote while the screensaver runs.',
      'Works with Spotify (multiple accounts, switchable) and Apple Music.',
      'With Spotify, playback follows your account across devices — start a song on your phone and it appears on the TV.',
    ],
  },
  {
    name: 'Releases',
    desc: 'Upcoming episodes, movies and animes from your watchlist, plus anticipated game releases.',
    shot: 'widget-releases.png',
    details: [
      'One dated feed of everything coming up: episodes, movies and animes from your SIMKL watchlist, and the week’s most anticipated video games.',
      'Toggle categories on and off: Games, Animes, TV Shows, Movies.',
      'Game releases can be filtered by platform (PC, PlayStation 5, Xbox Series, Switch).',
      'Multiple SIMKL accounts merge into one feed, with each release labeled by whose watchlist it comes from.',
    ],
  },
  {
    name: 'Steam',
    desc: 'Your recent games, latest achievements, friends playing right now, or account stats.',
    shot: 'widget-steam.png',
    details: [
      'Pick a mode: recent games with playtime, latest achievements, friends currently playing, or account stats.',
      'Shows what you’re playing right now when a game is running.',
      'Expanded to a full side, it becomes a dashboard showing every mode at once.',
      'Just enter your profile name — no login needed for public profiles.',
    ],
  },
  {
    name: 'Daily',
    desc: 'A little something every day: quote of the day, word of the day, or "on this day".',
    shot: 'widget-daily.png',
    details: [
      'Quote of the day, word of the day with its definition, or "on this day" moments from history.',
      'Rotates content once a day — a small conversation starter on an idle screen.',
      'Quotes by ZenQuotes.io, history from Wikipedia, definitions from dictionaryapi.dev.',
    ],
  },
]

function Shot({ src, alt, className = '' }) {
  return (
    <div className={className}>
      <img
        src={`/screenshots/${src}`}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.replaceWith(
            Object.assign(document.createElement('div'), {
              className: 'shot-placeholder',
              textContent: alt,
            })
          )
        }}
      />
    </div>
  )
}

function WidgetModal({ widget, onClose }) {
  const onKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onKey])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${widget.name} widget details`}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <Shot className="modal-shot" src={widget.shot} alt={`${widget.name} widget`} />
        <div className="modal-body">
          <h3>{widget.name}</h3>
          <ul>
            {widget.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [openWidget, setOpenWidget] = useState(null)

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a className="nav-brand" href="#">Screensaved</a>
          <div className="nav-links">
            <a href="#widgets">Widgets</a>
            <a href="#wallpapers">Wallpapers</a>
            <a href="#customization">Customization</a>
            <a href="/privacy.html">Privacy</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <h1>Screensaved</h1>
        <p className="tagline">
          A screensaver app for Apple TV. The purpose of Screensaved is to turn
          an idle TV into a useful, beautiful display: full-screen wallpapers
          with glanceable widgets in the corners of your screen.
        </p>
        <Shot
          className="hero-screenshot"
          src="hero.png"
          alt="Screensaved running on Apple TV — aerial wallpaper with clock, weather, releases and music widgets"
        />
      </header>

      <section id="widgets">
        <div className="container">
          <h2 className="section-title">Widget catalog</h2>
          <p className="section-sub">
            Pick up to four widgets, one per corner. Calendar, Releases and
            Steam can grow to take a whole side of the screen. Click a widget
            to learn more.
          </p>
          <div className="widget-grid">
            {WIDGETS.map((w) => (
              <button
                className="widget-card"
                key={w.name}
                onClick={() => setOpenWidget(w)}
              >
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
                <Shot className="shot" src={w.shot} alt={`${w.name} widget`} />
              </button>
            ))}
            <div className="widget-card more-card" aria-hidden="true">
              <h3>…and more to come</h3>
              <p>
                News headlines, countdowns, sports and other widgets are on the
                roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="wallpapers">
        <div className="container">
          <h2 className="section-title">Wallpapers</h2>
          <p className="section-sub">
            The backdrop is yours: curated gradients, cinematic aerial videos,
            or your own photo library.
          </p>

          <div className="feature-row">
            <div className="feature-text">
              <h3>Aerial videos</h3>
              <p>
                Hand-picked aerial footage, streamed by category — nature,
                cities, ocean, or a random mix of the categories you choose.
                A Static mode shows stills instead, rotating gently.
              </p>
              <p style={{ marginTop: 8, fontSize: '0.85rem', opacity: 0.6 }}>
                Videos provided by Pexels.
              </p>
            </div>
            <Shot className="feature-shot" src="wallpaper-aerials.png" alt="Aerial video wallpaper" />
          </div>

          <div className="feature-row reverse">
            <div className="feature-text">
              <h3>Your photos</h3>
              <p>
                Point Screensaved at an iCloud Shared Album and your own
                pictures become the screensaver — a slideshow with slow
                crossfades.
              </p>
            </div>
            <Shot className="feature-shot" src="wallpaper-photos.png" alt="Personal photos wallpaper" />
          </div>

          <div className="feature-row">
            <div className="feature-text">
              <h3>Gradients</h3>
              <p>
                Six tuned gradients — Dusk, Ocean, Forest, Ember, Midnight,
                Graphite — slowly drifting, designed to sit quietly behind
                your widgets.
              </p>
            </div>
            <Shot className="feature-shot" src="wallpaper-gradients.png" alt="Gradient wallpaper styles" />
          </div>
        </div>
      </section>

      <section id="customization">
        <div className="container">
          <h2 className="section-title">Make it yours</h2>
          <p className="section-sub">
            An edit mode for the layout, and a settings page with a live
            preview — see every change before you leave the page.
          </p>

          <div className="feature-row">
            <div className="feature-text">
              <h3>Corner-by-corner layout</h3>
              <p>
                Each corner holds the widget you choose. List widgets can
                expand to fill a whole side with more rows and day separators.
              </p>
            </div>
            <Shot className="feature-shot" src="edit-mode.png" alt="Edit mode with widget dropdowns" />
          </div>

          <div className="feature-row reverse">
            <div className="feature-text">
              <h3>Live-preview settings</h3>
              <p>
                The settings page shows a miniature TV: change the weather
                enhancement, the wallpaper category, or a widget mode and
                watch it update instantly.
              </p>
            </div>
            <Shot className="feature-shot" src="settings-preview.png" alt="Settings page with live preview pane" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="privacy-strip">
            <h3>Private by design</h3>
            <p>
              Screensaved has no backend, no analytics, no ads, and no
              tracking. If you connect Google Calendar, its read-only access is
              used solely to show your upcoming events on your own TV — data
              goes straight from Google to your Apple TV and nowhere else.
              Sign-in tokens live in the device keychain; disconnecting deletes
              them. Read the full <a href="/privacy.html">privacy policy</a>.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>
          Screensaved — developed by <a href="https://github.com/DylanCa">DylanCa</a> ·{' '}
          <a href="/privacy.html">Privacy policy</a> ·{' '}
          <a href="https://github.com/DylanCa/screensaved-relays">Contact</a>
        </p>
      </footer>

      {openWidget && (
        <WidgetModal widget={openWidget} onClose={() => setOpenWidget(null)} />
      )}
    </>
  )
}
