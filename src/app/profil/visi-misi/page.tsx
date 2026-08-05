'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { useStoreData, getVisiMisi } from '@/lib/adminStore';
import Link from 'next/link';

export default function VisiMisiPage() {
  const visiMisi = useStoreData(getVisiMisi);
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/profil" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Profil
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Visi & Misi</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-emerald-500/5 -z-10" />
              <span className="text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Tujuan Utama</span>
              <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mt-2 mb-6">Visi Madrasah</h2>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-2xl p-8 shadow-xl">
                <p className="text-white/95 text-lg leading-relaxed italic">&ldquo;{visiMisi.visi}&rdquo;</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Langkah Strategis</span>
            <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mt-2 mb-6">Misi Madrasah</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visiMisi.misi.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 dark:text-dark-text-muted text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Target Capaian</span>
            <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mt-2 mb-6">Tujuan Madrasah</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visiMisi.tujuan.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-5 rounded-xl bg-emerald-50 dark:bg-dark-card border border-emerald-100 dark:border-dark-border">
                  <Icon name="check" size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-dark-text-muted text-sm">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
