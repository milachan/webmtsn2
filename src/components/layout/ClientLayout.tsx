'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import DataProvider from './DataProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <DataProvider>{children}</DataProvider>;
  }

  return (
    <DataProvider>
      {/* Skip-to-content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Langsung ke konten utama
      </a>
      <Header />
      <motion.main
        id="main-content"
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        tabIndex={-1}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </motion.main>
      <Footer />
      <WhatsAppWidget />
    </DataProvider>
  );
}
