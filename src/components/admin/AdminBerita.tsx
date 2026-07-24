'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getBerita, addBerita, updateBerita, deleteBerita, generateId,
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
  { name: 'image', label: 'Path Gambar', type: 'text' as const, placeholder: '/images/berita-1.jpg', required: true },
  { name: 'slug', label: 'Slug URL', type: 'text' as const, placeholder: 'judul-berita', required: true },
];

export default function AdminBerita() {
  const [items, setItems] = useState<Berita[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Berita | null>(null);

  useEffect(() => { setItems(getBerita()); }, []);

  const refresh = () => setItems(getBerita());

  const handleSave = (data: Record<string, string>) => {
    if (editingItem) {
      updateBerita(editingItem.id, data);
    } else {
      addBerita({
        id: generateId(),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        image: data.image,
        slug: data.slug,
      });
    }
    setEditingItem(null);
    setModalOpen(false);
    refresh();
  };

  const handleEdit = (item: Berita) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      deleteBerita(id);
      refresh();
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
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Tanggal</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
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
                      >
                        <Icon name="pen-tool" size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Hapus"
                      >
                        <Icon name="trash-2" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
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
