'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getBerita, getPengumuman, getAgenda } from '@/lib/adminStore';
import { beritaLink } from '@/lib/berita';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const search = useCallback((q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const allResults: SearchResult[] = [];

    getBerita().forEach((berita) => {
      if (berita.title.toLowerCase().includes(lower) || berita.excerpt.toLowerCase().includes(lower)) {
        allResults.push({ title: berita.title, description: berita.excerpt, href: beritaLink(berita.slug), category: 'Berita' });
      }
    });

    getPengumuman().forEach((p) => {
      if (p.title.toLowerCase().includes(lower) || p.content.toLowerCase().includes(lower)) {
        allResults.push({ title: p.title, description: p.content.substring(0, 120) + '...', href: '/informasi/pengumuman', category: 'Pengumuman' });
      }
    });

    getAgenda().forEach((a) => {
      if (a.title.toLowerCase().includes(lower) || a.description.toLowerCase().includes(lower)) {
        allResults.push({ title: a.title, description: a.date + ' — ' + a.description, href: '/informasi/agenda', category: 'Agenda' });
      }
    });

    setResults(allResults.slice(0, 8));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[61] px-4"
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-dark-border overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-dark-border">
                <Icon name="search" size={20} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari berita, pengumuman, agenda..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-dark-text-muted text-base"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((result, i) => (
                    <Link
                      key={i}
                      href={result.href}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group"
                    >
                      <span className="shrink-0 px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 mt-0.5">
                        {result.category}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5 line-clamp-1">
                          {result.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.length >= 2 && results.length === 0 && (
                <div className="p-8 text-center">
                  <Icon name="search" size={32} className="mx-auto text-gray-300 dark:text-dark-text-muted mb-3" />
                  <p className="text-gray-500 dark:text-dark-text-muted">Tidak ditemukan hasil untuk "{query}"</p>
                </div>
              )}

              {query.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-400 dark:text-dark-text-muted">Ketik minimal 2 karakter untuk mencari</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
