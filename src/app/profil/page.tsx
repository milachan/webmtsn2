'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const profilLinks = [
  { href: '/profil/sambutan', label: 'Sambutan Kepala Madrasah', icon: 'graduation-cap', desc: 'Sambutan dari kepala MTs Negeri 2 Kebumen' },
  { href: '/profil/sejarah', label: 'Sejarah', icon: 'book-open', desc: 'Perjalanan panjang MTs Negeri 2 Kebumen' },
  { href: '/profil/visi-misi', label: 'Visi & Misi', icon: 'eye', desc: 'Visi, misi, dan tujuan madrasah' },
  { href: '/profil/struktur-organisasi', label: 'Struktur Organisasi', icon: 'users', desc: 'Struktur kepengurusan madrasah' },
  { href: '/profil/guru-tendik', label: 'Guru & Tendik', icon: 'star', desc: 'Data guru dan tenaga kependidikan' },
];

export default function ProfilPage() {
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Profil Madrasah</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">Mengenal lebih dekat MTs Negeri 2 Kebumen</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profilLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={link.href} className="group block bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name={link.icon} size={26} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{link.label}</h3>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">{link.desc}</p>
                    </div>
                    <Icon name="chevron-right" size={18} className="text-gray-300 dark:text-dark-text-muted shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
