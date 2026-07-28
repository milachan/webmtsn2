'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-cta" />

      {/* Animated mesh particles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-300/5 blur-3xl"
        />
      </div>

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.02]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Segera Daftarkan Putra-Putri Anda
          </div>

          <h2 className="text-fluid-h2 font-bold text-white leading-tight">
            Siap Bergabung dengan{' '}
            <span className="text-emerald-300">MTsN 2 Kebumen</span>?
          </h2>

          <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Daftarkan putra-putri Anda sekarang juga. Kuota terbatas! 
            Jadilah bagian dari generasi unggul, berkarakter Islami, dan berprestasi.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/pmb">
              <Button
                size="lg"
                magnetic
                className="bg-white text-emerald-900 hover:bg-white/90 shadow-xl shadow-black/20"
              >
                <Icon name="bookmark" size={20} />
                Daftar PMB Sekarang
              </Button>
            </Link>
            <Link href="/kontak">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Icon name="phone" size={18} />
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
