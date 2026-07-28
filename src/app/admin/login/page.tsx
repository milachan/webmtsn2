'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  // Cek apakah sudah login — jika ya, redirect langsung
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) router.replace(from);
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal');
        setLoading(false);
        return;
      }

      router.replace(from);
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 animate-pulse mx-auto mb-4" />
          <p className="text-sm text-emerald-200/60">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Islamic geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 2L58 30L30 58L2 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating light orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 border border-white/10 overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500" />

          {/* Top ornament */}
          <div className="text-center pt-10 pb-2 px-8">
            <div className="relative inline-flex mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-xl shadow-emerald-900/30">
                <span className="text-2xl font-bold">M</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
                <Icon name="lock" size={10} className="text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-dark-text">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-1">
              MTs Negeri 2 Kebumen
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="users" size={18} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text placeholder-gray-400 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all disabled:opacity-50"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="lock" size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text placeholder-gray-400 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all disabled:opacity-50"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-dark-text transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <Icon name={showPassword ? 'eye' : 'eye-off'} size={18} />
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50"
              >
                <Icon name="alert-circle" size={18} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </motion.div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : ''}`}>
                <Icon name="log-in" size={18} />
                Masuk
              </span>
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </span>
              )}
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2.5, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-emerald-200/50 mt-6">
          &copy; {new Date().getFullYear()} MTs Negeri 2 Kebumen
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 animate-pulse" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
