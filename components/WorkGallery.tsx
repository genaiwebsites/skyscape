'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, F, GalleryCategory, GalleryFrame, DEFAULT_ALL_FRAMES, getInterleavedAllFrames } from '@/data/gallery';
import { trackEvent } from '@/lib/analytics';

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null);
  const [allFrames, setAllFrames] = useState<GalleryFrame[]>(DEFAULT_ALL_FRAMES);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  // On client-side mount, generate fresh randomized interleaved sequence of all 21 photos
  useEffect(() => {
    setAllFrames(getInterleavedAllFrames());
  }, []);

  const filteredFrames = useMemo(() => {
    if (activeCategory === 'all') return allFrames;
    return F.filter((f) => f.category === activeCategory);
  }, [activeCategory, allFrames]);

  const itemsPerPage = activeCategory === 'all' ? 9 : 8;
  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);

  const paginatedFrames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFrames.slice(start, start + itemsPerPage);
  }, [filteredFrames, currentPage, itemsPerPage]);

  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      ...cat,
      count: cat.id === 'all' ? F.length : F.filter((f) => f.category === cat.id).length,
    }));
  }, []);

  const handleCategorySelect = (catId: GalleryCategory, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (catId === activeCategory) {
      if (catId === 'all') {
        // Refresh with a freshly shuffled interleaved mix
        setAllFrames(getInterleavedAllFrames());
      }
      return;
    }

    if (catId === 'all') {
      setAllFrames(getInterleavedAllFrames());
    }

    // Anchor the filter console's visual position on screen so category filtering NEVER causes layout jump or upward scrolling
    const consoleEl = galleryGridRef.current;
    const initialTop = consoleEl ? consoleEl.getBoundingClientRect().top : null;

    setActiveCategory(catId);
    setCurrentPage(1);

    if (initialTop !== null && initialTop >= -100 && initialTop < window.innerHeight) {
      requestAnimationFrame(() => {
        if (consoleEl) {
          const delta = consoleEl.getBoundingClientRect().top - initialTop;
          if (Math.abs(delta) > 2) {
            window.scrollBy({ top: delta, behavior: 'instant' as ScrollBehavior });
          }
        }
      });
    }

    const count = catId === 'all' ? F.length : F.filter((f) => f.category === catId).length;
    trackEvent('gallery_filter_changed', { category: catId, count });
  };

  const handlePageChange = (newPage: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    try {
      const lenisInstance = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, opts: unknown) => void }; lenis?: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).__lenis
        || (window as unknown as { lenis?: { scrollTo: (el: HTMLElement, opts: unknown) => void } }).lenis;
      if (lenisInstance && typeof lenisInstance.scrollTo === 'function' && galleryGridRef.current) {
        lenisInstance.scrollTo(galleryGridRef.current, { offset: -80, duration: 0.8 });
      } else if (galleryGridRef.current) {
        galleryGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch {
      // safe fallback
    }
  };

  const openLightbox = (frameId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveFrameId(frameId);
    try {
      const lenisInstance = (window as unknown as { __lenis?: { stop: () => void }; lenis?: { stop: () => void } }).__lenis
        || (window as unknown as { lenis?: { stop: () => void } }).lenis;
      if (lenisInstance && typeof lenisInstance.stop === 'function') {
        lenisInstance.stop();
      }
    } catch {
      // safe fallback
    }
    const f = F.find((item) => item.id === frameId);
    if (f) {
      const idx = F.findIndex((item) => item.id === frameId);
      trackEvent('image_viewed', {
        title: f.t,
        location: f.l,
        altitude: f.alt,
        index: idx,
      });
    }
  };

  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveFrameId(null);
    try {
      const lenisInstance = (window as unknown as { __lenis?: { start: () => void }; lenis?: { start: () => void } }).__lenis
        || (window as unknown as { lenis?: { start: () => void } }).lenis;
      if (lenisInstance && typeof lenisInstance.start === 'function') {
        lenisInstance.start();
      }
    } catch {
      // safe fallback
    }
  };

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!activeFrameId || filteredFrames.length === 0) return;
    const currentIdx = filteredFrames.findIndex((f) => f.id === activeFrameId);
    const prevIdx = currentIdx <= 0 ? filteredFrames.length - 1 : currentIdx - 1;
    setActiveFrameId(filteredFrames[prevIdx].id);
  }, [activeFrameId, filteredFrames]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!activeFrameId || filteredFrames.length === 0) return;
    const currentIdx = filteredFrames.findIndex((f) => f.id === activeFrameId);
    const nextIdx = currentIdx >= filteredFrames.length - 1 ? 0 : currentIdx + 1;
    setActiveFrameId(filteredFrames[nextIdx].id);
  }, [activeFrameId, filteredFrames]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!activeFrameId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFrameId, handlePrev, handleNext]);

  const activeFrame = activeFrameId !== null ? F.find((f) => f.id === activeFrameId) || null : null;
  const currentFilteredIndex = activeFrame !== null ? filteredFrames.findIndex((f) => f.id === activeFrame.id) : -1;

  return (
    <section className="work-section-wrap" id="work" data-alt="130">
      <div className="shell">
        {/* Header Title & Description */}
        <div className="work-header-grid">
          <div className="work-title-box">
            <div className="eyebrow-group">
              <p className="eyebrow">Selected work · 2018 – 2026</p>
            </div>
            <h2 className="display d2">
              Terrain, coastal &amp; <em>urban geometry.</em>
            </h2>
          </div>
          <div className="work-copy-box">
            <p className="work-desc">
              A curated collection of distinct aerial landscapes documented between 20 and 299 metres AGL across India, Bali, and Mauritius.
            </p>
            <span className="work-specs">20 – 299 m AGL · DJI AIR 2S &amp; MAVIC 2 PRO · 1&quot; CMOS</span>
          </div>
        </div>

        {/* Category Filter Pills Console (Single Sleek Row) */}
        <div className="work-console" ref={galleryGridRef}>
          <div className="work-filters" role="tablist" aria-label="Gallery category filters">
            {categoriesWithCounts.map((cat) => {
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
            SHOWING <b>{paginatedFrames.length}</b> OF <b>{filteredFrames.length}</b> FRAMES
            {totalPages > 1 && <> · PAGE <b>{currentPage}</b> OF <b>{totalPages}</b></>}
          </div>
        </div>

        {/* Bento Grid Showcase — Strictly 2 Sizes by Orientation */}
        <div className="bento-gallery-wrap">
          <div className="bento-grid">
            <AnimatePresence>
              {paginatedFrames.map((f, idx) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                    key={`${activeCategory}-${currentPage}-${f.id}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open photograph: ${f.t}`}
                    className={`bento-card card-${f.orientation}`}
                    onClick={(e) => openLightbox(f.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(f.id);
                      }
                    }}
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
            </AnimatePresence>
          </div>

          {/* Tactical Pagination Bar */}
          {totalPages > 1 && (
            <div className="bento-pagination" aria-label="Gallery pagination">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={(e) => handlePageChange(currentPage - 1, e)}
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                PREV
              </button>

              <div className="page-pills">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`page-pill ${pageNum === currentPage ? 'active' : ''}`}
                    onClick={(e) => handlePageChange(pageNum, e)}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === currentPage ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={(e) => handlePageChange(currentPage + 1, e)}
                aria-label="Next page"
              >
                NEXT
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <span className="page-info">
                PAGE {currentPage} / {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Premium Butter-Smooth Lightbox Modal */}
      <AnimatePresence>
        {activeFrame !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="gallery-lightbox-overlay"
            onClick={(e) => closeLightbox(e)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="gallery-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Controls Bar */}
              <div className="lb-header">
                <div className="lb-header-title">
                  <h2>{activeFrame.t}</h2>
                  <span>
                    {activeFrame.l} · {activeFrame.year}
                    {currentFilteredIndex >= 0 && (
                      <strong style={{ marginLeft: '12px', opacity: 0.75, fontWeight: 400 }}>
                        ({currentFilteredIndex + 1} / {filteredFrames.length})
                      </strong>
                    )}
                  </span>
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
                  aria-label="Previous photograph"
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
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    src={activeFrame.img}
                    alt={`${activeFrame.t} | ${activeFrame.l}`}
                  />
                </div>

                <button
                  type="button"
                  className="lb-nav-btn lb-next"
                  onClick={(e) => handleNext(e)}
                  aria-label="Next photograph"
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
                  <span className="lb-val">{activeFrame.sensor || 'DJI AIR 2S · 1" CMOS · 20MP'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
