'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: 'lift' | 'glow' | 'none';
  as?: 'div' | 'motion';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = 'lift',
  as = 'div',
  onClick,
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden';

  const hoverClasses = {
    lift: 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
    glow: 'hover:shadow-glow hover:-translate-y-1 transition-all duration-300',
    none: '',
  };

  if (as === 'motion') {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses[hover]} ${className}`}
        whileHover={hover !== 'none' ? { y: -4 } : undefined}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${hoverClasses[hover]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
