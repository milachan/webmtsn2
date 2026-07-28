'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getSejarah, saveSejarah, generateId,
  TimelineEvent,
} from '@/lib/adminStore';

const formFields = [
  { name: 'year', label: 'Tahun', type: 'text' as const, placeholder: 'Contoh: 1995', required: true },
  { name: 'title', label: 'Judul Peristiwa', type: 'text' as const, placeholder: 'Contoh: Pendirian Madrasah', required: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' as const, placeholder: 'Tulis deskripsi peristiwa', required: true, rows: 3 },
];

function SortableItem({
  item,
  index,
  onEdit,
  onDelete,
}: {
  item: TimelineEvent;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-4 transition-all group relative ${
        isDragging
          ? 'border-emerald-400 shadow-lg shadow-emerald-200/30 dark:shadow-emerald-900/30'
          : 'hover:border-emerald-200 dark:hover:border-emerald-800'
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-3 left-3 p-1.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-grab active:cursor-grabbing"
        aria-label="Seret untuk mengurutkan"
      >
        <Icon name="grip-vertical" size={16} />
      </button>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(index)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
          aria-label="Edit peristiwa sejarah"
        >
          <Icon name="pen-tool" size={14} />
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Hapus peristiwa sejarah"
        >
          <Icon name="trash-2" size={14} />
        </button>
      </div>

      <div className="flex items-start gap-4 pl-8">
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {item.year}
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text">{item.title}</h4>
          <p className="text-xs text-gray-500 dark:text-dark-text-muted mt-1">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminSejarah() {
  const items = useStoreData(getSejarah);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ index: number; item: TimelineEvent } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(items, oldIndex, newIndex);
      saveSejarah(reordered);
    },
    [items]
  );

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    const newEvent: TimelineEvent = {
      id: generateId(),
      year: data.year,
      title: data.title,
      description: data.description,
    };

    let ok: boolean;
    if (editingItem) {
      const updated = [...items];
      updated[editingItem.index] = newEvent;
      ok = await saveSejarah(updated);
    } else {
      ok = await saveSejarah([...items, newEvent]);
    }
    if (!ok) return false;
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (index: number) => {
    setEditingItem({ index, item: items[index] });
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Yakin ingin menghapus peristiwa ini?')) {
      const updated = items.filter((_, i) => i !== index);
      saveSejarah(updated);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          Total {items.length} peristiwa sejarah
          {items.length > 1 && (
            <span className="ml-2 text-xs text-gray-400 dark:text-dark-text-muted">
              — Seret ikon <Icon name="grip-vertical" size={12} className="inline" /> untuk mengurutkan
            </span>
          )}
        </p>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="clock" size={16} />
          Tambah Peristiwa
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {items.length === 0 && (
              <div className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
                Belum ada peristiwa sejarah.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

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
