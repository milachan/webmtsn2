'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { agenda } from '@/lib/data';
import Link from 'next/link';

export default function AgendaPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Informasi
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Agenda</h1>
            <p className="text-lg text-white/70">Jadwal kegiatan MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Timeline header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent dark:from-emerald-800" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
              <Icon name="calendar" size={14} />
              {agenda.length} Agenda Terjadwal
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-200 to-transparent dark:from-emerald-800" />
          </div>

          <div className="space-y-5">
            {agenda.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <Card hover="lift" className="p-6">
                  <div className="flex items-start gap-5">
                    {/* Date badge */}
                    <div className="shrink-0 w-18 h-18 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex flex-col items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                      <span className="text-[10px] uppercase font-medium tracking-wider">{item.date.split(' ')[1]?.slice(0,3) || ''}</span>
                      <span className="text-2xl font-bold leading-none mt-0.5">{item.date.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-dark-text">{item.title}</h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2.5 text-xs text-gray-500 dark:text-dark-text-muted">
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-card px-2.5 py-1 rounded-lg">
                          <Icon name="clock" size={12} className="text-emerald-500" /> {item.time}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-card px-2.5 py-1 rounded-lg">
                          <Icon name="map-pin" size={12} className="text-emerald-500" /> {item.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-dark-text-muted mt-3 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
