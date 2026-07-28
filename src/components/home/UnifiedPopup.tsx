'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getBerita, getPengumuman, getPopupEnabled } from '@/lib/adminStore';

const POPUP_SEEN_KEY = 'mtsn-popup-seen';

export default function UnifiedPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'berita' | 'pengumuman'>('berita');
  const [currentSlide, setCurrentSlide] = useState(0);

  const isEnabled = useStoreData(getPopupEnabled);
  const beritaList = useStoreData(getBerita);
  const pengumumanList = useStoreData(getPengumuman).filter((p) => p.priority === 'high').slice(0, 5);

  // ─── Show popup on mount ───────────────────────────────────────
  useEffect(() => {
    if (!isEnabled) return;
    const hasSeen = localStorage.getItem(POPUP_SEEN_KEY);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [isEnabled]);

  // ─── Auto-slide berita ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || activeTab !== 'berita') return;
    const featured = beritaList.slice(0, 4);
    const slides = Math.ceil(featured.length / 2);
    if (slides < 2) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, activeTab, beritaList]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_SEEN_KEY, 'true');
  };

  const featuredBerita = beritaList.slice(0, 4);
  const totalSlides = Math.ceil(featuredBerita.length / 2); // show 2 per slide
  const hasMultipleSlides = totalSlides > 1;

  // Clamp currentSlide if berita items were removed
  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Get the pair of berita for the current slide
  const slideStart = currentSlide * 2;
  const slideItems = featuredBerita.slice(slideStart, slideStart + 2);

  // ─── Tab config ─────────────────────────────────────────────────
  const tabs = [
    { id: 'berita' as const, label: 'Berita Terbaru', icon: 'book-open', count: 0 },
    { id: 'pengumuman' as const, label: 'Pengumuman', icon: 'bell', count: pengumumanList.length },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[81] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl shadow-black/30 dark:shadow-black/50 overflow-y-auto w-full max-w-xl max-h-[85vh]">
              {/* ===== Header ===== */}
              <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 p-6 sm:p-8 text-center overflow-hidden">
                {/* Ornament pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
                  }}
                />
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full translate-y-1/3 -translate-x-1/3" />

                <div className="relative z-10">
                  {/* Logo icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 shadow-lg">
                    <span className="text-2xl font-bold text-white font-display">M</span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-white font-display mb-1">
                      Selamat Datang
                    </h2>
                    <p className="text-emerald-200/80 text-sm font-medium">
                      MTs Negeri 2 Kebumen
                    </p>
                  </motion.div>

                  {/* Islamic divider */}
                  <div className="flex items-center gap-3 mt-4 mb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                    <Icon name="star" size={14} className="text-emerald-400/50" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                  </div>

                  <p className="text-white/60 text-xs">
                    Informasi & Kegiatan Terbaru
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all z-20 group"
                  aria-label="Tutup"
                >
                  <Icon name="x" size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* ===== Tabs ===== */}
              <div className="flex border-b border-gray-100 dark:border-dark-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentSlide(0);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-300 relative ${
                      activeTab === tab.id
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-400 dark:text-dark-text-muted hover:text-gray-600 dark:hover:text-dark-text'
                    }`}
                  >
                    <Icon name={tab.icon} size={15} />
                    {tab.label}
                    {tab.count > 0 && tab.id === 'pengumuman' && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                        {tab.count}
                      </span>
                    )}
                    {/* Active indicator */}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="popup-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* ===== Tab Content ===== */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* ── Tab: Berita Terbaru ── */}
                  {activeTab === 'berita' && (
                    <motion.div
                      key="tab-berita"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text text-sm flex items-center gap-2">
                          <Icon name="book-open" size={16} className="text-emerald-500" />
                          Berita & Kegiatan Terbaru
                        </h3>
                        {/* Dots indicator — per slide (2 items) */}
                        {hasMultipleSlides && (
                          <div className="flex items-center gap-1.5">
                            {Array.from({ length: totalSlides }).map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  i === currentSlide
                                    ? 'bg-emerald-500 w-4'
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                                aria-label={`Slide ${i + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {featuredBerita.length > 0 ? (
                        <>
                          {/* News slides — 2 items per slide dalam 1 card vertikal */}
                          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border divide-y divide-gray-100 dark:divide-dark-border">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              >
                                {slideItems.map((item, idx) => (
                                  <Link
                                    key={item.id}
                                    href={`/informasi/berita/${item.slug}`}
                                    onClick={handleClose}
                                    className={`group flex items-center gap-4 p-4 transition-all duration-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 ${idx === 0 ? 'rounded-t-2xl' : ''} ${idx === slideItems.length - 1 ? 'rounded-b-2xl' : ''}`}
                                  >
                                    {/* Thumbnail */}
                                    <div
                                      className={`shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${getGradientColor(item.id)} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
                                    >
                                      <Icon name="image" size={20} className="text-white/40" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span
                                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                                            item.category === 'Prestasi'
                                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                              : item.category === 'Kegiatan'
                                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                                          }`}
                                        >
                                          {item.category}
                                        </span>
                                        <span className="text-[10px] text-gray-400 dark:text-dark-text-muted">
                                          {item.date}
                                        </span>
                                      </div>
                                      <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                      </h4>
                                      <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5 line-clamp-1">
                                        {item.excerpt}
                                      </p>
                                    </div>

                                    {/* Arrow */}
                                    <Icon name="chevron-right" size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                                  </Link>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* Navigation */}
                          {hasMultipleSlides && (
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setCurrentSlide(
                                      (prev) =>
                                        (prev - 1 + totalSlides) % totalSlides
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all"
                                  aria-label="Sebelumnya"
                                >
                                  <Icon name="chevron-left" size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    setCurrentSlide(
                                      (prev) => (prev + 1) % totalSlides
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all"
                                  aria-label="Selanjutnya"
                                >
                                  <Icon name="chevron-right" size={14} />
                                </button>
                              </div>

                              <span className="text-[10px] text-gray-400 dark:text-dark-text-muted font-medium">
                                {currentSlide + 1} / {totalSlides}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-400 dark:text-dark-text-muted text-sm">
                          Belum ada berita tersedia
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ── Tab: Pengumuman ── */}
                  {activeTab === 'pengumuman' && (
                    <motion.div
                      key="tab-pengumuman"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text text-sm flex items-center gap-2 mb-4">
                        <Icon name="bell" size={16} className="text-amber-500" />
                        Pengumuman Penting
                        {pengumumanList.length > 0 && (
                          <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                            {pengumumanList.length}
                          </span>
                        )}
                      </h3>

                      {pengumumanList.length > 0 ? (
                        <div className="space-y-3">
                          {pengumumanList.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30"
                            >
                              <div className="flex items-start gap-3">
                                <span className="shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-2 animate-pulse" />
                                <div>
                                  <p className="font-semibold text-sm text-gray-900 dark:text-dark-text">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">
                                    {item.date}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-dark-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                                    {item.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-400 dark:text-dark-text-muted text-sm">
                          Tidak ada pengumuman penting saat ini
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ===== Footer ===== */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {activeTab === 'berita' ? (
                    <Link
                      href="/informasi/berita"
                      onClick={handleClose}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-xl hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                    >
                      <Icon name="book-open" size={16} />
                      Lihat Semua Berita
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  ) : (
                    <Link
                      href="/informasi/pengumuman"
                      onClick={handleClose}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                    >
                      <Icon name="bell" size={16} />
                      Lihat Semua Pengumuman
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  )}
                  <button
                    onClick={handleClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-text-muted text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-dark-border transition-all duration-300"
                  >
                    Nanti Saja
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
