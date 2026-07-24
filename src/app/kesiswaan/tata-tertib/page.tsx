'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { tataTertib } from '@/lib/data';
import Link from 'next/link';

export default function TataTertibPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/kesiswaan" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Kesiswaan
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Tata Tertib</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-8">
            <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed italic border-l-4 border-emerald-500 pl-4">{tataTertib.pendahuluan}</p>
          </ScrollReveal>
          <div className="space-y-8">
            {tataTertib.aturan.map((kategori, i) => (
              <ScrollReveal key={kategori.kategori} delay={i * 0.1}>
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-100 dark:border-dark-border">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    {kategori.kategori}
                  </h3>
                  <ul className="space-y-2 ml-12">
                    {kategori.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-dark-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2} className="mt-8">
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-start gap-3">
                <Icon name="alert-circle" size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Sanksi Pelanggaran</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-200/80">{tataTertib.sanksi}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
