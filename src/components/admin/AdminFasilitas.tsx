'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import { showToast } from '@/lib/toastStore';
import {
  useStoreData, getFasilitas, addFasilitas, updateFasilitas, deleteFasilitas, generateId,
  Fasilitas,
} from '@/lib/adminStore';

const formFields = [
  { name: 'name', label: 'Nama Fasilitas', type: 'text' as const, placeholder: 'Masukkan nama fasilitas', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi fasilitas', required: true, rows: 2 },
  { name: 'icon', label: 'Nama Icon', type: 'text' as const, placeholder: 'Contoh: building-2, flask-conical, monitor', required: true },
  { name: 'image', label: 'Gambar Fasilitas', type: 'image' as const, placeholder: 'Upload gambar fasilitas', required: true, imageWidth: 800, imageHeight: 600 },
];

export default function AdminFasilitas() {
  const items = useStoreData(getFasilitas);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Fasilitas | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updateFasilitas(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addFasilitas({
        id: generateId(),
        name: data.name,
        description: data.description,
        icon: data.icon,
        image: data.image,
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Fasilitas) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus fasilitas ini?')) {
      const ok = await deleteFasilitas(id);
      if (ok) showToast('Fasilitas berhasil dihapus! ✅', 'success');
      else showToast('Gagal menghapus fasilitas!', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} fasilitas</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="building-2" size={16} />
          Tambah Fasilitas
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
            {/* Image preview */}
            <div className="h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-border flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text">{item.name}</h4>
                  <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-0.5 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center gap-1 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Edit fasilitas">
                    <Icon name="pen-tool" size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label="Hapus fasilitas">
                    <Icon name="trash-2" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada fasilitas.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
        fields={formFields}
        initialData={editingItem ? {
          name: editingItem.name,
          description: editingItem.description,
          icon: editingItem.icon,
          image: editingItem.image,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
