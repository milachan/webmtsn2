'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import {
  useStoreData, getPembiasaanData, savePembiasaanData, generateId,
  Pembiasaan,
} from '@/lib/adminStore';

const CATEGORIES = ['Keagamaan', 'Kedisiplinan', 'Akademik', 'Lingkungan', 'Kesehatan', 'Ibadah'];

export default function AdminPembiasaan() {
  const storeData = useStoreData(getPembiasaanData);
  const [items, setItems] = useState<Pembiasaan[]>(storeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Pembiasaan | null>(null);

  useEffect(() => { setItems(storeData); }, [storeData]);

  const handleSave = async () => {
    setSaving(true);
    await savePembiasaanData(items);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    const newItem: Pembiasaan = {
      id: generateId(), name: '', description: '', icon: 'sun', category: 'Ibadah', schedule: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateField = (id: number, field: keyof Pembiasaan, value: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, [field]: value } : i));
  };

  const categoryColors: Record<string, string> = {
    Keagamaan: 'bg-emerald-100 text-emerald-700',
    Kedisiplinan: 'bg-blue-100 text-blue-700',
    Akademik: 'bg-violet-100 text-violet-700',
    Lingkungan: 'bg-green-100 text-green-700',
    Kesehatan: 'bg-rose-100 text-rose-700',
    Ibadah: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Atur program pembiasaan positif siswa</p>
        <div className="flex gap-2">
          <button onClick={addItem} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text hover:bg-gray-200 transition-all">
            <Icon name="plus" size={16} /> Tambah Item
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl shadow-lg transition-all ${
              saved ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
            }`}
          >
            <Icon name={saved ? 'check' : saving ? 'refresh-cw' : 'save'} size={16} className={saving ? 'animate-spin' : ''} />
            {saved ? 'Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">Nama Program</label>
                  <input value={item.name} onChange={(e) => updateField(item.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Nama pembiasaan" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">Kategori</label>
                  <select value={item.category} onChange={(e) => updateField(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">Icon</label>
                  <input value={item.icon} onChange={(e) => updateField(item.id, 'icon', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="sun, book-open, flag, dll" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">Deskripsi</label>
                  <input value={item.description} onChange={(e) => updateField(item.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Deskripsi program" />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-medium text-gray-400 mb-1">Jadwal</label>
                  <input value={item.schedule} onChange={(e) => updateField(item.id, 'schedule', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Contoh: Setiap hari, 06.30 - 07.00 WIB" />
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Icon name="sun" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Belum ada program pembiasaan. Klik "Tambah Item" untuk menambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
