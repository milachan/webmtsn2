'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import {
  useStoreData, getKurikulumData, saveKurikulumData, generateId,
  KurikulumKategori,
} from '@/lib/adminStore';

export default function AdminKurikulum() {
  const storeData = useStoreData(getKurikulumData);
  const [data, setData] = useState<KurikulumKategori[]>(storeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setData(storeData); }, [storeData]);

  const handleSave = async () => {
    setSaving(true);
    await saveKurikulumData(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addCategory = () => {
    setData([...data, { id: generateId(), title: '', items: [''] }]);
  };

  const updateCategory = (id: number, title: string) => {
    setData(data.map((c) => c.id === id ? { ...c, title } : c));
  };

  const removeCategory = (id: number) => {
    setData(data.filter((c) => c.id !== id));
  };

  const addItem = (catId: number) => {
    setData(data.map((c) => c.id === catId ? { ...c, items: [...c.items, ''] } : c));
  };

  const updateItem = (catId: number, idx: number, val: string) => {
    setData(data.map((c) => {
      if (c.id !== catId) return c;
      const newItems = [...c.items];
      newItems[idx] = val;
      return { ...c, items: newItems };
    }));
  };

  const removeItem = (catId: number, idx: number) => {
    setData(data.map((c) => {
      if (c.id !== catId) return c;
      return { ...c, items: c.items.filter((_, i) => i !== idx) };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Atur kategori kurikulum dan daftar mata pelajaran</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((cat) => (
          <section key={cat.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
            <div className="flex items-center justify-between mb-3">
              <input value={cat.title} onChange={(e) => updateCategory(cat.id, e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                placeholder="Nama Kategori" />
              <button onClick={() => removeCategory(cat.id)} className="ml-2 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all">
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="space-y-1.5">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Icon name="check" size={12} className="text-emerald-500 shrink-0" />
                  <input value={item} onChange={(e) => updateItem(cat.id, idx, e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Item kurikulum" />
                  <button onClick={() => removeItem(cat.id, idx)} className="p-1 rounded text-red-400 hover:text-red-600 transition-all">
                    <Icon name="x" size={12} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addItem(cat.id)} className="mt-3 text-xs flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
              <Icon name="plus" size={12} /> Tambah Item
            </button>
          </section>
        ))}
        <button onClick={addCategory} className="h-full min-h-[120px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-dark-border text-gray-400 hover:text-emerald-600 hover:border-emerald-400 transition-all flex items-center justify-center">
          <div className="text-center">
            <Icon name="plus" size={24} className="mx-auto mb-1" />
            <span className="text-xs font-medium">Tambah Kategori</span>
          </div>
        </button>
      </div>
    </div>
  );
}
