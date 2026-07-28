'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { useStoreData, getPengumuman } from '@/lib/adminStore';
import Link from 'next/link';

export default function PengumumanPage() {
  const pengumuman = useStoreData(getPengumuman);
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-4 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Informasi
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Pengumuman</h1>
            <p className="text-lg text-white/70">Informasi resmi dan pengumuman terbaru dari madrasah</p>
          </motion.div>
        </div>
        {/* Decorative curve */}
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
          {pengumuman.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <Card hover="lift" className={`p-6 ${item.priority === 'high' ? 'relative overflow-hidden' : ''}`}>
                {item.priority === 'high' && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-amber-600" />
                )}
                <div className="flex items-start gap-4">
                  {item.priority === 'high' ? (
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Icon name="alert-circle" size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                  ) : (
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Icon name="info" size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text">{item.title}</h3>
                      {item.priority === 'high' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm">
                          PENTING
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-dark-text-muted mb-2 flex items-center gap-1.5">
                      <Icon name="calendar" size={12} />
                      {item.date}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
