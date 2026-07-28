'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounterValue from '@/components/ui/AnimatedCounterValue';
import { useStoreData, useStoreLoading, getStatistik } from '@/lib/adminStore';

export default function StatsSection() {
  const statistikMadrasah = useStoreData(getStatistik);
  const storeLoading = useStoreLoading();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden"
    >
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cpath d=\'M40 2L78 40L40 78L2 40Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.3\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-fluid-h2 font-bold text-white mb-3">
              Madrasah dalam Angka
            </h2>
            <p className="text-emerald-200/80 max-w-2xl mx-auto">
              Berbagai capaian dan data statistik yang menggambarkan perkembangan
              MTs Negeri 2 Kebumen
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-8">
          {storeLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto mb-4 animate-pulse" />
                <div className="h-9 lg:h-10 w-16 mx-auto bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-20 mx-auto mt-2 bg-white/10 rounded animate-pulse" />
              </div>
            ))
          ) : (
            statistikMadrasah.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-all duration-300">
                  <Icon
                    name={stat.icon}
                    size={24}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-dark-text">
                  <AnimatedCounterValue
                    value={stat.value}
                    suffix={stat.suffix || ''}
                    play={isInView}
                  />
                </p>
                <p className="text-sm text-gray-300 dark:text-dark-text-muted mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
