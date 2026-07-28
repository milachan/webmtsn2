'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getEkstrakurikuler, addEkstrakurikuler, updateEkstrakurikuler, deleteEkstrakurikuler, generateId,
  Ekstrakurikuler,
} from '@/lib/adminStore';

const formFields = [
  { name: 'name', label: 'Nama Ekstrakurikuler', type: 'text' as const, placeholder: 'Masukkan nama ekskul', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi ekskul', required: true, rows: 2 },
  { name: 'icon', label: 'Nama Icon', type: 'text' as const, placeholder: 'Contoh: compass, football, book-open', required: true },
  { name: 'category', label: 'Kategori', type: 'select' as const, required: true, options: [
    { label: 'Wajib', value: 'Wajib' },
    { label: 'Keagamaan', value: 'Keagamaan' },
    { label: 'Olahraga', value: 'Olahraga' },
    { label: 'Sains', value: 'Sains' },
    { label: 'Seni', value: 'Seni' },
    { label: 'Kedisiplinan', value: 'Kedisiplinan' },
    { label: 'Kesehatan', value: 'Kesehatan' },
    { label: 'Akademik', value: 'Akademik' },
  ]},
];

export default function AdminEkstrakurikuler() {
  const items = useStoreData(getEkstrakurikuler);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Ekstrakurikuler | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updateEkstrakurikuler(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addEkstrakurikuler({
        id: generateId(),
        name: data.name,
        description: data.description,
        icon: data.icon,
        category: data.category,
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Ekstrakurikuler) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus ekstrakurikuler ini?')) {
      deleteEkstrakurikuler(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} ekstrakurikuler</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="compass" size={16} />
          Tambah Ekskul
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Icon name={item.icon} size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text line-clamp-1">{item.name}</h4>
                  <span className="inline-flex mt-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-dark-text-muted">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Edit ekstrakurikuler">
                    <Icon name="pen-tool" size={14} />
                </button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label="Hapus ekstrakurikuler">
                    <Icon name="trash-2" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada ekstrakurikuler.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}
        fields={formFields}
        initialData={editingItem ? {
          name: editingItem.name,
          description: editingItem.description,
          icon: editingItem.icon,
          category: editingItem.category,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
