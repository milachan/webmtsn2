'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import {
  getSchoolData, saveSchoolData,
  getKepalaMadrasah, saveKepalaMadrasah,
  getVisiMisi, saveVisiMisi,
  getTataTertib, saveTataTertib,
  getNilaiUnggulan, saveNilaiUnggulan,
} from '@/lib/adminStore';
import { schoolData as defaultSchoolData, kepalaMadrasah as defaultKepala, visiMisi as defaultVisi, tataTertib as defaultTataTertib, } from '@/lib/data';

export default function AdminSettings() {
  const [school, setSchool] = useState(defaultSchoolData);
  const [kepala, setKepala] = useState(defaultKepala);
  const [visi, setVisi] = useState(defaultVisi);
  const [tata, setTata] = useState(defaultTataTertib);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSchool(getSchoolData());
    setKepala(getKepalaMadrasah());
    setVisi(getVisiMisi());
    setTata(getTataTertib());
  }, []);

  const handleSaveAll = () => {
    saveSchoolData(school);
    saveKepalaMadrasah(kepala);
    saveVisiMisi(visi);
    saveTataTertib(tata);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateMisi = (index: number, value: string) => {
    const newMisi = [...visi.misi];
    newMisi[index] = value;
    setVisi({ ...visi, misi: newMisi });
  };

  const updateTujuan = (index: number, value: string) => {
    const newTujuan = [...visi.tujuan];
    newTujuan[index] = value;
    setVisi({ ...visi, tujuan: newTujuan });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Pengaturan konten utama website</p>
        <button
          onClick={handleSaveAll}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl shadow-lg transition-all ${
            saved
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
          }`}
        >
          <Icon name={saved ? 'check' : 'settings'} size={16} />
          {saved ? 'Tersimpan!' : 'Simpan Semua'}
        </button>
      </div>

      {/* School Info */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Informasi Sekolah</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Nama Sekolah', key: 'name', value: school.name },
            { label: 'Nama Singkat', key: 'shortName', value: school.shortName },
            { label: 'Tagline', key: 'tagline', value: school.tagline },
            { label: 'Alamat', key: 'address', value: school.address },
            { label: 'Telepon', key: 'phone', value: school.phone },
            { label: 'Email', key: 'email', value: school.email },
            { label: 'Website', key: 'website', value: school.website },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">{field.label}</label>
              <input
                value={(school as any)[field.key]}
                onChange={(e) => setSchool({ ...school, [field.key]: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Deskripsi</label>
            <textarea
              value={school.description}
              onChange={(e) => setSchool({ ...school, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Kepala Madrasah */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Kepala Madrasah</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Nama', key: 'name', value: kepala.name },
            { label: 'NIP', key: 'nip', value: kepala.nip },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">{field.label}</label>
              <input
                value={(kepala as any)[field.key]}
                onChange={(e) => setKepala({ ...kepala, [field.key]: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Paragraf 1 Sambutan</label>
            <textarea
              value={kepala.paragraph1}
              onChange={(e) => setKepala({ ...kepala, paragraph1: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Paragraf 2 Sambutan</label>
            <textarea
              value={kepala.paragraph2}
              onChange={(e) => setKepala({ ...kepala, paragraph2: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Paragraf 3 Sambutan</label>
            <textarea
              value={kepala.paragraph3}
              onChange={(e) => setKepala({ ...kepala, paragraph3: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Visi & Misi</h3>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Visi</label>
          <textarea
            value={visi.visi}
            onChange={(e) => setVisi({ ...visi, visi: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2 mb-4">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted">Misi</label>
          {visi.misi.map((m, i) => (
            <input
              key={i}
              value={m}
              onChange={(e) => updateMisi(i, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              placeholder={`Misi ${i + 1}`}
            />
          ))}
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted">Tujuan</label>
          {visi.tujuan.map((t, i) => (
            <input
              key={i}
              value={t}
              onChange={(e) => updateTujuan(i, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              placeholder={`Tujuan ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Tata Tertib */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Tata Tertib</h3>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Pendahuluan</label>
          <textarea
            value={tata.pendahuluan}
            onChange={(e) => setTata({ ...tata, pendahuluan: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Sanksi</label>
          <textarea
            value={tata.sanksi}
            onChange={(e) => setTata({ ...tata, sanksi: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
      </section>
    </div>
  );
}
