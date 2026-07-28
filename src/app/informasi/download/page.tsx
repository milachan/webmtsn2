'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { dokumenDownload } from '@/lib/data';
import Link from 'next/link';

const categories = ['Semua', 'Akademik', 'Kesiswaan', 'Pendaftaran', 'Administrasi'];

const categoryColors: Record<string, string> = {
  Akademik: 'from-violet-500 to-violet-700',
  Kesiswaan: 'from-emerald-500 to-emerald-700',
  Pendaftaran: 'from-blue-500 to-blue-700',
  Administrasi: 'from-amber-500 to-amber-700',
};

export default function DownloadPage() {
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');
  const filtered = dokumenDownload
    .filter((d) => filter === 'Semua' || d.category === filter)
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Informasi
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Download Dokumen</h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl">
              Unduh dokumen-dokumen penting terkait akademik, kesiswaan, dan administrasi madrasah
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                aria-label="Cari dokumen"
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Download list */}
          <StaggerContainer className="space-y-3">
            {filtered.map((doc) => {
              const grad = categoryColors[doc.category] || 'from-emerald-500 to-emerald-700';
              return (
                <StaggerItem key={doc.id}>
                  <a
                    href={doc.fileUrl}
                    download
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon name={doc.icon} size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted truncate">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{doc.fileSize}</span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                        <Icon name="arrow-down" size={14} />
                        Unduh
                      </span>
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-dark-card flex items-center justify-center mx-auto mb-4">
                <Icon name="search" size={28} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-400 dark:text-dark-text-muted">Dokumen tidak ditemukan</p>
              <button
                onClick={() => { setSearch(''); setFilter('Semua'); }}
                className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
