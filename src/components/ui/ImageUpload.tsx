'use client';

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/Icon';

// Lazy-load crop modal — hanya dimuat saat dibutuhkan
const ImageCropModal = dynamic(() => import('./ImageCropModal'), { ssr: false });

interface ImageUploadProps {
  /** Current image URL (if editing) */
  value: string;
  /** Called with new image URL after successful upload */
  onChange: (url: string) => void;
  /** Target width for resize/crop */
  width?: number;
  /** Target height for resize/crop */
  height?: number;
  /** Aktifkan crop interaktif sebelum upload */
  enableCrop?: boolean;
  /** Minimal resolusi source (px). Hanya berlaku jika enableCrop=true */
  minSourceWidth?: number;
  minSourceHeight?: number;
  /** Set true untuk logo — skip resize, preservasi bentuk asli */
  noResize?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Label untuk field */
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  width = 800,
  height = 600,
  enableCrop = false,
  minSourceWidth = 0,
  minSourceHeight = 0,
  noResize = false,
  placeholder = '/uploads/image.jpg',
  label,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Crop modal state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const pendingFileRef = useRef<File | null>(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // ── Validasi file sebelum proses ────────────────────────────────
  const validateFile = useCallback((file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      // Format
      if (!ALLOWED_TYPES.includes(file.type)) {
        resolve('Format tidak didukung. Gunakan JPG, JPEG, PNG, atau WEBP.');
        return;
      }
      // Ukuran file
      if (file.size > 5 * 1024 * 1024) {
        resolve('Ukuran file maksimal 5 MB.');
        return;
      }
      // Resolusi minimum — hanya cek jika ada batas
      if (minSourceWidth > 0 || minSourceHeight > 0) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          if (img.naturalWidth < minSourceWidth || img.naturalHeight < minSourceHeight) {
            resolve(
              `Resolusi foto terlalu kecil. Minimal ${minSourceWidth}×${minSourceHeight} px. ` +
              `Foto ini ${img.naturalWidth}×${img.naturalHeight} px.`
            );
          } else {
            resolve(null);
          }
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve('Gagal membaca gambar.'); };
        img.src = url;
      } else {
        resolve(null);
      }
    });
  }, [minSourceWidth, minSourceHeight]);

  // ── Upload ke server ─────────────────────────────────────────────
  const uploadFile = useCallback(async (file: File | Blob, originalName = 'image.jpg') => {
    setUploading(true);
    setError(null);

    // Preview lokal sementara
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const formData = new FormData();
      // Blob tidak punya .name, bungkus dengan nama eksplisit
      formData.append('file', file, file instanceof File ? file.name : originalName);

      const uploadUrl = noResize
        ? '/api/upload?resize=false'
        : `/api/upload?width=${width}&height=${height}`;

      const res = await fetch(uploadUrl, { method: 'POST', body: formData });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Gagal mengupload');
      }

      const data = await res.json();
      onChange(data.url);
      setPreview(null);
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar.');
      setPreview(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  }, [width, height, noResize, onChange]);

  // ── Proses file masuk (validasi → crop atau langsung upload) ─────
  const handleFile = useCallback(async (file: File) => {
    setError(null);
    const validationError = await validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (enableCrop && !noResize) {
      // Buka modal crop
      const objectUrl = URL.createObjectURL(file);
      pendingFileRef.current = file;
      setCropSrc(objectUrl);
    } else {
      await uploadFile(file);
    }
  }, [validateFile, enableCrop, noResize, uploadFile]);

  // ── Crop selesai ─────────────────────────────────────────────────
  const handleCropConfirm = useCallback(async (blob: Blob) => {
    const originalName = pendingFileRef.current?.name || 'cropped.jpg';
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    pendingFileRef.current = null;
    await uploadFile(blob, originalName);
  }, [cropSrc, uploadFile]);

  const handleCropCancel = useCallback(() => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    pendingFileRef.current = null;
  }, [cropSrc]);

  // ── Event handlers ───────────────────────────────────────────────
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  const handleRemove = () => {
    onChange('');
    setPreview(null);
    setError(null);
  };

  const displayUrl = preview || value;

  return (
    <>
      {/* Crop Modal */}
      {cropSrc && (
        <ImageCropModal
          src={cropSrc}
          aspectRatio={width / height}
          targetLabel={`${width}×${height} px`}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}

      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">{label}</label>
        )}

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all ${
            dragOver
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
              : displayUrl
              ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10'
              : 'border-gray-300 dark:border-dark-border hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-gray-50 dark:hover:bg-dark-bg/50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Preview */}
          {displayUrl ? (
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-xl transition-all flex items-center justify-center gap-2">
                <span className="text-white/0 group-hover:text-white text-xs font-medium transition-all flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg">
                  <Icon name="refresh-cw" size={12} />
                  {enableCrop ? 'Ganti & Crop Ulang' : 'Ganti Gambar'}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-all opacity-0 group-hover:opacity-100"
                title="Hapus gambar"
                type="button"
              >
                <Icon name="x" size={14} />
              </button>
              {!noResize && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-medium">
                  {width}×{height}
                </span>
              )}
            </div>
          ) : (
            <div className="h-28 flex flex-col items-center justify-center text-gray-400 dark:text-dark-text-muted">
              {uploading ? (
                <>
                  <svg className="animate-spin h-8 w-8 text-emerald-500 mb-2" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Mengupload...</p>
                  <p className="text-[10px] mt-0.5">Memproses & menyesuaikan ukuran</p>
                </>
              ) : (
                <>
                  <Icon name="image" size={24} className="mb-1.5 opacity-60" />
                  <p className="text-xs font-medium">Klik atau seret gambar ke sini</p>
                  <p className="text-[10px] mt-0.5 opacity-60">JPG, JPEG, PNG, WEBP (maks. 5 MB)</p>
                  {!noResize && (
                    <p className="text-[10px] opacity-40">
                      Ukuran akhir: {width}×{height}px
                      {enableCrop && ' · Crop interaktif'}
                      {(minSourceWidth > 0 || minSourceHeight > 0) && ` · Min. ${minSourceWidth}×${minSourceHeight}px`}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
            <Icon name="alert-circle" size={12} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <input type="hidden" value={value} readOnly aria-hidden="true" />
      </div>
    </>
  );
}
