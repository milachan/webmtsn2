'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const adminSections = [
  { id: 'dashboard', label: 'Dashboard', icon: 'monitor' },
  { id: 'berita', label: 'Berita', icon: 'book-open' },
  { id: 'pengumuman', label: 'Pengumuman', icon: 'bell' },
  { id: 'agenda', label: 'Agenda', icon: 'calendar' },
  { id: 'fasilitas', label: 'Fasilitas', icon: 'building-2' },
  { id: 'guru', label: 'Guru & Tendik', icon: 'graduation-cap' },
  { id: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: 'compass' },
  { id: 'galeri', label: 'Galeri', icon: 'image' },
  { id: 'testimoni', label: 'Testimoni', icon: 'message-square' },
  { id: 'nilainunggulan', label: 'Nilai Unggulan', icon: 'leaf' },
  { id: 'settings', label: 'Pengaturan', icon: 'settings' },
  { id: 'sejarah', label: 'Sejarah', icon: 'clock' },
  { id: 'program', label: 'Program Unggulan', icon: 'star' },
];

export default function AdminLayout({ children, activeSection }: { children: React.ReactNode; activeSection: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on all screen sizes */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-dark-border transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div>
              <h2 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text">Admin Panel</h2>
              <p className="text-[10px] text-gray-400 dark:text-dark-text-muted">MTsN 2 Kebumen</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {adminSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <Link
                key={section.id}
                href={`/admin?section=${section.id}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text'
                }`}
              >
                <span className="w-6 flex items-center justify-center shrink-0">
                  <Icon name={section.icon} size={18} className={isActive ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                </span>
                <span className="truncate">{section.label}</span>
              </Link>
            );
          })}

          {/* Separator */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-dark-border shrink-0">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-700 dark:hover:text-dark-text transition-all duration-200"
            >
              <span className="w-6 flex items-center justify-center shrink-0">
                <Icon name="arrow-left" size={18} />
              </span>
              <span className="truncate">Kembali ke Website</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content — starts at same vertical position as sidebar nav items */}
      <div className="lg:ml-64">
        {/* Mobile header (only visible on mobile) */}
        <div className="lg:hidden flex items-center justify-between px-4 h-12 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
            >
              <Icon name="menu" size={18} />
            </button>
            <h1 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text capitalize">
              {adminSections.find((s) => s.id === activeSection)?.label || 'Dashboard'}
            </h1>
          </div>
          {mounted && (
            <span className="text-[10px] text-gray-400 dark:text-dark-text-muted">
              Data lokal
            </span>
          )}
        </div>

        {/* Page Content */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Section header for desktop */}
          <div className="hidden lg:flex items-center justify-between pt-4 sm:pt-6 mb-4">
            <div className="flex items-center gap-3">
              <h1 className="font-display font-semibold text-lg text-gray-900 dark:text-dark-text capitalize">
                {adminSections.find((s) => s.id === activeSection)?.label || 'Dashboard'}
              </h1>
            </div>
            {mounted && (
              <span className="text-xs text-gray-400 dark:text-dark-text-muted">
                Data tersimpan di browser
              </span>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
