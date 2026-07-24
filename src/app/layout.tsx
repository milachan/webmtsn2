import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'MTs Negeri 2 Kebumen — Madrasah Unggul, Berkarakter, Berprestasi',
    template: '%s | MTs Negeri 2 Kebumen',
  },
  description:
    'MTs Negeri 2 Kebumen — Madrasah Tsanawiyah Negeri unggulan di Kebumen, Jawa Tengah. Mencetak generasi Islami, berkarakter mulia, dan berprestasi.',
  keywords: [
    'MTsN 2 Kebumen',
    'Madrasah Tsanawiyah',
    'Sekolah Islam Kebumen',
    'PMB Kebumen',
    'Pendidikan Islam',
    'Madrasah Negeri Kebumen',
  ],
  authors: [{ name: 'MTs Negeri 2 Kebumen' }],
  openGraph: {
    title: 'MTs Negeri 2 Kebumen',
    description: 'Madrasah Unggul, Berkarakter, Berprestasi',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
