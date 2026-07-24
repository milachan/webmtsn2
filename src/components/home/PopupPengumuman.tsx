'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { getPengumuman } from '@/lib/adminStore';

export default function PopupPengumuman() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('popup-seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('popup-seen', 'true');
  };

  const highPriority = getPengumuman().filter((p) => p.priority === 'high').slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl shadow-black/30 overflow-y-auto w-full max-w-lg max-h-[85vh]">
              {/* Header */}
              <div className="relative bg-gradient-primary p-5 sm:p-6 text-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEw2MCAzMEwzMCA2MEwwIDMwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-50" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <Icon name="info" size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Pengumuman Penting</h3>
                  <p className="text-white/80 text-sm mt-1">Informasi terbaru dari madrasah</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {highPriority.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-2" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-dark-text">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">
                          {item.date}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-dark-text-muted mt-1.5 line-clamp-2">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                <Link
                  href="/informasi/pengumuman"
                  onClick={handleClose}
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  Lihat Semua Pengumuman
                </Link>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
