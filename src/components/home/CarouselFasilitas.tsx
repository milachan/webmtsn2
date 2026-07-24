'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { getGradientColor } from '@/lib/data';
import { getFasilitas, Fasilitas } from '@/lib/adminStore';

function TiltCard({ item, index }: { item: Fasilitas; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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
        <div className={`relative h-40 bg-gradient-to-br ${grad} flex items-center justify-center`}>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon name={item.icon} size={28} className="text-white" />
          </div>
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
  const items = getFasilitas();
  const totalSlides = items.length;

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const target = Math.max(0, Math.min(index, totalSlides - 1));
    const targetEl = scrollRef.current.children[target] as HTMLElement;
    if (targetEl) {
      scrollRef.current.scrollTo({
        left: targetEl.offsetLeft,
        behavior: 'smooth',
      });
    }
    setCurrentIndex(target);
  };

  const next = () => scrollTo(currentIndex + 1);
  const prev = () => scrollTo(currentIndex - 1);

  return (
    <section className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              <TiltCard key={item.id} item={item} index={index} />
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
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-emerald-600 dark:bg-emerald-400 w-6'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={currentIndex >= totalSlides - 1}
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
