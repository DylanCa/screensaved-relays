// Screensaved marketing site. Screenshots live in public/screenshots/ —
// <Shot> renders the image when present and a gradient placeholder when the
// file 404s, so the site ships before every capture exists.

const WIDGETS = [
  {
    icon: '🕰',
    name: 'Clock',
    desc: 'The time, big and readable — plus world clocks across the timezones you care about, each with day/night tint.',
    shot: 'widget-clock.png',
  },
  {
    icon: '⛅️',
    name: 'Weather',
    desc: 'Current conditions and highs/lows for your location, enhanced with a 3-day forecast, sun & moon times, air quality, or a second city.',
    shot: 'widget-weather.png',
  },
  {
    icon: '📆',
    name: 'Calendar',
    desc: 'Your agenda at a glance: upcoming events from Google Calendar and iCloud, merged, with per-calendar toggles.',
    shot: 'widget-calendar.png',
  },
  {
    icon: '🎵',
    name: 'Music',
    desc: 'Now playing from Spotify or Apple Music — artwork, progress, and remote controls. Supports multiple Spotify accounts.',
    shot: 'widget-music.png',
  },
  {
    icon: '🎬',
    name: 'Releases',
    desc: "Upcoming episodes, movies and animes from your SIMKL watchlist, plus the week's most anticipated game releases — one dated feed.",
    shot: 'widget-releases.png',
  },
  {
    icon: '🎮',
    name: 'Steam',
    desc: 'Your recent games, latest achievements, friends playing right now, or account stats — a full dashboard when enlarged.',
    shot: 'widget-steam.png',
  },
  {
    icon: '💬',
    name: 'Daily',
    desc: 'A little something every day: quote of the day, word of the day, or "on this day" moments from history.',
    shot: 'widget-daily.png',
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

export default function App() {
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
            Steam can grow to take a whole side of the screen.
          </p>
          <div className="widget-grid">
            {WIDGETS.map((w) => (
              <div className="widget-card" key={w.name}>
                <span className="icon" aria-hidden="true">{w.icon}</span>
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
                <Shot className="shot" src={w.shot} alt={`${w.name} widget`} />
              </div>
            ))}
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
                Graphite — designed to sit quietly behind your widgets.
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
          Screensaved — developed by{' '}
          <a href="https://github.com/DylanCa">DylanCa</a> ·{' '}
          <a href="/privacy.html">Privacy policy</a> ·{' '}
          <a href="https://github.com/DylanCa/screensaved-relays">Contact</a>
        </p>
      </footer>
    </>
  )
}
