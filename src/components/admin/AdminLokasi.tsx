'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useStoreData, getSchoolData, saveSchoolData } from '@/lib/adminStore';

export default function AdminLokasi() {
  const storeSchool = useStoreData(getSchoolData);

  const [school, setSchool] = useState(storeSchool);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [mapError, setMapError] = useState(true); // true = fallback visible until iframe loads
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => { setSchool(storeSchool); }, [storeSchool]);

  // Reload preview whenever coordinates change
  useEffect(() => {
    setMapError(true);
    setMapKey((k) => k + 1);
  }, [school.coordinates.lat, school.coordinates.lng]);

  const handleSave = async () => {
    setSaveStatus('saving');
    setSaveMessage('');

    const startTime = Date.now();
    const ok = await saveSchoolData(school);
    const elapsed = Date.now() - startTime;
    const minDuration = 800;
    if (elapsed < minDuration) {
      await new Promise((r) => setTimeout(r, minDuration - elapsed));
    }

    if (ok) {
      setSaveStatus('success');
      setSaveMessage('Pengaturan lokasi tersimpan! ✅');
    } else {
      setSaveStatus('error');
      setSaveMessage('❌ Gagal menyimpan! Cek koneksi database.');
    }

    setTimeout(() => { setSaveStatus('idle'); setSaveMessage(''); }, 4000);
  };

  const lat = school.coordinates.lat;
  const lng = school.coordinates.lng;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted">
            Atur koordinat dan informasi lokasi yang tampil di peta interaktif halaman depan
          </p>
        </div>
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
          <Icon
            name={
              saveStatus === 'success' ? 'check' :
              saveStatus === 'error' ? 'alert-circle' :
              saveStatus === 'saving' ? 'refresh-cw' :
              'save'
            }
            size={16}
            className={saveStatus === 'saving' ? 'animate-spin' : ''}
          />
          {saveStatus === 'success' ? 'Tersimpan!' :
           saveStatus === 'error' ? 'Gagal Tersimpan' :
           saveStatus === 'saving' ? 'Menyimpan...' :
           'Simpan Pengaturan'}
        </button>
      </div>

      {/* Save status */}
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Koordinat Section */}
          <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
              <Icon name="map-pin" size={18} className="text-emerald-600 dark:text-emerald-400" />
              Koordinat Peta
            </h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-muted mb-4">
            Gunakan Google Maps untuk mencari koordinat lokasi madrasah. Klik kanan pada lokasi di peta, lalu pilih &quot;Apa yang ada di sini?&quot; untuk mendapatkan lat/lng.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={lat}
                  onChange={(e) =>
                    setSchool({
                      ...school,
                      coordinates: { ...school.coordinates, lat: parseFloat(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="-7.682"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={lng}
                  onChange={(e) =>
                    setSchool({
                      ...school,
                      coordinates: { ...school.coordinates, lng: parseFloat(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="109.678"
                />
              </div>
            </div>
          </section>

          {/* Info Panel Section */}
          <section className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5">
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
              <Icon name="info" size={18} className="text-emerald-600 dark:text-emerald-400" />
              Panel Informasi Lokasi
            </h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-muted mb-4">
              Data ini tampil di samping peta pada section Lokasi halaman depan.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1 flex items-center gap-1.5">
                  <Icon name="map-pin" size={12} className="text-gray-400" />
                  Alamat
                </label>
                <textarea
                  value={school.address}
                  onChange={(e) => setSchool({ ...school, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Jl. Raya Kebumen - Karanganyar Km. 5..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1 flex items-center gap-1.5">
                    <Icon name="phone" size={12} className="text-gray-400" />
                    Telepon
                  </label>
                  <input
                    value={school.phone}
                    onChange={(e) => setSchool({ ...school, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="(0287) 381234"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-dark-text-muted mb-1 flex items-center gap-1.5">
                    <Icon name="mail" size={12} className="text-gray-400" />
                    Email
                  </label>
                  <input
                    value={school.email}
                    onChange={(e) => setSchool({ ...school, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="info@mtsn2kebumen.sch.id"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Link */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:gap-3 transition-all duration-300"
          >
            <Icon name="external" size={16} />
            Buka Lokasi di Google Maps
          </a>
        </div>

        {/* Right: Map Preview */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 sticky top-6">
            <h3 className="font-display font-semibold text-base text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2">
              <Icon name="map-pin" size={18} className="text-emerald-600 dark:text-emerald-400" />
              Pratinjau Peta
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-dark-bg">
              {/* Fallback placeholder — visible when map hasn't loaded or failed */}
              <div
                className={`flex flex-col items-center justify-center p-8 min-h-[300px] transition-opacity duration-300 ${
                  mapError ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Icon name="map-pin" size={32} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-dark-text-muted text-center">
                  {lat}, {lng}
                </p>
                <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-2 text-center max-w-xs">
                  Peta tidak dapat dimuat — mungkin terblokir oleh ekstensi browser atau perlindungan privasi.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => { setMapError(true); setMapKey((k) => k + 1); }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors pointer-events-auto"
                  >
                    Muat Ulang Peta
                  </button>
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text-muted hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                  >
                    Buka di Google Maps ↗
                  </a>
                </div>
              </div>

              {/* Google Maps embed */}
              <iframe
                key={mapKey}
                src={mapSrc}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pratinjau Lokasi MTs Negeri 2 Kebumen"
                className={`w-full transition-opacity duration-300 ${
                  mapError ? 'opacity-0 absolute inset-0' : 'opacity-100'
                }`}
                onLoad={() => setMapError(false)}
                onError={() => setMapError(true)}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-3 text-center">
              Peta akan diperbarui saat koordinat lat/lng diubah dan disimpan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
