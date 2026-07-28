'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { getGradientColor } from '@/lib/data';
import { useStoreData, getBerita } from '@/lib/adminStore';

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const beritaList = useStoreData(getBerita);
  const berita = beritaList.find((b) => b.slug === slug);

  if (!berita) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-dark-card flex items-center justify-center mx-auto mb-6">
            <Icon name="alert-circle" size={40} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Berita Tidak Ditemukan</h1>
          <p className="text-gray-500 dark:text-dark-text-muted mb-8 max-w-sm mx-auto">
            Halaman berita yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link href="/informasi/berita">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <Icon name="chevron-left" size={16} /> Kembali ke Berita
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className={`relative py-20 bg-gradient-to-br ${getGradientColor(berita.id)} overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/informasi/berita" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-6 transition-colors text-sm group">
              <Icon name="chevron-left" size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Berita
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-4 backdrop-blur-sm">
              {berita.category}
            </span>
            <h1 className="text-fluid-hero font-bold text-white mb-4 leading-tight">{berita.title}</h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
                <Icon name="calendar" size={14} /> {berita.date}
              </span>
            </div>
          </motion.div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {/* Featured image */}
            <div className={`aspect-video rounded-2xl bg-gradient-to-br ${getGradientColor(berita.id)} flex items-center justify-center mb-10 shadow-xl shadow-gray-200/50 dark:shadow-black/20`}>
              <Icon name="image" size={64} className="text-white/30" />
            </div>

            {/* Article content */}
            <article className="prose prose-emerald max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-1">
                {berita.excerpt}
              </p>
              <p className="text-gray-600 dark:text-dark-text-muted leading-relaxed mt-6">
                Ini adalah halaman detail berita. Konten lengkap dari berita &ldquo;{berita.title}&rdquo; akan ditampilkan di sini. 
                Halaman ini dapat diintegrasikan dengan CMS atau database untuk menampilkan konten dinamis.
              </p>
            </article>

            {/* Share & navigation */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-dark-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link href="/informasi/berita">
                  <Button variant="outline" className="inline-flex items-center gap-2">
                    <Icon name="chevron-left" size={16} /> Berita Lainnya
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-dark-text-muted">
                  <span>Bagikan:</span>
                  {[
                    { icon: 'message-circle', label: 'WhatsApp' },
                    { icon: 'send', label: 'Email' },
                    { icon: 'external', label: 'Salin tautan' },
                  ].map((social) => (
                    <button
                      key={social.icon}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex items-center justify-center text-gray-500 hover:text-emerald-600 transition-all"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon name={social.icon} size={14} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
