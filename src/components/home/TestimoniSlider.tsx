'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { useStoreData, getTestimoni } from '@/lib/adminStore';

export default function TestimoniSlider() {
  const testimoni = useStoreData(getTestimoni);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Guard: ensure current is valid even if testimoni is loaded after render
  if (testimoni.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-emerald-50/50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 dark:text-dark-text-muted text-sm">Belum ada testimoni</p>
        </div>
      </section>
    );
  }

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimoni.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimoni.length) % testimoni.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-16 md:py-20 bg-emerald-50/50 dark:bg-dark-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
            <span className="text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Testimoni
            </span>
            <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
          </div>
          <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mb-4 px-2 sm:px-0">
            Apa Kata Mereka
          </h2>
          <p className="text-gray-500 dark:text-dark-text-muted max-w-xl mx-auto px-2 sm:px-0">
            Pendapat orang tua siswa, alumni, dan masyarakat tentang MTs Negeri 2 Kebumen
          </p>
        </ScrollReveal>

        {/* Testimonial Card */}
        <div className="mt-14 md:mt-20">
          {/* NOTE: no fixed height + no absolute positioning here on purpose.
              The old version centered the card inside a fixed-height box,
              so a long testimoni would grow UPWARD as much as downward and
              overlap the subtitle above it. Letting it sit in normal flow
              fixes that regardless of content length. */}
          <div className="relative flex justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl"
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-dark-border">
                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                    <Icon name="quote" size={22} className="text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed italic text-base lg:text-lg">
                    &ldquo;{testimoni[current].content}&rdquo;
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
                        {testimoni[current].name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-dark-text text-sm">
                          {testimoni[current].name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted">
                          {testimoni[current].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
            <button
              onClick={prev}
              className="shrink-0 p-3.5 sm:p-3 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-border text-gray-500 dark:text-dark-text-muted shadow-sm border border-gray-200 dark:border-dark-border transition-all hover:-translate-x-0.5"
              aria-label="Sebelumnya"
            >
              <Icon name="chevron-left" size={18} />
            </button>

            {/* Dots stay on a single row and scroll horizontally if there are
                too many to fit, instead of wrapping to a second row (which
                looked "doubled") or stretching the buttons out to the edges. */}
            <div className="flex items-center gap-2.5 overflow-x-auto max-w-[130px] sm:max-w-none py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
              {testimoni.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0 ${
                    i === current
                      ? 'bg-emerald-600 dark:bg-emerald-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Testimoni ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="shrink-0 p-3.5 sm:p-3 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-border text-gray-500 dark:text-dark-text-muted shadow-sm border border-gray-200 dark:border-dark-border transition-all hover:translate-x-0.5"
              aria-label="Selanjutnya"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}