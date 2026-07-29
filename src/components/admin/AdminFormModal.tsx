'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import ImageUpload from '@/components/ui/ImageUpload';
import { showToast } from '@/lib/toastStore';

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'image';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  rows?: number;
  /** Target dimensions for image upload (width x height) */
  imageWidth?: number;
  imageHeight?: number;
}

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when form is submitted. Return true on success, false on failure.
   *  Modal will show loading state while this promise is pending, and show an
   *  error message if it resolves to false or throws. */
  onSave: (data: Record<string, string>) => Promise<boolean>;
  title: string;
  fields: FieldConfig[];
  initialData?: Record<string, string>;
  isEditing?: boolean;
}

export default function AdminFormModal({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData = {},
  isEditing = false,
}: AdminFormModalProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Local state for image fields (since ImageUpload stores paths differently)
  const [imageValues, setImageValues] = useState<Record<string, string>>({...initialData});

  // Reset error when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset so exit animation completes
      const t = setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage(null);
        setImageValues({});
      }, 300);
      return () => clearTimeout(t);
    }
    setErrorMessage(null);
    setIsSubmitting(false);
    setImageValues({...initialData});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && formRef.current) {
        const focusable = formRef.current.querySelectorAll<HTMLElement>(
          'input, textarea, select, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.type === 'image') {
        // Use the stored image value (from ImageUpload component)
        data[field.name] = imageValues[field.name] || '';
      } else {
        data[field.name] = (formData.get(field.name) as string) || '';
      }
    });

    try {
      const success = await onSave(data);
      if (!success) {
        setErrorMessage('Gagal menyimpan data. Silakan coba lagi.');
        setIsSubmitting(false);
      } else {
        showToast(isEditing ? 'Data berhasil diperbarui! ✅' : 'Data berhasil ditambahkan! ✅', 'success');
      }
      // If success, parent handleSave will call onClose
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.';
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-dark-border">
                <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-dark-text">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {(() => {
                      const isFirst = fields.indexOf(field) === 0;
                      const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";
                      const textareaClass = "w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";
                      const selectClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";

                      if (field.type === 'image') {
                        return (
                          <ImageUpload
                            value={imageValues[field.name] || initialData[field.name] || ''}
                            onChange={(url) => setImageValues((prev) => ({ ...prev, [field.name]: url }))}
                            width={field.imageWidth || 800}
                            height={field.imageHeight || 600}
                            placeholder={field.placeholder}
                          />
                        );
                      }

                      if (field.type === 'textarea') {
                        return (
                          <textarea
                            name={field.name}
                            defaultValue={initialData[field.name] || ''}
                            required={field.required}
                            rows={field.rows || 3}
                            placeholder={field.placeholder}
                            className={textareaClass}
                            autoFocus={isFirst}
                            disabled={isSubmitting}
                          />
                        );
                      }

                      if (field.type === 'select') {
                        return (
                          <select
                            name={field.name}
                            defaultValue={initialData[field.name] || ''}
                            required={field.required}
                            className={selectClass}
                            autoFocus={isFirst}
                            disabled={isSubmitting}
                          >
                            <option value="">Pilih {field.label}</option>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        );
                      }

                      return (
                        <input
                          type={field.type === 'number' ? 'number' : 'text'}
                          name={field.name}
                          defaultValue={initialData[field.name] || ''}
                          required={field.required}
                          placeholder={field.placeholder}
                          className={inputClass}
                          autoFocus={isFirst}
                          disabled={isSubmitting}
                        />
                      );
                    })()}
                  </div>
                ))}

                {/* Error message */}
                {errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
                    <Icon name="alert-circle" size={18} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-dark-bg rounded-xl transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Data')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
