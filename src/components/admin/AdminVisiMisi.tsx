'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useStoreData, getVisiMisi, saveVisiMisi, generateId } from '@/lib/adminStore';

export default function AdminVisiMisi() {
  const storeData = useStoreData(getVisiMisi);
  const [visi, setVisi] = useState(storeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setVisi(storeData); }, [storeData]);

  const handleSave = async () => {
    setSaving(true);
    await saveVisiMisi(visi);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMisi = () => setVisi({ ...visi, misi: [...visi.misi, ''] });
  const removeMisi = (idx: number) => setVisi({ ...visi, misi: visi.misi.filter((_, i) => i !== idx) });
  const updateMisi = (idx: number, val: string) => {
    const m = [...visi.misi];
    m[idx] = val;
    setVisi({ ...visi, misi: m });
  };

  const addTujuan = () => setVisi({ ...visi, tujuan: [...visi.tujuan, ''] });
  const removeTujuan = (idx: number) => setVisi({ ...visi, tujuan: visi.tujuan.filter((_, i) => i !== idx) });
  const updateTujuan = (idx: number, val: string) => {
    const t = [...visi.tujuan];
    t[idx] = val;
    setVisi({ ...visi, tujuan: t });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Atur visi, misi, dan tujuan madrasah</p>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl shadow-lg transition-all ${
            saved
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
          }`}
        >
          <Icon name={saved ? 'check' : saving ? 'refresh-cw' : 'save'} size={16} className={saving ? 'animate-spin' : ''} />
          {saved ? 'Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {/* Visi */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Visi Madrasah</h3>
        <textarea
          value={visi.visi}
          onChange={(e) => setVisi({ ...visi, visi: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </section>

      {/* Misi */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Misi Madrasah</h3>
          <button onClick={addMisi} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all">
            <Icon name="plus" size={14} /> Tambah Misi
          </button>
        </div>
        <div className="space-y-2">
          {visi.misi.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">{i + 1}</span>
              <input value={m} onChange={(e) => updateMisi(i, e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                placeholder={`Misi ${i + 1}`} />
              <button onClick={() => removeMisi(i)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          ))}
          {visi.misi.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-dark-text-muted text-center py-4">Belum ada misi. Klik "Tambah Misi" untuk menambahkan.</p>
          )}
        </div>
      </section>

      {/* Tujuan */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Tujuan Madrasah</h3>
          <button onClick={addTujuan} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all">
            <Icon name="plus" size={14} /> Tambah Tujuan
          </button>
        </div>
        <div className="space-y-2">
          {visi.tujuan.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={t} onChange={(e) => updateTujuan(i, e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                placeholder={`Tujuan ${i + 1}`} />
              <button onClick={() => removeTujuan(i)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          ))}
          {visi.tujuan.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-dark-text-muted text-center py-4">Belum ada tujuan. Klik "Tambah Tujuan" untuk menambahkan.</p>
          )}
        </div>
      </section>
    </div>
  );
}
