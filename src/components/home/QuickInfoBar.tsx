'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';

interface InfoItem {
  category: string;
  icon: string;
  text: string;
}

const items: InfoItem[] = [
  { category: 'PMB', icon: 'calendar', text: 'PMB 2026/2027 Dibuka 1 Agustus 2026' },
  { category: 'PRESTASI', icon: 'trophy', text: 'Juara Umum Olimpiade Sains Madrasah Tingkat Kabupaten' },
  { category: 'AGENDA', icon: 'clock', text: 'Pembagian Raport: 20 Juni 2026' },
  { category: 'INFORMASI', icon: 'star', text: 'Pendaftaran Ekstrakurikuler Gelombang 2' },
  { category: 'PENGUMUMAN', icon: 'bell', text: 'Libur Akhir Tahun: 24 Juni - 14 Juli 2026' },
  { category: 'AGENDA', icon: 'calendar', text: 'MATSAMA: 15-17 Juli 2026' },
  { category: 'PRESTASI', icon: 'trophy', text: 'Tim Futsal Wakili Kabupaten ke Tingkat Provinsi' },
];

const categoryStyles: Record<string, string> = {
  PMB: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  PRESTASI: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  AGENDA: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  INFORMASI: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  PENGUMUMAN: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const doubledItems = [...items, ...items];

export default function QuickInfoBar() {
  return (
    <section className="relative bg-white dark:bg-dark-bg border-y border-gray-100 dark:border-dark-border quick-info-bar">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-transparent to-emerald-50/30 dark:from-emerald-900/5 dark:to-emerald-900/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-display">
              Info Terkini
            </span>
          </motion.div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-dark-border shrink-0" />

          {/* Auto-scroll track with CSS keyframe animation */}
          <div
            className="flex-1 overflow-hidden [&::-webkit-scrollbar]:hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
            }}
          >
            <div
              className="flex items-center gap-3 animate-scroll group/scroll"
              style={{
                width: 'fit-content',
              }}
            >
              {doubledItems.map((item, i) => (
                <div
                  key={`${item.category}-${i}`}
                  className="flex items-center gap-2.5 shrink-0 bg-gray-50 dark:bg-dark-card rounded-xl px-3 py-2 border border-gray-100 dark:border-dark-border hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all duration-200 cursor-pointer group/chip"
                >
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${categoryStyles[item.category] || categoryStyles.INFORMASI}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-dark-text-muted group-hover/chip:text-gray-900 dark:group-hover/chip:text-dark-text transition-colors whitespace-nowrap">
                    <Icon
                      name={item.icon}
                      size={12}
                      className="text-emerald-500 dark:text-emerald-400 shrink-0"
                    />
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
