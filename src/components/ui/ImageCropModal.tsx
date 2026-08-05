'use client';

/**
 * ImageCropModal — crop interaktif berbasis Canvas API (zero dependency)
 * Mendukung: geser, zoom, preview real-time, export ke Blob
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface ImageCropModalProps {
  /** URL/ObjectURL gambar asli yang akan di-crop */
  src: string;
  /** Target aspect ratio, misalnya 4/5 */
  aspectRatio: number;
  /** Label deskriptif untuk target (misal "450×600 px") */
  targetLabel?: string;
  /** Callback saat selesai — menerima cropped Blob */
  onConfirm: (blob: Blob) => void;
  /** Callback batal */
  onCancel: () => void;
}

export default function ImageCropModal({
  src,
  aspectRatio,
  targetLabel,
  onConfirm,
  onCancel,
}: ImageCropModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gambar asli
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  // State posisi & zoom
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });

  // Ukuran canvas preview (display)
  const CANVAS_W = 360;
  const CANVAS_H = Math.round(CANVAS_W / aspectRatio);

  // Load gambar
  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      setImg(image);
      // Fit gambar ke canvas awal
      const scaleW = CANVAS_W / image.naturalWidth;
      const scaleH = CANVAS_H / image.naturalHeight;
      const initialZoom = Math.max(scaleW, scaleH);
      setZoom(initialZoom);
      setOffset({ x: 0, y: 0 });
    };
    image.src = src;
  }, [src, CANVAS_W, CANVAS_H]);

  // Gambar ulang canvas setiap state berubah
  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;
    // Center + offset
    const x = (CANVAS_W - drawW) / 2 + offset.x;
    const y = (CANVAS_H - drawH) / 2 + offset.y;

    ctx.drawImage(img, x, y, drawW, drawH);
  }, [img, zoom, offset, CANVAS_W, CANVAS_H]);

  // Drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y };
  }, [offset]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !img) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;

    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;

    // Clamp agar gambar tidak meninggalkan canvas
    const maxX = Math.max(0, (drawW - CANVAS_W) / 2);
    const maxY = Math.max(0, (drawH - CANVAS_H) / 2);
    const newX = Math.max(-maxX, Math.min(maxX, dragStart.current.ox + dx));
    const newY = Math.max(-maxY, Math.min(maxY, dragStart.current.oy + dy));

    setOffset({ x: newX, y: newY });
  }, [img, zoom, CANVAS_W, CANVAS_H]);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  // Touch support
  const lastTouch = useRef({ x: 0, y: 0 });
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    dragStart.current = { mx: e.touches[0].clientX, my: e.touches[0].clientY, ox: offset.x, oy: offset.y };
  }, [offset]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current || !img) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - dragStart.current.mx;
    const dy = e.touches[0].clientY - dragStart.current.my;

    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;
    const maxX = Math.max(0, (drawW - CANVAS_W) / 2);
    const maxY = Math.max(0, (drawH - CANVAS_H) / 2);
    const newX = Math.max(-maxX, Math.min(maxX, dragStart.current.ox + dx));
    const newY = Math.max(-maxY, Math.min(maxY, dragStart.current.oy + dy));

    setOffset({ x: newX, y: newY });
  }, [img, zoom, CANVAS_W, CANVAS_H]);

  const onTouchEnd = useCallback(() => { dragging.current = false; }, []);

  // Zoom wheel
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!img) return;
    const minZoom = Math.max(CANVAS_W / img.naturalWidth, CANVAS_H / img.naturalHeight);
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom((z) => Math.max(minZoom, Math.min(4, z + delta)));
  }, [img, CANVAS_W, CANVAS_H]);

  // Export: render ke canvas ukuran target & export blob
  const handleConfirm = useCallback(() => {
    if (!img || !canvasRef.current) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = Math.round(CANVAS_W * (450 / CANVAS_W));  // target 450px wide
    exportCanvas.height = Math.round(CANVAS_H * (450 / CANVAS_W)); // maintain ratio
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    const scale = exportCanvas.width / CANVAS_W;
    const drawW = img.naturalWidth * zoom * scale;
    const drawH = img.naturalHeight * zoom * scale;
    const x = (exportCanvas.width - drawW) / 2 + offset.x * scale;
    const y = (exportCanvas.height - drawH) / 2 + offset.y * scale;

    ctx.drawImage(img, x, y, drawW, drawH);
    exportCanvas.toBlob(
      (blob) => { if (blob) onConfirm(blob); },
      'image/jpeg',
      0.88
    );
  }, [img, zoom, offset, CANVAS_W, CANVAS_H, onConfirm]);

  // Zoom range
  const minZoom = img
    ? Math.max(CANVAS_W / img.naturalWidth, CANVAS_H / img.naturalHeight)
    : 1;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-dark-border">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text">Sesuaikan Foto</h3>
            <p className="text-[11px] text-gray-400 dark:text-dark-text-muted mt-0.5">
              Geser untuk memposisikan · Scroll untuk zoom{targetLabel && ` · Target: ${targetLabel}`}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-bg transition-all"
            type="button"
            aria-label="Tutup"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Canvas crop area */}
        <div className="p-4">
          <div
            ref={containerRef}
            className="relative mx-auto rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none border border-gray-200 dark:border-dark-border"
            style={{ width: CANVAS_W, height: CANVAS_H }}
          >
            {!img && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
                <svg className="animate-spin h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            )}
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="block"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />
            {/* Border overlay untuk kejelasan batas crop */}
            <div className="absolute inset-0 ring-2 ring-emerald-500/40 rounded-xl pointer-events-none" />
          </div>

          {/* Zoom slider */}
          <div className="mt-3 flex items-center gap-3">
            <Icon name="zoom-out" size={14} className="text-gray-400 shrink-0" />
            <input
              type="range"
              min={minZoom}
              max={minZoom * 3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1.5 appearance-none rounded-full bg-gray-200 dark:bg-dark-bg accent-emerald-500"
            />
            <Icon name="zoom-in" size={14} className="text-gray-400 shrink-0" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 dark:border-dark-border">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 text-sm text-gray-600 dark:text-dark-text-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            disabled={!img}
            className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gunakan Foto Ini
          </button>
        </div>
      </div>
    </div>
  );
}
