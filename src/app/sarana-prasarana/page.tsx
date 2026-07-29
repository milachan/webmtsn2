'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import { useStoreData, getFasilitas } from '@/lib/adminStore';

export default function SaranaPrasaranaPage() {
  const fasilitas = useStoreData(getFasilitas);
  return (
    <main className="pt-24">
      <section className="relative py-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cpath d=\'M30 2L58 30L30 58L2 30Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-fluid-hero font-bold text-white mb-3">Sarana Prasarana</h1>
            <p className="text-lg text-white/70">Fasilitas lengkap untuk mendukung pembelajaran</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fasilitas.map((item) => (
              <StaggerItem key={item.id}>
                <Card hover="lift" className="group h-full overflow-hidden">
                  {/* Image section */}
                  <div className="h-44 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-border relative flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Icon name={item.icon} size={26} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                    )}
                  </div>
                  {/* Content section */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0">
                        <Icon name={item.icon} size={18} className="text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text">{item.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
