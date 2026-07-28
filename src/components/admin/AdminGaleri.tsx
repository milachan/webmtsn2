'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getGaleri, addGaleri, updateGaleri, deleteGaleri, generateId,
  GaleriItem,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Judul Foto', type: 'text' as const, placeholder: 'Masukkan judul foto', required: true },
  { name: 'category', label: 'Kategori', type: 'select' as const, required: true, options: [
    { label: 'Kegiatan', value: 'Kegiatan' },
    { label: 'Fasilitas', value: 'Fasilitas' },
    { label: 'Akademik', value: 'Akademik' },
  ]},
  { name: 'image', label: 'File Foto', type: 'image' as const, placeholder: 'Upload foto galeri', required: true, imageWidth: 800, imageHeight: 600 },
  { name: 'description', label: 'Deskripsi', type: 'text' as const, placeholder: 'Tulis deskripsi singkat foto', required: true },
];

export default function AdminGaleri() {
  const items = useStoreData(getGaleri);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GaleriItem | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updateGaleri(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addGaleri({
        id: generateId(),
        title: data.title,
        category: data.category,
        image: data.image,
        description: data.description,
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: GaleriItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      deleteGaleri(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} foto galeri</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="image" size={16} />
          Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="relative group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-border flex items-center justify-center">
              <Icon name="image" size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-xs text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</h4>
              <span className="inline-flex mt-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                {item.category}
              </span>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg bg-white/90 dark:bg-dark-card/90 text-gray-600 dark:text-dark-text hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-colors" aria-label="Edit galeri">
                <Icon name="pen-tool" size={13} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-white/90 dark:bg-dark-card/90 text-gray-600 dark:text-dark-text hover:text-red-600 dark:hover:text-red-400 shadow-sm transition-colors" aria-label="Hapus galeri">
                <Icon name="trash-2" size={13} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada foto galeri.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Foto Galeri' : 'Tambah Foto Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.title,
          category: editingItem.category,
          image: editingItem.image,
          description: editingItem.description,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
