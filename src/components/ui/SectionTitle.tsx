'use client';

import ScrollReveal from './ScrollReveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  return (
    <ScrollReveal className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <div className="inline-flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
        <span className="text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {subtitle || 'MTs Negeri 2 Kebumen'}
        </span>
        <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-400" />
      </div>
      <h2 className="text-fluid-h2 font-bold text-gray-900 dark:text-dark-text">
        {title}
      </h2>
      <div className="mt-4 mx-auto max-w-2xl">
        <div className="islamic-divider max-w-[200px] mx-auto" />
      </div>
    </ScrollReveal>
  );
}
