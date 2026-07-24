'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getGradientColor } from '@/lib/data';
import { getBerita } from '@/lib/adminStore';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const beritaTerbaru = getBerita();

  useEffect(() => {
    const hasSeen = localStorage.getItem('welcome-popup-seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(beritaTerbaru.length, 4));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('welcome-popup-seen', 'true');
  };

  const featuredNews = beritaTerbaru.slice(0, 4);

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
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }}
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
                    Informasi Terkini & Kegiatan Terbaru
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

              {/* ===== Content: Featured News Carousel ===== */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text text-sm flex items-center gap-2">
                    <Icon name="book-open" size={16} className="text-emerald-500" />
                    Berita & Kegiatan Terbaru
                  </h3>
                  {/* Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {featuredNews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === currentSlide
                            ? 'bg-emerald-500 w-4'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* News slide */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-bg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/informasi/berita/${featuredNews[currentSlide].slug}`}
                        onClick={handleClose}
                        className="block p-4 group"
                      >
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className={`shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${getGradientColor(featuredNews[currentSlide].id)} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                            <Icon name="image" size={24} className="text-white/40" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                                featuredNews[currentSlide].category === 'Prestasi'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                  : featuredNews[currentSlide].category === 'Kegiatan'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                              }`}>
                                {featuredNews[currentSlide].category}
                              </span>
                              <span className="text-[10px] text-gray-400 dark:text-dark-text-muted">
                                {featuredNews[currentSlide].date}
                              </span>
                            </div>
                            <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {featuredNews[currentSlide].title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-1 line-clamp-2 leading-relaxed">
                              {featuredNews[currentSlide].excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all"
                      aria-label="Sebelumnya"
                    >
                      <Icon name="chevron-left" size={14} />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredNews.length)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all"
                      aria-label="Selanjutnya"
                    >
                      <Icon name="chevron-right" size={14} />
                    </button>
                  </div>

                  <span className="text-[10px] text-gray-400 dark:text-dark-text-muted font-medium">
                    {currentSlide + 1} / {featuredNews.length}
                  </span>
                </div>
              </div>

              {/* ===== Footer ===== */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Link
                    href="/informasi/berita"
                    onClick={handleClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-xl hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                  >
                    <Icon name="book-open" size={16} />
                    Lihat Semua Berita
                    <Icon name="arrow-right" size={14} />
                  </Link>
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
