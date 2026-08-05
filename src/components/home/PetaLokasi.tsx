'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';
import { useStoreData, getSchoolData } from '@/lib/adminStore';

export default function PetaLokasi() {
  const schoolData = useStoreData(getSchoolData);
  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Lokasi Madrasah"
          subtitle="Temukan Kami"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Map */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] lg:h-[450px] bg-gray-200 dark:bg-dark-card border border-gray-100 dark:border-dark-border">
              <iframe
                src={`https://maps.google.com/maps?q=${schoolData.coordinates.lat},${schoolData.coordinates.lng}&z=17&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi MTs Negeri 2 Kebumen"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </ScrollReveal>

          {/* Info Panel */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-emerald-50 dark:bg-dark-card rounded-2xl p-6 lg:p-8 border border-emerald-100 dark:border-dark-border h-full">
              <h3 className="font-display font-semibold text-gray-900 dark:text-dark-text text-lg mb-6">
                Informasi Lokasi
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Icon name="map-pin" size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wider">Alamat</p>
                    <p className="text-sm text-gray-900 dark:text-dark-text mt-0.5">{schoolData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Icon name="phone" size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wider">Telepon</p>
                    <p className="text-sm text-gray-900 dark:text-dark-text mt-0.5">{schoolData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Icon name="mail" size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wider">Email</p>
                    <p className="text-sm text-gray-900 dark:text-dark-text mt-0.5">{schoolData.email}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald-200 dark:border-dark-border">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${schoolData.coordinates.lat},${schoolData.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:gap-3 transition-all duration-300"
                  >
                    <Icon name="external" size={16} />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
