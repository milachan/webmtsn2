'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getGaleri, GaleriItem } from '@/lib/adminStore';

const categories = ['Semua', 'Kegiatan', 'Fasilitas', 'Akademik'];

function Lightbox({ item, onClose, onPrev, onNext }: {
  item: GaleriItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[80] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
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
        {/* Navigation */}
        <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
          <Icon name="chevron-left" size={24} />
        </button>
        <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
          <Icon name="chevron-right" size={24} />
        </button>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-sm">
          Tutup [ESC]
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GaleriSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galeriFoto = useStoreData(getGaleri);

  const filtered = activeCategory === 'Semua'
    ? galeriFoto
    : galeriFoto.filter((g) => g.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
  }, [filtered.length]);

  return (
    <section className="py-20 bg-emerald-50/50 dark:bg-dark-bg">
      <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Galeri Foto"
          subtitle="Dokumentasi"
        />

        {/* Filter buttons */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/25'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Masonry Grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}className={`cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-br ${getGradientColor(item.id)} ${index % 5 === 0 ? 'row-span-2 col-span-2' : ''}`}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index); } }}
                  style={{ aspectRatio: index % 5 === 0 ? '16/9' : '4/3' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="image" size={index % 5 === 0 ? 48 : 32} className="text-white/20" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                      <p className="text-white/70 text-xs mt-0.5">{item.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-white/20 backdrop-blur-sm text-white">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <ScrollReveal className="text-center mt-8">
          <Link href="/informasi/galeri">
            <Button variant="outline" size="lg">
              Lihat Galeri Lengkap
              <Icon name="arrow-right" size={18} />
            </Button>
          </Link>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
