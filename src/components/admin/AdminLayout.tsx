'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useStoreLoading } from '@/lib/adminStore';
import { useRouter } from 'next/navigation';

// ─── Sidebar structure with groups — matching public navbar ─────
interface SidebarItem {
  type: 'link' | 'group';
  id?: string;
  label?: string;
  icon?: string;
  items?: SidebarItem[];
}

const sidebarGroups: SidebarItem[] = [
  { type: 'link', id: 'dashboard', label: 'Dashboard', icon: 'monitor' },
  { type: 'group', label: 'Profil', items: [
    { type: 'link', id: 'sejarah', label: 'Sejarah', icon: 'clock' },
    { type: 'link', id: 'visimisi', label: 'Visi & Misi', icon: 'book-open' },
    { type: 'link', id: 'strukturorganisasi', label: 'Struktur Organisasi', icon: 'users' },
    { type: 'link', id: 'guru', label: 'Guru & Tendik', icon: 'graduation-cap' },
  ]},
  { type: 'group', label: 'Sarana & Akademik', items: [
    { type: 'link', id: 'fasilitas', label: 'Fasilitas', icon: 'building-2' },
    { type: 'link', id: 'kurikulum', label: 'Kurikulum', icon: 'book-open' },
    { type: 'link', id: 'program', label: 'Program Unggulan', icon: 'star' },
    { type: 'link', id: 'prestasi', label: 'Prestasi', icon: 'trophy' },
  ]},
  { type: 'group', label: 'Kesiswaan', items: [
    { type: 'link', id: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: 'compass' },
    { type: 'link', id: 'pembiasaan', label: 'Pembiasaan', icon: 'sun' },
    { type: 'link', id: 'tatatertib', label: 'Tata Tertib', icon: 'file-text' },
  ]},
  { type: 'group', label: 'Informasi & Kontak', items: [
    { type: 'link', id: 'pengumuman', label: 'Pengumuman', icon: 'bell' },
    { type: 'link', id: 'berita', label: 'Berita', icon: 'book-open' },
    { type: 'link', id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { type: 'link', id: 'galeri', label: 'Galeri', icon: 'image' },
    { type: 'link', id: 'pesanmasuk', label: 'Pesan Masuk', icon: 'inbox' },
  ]},
  { type: 'group', label: 'Halaman Depan', items: [
    { type: 'link', id: 'hero', label: 'Hero Slides', icon: 'image' },
    { type: 'link', id: 'nilainunggulan', label: 'Nilai Unggulan', icon: 'leaf' },
    { type: 'link', id: 'testimoni', label: 'Testimoni', icon: 'message-square' },
    { type: 'link', id: 'pmb', label: 'PMB', icon: 'bookmark' },
    { type: 'link', id: 'lokasi', label: 'Lokasi', icon: 'map-pin' },
  ]},
  { type: 'link', id: 'settings', label: 'Pengaturan', icon: 'settings' },
];

const allLinks = sidebarGroups.flatMap((g) =>
  g.type === 'link' ? [g] : (g.items || [])
) as SidebarItem[];

export default function AdminLayout({ children, activeSection }: { children: React.ReactNode; activeSection: string }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Auth guard: check session, redirect to login ──────────────
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) setAuthState('authenticated');
        else {
          setAuthState('unauthenticated');
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        setAuthState('unauthenticated');
        router.replace('/admin/login');
      });
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { /* ignore */ }
    router.replace('/admin/login');
  };

  const isLoading = useStoreLoading();
  const showLoading = isLoading || authState === 'loading';

  if (authState === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 animate-pulse mx-auto mb-4" />
        </div>
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 animate-pulse mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/40 animate-pulse" />
          </div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-dark-border rounded-lg animate-pulse mx-auto mb-2" />
          <div className="h-3 w-32 bg-gray-100 dark:bg-dark-border/50 rounded-lg animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-dark-border transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
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

        <nav className="p-3 overflow-y-auto flex-1">
          {sidebarGroups.map((group) => {
            if (group.type === 'link') {
              const isActive = activeSection === group.id;
              return (
                <Link key={group.id} href={`/admin?section=${group.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text'
                  }`}
                >
                  <span className="w-6 flex items-center justify-center shrink-0">
                    <Icon name={group.icon!} size={18} className={isActive ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                  </span>
                  <span className="truncate">{group.label}</span>
                </Link>
              );
            }
            return (
              <div key={group.label} className="mb-0.5">
                <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-dark-text-muted">
                  {group.label}
                </p>
                {(group.items || []).map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <Link key={section.id} href={`/admin?section=${section.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm'
                          : 'text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text'
                      }`}
                    >
                      <span className="w-6 flex items-center justify-center shrink-0">
                        <Icon name={section.icon!} size={16} className={isActive ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                      </span>
                      <span className="truncate">{section.label}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}

          {/* Logout + Separator */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-dark-border space-y-1">
            <Link href="/" onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-700 dark:hover:text-dark-text transition-all duration-200"
            >
              <span className="w-6 flex items-center justify-center shrink-0">
                <Icon name="arrow-left" size={18} />
              </span>
              <span className="truncate">Kembali ke Website</span>
            </Link>
            <button onClick={handleLogout} disabled={loggingOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
            >
              <span className="w-6 flex items-center justify-center shrink-0">
                <Icon name="log-in" size={18} className="rotate-180" />
              </span>
              <span className="truncate">{loggingOut ? 'Keluar...' : 'Keluar'}</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className="lg:ml-64">
        <div className="lg:hidden flex items-center justify-between px-4 h-12 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
            >
              <Icon name="menu" size={18} />
            </button>
            <h1 className="font-display font-semibold text-sm text-gray-900 dark:text-dark-text capitalize">
              {allLinks.find((s) => s.id === activeSection)?.label || 'Dashboard'}
            </h1>
          </div>
          {mounted && (
            <span className="text-[10px] text-gray-400 dark:text-dark-text-muted">Data lokal</span>
          )}
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="hidden lg:flex items-center justify-between pt-4 sm:pt-6 mb-4">
            <div className="flex items-center gap-3">
              <h1 className="font-display font-semibold text-lg text-gray-900 dark:text-dark-text capitalize">
                {allLinks.find((s) => s.id === activeSection)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {mounted && (
                <span className="text-xs text-gray-400 dark:text-dark-text-muted">Data tersimpan di browser</span>
              )}
              <button onClick={handleLogout} disabled={loggingOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
              >
                <Icon name="log-in" size={14} className="rotate-180" />
                {loggingOut ? 'Keluar...' : 'Keluar'}
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
