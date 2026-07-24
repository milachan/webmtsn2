'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getGuru, addGuru, updateGuru, deleteGuru, generateId,
  Guru,
} from '@/lib/adminStore';

const formFields = [
  { name: 'name', label: 'Nama Lengkap', type: 'text' as const, placeholder: 'Masukkan nama lengkap', required: true },
  { name: 'position', label: 'Jabatan', type: 'text' as const, placeholder: 'Contoh: Guru Mapel, Waka Kurikulum', required: true },
  { name: 'subject', label: 'Bidang Studi', type: 'text' as const, placeholder: 'Contoh: Matematika, Bahasa Indonesia', required: true },
  { name: 'image', label: 'Path Gambar', type: 'text' as const, placeholder: '/images/guru-1.jpg (kosongkan jika belum ada)' },
];

export default function AdminGuru() {
  const [items, setItems] = useState<Guru[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Guru | null>(null);

  useEffect(() => { setItems(getGuru()); }, []);

  const refresh = () => setItems(getGuru());

  const handleSave = (data: Record<string, string>) => {
    if (editingItem) {
      updateGuru(editingItem.id, data);
    } else {
      addGuru({
        id: generateId(),
        name: data.name,
        position: data.position,
        subject: data.subject,
        image: data.image || '',
      });
    }
    setEditingItem(null);
    setModalOpen(false);
    refresh();
  };

  const handleEdit = (item: Guru) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data guru ini?')) {
      deleteGuru(id);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} guru & tendik</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="graduation-cap" size={16} />
          Tambah Guru
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden md:table-cell">Jabatan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Bidang Studi</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-gray-900 dark:text-dark-text">{item.name}</p>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 dark:text-dark-text-muted hidden md:table-cell">{item.position}</td>
                  <td className="px-4 py-3.5 text-gray-500 dark:text-dark-text-muted hidden sm:table-cell">{item.subject}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Edit">
                        <Icon name="pen-tool" size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Hapus">
                        <Icon name="trash-2" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
                    Belum ada data guru.
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
        title={editingItem ? 'Edit Data Guru' : 'Tambah Guru Baru'}
        fields={formFields}
        initialData={editingItem ? {
          name: editingItem.name,
          position: editingItem.position,
          subject: editingItem.subject,
          image: editingItem.image,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
