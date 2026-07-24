'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { schoolData } from '@/lib/data';

export default function KontakPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
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
            <h1 className="text-fluid-hero font-bold text-white mb-3">Kontak</h1>
            <p className="text-lg text-white/70">Hubungi MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                {[
                  { icon: 'map-pin', label: 'Alamat', value: schoolData.address },
                  { icon: 'phone', label: 'Telepon', value: schoolData.phone },
                  { icon: 'mail', label: 'Email', value: schoolData.email },
                  { icon: 'clock', label: 'Jam Kerja', value: 'Senin - Kamis: 07.00 - 15.00\nJumat: 07.00 - 11.00' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wider">{item.label}</p>
                      <p className="text-gray-900 dark:text-dark-text mt-0.5 whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border">
                <p className="text-sm font-medium text-gray-500 dark:text-dark-text-muted mb-3">Ikuti Kami</p>
                <div className="flex gap-3">
                  {['message-circle', 'facebook', 'instagram', 'youtube'].map((s) => (
                    <a key={s} href="#" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-card hover:bg-emerald-600 dark:hover:bg-emerald-600 flex items-center justify-center text-gray-500 dark:text-dark-text-muted hover:text-white transition-all duration-300 hover:-translate-y-1">
                      <Icon name={s} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-emerald-50 dark:bg-dark-card rounded-2xl p-6 lg:p-8 border border-emerald-100 dark:border-dark-border">
                <h2 className="text-fluid-h3 font-bold text-gray-900 dark:text-dark-text mb-6">Kirim Pesan</h2>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                      <Icon name="check" size={28} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">Pesan Terkirim!</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">Kami akan menghubungi Anda segera.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Nama Lengkap</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        placeholder="Masukkan nama Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        placeholder="Masukkan email Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Subjek</label>
                      <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                        placeholder="Subjek pesan" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">Pesan</label>
                      <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none"
                        placeholder="Tulis pesan Anda..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      <Icon name="send" size={18} />
                      Kirim Pesan
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
