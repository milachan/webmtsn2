'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const akademikLinks = [
  { href: '/akademik/kurikulum', label: 'Kurikulum', icon: 'book-open', desc: 'Kurikulum yang diterapkan di madrasah' },
  { href: '/akademik/program-unggulan', label: 'Program Unggulan', icon: 'star', desc: 'Program-program unggulan madrasah' },
  { href: '/akademik/prestasi', label: 'Prestasi', icon: 'trophy', desc: 'Prestasi akademik dan non-akademik' },
];

export default function AkademikPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Akademik</h1>
            <p className="text-lg text-white/70">Informasi akademik MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {akademikLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={link.href} className="group block bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={link.icon} size={26} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{link.label}</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">{link.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
