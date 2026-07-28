'use client';

import { useEffect, useState, useRef } from 'react';
import { loadAllData, dataLoaded, seedIfEmpty } from '@/lib/adminStore';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex flex-col items-center justify-center">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cpath d=\'M40 2L78 40L40 78L2 40Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.3\'/%3E%3C/svg%3E")',
      }} />
      {/* Animated logo */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-emerald-300" viewBox="0 0 40 40" fill="none">
            <path d="M20 2L38 20L20 38L2 20Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        {/* Spinning ring */}
        <div className="absolute -inset-2">
          <div className="w-24 h-24 rounded-2xl border-2 border-transparent border-t-emerald-400 border-r-emerald-400/60 animate-spin" />
        </div>
      </div>
      <p className="text-white/70 text-sm font-medium tracking-wide animate-pulse">
        Memuat data madrasah...
      </p>
    </div>
  );
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const [ready, setReady] = useState(dataLoaded);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // If data is already loaded (module-level flag), skip entirely
    if (dataLoaded) {
      setReady(true);
      return;
    }

    loadAllData()
      .then(() => {
        // After data is loaded, seed default data if database is empty
        return seedIfEmpty();
      })
      .then(() => {
        setReady(true);
      })
      .catch(() => {
        // Even if API fails, allow rendering (with fallback defaults)
        setReady(true);
      });
  }, []);

  // Show full-page loading spinner ONLY on very first load (before dataLoaded)
  if (!ready) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
