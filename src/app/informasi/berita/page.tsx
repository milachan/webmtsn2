'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getBerita } from '@/lib/adminStore';

export default function BeritaPage() {
  const beritaTerbaru = useStoreData(getBerita);
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-4 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Informasi
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Berita</h1>
            <p className="text-lg text-white/70">Berita dan kegiatan terbaru MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          {/* Stats bar */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent dark:from-emerald-800" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
              <Icon name="book-open" size={14} />
              {beritaTerbaru.length} Berita Tersedia
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-200 to-transparent dark:from-emerald-800" />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {beritaTerbaru.map((berita) => (
              <StaggerItem key={berita.id}>
                <Link href={`/informasi/berita/${berita.slug}`}>
                  <Card hover="lift" className="h-full group">
                    {/* Card image */}
                    <div className={`h-52 bg-gradient-to-br ${getGradientColor(berita.id)} flex items-center justify-center relative overflow-hidden`}>
                      {berita.image ? (
                        <img
                          src={berita.image}
                          alt={berita.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <Icon name="image" size={48} className="text-white/30 group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-card/90 text-emerald-700 dark:text-emerald-300 shadow-sm">
                        {berita.category}
                      </span>
                      <span className="absolute bottom-3 right-3 text-xs text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        {berita.date}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    {/* Card body */}
                    <div className="p-5 lg:p-6">
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {berita.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-gray-500 dark:text-dark-text-muted line-clamp-3 leading-relaxed">
                        {berita.excerpt}
                      </p>
                      {/* Read more */}
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Baca selengkapnya <Icon name="arrow-right" size={12} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
