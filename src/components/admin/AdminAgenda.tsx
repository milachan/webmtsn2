'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  getAgenda, addAgenda, updateAgenda, deleteAgenda, generateId,
  Agenda,
} from '@/lib/adminStore';

const formFields = [
  { name: 'title', label: 'Judul Agenda', type: 'text' as const, placeholder: 'Masukkan judul agenda', required: true },
  { name: 'date', label: 'Tanggal', type: 'text' as const, placeholder: 'Contoh: 2 Mei 2026', required: true },
  { name: 'time', label: 'Waktu', type: 'text' as const, placeholder: 'Contoh: 07.00 - 09.00 WIB', required: true },
  { name: 'location', label: 'Lokasi', type: 'text' as const, placeholder: 'Contoh: Aula Madrasah', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi agenda', required: true, rows: 3 },
];

export default function AdminAgenda() {
  const [items, setItems] = useState<Agenda[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Agenda | null>(null);

  useEffect(() => { setItems(getAgenda()); }, []);

  const refresh = () => setItems(getAgenda());

  const handleSave = (data: Record<string, string>) => {
    if (editingItem) {
      updateAgenda(editingItem.id, data);
    } else {
      addAgenda({
        id: generateId(),
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        description: data.description,
      });
    }
    setEditingItem(null);
    setModalOpen(false);
    refresh();
  };

  const handleEdit = (item: Agenda) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus agenda ini?')) {
      deleteAgenda(id);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">Total {items.length} agenda</p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="calendar" size={16} />
          Tambah Agenda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text line-clamp-1">{item.title}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-dark-text-muted">
                  <span className="flex items-center gap-1">
                    <Icon name="calendar" size={12} />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="clock" size={12} />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="map-pin" size={12} />
                    {item.location}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-2 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 ml-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
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
            Belum ada agenda.
          </div>
        )}
      </div>

      <AdminFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
        title={editingItem ? 'Edit Agenda' : 'Tambah Agenda Baru'}
        fields={formFields}
        initialData={editingItem ? {
          title: editingItem.title,
          date: editingItem.date,
          time: editingItem.time,
          location: editingItem.location,
          description: editingItem.description,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
