'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';
import { useStoreData, getSchoolData } from '@/lib/adminStore';

const navItems = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Profil',
    href: '/profil',
    children: [
      { label: 'Sambutan Kepala Madrasah', href: '/profil/sambutan' },
      { label: 'Sejarah', href: '/profil/sejarah' },
      { label: 'Visi & Misi', href: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
      { label: 'Guru & Tendik', href: '/profil/guru-tendik' },
    ],
  },
  { label: 'Sarana Prasarana', href: '/sarana-prasarana' },
  {
    label: 'Akademik',
    href: '/akademik',
    children: [
      { label: 'Kurikulum', href: '/akademik/kurikulum' },
      { label: 'Program Unggulan', href: '/akademik/program-unggulan' },
      { label: 'Prestasi', href: '/akademik/prestasi' },
    ],
  },
  {
    label: 'Kesiswaan',
    href: '/kesiswaan',
    children: [
      { label: 'Ekstrakurikuler', href: '/kesiswaan/ekstrakurikuler' },
      { label: 'Pembiasaan', href: '/kesiswaan/pembiasaan' },
      { label: 'Tata Tertib', href: '/kesiswaan/tata-tertib' },
    ],
  },
  {
    label: 'Informasi',
    href: '/informasi',
    children: [
      { label: 'Pengumuman', href: '/informasi/pengumuman' },
      { label: 'Berita', href: '/informasi/berita' },
      { label: 'Agenda', href: '/informasi/agenda' },
      { label: 'Galeri', href: '/informasi/galeri' },
      { label: 'Download', href: '/informasi/download' },
    ],
  },
  { label: 'Kontak', href: '/kontak' },
  { label: 'Layanan Publik', href: '/layanan-publik' },
];

export default function Header() {
  const schoolData = useStoreData(getSchoolData);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath d=\'M20 2L38 20L20 38L2 20Z\' fill=\'none\' stroke=\'%2310b981\' stroke-width=\'0.3\' opacity=\'0.08\'/%3E%3C/svg%3E")',
          backgroundSize: '40px 40px',
        } : {}}
      >
        <div className="max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {schoolData.logo ? (
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={schoolData.logo}
                    alt={schoolData.shortName}
                    className="h-10 w-auto transition-all duration-300 group-hover:opacity-90"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-900/30 transition-all duration-300">
                  M
                </div>
              )}
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-sm md:text-base text-gray-900 dark:text-dark-text leading-tight">
                  {schoolData.shortName}
                </h1>
                <p className="text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-medium -mt-0.5">
                  {schoolData.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                      isActive(item.href)
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'text-gray-600 dark:text-dark-text-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <Icon name="chevron-down" size={14} className="opacity-50" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-card rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-gray-100 dark:border-dark-border overflow-hidden"
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                pathname === child.href
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                  : 'text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg text-gray-500 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-card hover:text-gray-700 dark:hover:text-dark-text transition-all duration-200"
                aria-label="Cari"
              >
                <Icon name="search" size={18} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-lg text-gray-500 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200"
                aria-label={isDark ? 'Mode Terang' : 'Mode Gelap'}
              >
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name={isDark ? 'moon' : 'sun'} size={18} />
                </motion.div>
              </button>

              {/* PMB CTA */}
              <Link
                href="/pmb"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-primary text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon name="bookmark" size={16} />
                <span className="hidden md:inline">PMB</span>
                <span className="md:hidden">Daftar</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-lg text-gray-500 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200"
                aria-label="Menu"
              >
                <Icon name="menu" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Islamic ornament border */}
        <div className={`h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  );
}
