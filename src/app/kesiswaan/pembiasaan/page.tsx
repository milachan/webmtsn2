'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { useStoreData, getPembiasaanData } from '@/lib/adminStore';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  Keagamaan: 'from-emerald-500 to-emerald-700',
  Kedisiplinan: 'from-blue-500 to-blue-700',
  Akademik: 'from-violet-500 to-violet-700',
  Lingkungan: 'from-green-500 to-green-700',
  Kesehatan: 'from-rose-500 to-rose-700',
  Ibadah: 'from-amber-500 to-amber-700',
};

export default function PembiasaanPage() {
  const semuaPembiasaan = useStoreData(getPembiasaanData);
  const categories = ['Semua', ...Array.from(new Set(semuaPembiasaan.map((p) => p.category)))];
  const [filter, setFilter] = useState('Semua');
  const filtered = filter === 'Semua' ? semuaPembiasaan : semuaPembiasaan.filter((p) => p.category === filter);

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/kesiswaan" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Kesiswaan
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Pembiasaan</h1>
            <p className="text-lg text-white/70">Program pembiasaan positif untuk pembentukan karakter siswa</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-text-muted hover:bg-gray-200 dark:hover:bg-dark-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const grad = categoryColors[item.category] || 'from-emerald-500 to-emerald-700';
              return (
                <StaggerItem key={item.id}>
                  <Card hover="lift" className="p-5 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                        <Icon name={item.icon} size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text">{item.name}</h3>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-dark-text-muted mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                          <Icon name="clock" size={12} />
                          <span>{item.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 dark:text-dark-text-muted">Tidak ada program pembiasaan dalam kategori ini</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
