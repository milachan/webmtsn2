'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { useStoreData, getSchoolData, getSocialLinks } from '@/lib/adminStore';

const quickLinks = [
  { label: 'Profil Madrasah', href: '/profil' },
  { label: 'Visi & Misi', href: '/profil/visi-misi' },
  { label: 'Guru & Tendik', href: '/profil/guru-tendik' },
  { label: 'Sarana Prasarana', href: '/sarana-prasarana' },
  { label: 'PMB', href: '/pmb' },
];

const programLinks = [
  { label: 'Kurikulum', href: '/akademik/kurikulum' },
  { label: 'Program Unggulan', href: '/akademik/program-unggulan' },
  { label: 'Prestasi', href: '/akademik/prestasi' },
  { label: 'Ekstrakurikuler', href: '/kesiswaan/ekstrakurikuler' },
  { label: 'Tata Tertib', href: '/kesiswaan/tata-tertib' },
];

const infoLinks = [
  { label: 'Berita', href: '/informasi/berita' },
  { label: 'Pengumuman', href: '/informasi/pengumuman' },
  { label: 'Agenda', href: '/informasi/agenda' },
  { label: 'Galeri', href: '/informasi/galeri' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const schoolData = useStoreData(getSchoolData);
  const socialLinks = useStoreData(getSocialLinks);

  return (
    <footer className="relative bg-gray-900 dark:bg-[#0a120c] text-gray-300 overflow-hidden">
      {/* Islamic Ornament Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-50" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />

      <div className="relative z-10 max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        {/* Top section with newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {schoolData.logo ? (
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={schoolData.logo}
                    alt={schoolData.shortName}
                    className="h-12 w-auto"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                  M
                </div>
              )}
              <div>
                <h3 className="font-display font-bold text-white text-lg">{schoolData.shortName}</h3>
                <p className="text-emerald-400 text-sm">{schoolData.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              {schoolData.description}
            </p>
          </div>
          <div className="lg:text-right lg:self-center">
            <p className="text-sm text-gray-400 mb-3">Ikuti perkembangan terbaru dari kami</p>
            <div className="flex gap-3 lg:justify-end">
              {socialLinks
                .filter((s) => s.active && ['whatsapp', 'youtube', 'instagram', 'tiktok', 'facebook'].includes(s.platform))
                .map((social) => (
                  <div key={social.id} className="relative group">
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-gray-900 dark:bg-gray-800 text-white text-[10px] font-medium whitespace-nowrap shadow-lg border border-gray-700/50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                      Kunjungi {social.label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-800 border-l border-t border-gray-700/50" />
                    </div>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <Icon name={social.icon} size={18} />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Tentang
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Program
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Informasi
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`https://maps.google.com/?q=${schoolData.coordinates.lat},${schoolData.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Icon name="map-pin" size={16} className="shrink-0 mt-0.5 text-emerald-500" />                   <span>{schoolData.address}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${schoolData.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Icon name="phone" size={16} className="text-emerald-500" />                   <span>{schoolData.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${schoolData.email}`}
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Icon name="mail" size={16} className="text-emerald-500" />                   <span>{schoolData.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">             &copy; {currentYear} {schoolData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
