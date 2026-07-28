'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import AnimatedCounterValue from '@/components/ui/AnimatedCounterValue';
import { useStoreData, useStoreLoading, getHeroSlides, getStatistik, getSchoolData, HeroSlide } from '@/lib/adminStore';

function HeroBackground({ slides, currentIndex }: { slides: HeroSlide[]; currentIndex: number }) {
  const current = slides[currentIndex];
  const hasImage = current?.image && current.image.trim() !== '';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              suppressHydrationWarning
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-900/60 to-emerald-900/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-900/60 to-emerald-900/40" />
          </>
        )}

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 2L78 40L40 78L2 40Z' fill='none' stroke='white' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />
      </motion.div>
    </AnimatePresence>
  );
}



export default function HeroSection() {
  // ─── Reactive data from store ──────────────────────────────────
  const slides = useStoreData(() => getHeroSlides().filter(s => s.active));
  const statistik = useStoreData(getStatistik);
  const schoolData = useStoreData(getSchoolData);
  const storeLoading = useStoreLoading();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Safe transforms: clamp NaN/undefined scroll values to prevent rendering crash
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
  const safe = (v: number) => (typeof v === 'number' && isFinite(v) ? v : 0);

  const yBg = useTransform(scrollY, (v) => safe(clamp(safe(v), 0, 500)) * (150 / 500));
  const yOrnament1 = useTransform(scrollY, (v) => safe(clamp(safe(v), 0, 500)) * (-80 / 500));
  const yOrnament2 = useTransform(scrollY, (v) => safe(clamp(safe(v), 0, 500)) * (-120 / 500));
  const yText = useTransform(scrollY, (v) => safe(clamp(safe(v), 0, 500)) * (20 / 500));
  const opacity = useTransform(scrollY, (v) => safe(1 - clamp(safe(v), 0, 400) / 400));
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-50px' });

  // Reset carousel when slides change (e.g., admin toggles active)
  useEffect(() => {
    setCurrentIndex(0);
  }, [slides.length]);

  const activeSlides = slides.length > 0 ? slides : [
    { id: 0, image: '', title: 'Mendidik Generasi Islami Unggul', subtitle: 'Madrasah unggulan di Kebumen yang mencetak generasi beriman, berilmu, berkarakter mulia, dan siap menghadapi tantangan global dengan prestasi gemilang.', active: true },
  ];

  const currentSlide = activeSlides[currentIndex];

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (activeSlides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeSlides.length);
    }, 5000);
  }, [activeSlides.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay(); // restart timer
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] lg:min-h-[80vh] flex flex-col"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Animated Background Layer */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 overflow-hidden"
      >
        <HeroBackground slides={activeSlides} currentIndex={currentIndex} />
      </motion.div>

      {/* Geometric Islamic Ornaments */}
      <motion.div
        style={{ y: yOrnament1 }}
        className="absolute top-20 right-10 w-96 h-96 opacity-[0.03] z-10"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 10L390 200L200 390L10 200Z" stroke="white" strokeWidth="0.5" />
          <path d="M200 50L350 200L200 350L50 200Z" stroke="white" strokeWidth="0.3" />
          <path d="M200 90L310 200L200 310L90 200Z" stroke="white" strokeWidth="0.2" />
          <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="0.3" />
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="0.2" />
          <circle cx="200" cy="200" r="110" stroke="white" strokeWidth="0.2" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: yOrnament2 }}
        className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.02] z-10"
      >
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0L300 150L150 300L0 150Z" stroke="white" strokeWidth="0.5" />
          <path d="M150 40L260 150L150 260L40 150Z" stroke="white" strokeWidth="0.3" />
          <path d="M150 80L220 150L150 220L80 150Z" stroke="white" strokeWidth="0.2" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 flex-1 flex flex-col"
      >
        <div className="h-12 md:h-16 shrink-0" />
        <div className="flex-1 flex items-center min-h-0 pt-6 md:pt-12">
          <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 w-full">
            <div className="2xl:max-w-5xl 2xl:mx-auto">
            <div className="flex flex-col-reverse md:flex-row md:justify-between items-start gap-4 md:gap-8">
              <div className="max-w-3xl flex-1">
                {/* Tagline — from school settings */}
                {schoolData.tagline && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm md:text-base font-semibold uppercase tracking-[0.15em] text-emerald-300 mb-4"
                  >
                    {schoolData.tagline}
                  </motion.p>
                )}
                {/* Main Title — from slide data, with gradient accent */}
                <motion.h1
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-fluid-hero font-extrabold text-white leading-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-200">
                    {currentSlide.title}
                  </span>
                </motion.h1>

                {/* Subtitle — from slide data (only when non-empty) */}
                {!!currentSlide.subtitle && (
                  <motion.p
                    key={`subtitle-${currentIndex}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 md:mt-10 text-sm sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
                  >
                    {currentSlide.subtitle}
                  </motion.p>
                )}

                {/* CTA Buttons — simplified: 1 primary, 1 secondary as text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 md:mt-12 flex flex-wrap items-center gap-3 md:gap-5"
                >
                  <Link href="/pmb">
                    <Button size="lg" magnetic className="bg-white text-emerald-900 hover:bg-white/90 hover:text-emerald-800 shadow-xl shadow-black/20">
                      <Icon name="bookmark" size={18} />
                      Daftar PMB
                    </Button>
                  </Link>
                  <Link
                    href="/profil"
                    className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 text-sm md:text-base font-medium"
                  >
                    <span className="w-7 h-7 rounded-full border border-white/30 group-hover:border-white/60 flex items-center justify-center transition-colors">
                      <Icon name="chevron-right" size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    Jelajahi Profil
                  </Link>
                </motion.div>

              </div>

              {/* School identity tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full md:rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-white shadow-lg shadow-amber-900/20 shrink-0"
              >
                <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-amber-400" />
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wide text-amber-100">
                  {schoolData.name}
                </span>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Stats Card — Stagger entrance + count-up animation */}
        {/* Skeleton shown until loadAllData completes to avoid flash of default values */}
        <motion.div style={{ opacity }} className="relative z-20">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 md:mt-8 pb-8 md:pb-10 shrink-0"
        >
          <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 md:p-3 shadow-2xl shadow-black/20">
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {storeLoading ? (
                  // Loading skeleton — 4 placeholder cards
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`skeleton-${idx}`}
                      className={`relative text-center py-2 md:py-3 px-2 ${
                        idx % 2 === 0 ? 'border-r border-white/10 sm:border-r-0' : ''
                      } ${idx < 3 ? 'sm:border-r sm:border-white/10' : ''}`}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 mx-auto mb-1.5 md:mb-2 animate-pulse" />
                      <div className="h-5 md:h-7 w-16 md:w-20 bg-white/10 rounded mx-auto animate-pulse" />
                      <div className="h-3 w-14 md:w-20 bg-white/10 rounded mx-auto mt-1.5 animate-pulse" />
                    </div>
                  ))
                ) : (
                  statistik.slice(0, 4).map((stat, idx) => {
                  const staggerDelay = 0.7 + idx * 0.12;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                      transition={{
                        duration: 0.6,
                        delay: staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.02,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className={`relative text-center py-2 md:py-3 px-2 cursor-default group ${
                        idx % 2 === 0 ? 'border-r border-white/10 sm:border-r-0' : ''
                      } ${
                        idx < 3 ? 'sm:border-r sm:border-white/10' : ''
                      }`}
                    >
                      {/* Icon with subtle pulse ring on hover */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-1.5 md:mb-2 ring-1 ring-white/10 group-hover:ring-emerald-300/40 group-hover:bg-white/20 transition-all duration-300"
                      >
                        <Icon name={stat.icon} size={14} className="text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" />
                      </motion.div>
                      {/* Value — count-up */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: inView ? 1 : 0 }}
                        transition={{ delay: 0.9 + idx * 0.12, duration: 0.3 }}
                        className="relative text-base sm:text-xl md:text-2xl font-bold text-white leading-none"
                      >
                        <AnimatedCounterValue
                          value={stat.value}
                          suffix={stat.suffix || ''}
                          delay={0.9 + idx * 0.12}
                          play={inView}
                        />
                      </motion.p>
                      {/* Label */}
                      <p className="relative text-[11px] sm:text-xs md:text-sm text-white/70 font-medium mt-0.5 whitespace-nowrap group-hover:text-white/90 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </motion.div>
                  );                })
                )}
              </div>
            </div>
          </div>

          {/* Slide indicators — inside stats wrapper, properly separated */}
          {activeSlides.length > 1 && (
            <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentIndex
                      ? 'w-8 h-2 bg-white shadow-lg shadow-white/20'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${i + 1}: ${activeSlides[i].title}`}
                />
              ))}
            </div>
          )}

          {/* Scroll indicator — inside stats wrapper */}
          {activeSlides.length <= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-30"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2 text-white/40"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-white/60"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        </motion.div>

    </section>
  );
}
