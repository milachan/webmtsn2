'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useStoreData, getPrestasi } from '@/lib/adminStore';

interface TingkatStyle {
  color: string;
  bg: string;
  border: string;
  medal: string;
  icon: string;
  label: string;
}

const tingkatStyles: Record<string, TingkatStyle> = {
  Kabupaten: {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    medal: 'from-emerald-400 to-emerald-600',
    icon: 'award',
    label: 'Kab.',
  },
  Provinsi: {
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    medal: 'from-blue-400 to-blue-600',
    icon: 'shield',
    label: 'Prov.',
  },
  Nasional: {
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    medal: 'from-amber-400 to-amber-600',
    icon: 'trophy',
    label: 'Nas.',
  },
  Internasional: {
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    medal: 'from-purple-400 to-purple-600',
    icon: 'globe',
    label: 'Intl.',
  },
};

const bidangIcons: Record<string, string> = {
  'Olimpiade Sains': 'atom',
  'Olahraga': 'football',
  'Keagamaan': 'book-open',
  'Seni': 'music',
  'Akademik': 'graduation-cap',
  'Sains': 'flask-conical',
  'Ekstrakurikuler': 'compass',
};

export default function PrestasiPage() {
  const prestasiData = useStoreData(getPrestasi);
  const [filterTingkat, setFilterTingkat] = useState<string>('Semua');

  const tingkatList = useMemo(() => {
    const fixedOrder = ['Semua', 'Kabupaten', 'Provinsi', 'Nasional'];
    const extras = Array.from(new Set(prestasiData.map((p) => p.tingkat)))
      .filter((t) => !fixedOrder.includes(t));
    return [...fixedOrder, ...extras];
  }, [prestasiData]);

  const filtered = filterTingkat === 'Semua'
    ? prestasiData
    : prestasiData.filter((p) => p.tingkat === filterTingkat);

  // Stats summary
  const totalNasional = prestasiData.filter((p) => p.tingkat === 'Nasional' || p.tingkat === 'Internasional').length;
  const totalProvinsi = prestasiData.filter((p) => p.tingkat === 'Provinsi').length;
  const totalKabupaten = prestasiData.filter((p) => p.tingkat === 'Kabupaten').length;

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Akademik
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Prestasi</h1>
            <p className="text-lg text-white/70">{prestasiData.length} prestasi diraih siswa MTsN 2 Kebumen</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          {/* Stats summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'Total Prestasi', count: prestasiData.length, icon: 'award', color: 'from-emerald-500 to-emerald-600' },
              { label: 'Nasional / Intl.', count: totalNasional, icon: 'globe', color: 'from-purple-500 to-purple-600' },
              { label: 'Provinsi', count: totalProvinsi, icon: 'shield', color: 'from-blue-500 to-blue-600' },
              { label: 'Kabupaten', count: totalKabupaten, icon: 'map-pin', color: 'from-emerald-400 to-emerald-600' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-card rounded-2xl p-4 border border-gray-100 dark:border-dark-border text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                  <Icon name={stat.icon} size={18} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stat.count}</p>
                <p className="text-[11px] text-gray-500 dark:text-dark-text-muted mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tingkatList.map((t) => {
              const style = t !== 'Semua' ? tingkatStyles[t] : null;
              return (
                <button
                  key={t}
                  onClick={() => setFilterTingkat(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filterTingkat === t
                      ? style
                        ? `${style.bg} ${style.color} shadow-sm border ${style.border} scale-105`
                        : 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/25'
                      : 'bg-gray-50 dark:bg-dark-card text-gray-600 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Achievement cards */}
          <StaggerContainer key={filterTingkat} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const style = tingkatStyles[item.tingkat] || tingkatStyles['Kabupaten'];
              const bidangIcon = bidangIcons[item.bidang] || 'star';
              return (
                <StaggerItem key={item.id}>
                  <Card hover="lift" className={`overflow-hidden border-l-4 ${style.border}`}>
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        {/* Medal icon */}
                        <div className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${style.medal} flex items-center justify-center shadow-lg shadow-black/10`}>
                          <Icon name={style.icon} size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Badges row */}
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.tahun}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${style.bg} ${style.color}`}>
                              {item.tingkat}
                            </span>
                          </div>
                          {/* Achievement name */}
                          <p className="text-sm font-semibold text-gray-900 dark:text-dark-text leading-snug">{item.prestasi}</p>
                          {/* Bidang with icon */}
                          <div className="flex items-center gap-1.5 mt-2">
                            <Icon name={bidangIcon} size={12} className="text-gray-400 dark:text-dark-text-muted" />
                            <span className="text-[11px] text-gray-500 dark:text-dark-text-muted">{item.bidang}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400 dark:text-dark-text-muted">
                <Icon name="trophy" size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Belum ada data prestasi</p>
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
