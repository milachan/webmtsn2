'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, navItems, pathname }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark-card z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
              <h2 className="font-display font-bold text-gray-900 dark:text-dark-text">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                aria-label="Tutup menu"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.children ? (
                    <div className="mb-1">
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          pathname.startsWith(item.href)
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                            : 'text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg'
                        }`}
                      >
                        <span>{item.label}</span>
                        <motion.span
                          animate={{ rotate: expandedItems.includes(item.label) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon name="chevron-down" size={16} className="opacity-50" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.label) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-3 border-l-2 border-emerald-200 dark:border-emerald-800 mt-1 mb-2 space-y-1">
                              <Link
                                href={item.href}
                                className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text transition-all"
                                onClick={onClose}
                              >
                                Semua {item.label}
                              </Link>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                                    pathname === child.href
                                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-medium'
                                      : 'text-gray-600 dark:text-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-dark-text'
                                  }`}
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                        pathname === item.href
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg'
                      }`}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* PMB Button in mobile */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
                <Link
                  href="/pmb"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all duration-300"
                  onClick={onClose}
                >
                  <Icon name="bookmark" size={20} />
                  <span>PMB — Daftar Sekarang</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
