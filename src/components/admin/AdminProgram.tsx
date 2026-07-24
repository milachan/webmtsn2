'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getProgramUnggulan, saveProgramUnggulan,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Nama Program', type: 'text' as const, placeholder: 'Contoh: Kelas Tahfidz', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi program unggulan', required: true, rows: 3 },
  { name: 'icon', label: 'Nama Icon', type: 'text' as const, placeholder: 'Contoh: book-open, atom, languages', required: true },
];

export default function AdminProgram() {
  const [items, setItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ index: number; item: any } | null>(null);

  useEffect(() => { setItems(getProgramUnggulan()); }, []);

  const refresh = () => setItems(getProgramUnggulan());

  const handleSave = (data: Record<string, string>) => {
    const newItem = { title: data.title, description: data.description, icon: data.icon };
    if (editingItem) {
      const updated = [...items];
      updated[editingItem.index] = newItem;
      saveProgramUnggulan(updated);
    } else {
      saveProgramUnggulan([...items, newItem]);
    }
    setEditingItem(null);
    setModalOpen(false);
    refresh();
  };

  const handleEdit = (index: number) => {
    setEditingItem({ index, item: items[index] });
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Yakin ingin menghapus program unggulan ini?')) {
      saveProgramUnggulan(items.filter((_, i) => i !== index));
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} program unggulan</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="star" size={16} />
          Tambah Program
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group relative">
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(index)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                <Icon name="pen-tool" size={14} />
              </button>
              <button onClick={() => handleDelete(index)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Icon name="trash-2" size={14} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Icon name={item.icon} size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-0.5 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada program unggulan.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Program Unggulan' : 'Tambah Program Unggulan Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.item.title,
          description: editingItem.item.description,
          icon: editingItem.item.icon,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
