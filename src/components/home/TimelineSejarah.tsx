'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getSejarah, TimelineEvent } from '@/lib/adminStore';

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <div className="shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] snap-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative pl-8 border-l-2 border-emerald-200 dark:border-emerald-800 ml-4">
          {/* Year badge */}
          <div className="absolute -left-4 top-0">
            <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-900/30">
              {event.year.slice(2)}
            </div>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-dark-border hover:shadow-card-hover transition-all duration-300 ml-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{event.year}</span>
            <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mt-1 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TimelineSejarah() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-emerald-50/50 dark:bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Perjalanan Madrasah"
          subtitle="Sejarah"
        />

        {/* Timeline horizontal scroll */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-pl-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {getSejarah().map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-6">
          <Link
            href="/profil/sejarah"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:gap-3 transition-all duration-300"
          >
            Lihat Sejarah Lengkap
            <Icon name="arrow-right" size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
