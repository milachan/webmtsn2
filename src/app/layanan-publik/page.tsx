'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function LayananPublikPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Layanan Publik</h1>
            <p className="text-lg text-white/70">Layanan pengaduan dan aspirasi masyarakat</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Kotak Saran */}
            <ScrollReveal direction="left">
              <div className="bg-emerald-50 dark:bg-dark-card rounded-2xl p-6 lg:p-8 border border-emerald-100 dark:border-dark-border">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-5">
                  <Icon name="message-square" size={26} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-fluid-h3 font-bold text-gray-900 dark:text-dark-text mb-2">Kotak Saran & Pengaduan</h2>
                <p className="text-gray-500 dark:text-dark-text-muted text-sm mb-6">Sampaikan saran, kritik, atau pengaduan Anda kepada kami</p>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 bg-white dark:bg-dark-bg rounded-xl">
                    <Icon name="check" size={24} className="mx-auto text-emerald-600 dark:text-emerald-400 mb-2" />
                    <p className="font-semibold text-gray-900 dark:text-dark-text">Terima Kasih!</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-muted">Saran Anda telah kami terima.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Nama (opsional)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none" placeholder="Nama Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Kategori</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none">
                        <option>Saran</option>
                        <option>Kritik</option>
                        <option>Pengaduan</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Pesan</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none" placeholder="Tulis saran, kritik, atau pengaduan Anda..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      <Icon name="send" size={18} />
                      Kirim Saran
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* SP4N-LAPOR */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-2xl p-8 text-white h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                  <Icon name="external" size={26} className="text-white" />
                </div>
                <h2 className="text-fluid-h3 font-bold mb-3">SP4N-LAPOR!</h2>
                <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
                  Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional (SP4N) LAPOR! adalah 
                  layanan pengaduan nasional yang dikelola oleh Kementerian PAN-RB.
                </p>
                <div className="flex-1" />
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-emerald-200">
                    <Icon name="check" size={16} /> Laporan dijamin kerahasiaannya
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-200">
                    <Icon name="check" size={16} /> Ditindaklanjuti oleh pemerintah
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-200">
                    <Icon name="check" size={16} /> Monitoring status laporan
                  </div>
                </div>
                <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg">
                  <Icon name="external" size={18} />
                  Kunjungi SP4N-LAPOR!
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
