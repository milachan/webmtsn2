'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { galeriFoto, getGradientColor } from '@/lib/data';

const categories = ['Semua', 'Kegiatan', 'Fasilitas', 'Akademik'];

function Lightbox({ item, onClose, onPrev, onNext }: { item: typeof galeriFoto[0]; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[80] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`aspect-video rounded-2xl bg-gradient-to-br ${getGradientColor(item.id)} flex items-center justify-center`}>
          <Icon name="image" size={64} className="text-white/30" />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-white font-display font-semibold text-lg">{item.title}</h3>
          <p className="text-white/60 text-sm mt-1">{item.description}</p>
          <p className="text-emerald-400 text-xs mt-2">{item.category}</p>
        </div>
        <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"><Icon name="chevron-left" size={24} /></button>
        <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"><Icon name="chevron-right" size={24} /></button>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-sm">Tutup [ESC]</button>
      </motion.div>
    </motion.div>
  );
}

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'Semua' ? galeriFoto : galeriFoto.filter((g) => g.category === activeCategory);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = useCallback(() => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null), [filtered.length]);
  const goPrev = useCallback(() => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null), [filtered.length]);

  return (
    <main className="pt-24">
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Informasi
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Galeri Foto</h1>
            <p className="text-lg text-white/70">Dokumentasi kegiatan dan fasilitas madrasah</p>
          </motion.div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>
      <section className="py-20 bg-emerald-50/50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/20 scale-105' 
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border hover:shadow-md'
                }`}>
                {cat}
              </button>
            ))}
          </div>
          {/* Gallery grid */}
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id} layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-br ${getGradientColor(item.id)} ${index % 7 === 0 ? 'row-span-2 col-span-2' : ''}`}
                    onClick={() => setLightboxIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(index); } }}
                    style={{ aspectRatio: index % 7 === 0 ? '16/9' : '4/3' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="image" size={index % 7 === 0 ? 48 : 32} className="text-white/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                        <p className="text-white/70 text-xs mt-0.5">{item.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox item={filtered[lightboxIndex]} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} />
        )}
      </AnimatePresence>
    </main>
  );
}
