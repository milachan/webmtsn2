'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { kepalaMadrasah } from '@/lib/data';
import Link from 'next/link';

export default function SambutanPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/profil" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Profil
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Sambutan Kepala Madrasah</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <ScrollReveal direction="left" className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white p-6">
                    <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                      <Icon name="graduation-cap" size={40} className="text-white" />
                    </div>
                    <p className="font-display font-semibold">{kepalaMadrasah.name}</p>
                    <p className="text-emerald-200 text-sm mt-1">Kepala MTs Negeri 2 Kebumen</p>
                    <p className="text-emerald-300/60 text-xs mt-3">NIP. {kepalaMadrasah.nip}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="prose prose-emerald max-w-none dark:prose-invert">
                <p className="text-lg italic text-gray-600 dark:text-dark-text-muted border-l-4 border-emerald-500 pl-4 mb-8">
                  &ldquo;Assalamu&apos;alaikum Warahmatullahi Wabarakatuh&rdquo;
                </p>
                {kepalaMadrasah.sambutan.split('\n\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i} className="text-gray-600 dark:text-dark-text-muted leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
