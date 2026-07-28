'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { useStoreData, getSejarah } from '@/lib/adminStore';
import Link from 'next/link';

export default function SejarahPage() {
  const sejarahMadrasah = useStoreData(getSejarah);
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/profil" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Profil
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Sejarah Madrasah</h1>
            <p className="text-lg text-white/70">Perjalanan panjang MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed">
              Berdiri sejak tahun 1995, MTs Negeri 2 Kebumen telah melalui perjalanan panjang dalam dunia pendidikan. 
              Berawal dari madrasah sederhana, kini berkembang menjadi salah satu madrasah unggulan di Kabupaten Kebumen 
              dengan berbagai prestasi dan fasilitas modern.
            </p>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 -translate-x-1/2" />
            {sejarahMadrasah.map((event, i) => (
              <ScrollReveal key={event.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-dark-border inline-block max-w-md shadow-md">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{event.year}</span>
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mt-1">{event.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-2">{event.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-dark-bg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{event.year.slice(2)}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:hidden">
                    <div className="bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-100 dark:border-dark-border shadow-md">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{event.year}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-dark-text text-sm mt-0.5">{event.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-1">{event.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
