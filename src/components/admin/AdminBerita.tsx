'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import { showToast } from '@/lib/toastStore';
import {
  useStoreData, getBerita, addBerita, updateBerita, deleteBerita, generateId,
  Berita,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Judul Berita', type: 'text' as const, placeholder: 'Masukkan judul berita', required: true },
  { name: 'excerpt', label: 'Ringkasan', type: 'textarea' as const, placeholder: 'Tulis ringkasan berita', required: true, rows: 2 },
  { name: 'date', label: 'Tanggal', type: 'text' as const, placeholder: 'Contoh: 15 Juli 2026', required: true },
  { name: 'category', label: 'Kategori', type: 'select' as const, required: true, options: [
    { label: 'Prestasi', value: 'Prestasi' },
    { label: 'Kegiatan', value: 'Kegiatan' },
    { label: 'Pengumuman', value: 'Pengumuman' },
    { label: 'Akademik', value: 'Akademik' },
  ]},
  { name: 'image', label: 'Gambar Thumbnail', type: 'image' as const, placeholder: 'Upload gambar berita', required: true, imageWidth: 800, imageHeight: 450 },
  { name: 'slug', label: 'Slug URL', type: 'text' as const, placeholder: 'judul-berita', required: true },
];

export default function AdminBerita() {
  const items = useStoreData(getBerita);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Berita | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updateBerita(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addBerita({
        id: generateId(),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        image: data.image,
        slug: data.slug,
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Berita) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      const ok = await deleteBerita(id);
      if (ok) showToast('Berita berhasil dihapus! ✅', 'success');
      else showToast('Gagal menghapus berita!', 'error');
    }
  };

  const openAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          Total {items.length} berita
        </p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="book-open" size={16} />
          Tambah Berita
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Gambar</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Tanggal</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                  <td className="px-4 py-3.5 w-16">
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-border flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Icon name="image" size={14} className="text-gray-300 dark:text-gray-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-0.5 line-clamp-1">{item.excerpt}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 dark:text-dark-text-muted hidden sm:table-cell">{item.date}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Edit"
                        aria-label="Edit berita"
                      >
                        <Icon name="pen-tool" size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Hapus"
                        aria-label="Hapus berita"
                      >
                        <Icon name="trash-2" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
                    Belum ada berita. Klik "Tambah Berita" untuk memulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Berita' : 'Tambah Berita Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.title,
          excerpt: editingItem.excerpt,
          date: editingItem.date,
          category: editingItem.category,
          image: editingItem.image,
          slug: editingItem.slug,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
