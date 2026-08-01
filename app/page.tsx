import { D } from '@/data/descent';
import { F } from '@/data/gallery';
import { HeaderNav, SkyscapeEngine } from '@/components/ClientComponents';
import { ContactEmailLink, ContactInstagramLink } from '@/components/ContactLink';

export default function Home() {
  return (
    <>
      {/* ── Ambient earth glow (fixed) ── */}
      <div className="earthshift" id="earthshift" aria-hidden="true" />

      {/* ── High-Tech Quadcopter Telemetry Preloader ── */}
      <div className="pre" id="pre">
        {/* Animated HUD Grid & Radial Pulse Background */}
        <div className="pre-bg-grid" aria-hidden="true" />
        <div className="pre-glow" aria-hidden="true" />

        {/* Corner Reticle Accents */}
        <div className="pre-reticle tl" aria-hidden="true">+</div>
        <div className="pre-reticle tr" aria-hidden="true">+</div>
        <div className="pre-reticle bl" aria-hidden="true">+</div>
        <div className="pre-reticle br" aria-hidden="true">+</div>

        {/* Tactical Compass Flight Heading Tape */}
        <div className="pre-compass-tape" aria-hidden="true">
          <span>330°</span><span>345°</span><span className="north">N 000°</span><span>015°</span><span>030°</span><span className="ne">045° NE</span>
        </div>

        {/* Top telemetry status bar */}
        <div className="pre-top">
          <div className="pre-brand">
            <span className="beacon" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/skyscape-aerial-photography-logo-white.png"
              alt="Skyscape Photography Logo"
              className="pre-logo"
              width={38}
              height={38}
            />
            <span className="pre-brand-text">SKYSCAPE PHOTOGRAPHY</span>
          </div>
          <div className="pre-tele-status">
            <span id="preSats" className="sats-tag">GPS LOCK • 18 SATS</span>
          </div>
        </div>

        {/* Center Drone & Tactical Flight Simulation HUD */}
        <div className="pre-flight-hud" aria-hidden="true">
          {/* Left Telemetry Simulation Wing */}
          <div className="pre-hud-wing left">
            <div className="hud-metric">
              <small>PITCH</small>
              <b id="hudPitch">-15.4°</b>
            </div>
            <div className="hud-metric">
              <small>ROLL</small>
              <b id="hudRoll">+0.8°</b>
            </div>
            <div className="hud-metric">
              <small>V/S</small>
              <b id="hudVS">+1.8 m/s</b>
            </div>
            <div className="hud-metric">
              <small>WIND</small>
              <b id="hudWind">3.2 m/s ↘</b>
            </div>
            {/* SVG Pitch Ladder Graphic */}
            <svg className="hud-pitch-svg" viewBox="0 0 60 80" fill="none">
              <line x1="10" y1="20" x2="50" y2="20" stroke="rgba(124,167,194,0.4)" strokeWidth="1" />
              <line x1="18" y1="35" x2="42" y2="35" stroke="rgba(124,167,194,0.6)" strokeWidth="1.5" />
              <line x1="10" y1="50" x2="50" y2="50" stroke="rgba(124,167,194,0.4)" strokeWidth="1" />
              <line x1="22" y1="65" x2="38" y2="65" stroke="rgba(124,167,194,0.3)" strokeWidth="1" />
            </svg>
          </div>

          {/* Center Quadcopter Stage & Radar */}
          <div className="pre-drone-stage">
            <div className="pre-radar-sweep" />
            <div className="pre-hud-ring ring-outer" />
            <div className="pre-hud-ring ring-inner" />
            <div className="pre-crosshair ch-h" />
            <div className="pre-crosshair ch-v" />

            {/* Cardinal Direction Indicators */}
            <span className="cardinal n">N</span>
            <span className="cardinal e">E</span>
            <span className="cardinal s">S</span>
            <span className="cardinal w">W</span>

            {/* Animated Quadcopter Vector SVG */}
            <div className="pre-drone-svg-wrap">
              <svg className="pre-drone-svg" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="88" stroke="rgba(124,167,194,0.18)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="54" stroke="rgba(124,167,194,0.28)" strokeWidth="1" />

                <line x1="52" y1="52" x2="148" y2="148" stroke="var(--fog)" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="148" y1="52" x2="52" y2="148" stroke="var(--fog)" strokeWidth="4.5" strokeLinecap="round" />

                <rect x="84" y="74" width="32" height="52" rx="8" fill="#0c121c" stroke="var(--haze)" strokeWidth="2" />
                <circle cx="100" cy="90" r="7" fill="#182436" stroke="var(--amber)" strokeWidth="1.5" />
                <path d="M96 112 h8 v6 h-8 z" fill="var(--haze)" />

                <g className="prop-group prop-tl">
                  <circle cx="52" cy="52" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="52" cy="52" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin" />
                  <circle cx="52" cy="52" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                  <circle cx="52" cy="52" r="2" fill="#10b981" className="led-blink" />
                </g>

                <g className="prop-group prop-tr">
                  <circle cx="148" cy="52" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="148" cy="52" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin prop-rev" />
                  <circle cx="148" cy="52" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                  <circle cx="148" cy="52" r="2" fill="#10b981" className="led-blink" />
                </g>

                <g className="prop-group prop-bl">
                  <circle cx="52" cy="148" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="52" cy="148" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin prop-rev" />
                  <circle cx="52" cy="148" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                  <circle cx="52" cy="148" r="2" fill="var(--amber)" className="led-blink-alt" />
                </g>

                <g className="prop-group prop-br">
                  <circle cx="148" cy="148" r="22" stroke="rgba(124,167,194,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="148" cy="148" rx="22" ry="4" fill="rgba(238,243,247,0.45)" className="prop-spin" />
                  <circle cx="148" cy="148" r="5" fill="#182436" stroke="var(--haze)" strokeWidth="1.5" />
                  <circle cx="148" cy="148" r="2" fill="var(--amber)" className="led-blink-alt" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Optics Telemetry Wing */}
          <div className="pre-hud-wing right">
            <div className="hud-metric">
              <small>CAM OPTICS</small>
              <b>4K 60FPS D-LOG</b>
            </div>
            <div className="hud-metric">
              <small>GIMBAL</small>
              <b>-15.0° LOCK</b>
            </div>
            <div className="hud-metric">
              <small>LATENCY</small>
              <b id="hudLatency">12 ms</b>
            </div>
            <div className="hud-metric">
              <small>STORAGE</small>
              <b>482 GB FREE</b>
            </div>
            {/* SVG Rangefinder Reticle Graphic */}
            <svg className="hud-range-svg" viewBox="0 0 60 80" fill="none">
              <path d="M15 25 H25 V15" stroke="rgba(124,167,194,0.5)" strokeWidth="1.5" />
              <path d="M45 25 H35 V15" stroke="rgba(124,167,194,0.5)" strokeWidth="1.5" />
              <path d="M15 55 H25 V65" stroke="rgba(124,167,194,0.5)" strokeWidth="1.5" />
              <path d="M45 55 H35 V65" stroke="rgba(124,167,194,0.5)" strokeWidth="1.5" />
              <circle cx="30" cy="40" r="4" fill="#10b981" />
            </svg>
          </div>
        </div>

        {/* Ultra-Clean Modern Footer Telemetry */}
        <div className="pre-bottom">
          <div className="pre-mid">
            {/* Left Altimeter Unit */}
            <div className="pre-alt-unit">
              <span className="pre-alt-label">ALTITUDE</span>
              <div className="pre-count">
                <span id="preNum">000</span><small>m</small>
              </div>
            </div>

            {/* Center Telemetry Ticker */}
            <div className="pre-center-tele">
              <span className="tele-coords">28.6139° N · 77.2090° E</span>
              <span className="tele-sep">•</span>
              <span className="tele-batt">BATT 98%</span>
              <span className="tele-sep">•</span>
              <span className="tele-link">5.8GHz LINK</span>
            </div>

            {/* Right Status Badge */}
            <div className="pre-status-box">
              <div className="pre-status-badge">
                <span className="status-pulse" />
                <span className="pre-status" id="preStatus">MOTORS ARMED</span>
              </div>
            </div>
          </div>

          {/* Integrated Sleek Loading Bar */}
          <div className="pre-bar-wrap">
            <div className="pre-bar"><i id="preBar" /></div>
          </div>
        </div>
      </div>
      <div className="curtain" id="curtain" aria-hidden="true" />

      {/* ── Altimeter rail ── */}
      <aside className="alt" id="altRail" aria-hidden="true">
        <div className="tape" id="tape" />
        <div className="alt-cur">
          <div className="alt-drone" id="altDrone" role="button" tabIndex={-1} title="UAS Quadcopter Indicator">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/drone-hud-icon.png"
              alt="UAS Quadcopter"
              className="alt-drone-img"
              id="altDroneImg"
            />
            <span className="alt-drone-beacon" />
          </div>
          <div className="alt-read">
            <div className="alt-num-row">
              <span id="altVal">299</span><u>M</u>
            </div>
            <small id="altState">HOVER</small>
          </div>
        </div>
      </aside>
      <div className="chip" aria-hidden="true">
        <b id="chipVal">299 M</b> AGL
      </div>

      {/* ── Header Navigation & Mobile Menu ── */}
      <HeaderNav />

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
            src="/mauritius-coastal-drone-photography-skyscape.jpg"
            alt="Aerial view of Macondé Peak hairpin ridge and turquoise lagoon in Mauritius"
            fetchPriority="high"
          />
          <div className="hero-tint" aria-hidden="true" />

          {/* ── Lottie Birds Animation Layer ── */}
          <div className="hero-birds-layer" id="heroBirdsLayer" aria-hidden="true" data-depth="-0.18">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/birds.svg"
              alt="Flock of birds aerial animation"
              className="hero-birds-img"
            />
          </div>

          {/* Subtle Viewfinder Corner Brackets */}
          <div className="h-corner tl" aria-hidden="true" data-depth="-0.15" />
          <div className="h-corner tr" aria-hidden="true" data-depth="-0.15" />
          <div className="h-corner bl" aria-hidden="true" data-depth="-0.15" />
          <div className="h-corner br" aria-hidden="true" data-depth="-0.15" />

          {/* Subtle Floating Drone Telemetry Overlay (No Box) */}
          <div className="hud" aria-hidden="true" data-depth="0.15">
            <span className="lock"><i />GPS LOCK · 12 SAT</span><br />
            <span id="hudAlt">299.0 m AGL</span><br />
            GIMBAL −90.0° · NADIR<br />
            34.15° N · 77.57° E
          </div>

          <div className="shell hero-in">
            <div className="wrap">
              <div className="hero-main-group" id="heroMainGroup" data-depth="0.04">
                <h1 className="display d1" data-split>
                  Where Volcanic Ridge<br />Meets <em>Sapphire Lagoon.</em>
                </h1>
                <div className="hero-sub">
                  <p className="lede">
                    Captured from 168 metres above Macondé Viewpoint in Baie du Cap, Mauritius: where winding coastal roads trace the razor-thin geometry of ancient land and emerald ocean.
                  </p>
                  <div className="hero-meta meta">
                    <span>Location<b>Macondé Viewpoint, Mauritius</b></span>
                    <span>Elevation<b>168 m AGL</b></span>
                    <span>Aircraft<b>DJI Air 2S</b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-beats" id="heroBeats" aria-hidden="true">
            <div className="wrap">
              <p className="beat" id="beat1">
                <span className="beat-k">High Band · 245 m AGL · Western Coast, India</span>
                <span className="beat-l">Winding coastal tarmac ribbons trace <em>ocean-carved geology.</em></span>
              </p>
              <p className="beat" id="beat2">
                <span className="beat-k">Mid Descent · 198 m AGL · Mount Ijen, Java</span>
                <span className="beat-l">Turquoise acid caldera carved into <em>steaming volcanic peak.</em></span>
              </p>
              <p className="beat" id="beat3">
                <span className="beat-k">Plateau Band · 142 m AGL · Swarna Estuary</span>
                <span className="beat-l">Lush green meadows meet <em>winding river channels.</em></span>
              </p>
              <p className="beat" id="beat4">
                <span className="beat-k">Approach Band · 88 m AGL · Angel&apos;s Billabong</span>
                <span className="beat-l">Natural tide pools sculpted by <em>crashing ocean surf.</em></span>
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
                I am <strong>Kshitiz Bathwal</strong>, an aerial cinematographer and UAS pilot based in <strong>India</strong>. I specialize in documenting coastal landforms, volcanic terrain, and natural architecture across India, Mauritius, and Southeast Asia. Operating high-resolution 1-inch CMOS sensors between 30 and 299 metres AGL, my work focuses on perspective, spatial scale, and geological structure.
              </p>
              <p className="prose" data-anim="fade">
                <strong>Skyscape Photography</strong> is an independent aerial practice built on flight discipline: securing airspace authorizations, evaluating micro-climate wind vectors, and capturing low-angle directional light when long shadows reveal natural geology.
              </p>
              <blockquote className="quote" data-anim="fade">
                <p>&ldquo;From 300 metres above, complex landscapes resolve into pure structural geometry.&rdquo;</p>
                <footer>Kshitiz Bathwal · Lead UAS Cinematographer</footer>
              </blockquote>
            </div>
            <div className="col-side portrait">
              <div className="p-frame" data-clip>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-par="0.18"
                  src="/images/pilot.jpg"
                  alt="Kshitiz Bathwal | Aerial Landscape Photographer"
                  loading="lazy"
                  draggable={false}
                />
                <div className="p-veil" aria-hidden="true" />
                <div className="p-badge" aria-hidden="true">
                  <span>PILOT · 34.15° N 77.57° E</span>
                </div>
                <div className="reticle" aria-hidden="true">
                  <i /><i /><i /><i />
                </div>
              </div>
              <div className="p-cap" data-anim="fade">
                <span>Pre-flight checks</span>
                <span>05:40 · Wind 7 kt</span>
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
                  <img
                    src={d.img}
                    alt={`${d.h} | aerial frame at ${d.a} metres above ground level`}
                    loading="lazy"
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
              <p className="eyebrow" data-anim="fade">Selected work · 2022 - 2026</p>
              <h2 className="display d2" data-split>
                Terrain &amp; <em>coastal geometry.</em>
              </h2>
            </div>
            <div className="work-intro" data-anim="fade">
              Twelve frames captured at varying altitudes. Each photograph is documented with precise flight altitude and GPS telemetry.
              <span className="m">30 - 299 m AGL · DJI Air 2S · 1&quot; CMOS</span>
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
                  <img
                    src={f.img}
                    alt={`${f.t} | aerial photograph, ${f.l}`}
                    loading="lazy"
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
            src="/images/nusa-penida-featured.jpeg"
            alt="Volcanic sea stacks and azure ocean surf in Nusa Penida, Bali, Indonesia seen from 198 metres above ground level"
            decoding="async"
          />
          <div className="veil" />
          <div className="txt">
            <h3 className="display d3" data-split>
              Volcanic sea stacks &amp; azure surf of <em>Nusa Penida.</em>
            </h3>
            <div className="tele" data-anim="fade">
              Nusa Penida, Bali, Indonesia<br />
              198 m AGL · 8.72° S · 115.54° E · 07:10 WITA
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
              <ContactEmailLink />
              <div className="c-meta meta" data-anim="fade">
                <span>Based in<b>India · Travels nationwide</b></span>
                <span>Specialization<b>Aerial Landscape Photography</b></span>
                <span>Social<b><ContactInstagramLink /></b></span>
                <span>Response<b>Within 24 hours</b></span>
              </div>
            </div>

            {/* Pilot Profile Card in Contact Section (Right Side) */}
            <div className="col-side contact-pilot-card" data-anim="fade">
              <div className="contact-pilot-frame">
                <div className="reticle tl"><i></i><i></i></div>
                <div className="reticle tr"><i></i><i></i></div>
                <div className="reticle bl"><i></i><i></i></div>
                <div className="reticle br"><i></i><i></i></div>
                <span className="p-badge">UAS PILOT · IN FIELD</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/skyscape-drone-pilot-profile.jpg"
                  alt="Kshitiz Bathwal · Aerial Landscape Photographer overlooking mountain ridge"
                  loading="lazy"
                />
                <div className="contact-pilot-caption">
                  <b>KSHITIZ BATHWAL</b>
                  <small>FOUNDER &amp; LEAD UAS CINEMATOGRAPHER</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="foot">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/skyscape-aerial-photography-logo-white.png"
            alt="Skyscape Photography Logo"
            className="foot-logo"
            width={26}
            height={26}
          />
          <span className="foot-brand-text">SKYSCAPE PHOTOGRAPHY</span>
        </div>

        <small className="foot-copy">© 2026 Kshitiz Bathwal · All rights reserved</small>

        <div className="foot-actions">
          <a
            href="https://www.instagram.com/skyscape_photography/"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-insta-icon"
            aria-label="Skyscape Photography Instagram Profile"
            title="Follow @skyscape_photography on Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <a className="rth" href="#top">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Return to home point
          </a>
        </div>
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
