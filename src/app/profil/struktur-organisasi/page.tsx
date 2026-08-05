'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import { useStoreData, getStrukturOrganisasi } from '@/lib/adminStore';
import Link from 'next/link';

export default function StrukturOrganisasiPage() {
  const data = useStoreData(getStrukturOrganisasi);

  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/profil" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors text-sm">
              <Icon name="chevron-left" size={16} /> Kembali ke Profil
            </Link>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Struktur Organisasi</h1>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center">
            {/* Kepala Madrasah */}
            {data.positions.filter(p => p.type === 'kepala').map((kepala) => (
              <ScrollReveal key={kepala.id}>
                <div className={`bg-gradient-to-br ${kepala.color} rounded-2xl p-6 text-center text-white shadow-xl w-72`}>
                  {/* Photo or icon */}
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-white/30 bg-white/20 flex items-center justify-center">
                    {kepala.image ? (
                      <img
                        src={kepala.image}
                        alt={kepala.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <Icon name={kepala.icon} size={28} className="text-white" />
                    )}
                  </div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">{kepala.level}</p>
                  <p className="font-semibold mt-1">{kepala.name}</p>
                </div>
              </ScrollReveal>
            ))}

            {/* Connector line */}
            {data.positions.filter(p => p.type === 'waka').length > 0 && (
              <div className="w-0.5 h-8 bg-emerald-300 dark:bg-emerald-700" />
            )}

            {/* Waka */}
            {data.positions.filter(p => p.type === 'waka').length > 0 && (
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {data.positions.filter(p => p.type === 'waka').map((item) => (
                    <div key={item.id} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-center text-white shadow-lg`}>
                      {/* Photo or icon */}
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden ring-2 ring-white/30 bg-white/20 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <Icon name={item.icon} size={16} className="text-white" />
                        )}
                      </div>
                      <p className="text-[10px] text-white/70 uppercase tracking-wider">{item.level}</p>
                      <p className="text-sm font-medium mt-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Connector */}
            {data.guruList.length > 0 && (
              <>
                <div className="w-full max-w-2xl h-0.5 bg-emerald-200 dark:bg-emerald-800 my-4" />
                {/* Guru */}
                <ScrollReveal delay={0.2}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl">
                    {data.guruList.map((item) => (
                      <div key={item.id} className="bg-emerald-50 dark:bg-dark-card rounded-xl p-4 text-center border border-emerald-100 dark:border-dark-border">
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted">{item.bidang}</p>
                        <p className="font-semibold text-gray-900 dark:text-dark-text mt-1">{item.count}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
