'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import ImageUpload from '@/components/ui/ImageUpload';
import {
  useStoreData, getHeroSlides, saveHeroSlides, generateId,
  HeroSlide,
} from '@/lib/adminStore';

export default function AdminHeroSlides() {
  const storeItems = useStoreData(getHeroSlides);
  const [items, setItems] = useState<HeroSlide[]>([]);

  useEffect(() => {
    setItems(storeItems);
  }, [storeItems]);

  const handleSave = () => {
    saveHeroSlides(items);
  };

  const updateItem = (index: number, field: keyof HeroSlide, value: string | boolean) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updated);
  };

  const addSlide = () => {
    setItems([...items, {
      id: generateId(),
      image: '',
      title: 'Slide Baru',
      subtitle: 'Deskripsi slide baru',
      active: true,
    }]);
  };

  const removeSlide = (index: number) => {
    if (confirm('Hapus slide ini?')) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newItems.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          Kelola slide background hero utama ({items.length} slide)
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={addSlide}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
          >
            <Icon name="image" size={16} />
            Tambah Slide
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
          >
            <Icon name="check" size={16} />
            Simpan Semua
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-xs font-bold text-gray-500 dark:text-dark-text-muted">
                      {index + 1}
                    </span>
                    <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text line-clamp-1">
                      {slide.title || 'Slide tanpa judul'}
                    </h4>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-gray-500 dark:text-dark-text-muted">Aktif</span>
                    <input
                      type="checkbox"
                      checked={slide.active}
                      onChange={(e) => updateItem(index, 'active', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>

                {/* Image Upload */}
                <ImageUpload
                  value={slide.image}
                  onChange={(url) => updateItem(index, 'image', url)}
                  width={1920}
                  height={800}
                  placeholder="Upload gambar background hero"
                />

                {/* Title text */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">
                    Judul Slide
                  </label>
                  <input
                    value={slide.title}
                    onChange={(e) => updateItem(index, 'title', e.target.value)}
                    placeholder="Contoh: Generasi Islami Unggul"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">
                    Deskripsi Slide
                  </label>
                  <textarea
                    value={slide.subtitle}
                    onChange={(e) => updateItem(index, 'subtitle', e.target.value)}
                    placeholder="Deskripsi singkat untuk slide ini..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Pindah ke atas"
                >
                  <Icon name="chevron-up" size={16} />
                </button>
                <button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Pindah ke bawah"
                >
                  <Icon name="chevron-down" size={16} />
                </button>
                <div className="border-t border-gray-100 dark:border-dark-border my-1" />
                <button
                  onClick={() => removeSlide(index)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  aria-label="Hapus slide"
                >
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada slide. Klik "Tambah Slide" untuk memulai.
          </div>
        )}
      </div>
    </div>
  );
}
