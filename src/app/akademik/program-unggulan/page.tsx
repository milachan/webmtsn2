'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { useStoreData, getProgramUnggulan } from '@/lib/adminStore';
import Link from 'next/link';

export default function ProgramUnggulanPage() {
  const programUnggulan = useStoreData(getProgramUnggulan);
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Akademik
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Program Unggulan</h1>
            <p className="text-lg text-white/70">Program khusus untuk mengembangkan potensi siswa</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programUnggulan.map((program, i) => (
              <ScrollReveal key={program.title} delay={i * 0.1}>
                <Card hover="lift" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0">
                      <Icon name={program.icon} size={26} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text mb-2">{program.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">{program.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
