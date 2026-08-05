'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { useStoreData, getKurikulumData } from '@/lib/adminStore';
import Link from 'next/link';

export default function KurikulumPage() {
  const kurikulum = useStoreData(getKurikulumData);

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Akademik
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Kurikulum</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed mb-8">
              MTs Negeri 2 Kebumen menerapkan Kurikulum Merdeka yang dipadukan dengan kekhasan madrasah.
              Kurikulum dirancang untuk mengembangkan potensi akademik, karakter Islami, dan keterampilan abad 21.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kurikulum.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-100 dark:border-dark-border h-full">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((listItem) => (
                      <li key={listItem} className="flex items-start gap-2 text-sm text-gray-600 dark:text-dark-text-muted">
                        <Icon name="check" size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
