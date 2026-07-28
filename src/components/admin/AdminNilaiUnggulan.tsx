'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getNilaiUnggulan, saveNilaiUnggulan, generateId,
  NilaiUnggulan,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Judul', type: 'text' as const, placeholder: 'Contoh: Tahfidz Quran', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi', required: true, rows: 3 },
  { name: 'icon', label: 'Nama Icon', type: 'text' as const, placeholder: 'Contoh: book-open, atom, languages', required: true },
  { name: 'highlight', label: 'Highlight (utama)', type: 'select' as const, required: true, options: [
    { label: 'Ya (tampil besar)', value: 'true' },
    { label: 'Tidak', value: 'false' },
  ]},
];

export default function AdminNilaiUnggulan() {
  const items = useStoreData(getNilaiUnggulan);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NilaiUnggulan | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    let ok: boolean;
    if (editingItem) {
      const updated = items.map((item) =>
        item.id === editingItem.id
          ? { ...item, title: data.title, description: data.description, icon: data.icon, highlight: data.highlight === 'true' }
          : item
      );
      ok = await saveNilaiUnggulan(updated);
    } else {
      ok = await saveNilaiUnggulan([...items, {
        id: generateId(),
        title: data.title,
        description: data.description,
        icon: data.icon,
        highlight: data.highlight === 'true',
      }]);
    }
    if (!ok) return false;
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: NilaiUnggulan) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus ini?')) {
      saveNilaiUnggulan(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} nilai unggulan</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="star" size={16} />
          Tambah Nilai Unggulan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`bg-white dark:bg-dark-card rounded-xl border p-4 transition-all group relative ${
            item.highlight
              ? 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10'
              : 'border-gray-100 dark:border-dark-border'
          }`}>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors" aria-label="Edit nilai unggulan">
                <Icon name="pen-tool" size={14} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label="Hapus nilai unggulan">
                <Icon name="trash-2" size={14} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Icon name={item.icon} size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</h4>
                  {item.highlight && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">UTAMA</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada nilai unggulan.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Nilai Unggulan' : 'Tambah Nilai Unggulan Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.title,
          description: editingItem.description,
          icon: editingItem.icon,
          highlight: editingItem.highlight ? 'true' : 'false',
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
