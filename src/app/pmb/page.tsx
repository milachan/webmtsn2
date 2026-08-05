'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useStoreData, getPmbSettings } from '@/lib/adminStore';

export default function PMBPage() {
  const pmb = useStoreData(getPmbSettings);

  // Redirect mode — arahkan ke URL eksternal
  useEffect(() => {
    if (pmb.mode === 'redirect' && pmb.redirectUrl) {
      window.location.href = pmb.redirectUrl;
    }
  }, [pmb.mode, pmb.redirectUrl]);

  // Saat loading atau redirect, tampilkan halaman kosong / loading
  if (pmb.mode === 'redirect') {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-emerald-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted">Mengarahkan ke halaman PMB...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {pmb.badgeText && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {pmb.badgeText}
              </span>
            )}
            <h1 className="text-fluid-hero font-bold text-white mb-4">
              {pmb.title}
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              {pmb.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pmb.infoCards.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-emerald-50 dark:bg-dark-card rounded-2xl p-6 text-center border border-emerald-100 dark:border-dark-border"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                  <Icon name={item.icon} size={22} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold text-gray-900 dark:text-dark-text">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-emerald-50/50 dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text">Alur Pendaftaran</h2>
            <p className="text-gray-500 dark:text-dark-text-muted mt-2">Ikuti langkah-langkah berikut untuk mendaftar</p>
          </ScrollReveal>
          <div className="space-y-6">
            {pmb.steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex items-start gap-4 bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-dark-border">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">{step.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Contact */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <h2 className="text-fluid-h3 font-bold text-gray-900 dark:text-dark-text mb-6">Persyaratan Pendaftaran</h2>
              <ul className="space-y-3">
                {pmb.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="check" size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-dark-text-muted">{req}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-2xl p-8 text-white">
                <h3 className="font-display font-semibold text-xl mb-3">{pmb.contactTitle}</h3>
                <p className="text-emerald-100/80 text-sm mb-6">{pmb.contactDescription}</p>
                <div className="space-y-3">
                  {pmb.contacts.map((contact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon name={contact.icon} size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-200">{contact.label}</p>
                        <p className="text-sm font-medium">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-50/50 dark:bg-dark-bg text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text mb-4">Siap Mendaftar?</h2>
            <p className="text-gray-500 dark:text-dark-text-muted mb-8">Jangan lewatkan kesempatan menjadi bagian dari generasi unggul MTsN 2 Kebumen</p>
            <Button size="lg" magnetic className="shadow-xl">
              <Icon name="bookmark" size={20} />
              {pmb.ctaText}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
