'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getSejarah, saveSejarah, generateId,
  TimelineEvent,
} from '@/lib/adminStore';

const formFields = [
  { name: 'year', label: 'Tahun', type: 'text' as const, placeholder: 'Contoh: 1995', required: true },
  { name: 'title', label: 'Judul Peristiwa', type: 'text' as const, placeholder: 'Contoh: Pendirian Madrasah', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi peristiwa', required: true, rows: 3 },
];

export default function AdminSejarah() {
  const [items, setItems] = useState<TimelineEvent[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ index: number; item: TimelineEvent } | null>(null);

  useEffect(() => { setItems(getSejarah()); }, []);

  const refresh = () => setItems(getSejarah());

  const handleSave = (data: Record<string, string>) => {
    const newEvent: TimelineEvent = {
      year: data.year,
      title: data.title,
      description: data.description,
    };

    if (editingItem) {
      const updated = [...items];
      updated[editingItem.index] = newEvent;
      saveSejarah(updated);
    } else {
      saveSejarah([...items, newEvent]);
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
    if (confirm('Yakin ingin menghapus peristiwa ini?')) {
      const updated = items.filter((_, i) => i !== index);
      saveSejarah(updated);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} peristiwa sejarah</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="clock" size={16} />
          Tambah Peristiwa
        </button>
      </div>

      <div className="space-y-3">
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
            <div className="flex items-start gap-4">
              <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {item.year}
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
            Belum ada peristiwa sejarah.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Peristiwa Sejarah' : 'Tambah Peristiwa Baru'}
        fields={formFields}
        initialData={editingItem ? {
          year: editingItem.item.year,
          title: editingItem.item.title,
          description: editingItem.item.description,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
