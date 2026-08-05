'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { useStoreData, getEkstrakurikuler } from '@/lib/adminStore';
import Link from 'next/link';

const categories = ['Semua', 'Keagamaan', 'Olahraga', 'Sains', 'Seni', 'Kedisiplinan', 'Kesehatan', 'Akademik', 'Wajib'];

export default function EkstrakurikulerPage() {
  const ekstrakurikuler = useStoreData(getEkstrakurikuler);
  const [filter, setFilter] = useState('Semua');
  const filtered = filter === 'Semua' ? ekstrakurikuler : ekstrakurikuler.filter((e) => e.category === filter);

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/kesiswaan" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Kesiswaan
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Ekstrakurikuler</h1>
            <p className="text-lg text-white/70">18 ekstrakurikuler untuk mengembangkan bakat dan minat siswa</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ekskul) => (
              <StaggerItem key={ekskul.id}>
                <Card hover="lift" className="h-full overflow-hidden">
                  {/* Image */}
                  <div className="h-40 overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center relative">
                    {ekskul.image ? (
                      <img
                        src={ekskul.image}
                        alt={ekskul.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <Icon name={ekskul.icon} size={32} className="text-white/60" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {ekskul.image ? null : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0">
                          <Icon name={ekskul.icon} size={18} className="text-white" />
                        </div>
                      )}
                      <div className={ekskul.image ? '' : 'flex-1'}>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text">{ekskul.name}</h3>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">{ekskul.category}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-dark-text-muted">{ekskul.description}</p>
                      </div>
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
