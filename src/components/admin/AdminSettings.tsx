'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import ImageUpload from '@/components/ui/ImageUpload';
import {
  useStoreData,
  getSchoolData, saveSchoolData,
  getKepalaMadrasah, saveKepalaMadrasah,
  getVisiMisi, saveVisiMisi,
  getTataTertib, saveTataTertib,
  getSocialLinks, saveSocialLinks,
  getPopupEnabled, savePopupEnabled,
  getStatistik, saveStatistik,
} from '@/lib/adminStore';
import type { SocialLink, Statistik } from '@/lib/adminStore';

export default function AdminSettings() {
  // ─── Reactive store data — syncs to local form state ────────────
  const storeSchool = useStoreData(getSchoolData);
  const storeKepala = useStoreData(getKepalaMadrasah);
  const storeVisi = useStoreData(getVisiMisi);
  const storeTata = useStoreData(getTataTertib);
  const storeSocial = useStoreData(getSocialLinks);
  const storePopup = useStoreData(getPopupEnabled);
  const storeStatistik = useStoreData(getStatistik);

  // ─── Local edit state ───────────────────────────────────────────
  const [school, setSchool] = useState(storeSchool);
  const [kepala, setKepala] = useState(storeKepala);
  const [visi, setVisi] = useState(storeVisi);
  const [tata, setTata] = useState(storeTata);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(storeSocial);
  const [popupEnabled, setPopupEnabled] = useState(storePopup);
  const [statistik, setStatistik] = useState<Statistik[]>(storeStatistik);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'partial' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Sync from store (e.g., after save or external change)
  useEffect(() => { setSchool(storeSchool); }, [storeSchool]);
  useEffect(() => { setKepala(storeKepala); }, [storeKepala]);
  useEffect(() => { setVisi(storeVisi); }, [storeVisi]);
  useEffect(() => { setTata(storeTata); }, [storeTata]);
  useEffect(() => { setSocialLinks(storeSocial); }, [storeSocial]);
  useEffect(() => { setPopupEnabled(storePopup); }, [storePopup]);
  useEffect(() => { setStatistik(storeStatistik); }, [storeStatistik]);

  const handleSaveAll = async () => {
    const saveLabels = ['School', 'Kepala', 'VisiMisi', 'TataTertib', 'SocialLinks', 'Popup', 'Statistik'];
    setSaveStatus('saving');
    setSaveMessage('');

    // Save all settings in parallel — cache is updated immediately, API in background
    const startTime = Date.now();
    const results = await Promise.allSettled([
      saveSchoolData(school),
      saveKepalaMadrasah(kepala),
      saveVisiMisi(visi),
      saveTataTertib(tata),
      saveSocialLinks(socialLinks),
      savePopupEnabled(popupEnabled),
      saveStatistik(statistik),
    ]);

    const failed: { index: number; label: string }[] = [];
    results.forEach((r, i) => {
      if (r.status === 'rejected' || (r.status === 'fulfilled' && r.value === false)) {
        failed.push({ index: i, label: saveLabels[i] });
      }
    });

    // Ensure minimum duration so button doesn't flash
    const elapsed = Date.now() - startTime;
    const minDuration = 800;
    if (elapsed < minDuration) {
      await new Promise((r) => setTimeout(r, minDuration - elapsed));
    }

    if (failed.length === 0) {
      setSaveStatus('success');
      setSaveMessage('Semua pengaturan tersimpan! ✅');
    } else if (failed.length < results.length) {
      setSaveStatus('partial');
      setSaveMessage(`⚠️ ${failed.length} gagal: ${failed.map((f) => f.label).join(', ')}`);
      console.warn(`[handleSaveAll] ${failed.length}/${results.length} save(s) failed:`, failed.map((f) => f.label));
    } else {
      setSaveStatus('error');
      setSaveMessage('❌ Semua penyimpanan gagal! Cek koneksi database.');
      console.error('[handleSaveAll] All 7 saves failed');
    }

    setTimeout(() => { setSaveStatus('idle'); setSaveMessage(''); }, 4000);
  };

  const updateSocialLink = (id: number, field: keyof SocialLink, value: string | boolean) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const updateStatistikValue = (index: number, value: number) => {
    setStatistik((prev) =>
      prev.map((s, i) => (i === index ? { ...s, value } : s))
    );
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
          disabled={saveStatus === 'saving'}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl shadow-lg transition-all ${
            saveStatus === 'success'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : saveStatus === 'partial'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              : saveStatus === 'error'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : saveStatus === 'saving'
              ? 'bg-emerald-400 text-white cursor-wait'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
          }`}
        >
          <Icon name={
            saveStatus === 'success' ? 'check' :
            saveStatus === 'error' ? 'alert-circle' :
            saveStatus === 'saving' ? 'refresh-cw' :
            'settings'
          } size={16} className={saveStatus === 'saving' ? 'animate-spin' : ''} />
          {saveStatus === 'success' ? 'Tersimpan!' :
           saveStatus === 'partial' ? 'Tersimpan Sebagian' :
           saveStatus === 'error' ? 'Gagal Tersimpan' :
           saveStatus === 'saving' ? 'Menyimpan...' :
           'Simpan Semua'}
        </button>
      </div>

      {/* Save status message */}
      {saveMessage && (
        <div className={`text-sm px-4 py-2 rounded-xl border ${
          saveStatus === 'success'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
            : saveStatus === 'partial'
            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800'
            : saveStatus === 'error'
            ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            : ''
        }`}>
          {saveMessage}
        </div>
      )}

      {/* School Info */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Informasi Sekolah</h3>

        {/* Logo Upload — tanpa crop, sesuai bentuk asli gambar */}
        <div className="mb-5 p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
          <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-2">Logo Website</label>
          <p className="text-[10px] text-gray-400 mb-3">Upload logo PNG transparan — akan ditampilkan tanpa crop/ubah bentuk. Biarkan kosong untuk menggunakan inisial "M" default.</p>
          <ImageUpload
            value={school.logo}
            onChange={(url) => setSchool({ ...school, logo: url })}
            noResize
            placeholder="Upload logo (PNG transparan)"
          />
          {school.logo && (
            <div className="mt-3 p-3 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center gap-4">
              <p className="text-[10px] font-medium text-gray-400 uppercase shrink-0">Preview:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={school.logo} alt="Logo preview" className="h-10 w-auto" />
            </div>
          )}
        </div>

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

      {/* Popup Settings */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Popup Informasi</h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">Popup selamat datang dengan tab Berita & Pengumuman yang muncul saat pertama kali pengunjung membuka website</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-medium text-gray-500 dark:text-dark-text-muted">
              {popupEnabled ? 'Aktif' : 'Nonaktif'}
            </span>
            <button
              onClick={() => setPopupEnabled(!popupEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
                popupEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              role="switch"
              aria-checked={popupEnabled}
              aria-label="Toggle popup informasi"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  popupEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </label>
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

      {/* Social Media Links (FAB) */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text">Media Sosial & Kontak</h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5">Tautan yang muncul di tombol FAB melayang pojok kanan bawah</p>
          </div>
        </div>
        <div className="space-y-3">
          {socialLinks.map((link) => {
            const platformColors: Record<string, string> = {
              whatsapp: 'bg-green-500',
              youtube: 'bg-red-600',
              instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
              tiktok: 'bg-gray-900',
              facebook: 'bg-blue-600',
              telepon: 'bg-emerald-500',
            };
            return (
              <div key={link.id} className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                {/* Platform badge */}
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white shrink-0 ${platformColors[link.platform] || 'bg-gray-400'}`}>
                  <Icon name={link.icon} size={14} />
                </span>

                {/* Platform name (read-only) */}
                <span className="text-xs font-semibold text-gray-500 dark:text-dark-text-muted uppercase tracking-wider w-20 shrink-0">
                  {link.platform}
                </span>

                {/* Label input */}
                <input
                  value={link.label}
                  onChange={(e) => updateSocialLink(link.id, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />

                {/* URL input */}
                <input
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                  placeholder="URL / nomor telepon"
                  className="flex-1 min-w-[180px] px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />

                {/* Active toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={link.active}
                    onChange={(e) => updateSocialLink(link.id, 'active', e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30"
                  />
                  <span className="text-[10px] font-medium text-gray-400 dark:text-dark-text-muted">
                    Aktif
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistik Madrasah */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">
          Statistik Madrasah
        </h3>
        <p className="text-xs text-gray-500 dark:text-dark-text-muted mb-4">
          Data statistik yang ditampilkan di halaman utama pada section "Madrasah dalam Angka"
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statistik.map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg"
            >
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-2">
                {stat.label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={stat.value}
                  onChange={(e) => updateStatistikValue(index, parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
                {stat.suffix && (
                  <span className="text-sm font-medium text-gray-400 dark:text-dark-text-muted shrink-0">
                    {stat.suffix}
                  </span>
                )}
              </div>
            </div>
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
