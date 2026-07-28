'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getBerita } from '@/lib/adminStore';

export default function BeritaTerbaru() {
  const beritaList = useStoreData(getBerita);
  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Berita & Kegiatan Terbaru"
          subtitle="Informasi"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {beritaList.slice(0, 6).map((berita) => (
            <StaggerItem key={berita.id}>
              <Link href={`/informasi/berita/${berita.slug}`}>
                <Card hover="lift" className="group h-full">
                  {/* Image */}
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getGradientColor(berita.id)}`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500">
                      <Icon name="image" size={48} className="text-white" />
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-card/90 text-emerald-700 dark:text-emerald-300 backdrop-blur-sm">
                        {berita.category}
                      </span>
                    </div>
                    {/* Date overlay */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="text-xs text-white/80 bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                        {berita.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {berita.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-dark-text-muted line-clamp-3 leading-relaxed">
                      {berita.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium group/link">
                      <span>Baca Selengkapnya</span>
                      <Icon name="arrow-right" size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center mt-10">
          <Link href="/informasi/berita">
            <Button variant="outline" size="lg">
              Lihat Semua Berita
              <Icon name="arrow-right" size={18} />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
