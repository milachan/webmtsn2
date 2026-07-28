'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getTestimoni, addTestimoni, updateTestimoni, deleteTestimoni, generateId,
  Testimoni,
} from '@/lib/adminStore';

const formFields = [
  { name: 'name', label: 'Nama', type: 'text' as const, placeholder: 'Nama pemberi testimoni', required: true },
  { name: 'role', label: 'Peran', type: 'select' as const, required: true, options: [
    { label: 'Orang Tua Siswa', value: 'Orang Tua Siswa' },
    { label: 'Alumni', value: 'Alumni' },
    { label: 'Siswa', value: 'Siswa' },
    { label: 'Guru', value: 'Guru' },
    { label: 'Tamu', value: 'Tamu' },
  ]},
  { name: 'content', label: 'Testimoni', type: 'textarea' as const, placeholder: 'Tulis isi testimoni', required: true, rows: 4 },
  { name: 'avatar', label: 'Foto Avatar', type: 'image' as const, placeholder: 'Upload foto avatar', imageWidth: 200, imageHeight: 200 },
];

export default function AdminTestimoni() {
  const items = useStoreData(getTestimoni);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimoni | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updateTestimoni(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addTestimoni({
        id: generateId(),
        name: data.name,
        role: data.role,
        content: data.content,
        avatar: data.avatar || '',
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Testimoni) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus testimoni ini?')) {
      deleteTestimoni(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} testimoni</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="message-square" size={16} />
          Tambah Testimoni
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group relative">
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Edit testimoni">
                    <Icon name="pen-tool" size={14} />
              </button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label="Hapus testimoni">
                    <Icon name="trash-2" size={14} />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-dark-text">{item.name}</p>
                <p className="text-xs text-gray-400 dark:text-dark-text-muted">{item.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed line-clamp-3 italic">
              "{item.content}"
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada testimoni.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
        fields={formFields}
        initialData={editingItem ? {
          name: editingItem.name,
          role: editingItem.role,
          content: editingItem.content,
          avatar: editingItem.avatar,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
