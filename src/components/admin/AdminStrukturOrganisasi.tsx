'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import {
  useStoreData, getStrukturOrganisasi, saveStrukturOrganisasi, generateId,
  StrukturPosisi, StrukturGuruBidang,
} from '@/lib/adminStore';

const COLOR_OPTIONS = [
  'from-emerald-600 to-emerald-900',
  'from-emerald-500 to-emerald-700',
  'from-blue-500 to-blue-700',
  'from-violet-500 to-violet-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
  'from-orange-500 to-orange-700',
];

export default function AdminStrukturOrganisasi() {
  const storeData = useStoreData(getStrukturOrganisasi);
  const [data, setData] = useState(storeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setData(storeData); }, [storeData]);

  const handleSave = async () => {
    setSaving(true);
    await saveStrukturOrganisasi(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addPosition = () => {
    const newPos: StrukturPosisi = { id: generateId(), level: '', name: '', icon: 'users', color: 'from-emerald-500 to-emerald-700', type: 'waka' };
    setData({ ...data, positions: [...data.positions, newPos] });
  };

  const updatePosition = (id: number, field: keyof StrukturPosisi, value: string) => {
    setData({
      ...data,
      positions: data.positions.map((p) => p.id === id ? { ...p, [field]: value } : p),
    });
  };

  const removePosition = (id: number) => {
    setData({ ...data, positions: data.positions.filter((p) => p.id !== id) });
  };

  const addGuruBidang = () => {
    const newG: StrukturGuruBidang = { id: generateId(), bidang: '', count: '' };
    setData({ ...data, guruList: [...data.guruList, newG] });
  };

  const updateGuruBidang = (id: number, field: keyof StrukturGuruBidang, value: string) => {
    setData({
      ...data,
      guruList: data.guruList.map((g) => g.id === id ? { ...g, [field]: value } : g),
    });
  };

  const removeGuruBidang = (id: number) => {
    setData({ ...data, guruList: data.guruList.filter((g) => g.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Atur struktur organisasi madrasah</p>
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

      {/* Positions */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Struktur Posisi</h3>
            <p className="text-xs text-gray-500 mt-0.5">Kepala Madrasah, Waka, dan posisi struktural lainnya</p>
          </div>
          <button onClick={addPosition} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-all">
            <Icon name="plus" size={14} /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {data.positions.map((pos) => (
            <div key={pos.id} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 mb-1">Level / Jabatan</label>
                    <input value={pos.level} onChange={(e) => updatePosition(pos.id, 'level', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Contoh: Waka Kurikulum" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 mb-1">Nama</label>
                    <input value={pos.name} onChange={(e) => updatePosition(pos.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Nama lengkap" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 mb-1">Icon</label>
                    <input value={pos.icon} onChange={(e) => updatePosition(pos.id, 'icon', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      placeholder="graduation-cap, users, dll" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-400 mb-1">Warna</label>
                    <select value={pos.color} onChange={(e) => updatePosition(pos.id, 'color', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c.replace('from-', '').replace(' to-', ' → ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={() => removePosition(pos.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0">
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
            </div>
          ))}
          {data.positions.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Belum ada posisi. Klik "Tambah" untuk menambahkan.</p>
          )}
        </div>
      </section>

      {/* Guru Bidang */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Guru & Tenaga Kependidikan</h3>
            <p className="text-xs text-gray-500 mt-0.5">Bidang-bidang guru dan tendik yang ditampilkan</p>
          </div>
          <button onClick={addGuruBidang} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-all">
            <Icon name="plus" size={14} /> Tambah
          </button>
        </div>
        <div className="space-y-2">
          {data.guruList.map((g) => (
            <div key={g.id} className="flex items-center gap-2">
              <input value={g.bidang} onChange={(e) => updateGuruBidang(g.id, 'bidang', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                placeholder="Bidang (contoh: Guru Mata Pelajaran)" />
              <input value={g.count} onChange={(e) => updateGuruBidang(g.id, 'count', e.target.value)}
                className="w-32 px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                placeholder="Jumlah" />
              <button onClick={() => removeGuruBidang(g.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          ))}
          {data.guruList.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Belum ada data. Klik "Tambah" untuk menambahkan.</p>
          )}
        </div>
      </section>
    </div>
  );
}
