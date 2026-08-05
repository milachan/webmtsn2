'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useStoreData, getKepalaMadrasah } from '@/lib/adminStore';

export default function SambutanSection() {
  const kepalaMadrasah = useStoreData(getKepalaMadrasah);

  return (
    <section className="relative overflow-hidden bg-emerald-50/50 py-4 dark:bg-dark-bg lg:py-6">
      {/* Dekorasi background */}
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16 xl:gap-20">

          {/* ── FOTO + IDENTITAS ── */}
          <ScrollReveal direction="left">
            <div className="mx-auto w-full max-w-[380px] lg:mx-0 lg:sticky lg:top-24">

              {/* Frame simpel: border tipis + shadow */}
              <div className="group rounded-3xl border border-emerald-200/60 bg-white p-2 shadow-lg shadow-emerald-900/8 dark:border-emerald-800/40 dark:bg-dark-card dark:shadow-black/20">
                {/* Foto */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950">
                  {/* Fallback */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/65">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                        <Icon name="graduation-cap" size={30} className="text-white" />
                      </div>
                      <p className="text-sm">Foto belum tersedia</p>
                    </div>
                  </div>

                  {kepalaMadrasah?.image && (
                    <img
                      src={kepalaMadrasah.image}
                      alt={kepalaMadrasah.name ? `Foto ${kepalaMadrasah.name}` : 'Foto Kepala Madrasah'}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                </div>

                {/* Identitas di bawah foto */}
                <div className="px-3 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    Kepala Madrasah
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-gray-900 dark:text-dark-text">
                    {kepalaMadrasah?.name || '—'}
                  </p>
                  {kepalaMadrasah?.nip && (
                    <p className="mt-0.5 text-[11px] text-gray-400 dark:text-dark-text-muted">
                      NIP. {kepalaMadrasah.nip}
                    </p>
                  )}
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* ── KONTEN SAMBUTAN ── */}
          <div className="min-w-0">
            <ScrollReveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 sm:text-sm">
                  Sambutan Kepala Madrasah
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-dark-text sm:text-4xl lg:text-5xl">
                Selamat Datang di{' '}
                <span className="gradient-text">MTsN 2 Kebumen</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <blockquote className="mt-6 border-l-4 border-emerald-500 pl-5 text-lg italic leading-relaxed text-gray-600 dark:text-dark-text-muted">
                &ldquo;Assalamu&apos;alaikum Warahmatullahi Wabarakatuh&rdquo;
              </blockquote>
            </ScrollReveal>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-600 dark:text-dark-text-muted">
              {kepalaMadrasah?.paragraph1 && (
                <ScrollReveal delay={0.15}>
                  <p>{kepalaMadrasah.paragraph1}</p>
                </ScrollReveal>
              )}
              {kepalaMadrasah?.paragraph2 && (
                <ScrollReveal delay={0.2}>
                  <p>{kepalaMadrasah.paragraph2}</p>
                </ScrollReveal>
              )}
              {kepalaMadrasah?.paragraph3 && (
                <ScrollReveal delay={0.25}>
                  <p>{kepalaMadrasah.paragraph3}</p>
                </ScrollReveal>
              )}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-7 border-t border-gray-200 pt-5 dark:border-dark-border">
                <Link
                  href="/profil/sambutan"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Baca Selengkapnya
                  <Icon name="arrow-right" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
