'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, F, GalleryCategory, GalleryFrame } from '@/data/gallery';
import { trackEvent } from '@/lib/analytics';

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredFrames = useMemo(() => {
    if (activeCategory === 'all') return F;
    return F.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const handleCategorySelect = (catId: GalleryCategory, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveCategory(catId);
    const count = catId === 'all' ? F.length : F.filter((f) => f.category === catId).length;
    trackEvent('gallery_filter_changed', { category: catId, count });
  };

  const openLightbox = (originalIndex: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxIndex(originalIndex);
    const f = F[originalIndex];
    if (f) {
      trackEvent('image_viewed', {
        title: f.t,
        location: f.l,
        altitude: f.alt,
        index: originalIndex,
      });
    }
  };

  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxIndex(null);
  };

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (lightboxIndex === null) return;
    const currentFilteredIdx = filteredFrames.findIndex((f) => F.indexOf(f) === lightboxIndex);
    const prevFilteredIdx = (currentFilteredIdx - 1 + filteredFrames.length) % filteredFrames.length;
    const nextOriginalIndex = F.indexOf(filteredFrames[prevFilteredIdx]);
    setLightboxIndex(nextOriginalIndex);
  }, [lightboxIndex, filteredFrames]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (lightboxIndex === null) return;
    const currentFilteredIdx = filteredFrames.findIndex((f) => F.indexOf(f) === lightboxIndex);
    const nextFilteredIdx = (currentFilteredIdx + 1) % filteredFrames.length;
    const nextOriginalIndex = F.indexOf(filteredFrames[nextFilteredIdx]);
    setLightboxIndex(nextOriginalIndex);
  }, [lightboxIndex, filteredFrames]);

  // Lock scroll & bind keyboard shortcuts when lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  const activeFrame = lightboxIndex !== null ? F[lightboxIndex] : null;

  return (
    <section className="work-section-wrap" id="work" data-alt="130">
      <div className="shell">
        {/* Header Title & Description */}
        <div className="work-header-grid">
          <div className="work-title-box">
            <div className="eyebrow-group">
              <p className="eyebrow">Selected work · 2022 – 2026</p>
            </div>
            <h2 className="display d2">
              Terrain &amp; <em>coastal geometry.</em>
            </h2>
          </div>
          <div className="work-copy-box">
            <p className="work-desc">
              A curated collection of aerial landscapes documented between 30 and 299 metres AGL across India, Bali, and Mauritius.
            </p>
            <span className="work-specs">30 – 299 m AGL · DJI AIR 2S · 1&quot; CMOS</span>
          </div>
        </div>

        {/* Category Filter Pills Console */}
        <div className="work-console">
          <div className="work-filters" role="tablist" aria-label="Gallery category filters">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleCategorySelect(cat.id, e)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="filter-pill-active-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="pill-text">{cat.label}</span>
                  <span className="pill-badge">{cat.count}</span>
                </button>
              );
            })}
          </div>

          <div className="work-count-label">
            SHOWING <b>{filteredFrames.length}</b> OF <b>{F.length}</b> FRAMES
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="bento-gallery-wrap">
          <AnimatePresence mode="popLayout">
            <motion.div className="bento-grid" layout>
              {filteredFrames.map((f, idx) => {
                const originalIndex = F.findIndex((item) => item.id === f.id);
                const isFeatured = idx === 0 || idx === 5;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    key={f.id}
                    className={`bento-card ${isFeatured ? 'bento-hero' : ''}`}
                    onClick={(e) => openLightbox(originalIndex, e)}
                  >
                    <div className="bento-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.img}
                        alt={`${f.t} | aerial photograph, ${f.l}`}
                        loading="lazy"
                      />
                      <div className="bento-overlay-veil" />
                      <div className="bento-reticle" aria-hidden="true">
                        <i /><i /><i /><i />
                      </div>
                      <div className="bento-top-meta">
                        <span className="bento-category-tag">{f.categoryLabel}</span>
                        <span className="bento-alt-badge">{f.alt} M AGL</span>
                      </div>
                      <div className="bento-bottom-info">
                        <h3 className="bento-title">{f.t}</h3>
                        <p className="bento-loc">{f.l}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Premium Butter-Smooth Lightbox Modal */}
      <AnimatePresence>
        {activeFrame !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="gallery-lightbox-overlay"
            onClick={(e) => closeLightbox(e)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="gallery-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Controls Bar */}
              <div className="lb-header">
                <div className="lb-header-title">
                  <h2>{activeFrame.t}</h2>
                  <span>{activeFrame.l} · {activeFrame.year}</span>
                </div>
                <button
                  type="button"
                  className="lb-close-btn"
                  onClick={(e) => closeLightbox(e)}
                  aria-label="Close Lightbox"
                  title="Close (ESC)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Lightbox Media Viewport with Arrow Navigation */}
              <div className="lb-media-stage">
                <button
                  type="button"
                  className="lb-nav-btn lb-prev"
                  onClick={(e) => handlePrev(e)}
                  aria-label="Previous image"
                  title="Previous (Left Arrow)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="lb-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    key={activeFrame.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    src={activeFrame.img}
                    alt={`${activeFrame.t} | ${activeFrame.l}`}
                  />
                </div>

                <button
                  type="button"
                  className="lb-nav-btn lb-next"
                  onClick={(e) => handleNext(e)}
                  aria-label="Next image"
                  title="Next (Right Arrow)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Lightbox Bottom Telemetry Bar */}
              <div className="lb-telemetry-bar">
                <div className="lb-tele-item">
                  <span className="lb-label">ALTITUDE</span>
                  <span className="lb-val">{activeFrame.alt} M AGL</span>
                </div>
                <div className="lb-tele-item">
                  <span className="lb-label">GPS COORDINATES</span>
                  <span className="lb-val">{activeFrame.gps}</span>
                </div>
                <div className="lb-tele-item">
                  <span className="lb-label">CATEGORY</span>
                  <span className="lb-val">{activeFrame.categoryLabel}</span>
                </div>
                <div className="lb-tele-item">
                  <span className="lb-label">OPTICS &amp; SENSOR</span>
                  <span className="lb-val">DJI AIR 2S · 1&quot; CMOS · 20MP</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
