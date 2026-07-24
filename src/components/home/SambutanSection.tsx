'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getKepalaMadrasah } from '@/lib/adminStore';

export default function SambutanSection() {
  const kepalaMadrasah = getKepalaMadrasah();
  return (
    <section className="py-20 bg-emerald-50/50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Photo */}
          <div className="lg:sticky lg:top-24">
            <ScrollReveal direction="left">
              <div className="relative">
                {/* Photo Frame */}
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-emerald-600 to-emerald-900 shadow-2xl shadow-emerald-900/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                        <Icon name="graduation-cap" size={40} className="text-white" />
                      </div>
                      <p className="font-display font-semibold text-lg px-6">{kepalaMadrasah.name}</p>
                      <p className="text-emerald-200 text-sm mt-1">Kepala MTs Negeri 2 Kebumen</p>
                    </div>
                  </div>
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 2L38 20L20 38L2 20Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-emerald-500/10 -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-emerald-500/10 -z-10" />

                {/* Badge */}
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-dark-card rounded-xl shadow-lg px-4 py-3">
                  <p className="text-xs text-gray-500 dark:text-dark-text-muted">NIP.</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-dark-text">{kepalaMadrasah.nip}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Scroll-reveal text */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
                <span className="text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Sambutan Kepala Madrasah
                </span>
              </div>
              <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mt-4">
                Selamat Datang di{' '}
                <span className="gradient-text">MTsN 2 Kebumen</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-dark-text-muted italic border-l-4 border-emerald-600 dark:border-emerald-400 pl-4">
                &ldquo;Assalamu&apos;alaikum Warahmatullahi Wabarakatuh&rdquo;
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed">
                {kepalaMadrasah.paragraph1}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed">
                {kepalaMadrasah.paragraph2}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed">
                {kepalaMadrasah.paragraph3}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <Link
                href="/profil/sambutan"
                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:gap-3 transition-all duration-300 underline-grow"
              >
                Baca Selengkapnya
                <Icon name="arrow-right" size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
