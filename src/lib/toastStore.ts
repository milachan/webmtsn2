'use client';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();
let counter = 0;

export function showToast(message: string, type: ToastType = 'success', duration = 3500) {
  const id = ++counter;
  toasts = [...toasts, { id, message, type }];
  listeners.forEach((fn) => fn(toasts));

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((fn) => fn(toasts));
  }, duration);
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getToasts(): Toast[] {
  return toasts;
}
