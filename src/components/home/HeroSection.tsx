'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const yOrnament1 = useTransform(scrollY, [0, 500], [0, -80]);
  const yOrnament2 = useTransform(scrollY, [0, 500], [0, -120]);
  const yText = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Layer */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900"
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 2L78 40L40 78L2 40Z' fill='none' stroke='white' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-900/60 to-emerald-900/40" />

      {/* Geometric Islamic Ornaments */}
      <motion.div
        style={{ y: yOrnament1 }}
        className="absolute top-20 right-10 w-96 h-96 opacity-[0.03]"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 10L390 200L200 390L10 200Z" stroke="white" strokeWidth="0.5" />
          <path d="M200 50L350 200L200 350L50 200Z" stroke="white" strokeWidth="0.3" />
          <path d="M200 90L310 200L200 310L90 200Z" stroke="white" strokeWidth="0.2" />
          <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="0.3" />
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="0.2" />
          <circle cx="200" cy="200" r="110" stroke="white" strokeWidth="0.2" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: yOrnament2 }}
        className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.02]"
      >
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 0L300 150L150 300L0 150Z" stroke="white" strokeWidth="0.5" />
          <path d="M150 40L260 150L150 260L40 150Z" stroke="white" strokeWidth="0.3" />
          <path d="M150 80L220 150L150 220L80 150Z" stroke="white" strokeWidth="0.2" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Spacer for fixed header */}
        <div className="h-16 md:h-20 shrink-0" />
        <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex justify-between items-start gap-8">
            <div className="max-w-3xl flex-1">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-fluid-hero font-extrabold text-white leading-tight"
            >
              Mendidik Generasi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400">
                Islami Unggul
              </span>
              <br />
              Berkarakter & Berprestasi
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Madrasah unggulan di Kebumen yang mencetak generasi beriman, berilmu, berkarakter mulia, 
              dan siap menghadapi tantangan global dengan prestasi gemilang.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/pmb">
                <Button size="lg" magnetic className="bg-white text-emerald-900 hover:bg-white/90 hover:text-emerald-800 shadow-xl shadow-black/20">
                  <Icon name="bookmark" size={18} />
                  Daftar PMB
                </Button>
              </Link>
              <Link href="/profil">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Icon name="eye" size={18} />
                  Profil Madrasah
                </Button>
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-wrap gap-8"
            >
              {[
                { value: '840+', label: 'Siswa Aktif' },
                { value: '62', label: 'Guru & Tendik' },
                { value: '18', label: 'Ekstrakurikuler' },
                { value: '45+', label: 'Prestasi 2024' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/60 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

            {/* School identity tag — far right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-white shadow-lg shadow-amber-900/20 shrink-0"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-sm font-semibold tracking-wide text-amber-100">
                Madrasah Tsanawiyah Negeri 2 Kebumen
              </span>
            </motion.div>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
