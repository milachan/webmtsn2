'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import { useStoreData, getNilaiUnggulan } from '@/lib/adminStore';

export default function NilaiUnggulan() {
  const nilaiUnggulan = useStoreData(getNilaiUnggulan);
  const highlight = nilaiUnggulan.find((n) => n.highlight);
  const others = nilaiUnggulan.filter((n) => !n.highlight);

  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Nilai Unggulan Madrasah"
          subtitle="Keunggulan Kami"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-8">
          {/* Highlight Card (Large - spans 2 rows) */}
          <ScrollReveal className="lg:col-span-2 lg:row-span-2" direction="left">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-3xl p-8 lg:p-10 overflow-hidden group cursor-pointer"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Icon name={highlight?.icon || 'book-open'} size={30} className="text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {highlight?.title}
                </h3>
                <p className="text-emerald-100/80 leading-relaxed text-base flex-1">
                  {highlight?.description}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <span className="inline-flex items-center gap-2 text-emerald-200 text-sm font-medium group-hover:gap-3 transition-all">
                    Pelajari Selengkapnya
                    <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Smaller Cards */}
          {others.map((item, index) => (
            <ScrollReveal key={item.id} delay={0.15 * (index + 1)} direction="right">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl p-6 hover:shadow-card-hover hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon} size={22} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
