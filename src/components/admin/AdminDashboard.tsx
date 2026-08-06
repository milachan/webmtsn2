'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import {
  useStoreData,
  getPengumuman, getAgenda, getFasilitas,
  getGuru, getEkstrakurikuler, getGaleri, getTestimoni,
  getSejarah, getProgramUnggulan, getNilaiUnggulan, getPrestasi, resetAllData,
} from '@/lib/adminStore';
import Link from 'next/link';

interface StatCard {
  label: string;
  count: number;
  icon: string;
  color: string;
  section: string;
}

function useStats(): StatCard[] {
  // useStoreData ensures stats recalculate whenever any store data changes
  // Catatan: Berita tidak lagi dikelola di panel ini — dikelola di portal web berita.
  return useStoreData(() => [
    { label: 'Pengumuman', count: getPengumuman().length, icon: 'bell', color: 'amber', section: 'pengumuman' },
    { label: 'Agenda', count: getAgenda().length, icon: 'calendar', color: 'blue', section: 'agenda' },
    { label: 'Fasilitas', count: getFasilitas().length, icon: 'building-2', color: 'teal', section: 'fasilitas' },
    { label: 'Guru & Tendik', count: getGuru().length, icon: 'graduation-cap', color: 'indigo', section: 'guru' },
    { label: 'Ekstrakurikuler', count: getEkstrakurikuler().length, icon: 'compass', color: 'purple', section: 'ekstrakurikuler' },
    { label: 'Galeri', count: getGaleri().length, icon: 'image', color: 'rose', section: 'galeri' },
    { label: 'Testimoni', count: getTestimoni().length, icon: 'message-square', color: 'cyan', section: 'testimoni' },
    { label: 'Sejarah', count: getSejarah().length, icon: 'clock', color: 'orange', section: 'sejarah' },
    { label: 'Program Unggulan', count: getProgramUnggulan().length, icon: 'star', color: 'yellow', section: 'program' },
    { label: 'Prestasi', count: getPrestasi().length, icon: 'trophy', color: 'pink', section: 'prestasi' },
    { label: 'Nilai Unggulan', count: getNilaiUnggulan().length, icon: 'star', color: 'lime', section: 'nilainunggulan' },
  ]);
}

export default function AdminDashboard() {
  const stats = useStats();
  const [showReset, setShowReset] = useState(false);

  const handleReset = () => {
    if (confirm('YAKIN reset semua data? Data yang sudah dimodifikasi akan hilang dan kembali ke data awal!')) {
      resetAllData();
      window.location.reload();
    }
  };

  const colorMap: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/20', darkText: 'dark:text-emerald-300' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/20', darkText: 'dark:text-amber-300' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/20', darkText: 'dark:text-blue-300' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-700', darkBg: 'dark:bg-teal-900/20', darkText: 'dark:text-teal-300' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900/20', darkText: 'dark:text-indigo-300' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/20', darkText: 'dark:text-purple-300' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-700', darkBg: 'dark:bg-rose-900/20', darkText: 'dark:text-rose-300' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', darkBg: 'dark:bg-cyan-900/20', darkText: 'dark:text-cyan-300' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/20', darkText: 'dark:text-orange-300' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', darkBg: 'dark:bg-yellow-900/20', darkText: 'dark:text-yellow-300' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-700', darkBg: 'dark:bg-pink-900/20', darkText: 'dark:text-pink-300' },
    lime: { bg: 'bg-lime-50', text: 'text-lime-700', darkBg: 'dark:bg-lime-900/20', darkText: 'dark:text-lime-300' },
  };

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-dark-text">
          Selamat Datang di Panel Admin
        </h2>
        <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">
          Kelola seluruh konten website MTs Negeri 2 Kebumen dari satu tempat.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {stats.map((stat) => {
          const c = colorMap[stat.color] || colorMap.emerald;
          return (
            <Link
              key={stat.section}
              href={`/admin?section=${stat.section}`}
              className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.darkBg} flex items-center justify-center ${c.text} ${c.darkText} mb-3`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stat.count}</p>
              <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Icon name="info" size={16} />
            </div>
            <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text">Informasi Penyimpanan</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted leading-relaxed">
            Semua data tersimpan di <strong className="text-gray-700 dark:text-dark-text">database server</strong> melalui API. 
            Perubahan data langsung tersimpan dan otomatis tersinkronisasi ke halaman utama website. 
            Untuk mengembalikan data ke awal (default), gunakan tombol reset di bawah.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Icon name="bookmark" size={16} />
            </div>
            <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text">Akses Cepat</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-xs font-medium text-gray-600 dark:text-dark-text-muted hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <Icon name="eye" size={12} />
              Lihat Website
            </Link>
            {stats.slice(0, 5).map((s) => (
              <Link
                key={s.section}
                href={`/admin?section=${s.section}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-xs font-medium text-gray-600 dark:text-dark-text-muted hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Icon name={s.icon} size={12} />
                Kelola {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="border-t border-gray-100 dark:border-dark-border pt-6">
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-xs text-gray-400 dark:text-dark-text-muted hover:text-red-500 dark:hover:text-red-400 transition-colors underline"
        >
          {showReset ? 'Sembunyikan' : 'Pengaturan lanjutan'}
        </button>
        {showReset && (
          <div className="mt-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800/30"
            >
              Reset Semua Data ke Default
            </button>
            <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-2">
              Tindakan ini akan menghapus semua data yang sudah dimodifikasi dan mengembalikannya seperti semula.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
