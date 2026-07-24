'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getFasilitas, addFasilitas, updateFasilitas, deleteFasilitas, generateId,
  Fasilitas,
} from '@/lib/adminStore';

const formFields = [
  { name: 'name', label: 'Nama Fasilitas', type: 'text' as const, placeholder: 'Masukkan nama fasilitas', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi fasilitas', required: true, rows: 2 },
  { name: 'icon', label: 'Nama Icon', type: 'text' as const, placeholder: 'Contoh: building-2, flask-conical, monitor', required: true },
  { name: 'image', label: 'Path Gambar', type: 'text' as const, placeholder: '/images/fasilitas-kelas.jpg', required: true },
];

export default function AdminFasilitas() {
  const [items, setItems] = useState<Fasilitas[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Fasilitas | null>(null);

  useEffect(() => { setItems(getFasilitas()); }, []);

  const refresh = () => setItems(getFasilitas());

  const handleSave = (data: Record<string, string>) => {
    if (editingItem) {
      updateFasilitas(editingItem.id, data);
    } else {
      addFasilitas({
        id: generateId(),
        name: data.name,
        description: data.description,
        icon: data.icon,
        image: data.image,
      });
    }
    setEditingItem(null);
    setModalOpen(false);
    refresh();
  };

  const handleEdit = (item: Fasilitas) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus fasilitas ini?')) {
      deleteFasilitas(id);
      refresh();
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
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Icon name={item.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text">{item.name}</h4>
                  <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-0.5 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                    <Icon name="pen-tool" size={14} />
                </button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Icon name="trash-2" size={14} />
                </button>
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
