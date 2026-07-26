import { D } from '@/data/descent';
import { F } from '@/data/gallery';
import { SkyscapeEngine } from '@/components/ClientComponents';

const U = (id: string, w: number, q = 80) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}`;

export default function Home() {
  return (
    <>
      {/* ── Ambient earth glow (fixed) ── */}
      <div className="earthshift" id="earthshift" aria-hidden="true" />

      {/* ── High-Tech Quadcopter Telemetry Preloader ── */}
      <div className="pre" id="pre">
        <div className="pre-bg-grid" aria-hidden="true" />

        {/* Top telemetry status bar */}
        <div className="pre-top">
          <div className="pre-brand">
            <span className="beacon" />
            <b>Skyscape</b>
            <span className="sub">UAS Flight Systems</span>
          </div>
          <div className="pre-tele-status">
            <span id="preSats">Acquiring GPS Lock</span>
          </div>
        </div>

        {/* Center Drone & Radar Telemetry HUD */}
        <div className="pre-drone-stage" aria-hidden="true">
          <div className="pre-radar-sweep" />
          <div className="pre-hud-ring ring-outer" />
          <div className="pre-hud-ring ring-inner" />
          <div className="pre-crosshair ch-h" />
          <div className="pre-crosshair ch-v" />

          {/* Animated Quadcopter Vector SVG */}
          <div className="pre-drone-svg-wrap">
            <svg className="pre-drone-svg" viewBox="0 0 200 200" fill="none">
              {/* Target reticle & gimbal axis */}
              <circle cx="100" cy="100" r="88" stroke="rgba(124,167,194,0.18)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="54" stroke="rgba(124,167,194,0.28)" strokeWidth="1" />

              {/* Diagonal Quad Arms */}
              <line x1="52" y1="52" x2="148" y2="148" stroke="var(--fog)" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="148" y1="52" x2="52" y2="148" stroke="var(--fog)" strokeWidth="4.5" strokeLinecap="round" />

              {/* Drone Central Body Shell */}
              <rect x="84" y="74" width="32" height="52" rx="8" fill="#0c121c" stroke="var(--haze)" strokeWidth="2" />
              <circle cx="100" cy="90" r="7" fill="#182436" stroke="var(--amber)" strokeWidth="1.5" />
              <path d="M96 112 h8 v6 h-8 z" fill="var(--haze)" />

              {/* 4 Motor Mounts & Spinning Propellers */}
              {/* Top Left Motor */}
              <g className="prop-group prop-tl">
                <circle cx="52" cy="52" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="52" cy="52" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin" />
                <circle cx="52" cy="52" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                <circle cx="52" cy="52" r="2" fill="#10b981" className="led-blink" />
              </g>

              {/* Top Right Motor */}
              <g className="prop-group prop-tr">
                <circle cx="148" cy="52" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="148" cy="52" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin prop-rev" />
                <circle cx="148" cy="52" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                <circle cx="148" cy="52" r="2" fill="#10b981" className="led-blink" />
              </g>

              {/* Bottom Left Motor */}
              <g className="prop-group prop-bl">
                <circle cx="52" cy="148" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="52" cy="148" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin prop-rev" />
                <circle cx="52" cy="148" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                <circle cx="52" cy="148" r="2" fill="var(--amber)" className="led-blink-alt" />
              </g>

              {/* Bottom Right Motor */}
              <g className="prop-group prop-br">
                <circle cx="148" cy="148" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="148" cy="148" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin" />
                <circle cx="148" cy="148" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                <circle cx="148" cy="148" r="2" fill="var(--amber)" className="led-blink-alt" />
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Telemetry Counter & Launch Status */}
        <div className="pre-bottom">
          <div className="pre-mid">
            <div className="pre-count">
              <span id="preNum">000</span><sup>M AGL</sup>
            </div>
            <div className="pre-status-box">
              <div className="pre-status" id="preStatus">Motors Armed</div>
              <div className="pre-tele-pills">
                <span>BARO OK</span>
                <span>IMU READY</span>
                <span>299M CEILING</span>
              </div>
            </div>
          </div>
          <div className="pre-bar"><i id="preBar" /></div>
        </div>
      </div>
      <div className="curtain" id="curtain" aria-hidden="true" />

      {/* ── Altimeter rail ── */}
      <aside className="alt" id="altRail" aria-hidden="true">
        <div className="tape" id="tape" />
        <div className="alt-cur">
          <div className="alt-read">
            <span id="altVal">299</span><u> M</u>
            <small id="altState">AGL · HOVER</small>
          </div>
        </div>
      </aside>
      <div className="chip" aria-hidden="true">
        <b id="chipVal">299 M</b> AGL
      </div>

      {/* ── Header ── */}
      <header className="head" id="head">
        <a className="brand" href="#top">
          <b>Skyscape</b>
          <span>Aerial Photography</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#about">
            <span className="roll"><i>Pilot</i><i aria-hidden="true">Pilot</i></span>
          </a>
          <a href="#descent">
            <span className="roll"><i>Descent</i><i aria-hidden="true">Descent</i></span>
          </a>
          <a href="#work">
            <span className="roll"><i>Work</i><i aria-hidden="true">Work</i></span>
          </a>
          <a href="#contact">
            <span className="roll"><i>Contact</i><i aria-hidden="true">Contact</i></span>
          </a>
        </nav>
      </header>

      {/* ════════════════════════════════════════
          MAIN
      ════════════════════════════════════════ */}
      <main id="top">

        {/* ── HERO ── */}
        <section className="hero" id="hero" aria-label="Introduction">
          <canvas id="glc" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-fallback"
            id="heroFallback"
            src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=2000&q=85"
            alt="Aerial view of the Ladakh range at dusk, ridges fading into blue haze"
            crossOrigin="anonymous"
            fetchPriority="high"
          />
          <div className="hero-tint" aria-hidden="true" />
          <div className="h-corner tl" aria-hidden="true" />
          <div className="h-corner br" aria-hidden="true" />

          <div className="hud" aria-hidden="true">
            <span className="lock"><i />GPS lock · 12 sat</span><br />
            <span id="hudAlt">299.0 m AGL</span><br />
            Gimbal −90.0° · nadir<br />
            34.15° N · 77.57° E
          </div>

          <div className="shell hero-in">
            <div className="wrap">
              <p className="eyebrow hero-kick">
                Kshitiz Bathwal · Aerial Landscape Photography · India
              </p>
              <h1 className="display d1" data-split>
                The earth from <em>299 metres.</em>
              </h1>
              <div className="hero-sub">
                <p className="lede">
                  14 states, 342 logged flights, 118 airtime hours. Documenting India&apos;s terrain, river systems, and coastal geometry from above.
                </p>
                <div className="hero-meta meta">
                  <span>Aircraft<b>DJI Air 2S</b></span>
                  <span>Envelope<b>30–299 m AGL</b></span>
                  <span>Logged<b>118 hours</b></span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-beats" aria-hidden="true">
            <div className="wrap">
              <p className="beat" id="beat1">
                <span className="beat-k">Maximum ceiling · 299 m</span>
                <span className="beat-l">Full mountain structures <em>fit in frame.</em></span>
              </p>
              <p className="beat" id="beat2">
                <span className="beat-k">Mid descent · 212 m</span>
                <span className="beat-l">Drainage networks <em>become legible.</em></span>
              </p>
            </div>
          </div>
          <div className="cue" aria-hidden="true">Begin descent</div>
        </section>

        {/* ── ABOUT ── */}
        <section className="shell about" id="about" data-alt="245">
          <div className="wrap g12">
            <div className="col-main">
              <p className="eyebrow" data-anim="fade">About the pilot</p>
              <h2 className="display d2" data-split>
                High altitude. <em>Precise intent.</em>
              </h2>
              <p className="prose" data-anim="fade">
                I&apos;m <strong>Kshitiz Bathwal</strong>, a landscape and aerial photographer based in <strong>India</strong> — chasing the geometry of rivers from 400 feet, the symmetry of terraced fields at golden hour, and the quiet order of terrain that only reveals itself from above. Flying a 1-inch sensor between 30 and 299 metres AGL, I document landscape structures across 14 Indian states.
              </p>
              <p className="prose" data-anim="fade">
                Flying a drone is my way of asking the earth a question it only answers when you step off the ground. <strong>Skyscape Photography</strong> is not a studio — it&apos;s a singular point of view backed by flight discipline: clearing DGCA permits, monitoring wind vectors under 12 knots, and catching low-angle sunlight when long shadows expose natural architecture.
              </p>
              <blockquote className="quote" data-anim="fade">
                &ldquo;Every frame is a reminder that perspective changes everything.&rdquo;
                <footer>K. Bathwal · flight log, Sambhar Lake</footer>
              </blockquote>
            </div>
            <div className="col-side portrait">
              <div className="p-frame" data-clip>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-par="0.18"
                  src="/images/pilot.jpg"
                  alt="Kshitiz Bathwal — Aerial Landscape Photographer"
                  loading="lazy"
                />
              </div>
              <div className="p-cap" data-anim="fade">
                <span>Pre-flight</span>
                <span>05:40 · wind 7 kt</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FLIGHT LOG ── */}
        <section className="shell log" data-alt="215" aria-label="Flight log">
          <div className="wrap">
            <div className="log-head" data-anim="fade">
              <p className="eyebrow">Flight log · cumulative</p>
              <span className="note">Verified telemetric flight records</span>
            </div>
            <div className="log-grid" id="logGrid">
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="14">0</span><sup>+</sup>
                </div>
                <div className="log-lab">Indian states<br />photographed</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="342">0</span>
                </div>
                <div className="log-lab">Flights<br />completed</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="118">0</span><u>h</u>
                </div>
                <div className="log-lab">Time with the<br />props turning</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="1624">0</span><u>km</u>
                </div>
                <div className="log-lab">Distance flown<br />over ground</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="299">0</span><u>m</u>
                </div>
                <div className="log-lab">Ceiling reached<br />and held</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="8.4" data-dec="1">0</span><u>km</u>
                </div>
                <div className="log-lab">Furthest from<br />the home point</div>
              </div>
              <div className="log-cell">
                <div className="log-num">
                  <span data-num="31">0</span><u>min</u>
                </div>
                <div className="log-lab">Longest single<br />airtime</div>
              </div>
              <div className="log-cell">
                <div className="log-num" style={{ fontSize: 'clamp(22px,2.3vw,34px)' }}>Air 2S</div>
                <div className="log-lab">One aircraft,<br />every frame</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCROLLYTELLING DESCENT ── */}
        <section className="sc shell" id="descent" data-alt="180" aria-label="What changes as the aircraft descends">
          <div className="sc-in wrap" id="scIn">
            <div className="sc-copy">
              <p className="eyebrow" data-anim="fade">Descent · 299 m to 38 m</p>
              <h2 className="display d3" data-split style={{ marginTop: 'clamp(16px,2.4vh,26px)' }}>
                Altitude defines <em>perspective.</em>
              </h2>
              <div className="sc-steps" id="scSteps">
                {D.map((d, i) => (
                  <article className="sc-step" key={i}>
                    <span className="sc-band">{d.band} · {d.a} m AGL</span>
                    <h3 className="display d4">{d.h}</h3>
                    <p>{d.p}</p>
                  </article>
                ))}
              </div>
              <div className="sc-rail" id="scRail" aria-hidden="true">
                {D.map((_, i) => (
                  <i key={i} className={i === 0 ? 'on' : ''} />
                ))}
              </div>
            </div>
            <div className="sc-media" id="scMedia">
              {D.map((d, i) => (
                <div className="sc-frame" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={U(d.img, 1500)}
                    alt={`${d.h} — aerial frame at ${d.a} metres above ground level`}
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                </div>
              ))}
              <div className="sc-hud" aria-hidden="true">
                <b id="scAlt">299</b>
                <span>m AGL · gimbal −90°</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORK ── */}
        <div className="shell" id="work" data-alt="130">
          <div className="wrap g12 work-head">
            <div className="col-main">
              <p className="eyebrow" data-anim="fade">Selected work · 2022 — 2026</p>
              <h2 className="display d2" data-split>
                Terrain &amp; <em>coastal geometry.</em>
              </h2>
            </div>
            <div className="work-intro" data-anim="fade">
              Twelve frames captured at varying altitudes. Each photograph is documented with precise flight altitude and GPS telemetry.
              <span className="m">30 — 299 m AGL · DJI Air 2S · 1&quot; CMOS</span>
            </div>
          </div>
        </div>

        <section className="hgal" aria-label="Photograph gallery">
          <div className="htrack" id="htrack">
            {F.map((f, i) => (
              <button
                key={i}
                className={`shot ${f.cls}`}
                data-i={i}
                aria-label={`View ${f.t}, ${f.l}`}
              >
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={U(f.img, 1200)}
                    alt={`${f.t} — aerial photograph, ${f.l}`}
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                  <div className="reticle" aria-hidden="true">
                    <i /><i /><i /><i />
                  </div>
                </div>
                <div className="cap">
                  <div>
                    <div className="cap-t">{f.t}</div>
                    <div className="cap-l">{f.l}</div>
                  </div>
                  <div className="tele">
                    ALT <b>{f.alt} M</b>
                    <br />
                    {f.gps}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="hgal-idx" aria-hidden="true">
            <span id="hIdx">01 / 12</span>
            <span className="bar"><i id="hBar" /></span>
          </div>
          <div className="hgal-hint" aria-hidden="true">Scroll to pan →</div>
        </section>

        {/* ── PLATE ── */}
        <section className="plate" data-alt="85" aria-label="Featured frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-par="0.22"
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=85"
            alt="Braided glacial river channels in Zanskar seen from above"
            loading="lazy"
            crossOrigin="anonymous"
          />
          <div className="veil" />
          <div className="txt">
            <h3 className="display d3" data-split>
              Braided glacial river channels in <em>Zanskar.</em>
            </h3>
            <div className="tele" data-anim="fade">
              Zanskar, Ladakh<br />
              271 m AGL · 33.47° N · 76.90° E · 06:52 IST
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="shell contact" id="contact" data-alt="0">
          <div className="wrap g12">
            <div className="col-main">
              <p className="eyebrow" data-anim="fade">Touchdown · 0 m AGL</p>
              <h2 className="display d2" data-split>
                Assignments &amp; <em>commissions.</em>
              </h2>
              <p className="lede" data-anim="fade">
                Available for fine art prints, editorial commissions, commercial licensing, and survey mapping across India.
              </p>
              <a
                className="mail"
                data-magnet
                data-anim="soft"
                href="mailto:kshitiz@skyscapephotography.in"
              >
                <span>kshitiz@skyscapephotography.in</span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
              <div className="c-meta meta" data-anim="fade">
                <span>Based in<b>India · Travels nationwide</b></span>
                <span>License<b>DGCA Certified UAS Pilot</b></span>
                <span>Response<b>Within 24 hours</b></span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="foot">
        <small>© 2026 Kshitiz Bathwal · Skyscape Photography · All rights reserved</small>
        <a className="rth" href="#top">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          Return to home point
        </a>
      </footer>

      {/* ── LIGHTBOX ── */}
      <div className="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photograph viewer">
        <div className="lb-bg" id="lbBg" />
        <div className="lb-bar">
          <span id="lbCount">01 / 12</span>
          <button className="lb-x" id="lbX">Close · Esc</button>
        </div>
        <div className="lb-stage" id="lbStage" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lb-img" id="lbImg" alt="" />
        <div className="lb-foot">
          <div>
            <div className="lb-t" id="lbT" />
            <div className="lb-l" id="lbL" />
          </div>
          <div className="lb-tele" id="lbTele" />
          <div className="lb-nav">
            <button id="lbPrev" aria-label="Previous photograph">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button id="lbNext" aria-label="Next photograph">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Client Engine Initialization ── */}
      <SkyscapeEngine />
    </>
  );
}
