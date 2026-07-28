'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getPengumuman, addPengumuman, updatePengumuman, deletePengumuman, generateId,
  Pengumuman,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Judul Pengumuman', type: 'text' as const, placeholder: 'Masukkan judul pengumuman', required: true },
  { name: 'date', label: 'Tanggal', type: 'text' as const, placeholder: 'Contoh: 1 Agustus 2026', required: true },
  { name: 'content', label: 'Isi Pengumuman', type: 'textarea' as const, placeholder: 'Tulis isi pengumuman', required: true, rows: 4 },
  { name: 'priority', label: 'Prioritas', type: 'select' as const, required: true, options: [
    { label: 'Tinggi (High)', value: 'high' },
    { label: 'Normal', value: 'normal' },
  ]},
];

export default function AdminPengumuman() {
  const items = useStoreData(getPengumuman);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Pengumuman | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updatePengumuman(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addPengumuman({
        id: generateId(),
        title: data.title,
        date: data.date,
        content: data.content,
        priority: data.priority as 'high' | 'normal',
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Pengumuman) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
      deletePengumuman(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          Total {items.length} pengumuman
        </p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="bell" size={16} />
          Tambah Pengumuman
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden md:table-cell">Prioritas</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Tanggal</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-0.5 line-clamp-1">{item.content}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                      item.priority === 'high'
                        ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
                        : 'bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-dark-text-muted'
                    }`}>
                      {item.priority === 'high' ? 'Penting' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 dark:text-dark-text-muted hidden sm:table-cell">{item.date}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" title="Edit" aria-label="Edit pengumuman">
                        <Icon name="pen-tool" size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Hapus" aria-label="Hapus pengumuman">
                        <Icon name="trash-2" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
                    Belum ada pengumuman.
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
        title={editingItem ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.title,
          date: editingItem.date,
          content: editingItem.content,
          priority: editingItem.priority,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
