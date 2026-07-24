'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Link from 'next/link';

const prestasiData = [
  { tahun: '2024', bidang: 'Olimpiade Sains', prestasi: 'Juara 1 OSN Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { tahun: '2024', bidang: 'Olimpiade Sains', prestasi: 'Medali Emas OSN Matematika', tingkat: 'Provinsi' },
  { tahun: '2024', bidang: 'Olahraga', prestasi: 'Juara 1 Futsal Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { tahun: '2024', bidang: 'Keagamaan', prestasi: 'Juara 1 MHQ Tingkat Provinsi', tingkat: 'Provinsi' },
  { tahun: '2024', bidang: 'Seni', prestasi: 'Juara 2 Pidato Bahasa Arab', tingkat: 'Kabupaten' },
  { tahun: '2023', bidang: 'Akademik', prestasi: 'Nilai UN Tertinggi se-Kabupaten', tingkat: 'Kabupaten' },
  { tahun: '2023', bidang: 'Olahraga', prestasi: 'Juara 3 Basket Putri', tingkat: 'Kabupaten' },
  { tahun: '2023', bidang: 'Keagamaan', prestasi: 'Juara Harapan 1 Musabaqah Tilawatil Qur\'an', tingkat: 'Provinsi' },
  { tahun: '2023', bidang: 'Sains', prestasi: 'Finalis Olimpiade Sains Nasional', tingkat: 'Nasional' },
  { tahun: '2024', bidang: 'Ekstrakurikuler', prestasi: 'Juara 1 Pramuka Tingkat Kabupaten', tingkat: 'Kabupaten' },
  { tahun: '2024', bidang: 'Akademik', prestasi: '10 Besar Nilai ASPD Terbaik', tingkat: 'Kabupaten' },
  { tahun: '2024', bidang: 'Seni', prestasi: 'Juara 2 Kaligrafi Islam', tingkat: 'Provinsi' },
];

export default function PrestasiPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Akademik
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Prestasi</h1>
            <p className="text-lg text-white/70">45+ prestasi diraih siswa MTsN 2 Kebumen tahun 2024</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prestasiData.map((item, i) => (
              <StaggerItem key={i}>
                <Card hover="lift" className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Icon name="trophy" size={18} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.tahun}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">{item.tingkat}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{item.prestasi}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">{item.bidang}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
