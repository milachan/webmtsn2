'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { useStoreData, getPrestasi } from '@/lib/adminStore';

const tingkatColors: Record<string, string> = {
  Kabupaten: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Provinsi: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Nasional: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Internasional: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

export default function PrestasiPage() {
  const prestasiData = useStoreData(getPrestasi);

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/akademik" className="inline-flex items-center gap-2 text-white/75 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Akademik
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Prestasi</h1>
            <p className="text-lg text-white/70">{prestasiData.length}+ prestasi diraih siswa MTsN 2 Kebumen</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prestasiData.map((item) => (
              <StaggerItem key={item.id}>
                <Card hover="lift" className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Icon name="trophy" size={18} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.tahun}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${tingkatColors[item.tingkat] || 'bg-gray-100 text-gray-700'}`}>{item.tingkat}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{item.prestasi}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">{item.bidang}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
            {prestasiData.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400 dark:text-dark-text-muted">
                <Icon name="trophy" size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Belum ada data prestasi</p>
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
