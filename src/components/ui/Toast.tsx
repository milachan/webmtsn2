'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { subscribe, getToasts, Toast as ToastType } from '@/lib/toastStore';

const typeStyles: Record<ToastType['type'], { bg: string; icon: string; iconColor: string; border: string }> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    icon: 'check',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    icon: 'alert-circle',
    iconColor: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    icon: 'bell',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
};



function ToastItem({ toast }: { toast: ToastType }) {
  const style = typeStyles[toast.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${style.bg} ${style.border} min-w-[280px] max-w-[380px] shadow-black/5`}
    >
      <Icon name={style.icon} size={18} className={`${style.iconColor} shrink-0 mt-0.5`} />
      <p className="text-sm text-gray-800 dark:text-gray-200 flex-1 leading-relaxed">{toast.message}</p>
      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-30" />
    </motion.div>
  );
}

export default function ToastContainer() {
  const [items, setItems] = useState<ToastType[]>([]);

  useEffect(() => {
    // Sync initial state
    setItems(getToasts());
    const unsub = subscribe((newToasts) => {
      setItems([...newToasts]);
    });
    return unsub;
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {items.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
