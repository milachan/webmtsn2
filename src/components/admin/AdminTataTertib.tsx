'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useStoreData, getTataTertib, saveTataTertib, generateId } from '@/lib/adminStore';

export default function AdminTataTertib() {
  const storeData = useStoreData(getTataTertib);
  const [tata, setTata] = useState(storeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setTata(storeData); }, [storeData]);

  const handleSave = async () => {
    setSaving(true);
    await saveTataTertib(tata);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addAturanKategori = () => {
    setTata({ ...tata, aturan: [...tata.aturan, { kategori: '', items: [''] }] });
  };

  const removeAturanKategori = (idx: number) => {
    setTata({ ...tata, aturan: tata.aturan.filter((_, i) => i !== idx) });
  };

  const updateKategori = (idx: number, val: string) => {
    const a = [...tata.aturan];
    a[idx] = { ...a[idx], kategori: val };
    setTata({ ...tata, aturan: a });
  };

  const addAturanItem = (katIdx: number) => {
    const a = [...tata.aturan];
    a[katIdx] = { ...a[katIdx], items: [...a[katIdx].items, ''] };
    setTata({ ...tata, aturan: a });
  };

  const updateAturanItem = (katIdx: number, itemIdx: number, val: string) => {
    const a = [...tata.aturan];
    const items = [...a[katIdx].items];
    items[itemIdx] = val;
    a[katIdx] = { ...a[katIdx], items };
    setTata({ ...tata, aturan: a });
  };

  const removeAturanItem = (katIdx: number, itemIdx: number) => {
    const a = [...tata.aturan];
    a[katIdx] = { ...a[katIdx], items: a[katIdx].items.filter((_, i) => i !== itemIdx) };
    setTata({ ...tata, aturan: a });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Atur tata tertib madrasah</p>
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

      {/* Pendahuluan */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Pendahuluan</h3>
        <textarea
          value={tata.pendahuluan}
          onChange={(e) => setTata({ ...tata, pendahuluan: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </section>

      {/* Aturan per Kategori */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Aturan</h3>
          <button onClick={addAturanKategori} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-all">
            <Icon name="plus" size={14} /> Tambah Kategori
          </button>
        </div>
        <div className="space-y-4">
          {tata.aturan.map((kat, ki) => (
            <div key={ki} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">{ki + 1}</span>
                  <input value={kat.kategori} onChange={(e) => updateKategori(ki, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Nama kategori" />
                </div>
                <button onClick={() => removeAturanKategori(ki)} className="ml-2 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all">
                  <Icon name="trash-2" size={14} />
                </button>
              </div>
              <div className="space-y-1.5 ml-9">
                {kat.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <input value={item} onChange={(e) => updateAturanItem(ki, ii, e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Aturan item" />
                    <button onClick={() => removeAturanItem(ki, ii)} className="p-1 rounded text-red-400 hover:text-red-600 transition-all">
                      <Icon name="x" size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={() => addAturanItem(ki)} className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                  <Icon name="plus" size={12} /> Tambah Aturan
                </button>
              </div>
            </div>
          ))}
          {tata.aturan.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Belum ada aturan. Klik "Tambah Kategori" untuk menambahkan.</p>
          )}
        </div>
      </section>

      {/* Sanksi */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Sanksi Pelanggaran</h3>
        <textarea
          value={tata.sanksi}
          onChange={(e) => setTata({ ...tata, sanksi: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </section>
    </div>
  );
}
