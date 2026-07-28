'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import {
  useStoreData,
  getPmbSettings, savePmbSettings,
} from '@/lib/adminStore';
import type { PmbSettings } from '@/lib/adminStore';

export default function AdminPmb() {
  const storePmb = useStoreData(getPmbSettings);
  const [pmb, setPmb] = useState<PmbSettings>(storePmb);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => { setPmb(storePmb); }, [storePmb]);

  const handleSave = async () => {
    setSaveStatus('saving');
    setSaveMessage('');
    const startTime = Date.now();

    const ok = await savePmbSettings(pmb);

    const elapsed = Date.now() - startTime;
    if (elapsed < 800) {
      await new Promise((r) => setTimeout(r, 800 - elapsed));
    }

    if (ok) {
      setSaveStatus('success');
      setSaveMessage('Pengaturan PMB tersimpan! ✅');
    } else {
      setSaveStatus('error');
      setSaveMessage('❌ Gagal menyimpan! Cek koneksi database.');
    }

    setTimeout(() => { setSaveStatus('idle'); setSaveMessage(''); }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Pengaturan halaman Pendaftaran Peserta Didik Baru</p>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl shadow-lg transition-all ${
            saveStatus === 'success'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
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
            'save'
          } size={16} className={saveStatus === 'saving' ? 'animate-spin' : ''} />
          {saveStatus === 'success' ? 'Tersimpan!' :
           saveStatus === 'error' ? 'Gagal Tersimpan' :
           saveStatus === 'saving' ? 'Menyimpan...' :
           'Simpan'}
        </button>
      </div>

      {saveMessage && (
        <div className={`text-sm px-4 py-2 rounded-xl border ${
          saveStatus === 'success'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
            : saveStatus === 'error'
            ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            : ''
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Mode toggle */}
      <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Mode Halaman PMB</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setPmb({ ...pmb, mode: 'internal' })}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              pmb.mode === 'internal'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600'
                : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                pmb.mode === 'internal' ? 'border-emerald-500' : 'border-gray-300'
              }`}>
                {pmb.mode === 'internal' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text">Internal</span>
            </div>
            <p className="text-[10px] text-gray-400 ml-7">Tampilkan halaman PMB dengan konten yang bisa diatur di bawah ini</p>
          </button>
          <button
            onClick={() => setPmb({ ...pmb, mode: 'redirect' })}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              pmb.mode === 'redirect'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600'
                : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                pmb.mode === 'redirect' ? 'border-emerald-500' : 'border-gray-300'
              }`}>
                {pmb.mode === 'redirect' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text">Redirect</span>
            </div>
            <p className="text-[10px] text-gray-400 ml-7">Alihkan pengunjung ke halaman PMB eksternal</p>
          </button>
        </div>

        {pmb.mode === 'redirect' && (
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">URL Tujuan Redirect</label>
            <input
              value={pmb.redirectUrl}
              onChange={(e) => setPmb({ ...pmb, redirectUrl: e.target.value })}
              placeholder="https://pmb.mtsnegeri2kebumen.sch.id"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
            <p className="text-[10px] text-gray-400 mt-1">Pengunjung akan langsung diarahkan ke URL ini saat membuka halaman /pmb</p>
          </div>
        )}
      </section>

      {pmb.mode === 'internal' && (
        <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4">Konten Halaman PMB</h3>
          <div className="space-y-4">
            {/* Basic info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Judul Halaman</label>
                <input
                  value={pmb.title}
                  onChange={(e) => setPmb({ ...pmb, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Deskripsi</label>
                <textarea
                  value={pmb.description}
                  onChange={(e) => setPmb({ ...pmb, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Badge (label tahun)</label>
                <input
                  value={pmb.badgeText}
                  onChange={(e) => setPmb({ ...pmb, badgeText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Teks Tombol CTA</label>
                <input
                  value={pmb.ctaText}
                  onChange={(e) => setPmb({ ...pmb, ctaText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Info Cards */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-3">Info Cards (3 kolom informasi)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pmb.infoCards.map((card, i) => (
                  <div key={i} className="space-y-2">
                    <input
                      value={card.icon}
                      onChange={(e) => {
                        const newCards = [...pmb.infoCards];
                        newCards[i] = { ...newCards[i], icon: e.target.value };
                        setPmb({ ...pmb, infoCards: newCards });
                      }}
                      placeholder="Nama icon"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <input
                      value={card.label}
                      onChange={(e) => {
                        const newCards = [...pmb.infoCards];
                        newCards[i] = { ...newCards[i], label: e.target.value };
                        setPmb({ ...pmb, infoCards: newCards });
                      }}
                      placeholder="Label"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <input
                      value={card.value}
                      onChange={(e) => {
                        const newCards = [...pmb.infoCards];
                        newCards[i] = { ...newCards[i], value: e.target.value };
                        setPmb({ ...pmb, infoCards: newCards });
                      }}
                      placeholder="Value"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-3">Alur Pendaftaran (5 langkah)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pmb.steps.map((step, i) => (
                  <div key={i} className="space-y-2">
                    <span className="text-[10px] font-semibold text-gray-400">Langkah {step.number}</span>
                    <input
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...pmb.steps];
                        newSteps[i] = { ...newSteps[i], title: e.target.value };
                        setPmb({ ...pmb, steps: newSteps });
                      }}
                      placeholder="Judul langkah"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <input
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...pmb.steps];
                        newSteps[i] = { ...newSteps[i], description: e.target.value };
                        setPmb({ ...pmb, steps: newSteps });
                      }}
                      placeholder="Deskripsi langkah"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-3">Persyaratan Pendaftaran</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pmb.requirements.map((req, i) => (
                  <input
                    key={i}
                    value={req}
                    onChange={(e) => {
                      const newReqs = [...pmb.requirements];
                      newReqs[i] = e.target.value;
                      setPmb({ ...pmb, requirements: newReqs });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Judul Bagian Kontak</label>
              <input
                value={pmb.contactTitle}
                onChange={(e) => setPmb({ ...pmb, contactTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all mb-3"
              />
              <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">Deskripsi Bagian Kontak</label>
              <textarea
                value={pmb.contactDescription}
                onChange={(e) => setPmb({ ...pmb, contactDescription: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all mb-3"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pmb.contacts.map((contact, i) => (
                  <div key={i} className="space-y-2">
                    <input
                      value={contact.icon}
                      onChange={(e) => {
                        const newContacts = [...pmb.contacts];
                        newContacts[i] = { ...newContacts[i], icon: e.target.value };
                        setPmb({ ...pmb, contacts: newContacts });
                      }}
                      placeholder="Nama icon"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <input
                      value={contact.label}
                      onChange={(e) => {
                        const newContacts = [...pmb.contacts];
                        newContacts[i] = { ...newContacts[i], label: e.target.value };
                        setPmb({ ...pmb, contacts: newContacts });
                      }}
                      placeholder="Label"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <input
                      value={contact.value}
                      onChange={(e) => {
                        const newContacts = [...pmb.contacts];
                        newContacts[i] = { ...newContacts[i], value: e.target.value };
                        setPmb({ ...pmb, contacts: newContacts });
                      }}
                      placeholder="Value"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
