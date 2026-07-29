'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { getSocialLinks } from '@/lib/adminStore';
import type { SocialLink } from '@/lib/adminStore';

// ─── Platform styling ─────────────────────────────────────────────
const platformStyles: Record<string, { bg: string; hoverBg: string; shadow: string }> = {
  whatsapp:  { bg: 'bg-green-500',       hoverBg: 'hover:bg-green-600',       shadow: 'shadow-green-500/30' },
  youtube:   { bg: 'bg-red-600',         hoverBg: 'hover:bg-red-700',         shadow: 'shadow-red-600/30' },
  instagram: { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', hoverBg: '', shadow: 'shadow-purple-500/30' },
  tiktok:    { bg: 'bg-gray-900',        hoverBg: 'hover:bg-gray-950',        shadow: 'shadow-gray-900/30' },
  facebook:  { bg: 'bg-blue-600',        hoverBg: 'hover:bg-blue-700',        shadow: 'shadow-blue-600/30' },
  telepon:   { bg: 'bg-emerald-500',     hoverBg: 'hover:bg-emerald-600',     shadow: 'shadow-emerald-500/30' },
};

// ─── Stagger variants ─────────────────────────────────────────────
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  }),
  exit: { opacity: 0, y: 12, scale: 0.9, transition: { duration: 0.15 } },
};

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState<SocialLink[]>([]);

  // Load social links from store once on mount, then refresh on open
  useEffect(() => {
    setLinks(getSocialLinks().filter((l) => l.active && l.url.trim() !== ''));
  }, []);

  // Refresh links whenever the FAB opens (so admin edits take effect immediately)
  useEffect(() => {
    if (isOpen) {
      setLinks(getSocialLinks().filter((l) => l.active && l.url.trim() !== ''));
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // ─── Render ─────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:right-[max(1.5rem,env(safe-area-inset-right))] z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        {isOpen && (            <motion.div
            key="fab-items"
            className="relative z-50 flex flex-col items-end gap-3 mb-4 max-h-[70vh] overflow-y-auto overscroll-contain"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {links.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-dark-card shadow-lg shadow-black/10 border border-gray-100 dark:border-dark-border">
                <span className="text-xs text-gray-400 dark:text-dark-text-muted whitespace-nowrap">
                  Belum ada kontak tersedia
                </span>
              </div>
            ) : (
              links.map((link, i) => {
                const style = platformStyles[link.platform] || platformStyles.whatsapp;
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target={link.platform === 'telepon' ? undefined : '_blank'}
                    rel={link.platform === 'telepon' ? undefined : 'noopener noreferrer'}
                    custom={links.length - 1 - i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-2xl bg-white dark:bg-dark-card shadow-lg shadow-black/10 border border-gray-100 dark:border-dark-border hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    aria-label={link.label}
                  >
                    {/* Icon circle */}
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0 ${
                        style.bg
                      } ${style.hoverBg} shadow-sm ${style.shadow}`}
                    >
                      <Icon name={link.icon} size={16} />
                    </span>
                    {/* Label */}
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-text whitespace-nowrap">
                      {link.label}
                    </span>
                  </motion.a>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main FAB Button ──────────────────────────────────────── */}
      <motion.button
        key="fab-main"
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 ${
          isOpen
            ? 'bg-gray-700 dark:bg-gray-600 shadow-gray-700/30 rotate-90'
            : 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
        }`}
        aria-label={isOpen ? 'Tutup menu kontak' : 'Hubungi kami'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="x" size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* WhatsApp SVG — tetap pakai SVG agar terlihat autentik */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
