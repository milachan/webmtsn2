'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function InformasiPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium mb-6">
              <Icon name="info" size={14} /> Pusat Informasi Madrasah
            </div>
            <h1 className="text-fluid-hero font-bold text-white mb-4">Informasi</h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Informasi dan berita terbaru dari MTs Negeri 2 Kebumen
            </p>
          </motion.div>
        </div>
        {/* Decorative curve */}
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { href: '/informasi/pengumuman', label: 'Pengumuman', icon: 'info', desc: 'Pengumuman resmi madrasah', color: 'from-amber-500 to-amber-700', gradient: 'from-amber-50 to-amber-100 dark:from-amber-500/10 dark:to-amber-600/5' },
              { href: '/informasi/berita', label: 'Berita', icon: 'book-open', desc: 'Berita dan artikel terbaru seputar kegiatan madrasah', color: 'from-emerald-500 to-emerald-700', gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-600/5' },
              { href: '/informasi/agenda', label: 'Agenda', icon: 'calendar', desc: 'Jadwal kegiatan dan acara madrasah', color: 'from-blue-500 to-blue-700', gradient: 'from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/5' },
              { href: '/informasi/galeri', label: 'Galeri', icon: 'image', desc: 'Dokumentasi foto kegiatan madrasah', color: 'from-purple-500 to-purple-700', gradient: 'from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/5' },
            ].map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={link.href} className="group block bg-white dark:bg-dark-card rounded-2xl p-7 border border-gray-100 dark:border-dark-border hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      <Icon name={link.icon} size={28} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{link.label}</h3>
                        <Icon name="chevron-right" size={16} className="text-gray-300 dark:text-gray-600 group-hover:translate-x-1 group-hover:text-emerald-500 transition-all" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted">{link.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
