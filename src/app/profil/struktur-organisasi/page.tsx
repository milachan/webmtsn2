'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

const strukturData = [
  { level: 'Kepala Madrasah', name: 'Dr. H. Ahmad Fauzi, S.Ag., M.Pd.', icon: 'graduation-cap', color: 'from-emerald-600 to-emerald-900' },
  { level: 'Waka Kurikulum', name: 'Drs. H. Slamet Riyadi', icon: 'book-open', color: 'from-emerald-500 to-emerald-700' },
  { level: 'Waka Kesiswaan', name: 'Hj. Siti Nurjanah, S.Pd., M.Pd.', icon: 'users', color: 'from-emerald-500 to-emerald-700' },
  { level: 'Waka Sarpras', name: 'H. Ali Maksum, S.Pd.I., M.S.I.', icon: 'building-2', color: 'from-emerald-500 to-emerald-700' },
  { level: 'Waka Humas', name: 'Dra. Hj. Masruroh', icon: 'message-square', color: 'from-emerald-500 to-emerald-700' },
];

const guruList = [
  { bidang: 'Guru Mata Pelajaran', count: '35 Guru' },
  { bidang: 'Wali Kelas', count: '27 Guru' },
  { bidang: 'Pembina Ekstrakurikuler', count: '18 Pembina' },
  { bidang: 'Tenaga Administrasi', count: '8 Tendik' },
  { bidang: 'Pustakawan', count: '2 Pustakawan' },
  { bidang: 'Laboran', count: '3 Laboran' },
];

export default function StrukturOrganisasiPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/profil" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Profil
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Struktur Organisasi</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Hierarchical structure */}
          <div className="flex flex-col items-center">
            {/* Top - Kepala Madrasah */}
            <ScrollReveal>
              <div className={`bg-gradient-to-br ${strukturData[0].color} rounded-2xl p-6 text-center text-white shadow-xl w-72`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <Icon name={strukturData[0].icon} size={22} />
                </div>
                <p className="text-xs text-emerald-200 uppercase tracking-wider">{strukturData[0].level}</p>
                <p className="font-semibold mt-1">{strukturData[0].name}</p>
              </div>
            </ScrollReveal>

            {/* Connector line */}
            <div className="w-0.5 h-8 bg-emerald-300 dark:bg-emerald-700" />

            {/* Level 2 - Waka */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {strukturData.slice(1).map((item) => (
                  <div key={item.level} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-center text-white shadow-lg`}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-2">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <p className="text-[10px] text-emerald-200 uppercase tracking-wider">{item.level}</p>
                    <p className="text-sm font-medium mt-1">{item.name}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Connector */}
            <div className="w-full max-w-2xl h-0.5 bg-emerald-200 dark:bg-emerald-800 my-4" />

            {/* Level 3 - Guru */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl">
                {guruList.map((item) => (
                  <div key={item.bidang} className="bg-emerald-50 dark:bg-dark-card rounded-xl p-4 text-center border border-emerald-100 dark:border-dark-border">
                    <p className="text-xs text-gray-500 dark:text-dark-text-muted">{item.bidang}</p>
                    <p className="font-semibold text-gray-900 dark:text-dark-text mt-1">{item.count}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
