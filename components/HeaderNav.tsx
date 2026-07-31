'use client';
import { useState, useEffect } from 'react';
import AmbientSoundtrack from './AmbientSoundtrack';

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`head ${scrolled ? 'scrolled' : ''}`} id="head">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Skyscape Photography Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/skyscape-aerial-photography-logo-white.png"
            alt="Skyscape Photography Logo"
            className="nav-logo"
            width={34}
            height={34}
          />
          <span className="brand-text">SKYSCAPE PHOTOGRAPHY</span>
        </a>

        {/* Desktop Primary Navigation */}
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

        {/* Ambient Audio Soundtrack Controller, Instagram & Mobile Hamburger */}
        <div className="header-actions">
          <AmbientSoundtrack />

          <a
            href="https://www.instagram.com/skyscape_photography/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-link-btn"
            aria-label="Skyscape Photography Instagram Profile"
            title="Follow @skyscape_photography on Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="insta-tooltip">INSTAGRAM</span>
          </a>

          <button
            className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="burger-line l1" />
            <span className="burger-line l2" />
            <span className="burger-line l3" />
          </button>
        </div>
      </header>

      {/* Mobile Glassmorphic Navigation Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-top-bar">
          <span className="mobile-menu-title">NAVIGATION</span>
          <button
            className="mobile-menu-close-btn"
            type="button"
            onClick={closeMenu}
            aria-label="Close Navigation Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>CLOSE</span>
          </button>
        </div>

        <div className="mobile-menu-content">
          <nav className="mobile-menu-nav">
            <a href="#about" onClick={closeMenu}>
              <small>01</small>
              <span>PILOT &amp; ABOUT</span>
            </a>
            <a href="#descent" onClick={closeMenu}>
              <small>02</small>
              <span>FLIGHT DESCENT</span>
            </a>
            <a href="#work" onClick={closeMenu}>
              <small>03</small>
              <span>FEATURED WORK</span>
            </a>
            <a href="#contact" onClick={closeMenu}>
              <small>04</small>
              <span>CONTACT &amp; TOUCHDOWN</span>
            </a>
          </nav>

          <div className="mobile-menu-meta">
            <a
              href="https://www.instagram.com/skyscape_photography/"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-insta-link"
              onClick={closeMenu}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>@skyscape_photography</span>
            </a>
            <div className="meta-brand">SKYSCAPE PHOTOGRAPHY</div>
            <small>4K HDR CINEMATOGRAPHY · AERIAL PHOTOGRAPHY</small>
          </div>
        </div>
      </div>
    </>
  );
}
