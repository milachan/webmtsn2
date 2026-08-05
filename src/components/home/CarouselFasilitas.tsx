'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getFasilitas, Fasilitas } from '@/lib/adminStore';

function TiltCard({ item, index }: { item: Fasilitas; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(y * -10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const grad = getGradientColor(index);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="shrink-0 w-[280px] sm:w-[320px]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        hover="glow"
        className="h-full"
      >
        <div className={`relative h-40 ${item.image ? '' : `bg-gradient-to-br ${grad}`} overflow-hidden flex items-center justify-center`}>
          {item.image && !imageError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                suppressHydrationWarning
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className={`absolute inset-0 bg-gradient-to-br ${grad} animate-pulse flex items-center justify-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name={item.icon} size={28} className="text-white/60" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`bg-gradient-to-br ${grad} w-full h-full flex items-center justify-center`}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name={item.icon} size={28} className="text-white" />
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">
            {item.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function CarouselFasilitas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const items = useStoreData(getFasilitas);

  // Hitung jumlah halaman nyata berdasarkan scrollWidth vs clientWidth
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const calc = () => {
      const pages = el.clientWidth > 0
        ? Math.round(el.scrollWidth / el.clientWidth)
        : 1;
      setTotalPages(Math.max(1, pages));
      setCurrentIndex((i) => Math.min(i, Math.max(0, pages - 1)));
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  const scrollTo = (page: number) => {
    if (!scrollRef.current) return;
    const target = Math.max(0, Math.min(page, totalPages - 1));
    scrollRef.current.scrollTo({
      left: target * scrollRef.current.clientWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(target);
  };

  const next = () => scrollTo(currentIndex + 1);
  const prev = () => scrollTo(currentIndex - 1);

  return (
    <section className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Fasilitas & Kegiatan"
          subtitle="Sarana Prasarana"
        />

        <div className="relative mt-8">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => (
              <div key={item.id}>
                <TiltCard item={item} index={index} />
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border text-gray-600 dark:text-dark-text-muted transition-all hover:-translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0"
              aria-label="Sebelumnya"
            >
              <Icon name="chevron-left" size={18} />
            </button>

            {/* Dots — berbasis halaman nyata, bukan jumlah item */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-emerald-600 dark:bg-emerald-400 w-6'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Halaman ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex >= totalPages - 1}
              className="p-3 rounded-xl bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border text-gray-600 dark:text-dark-text-muted transition-all hover:translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0"
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
