'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import AdminFormModal from './AdminFormModal';
import {
  useStoreData, getPrestasi, addPrestasi, updatePrestasi, deletePrestasi, generateId,
  Prestasi,
} from '@/lib/adminStore';

const formFields = [
  { name: 'tahun', label: 'Tahun', type: 'text' as const, placeholder: 'Contoh: 2024', required: true },
  { name: 'bidang', label: 'Bidang', type: 'text' as const, placeholder: 'Contoh: Olimpiade Sains, Olahraga', required: true },
  { name: 'prestasi', label: 'Prestasi', type: 'text' as const, placeholder: 'Contoh: Juara 1 OSN Tingkat Kabupaten', required: true },
  { name: 'tingkat', label: 'Tingkat', type: 'select' as const, required: true, options: [
    { label: 'Kabupaten', value: 'Kabupaten' },
    { label: 'Provinsi', value: 'Provinsi' },
    { label: 'Nasional', value: 'Nasional' },
    { label: 'Internasional', value: 'Internasional' },
  ]},
];

const tingkatColors: Record<string, string> = {
  Kabupaten: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Provinsi: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Nasional: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Internasional: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

export default function AdminPrestasi() {
  const items = useStoreData(getPrestasi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Prestasi | null>(null);

  const handleSave = async (data: Record<string, string>): Promise<boolean> => {
    if (editingItem) {
      const ok = await updatePrestasi(editingItem.id, data);
      if (!ok) return false;
    } else {
      const ok = await addPrestasi({
        id: generateId(),
        tahun: data.tahun,
        bidang: data.bidang,
        prestasi: data.prestasi,
        tingkat: data.tingkat,
      });
      if (!ok) return false;
    }
    setEditingItem(null);
    setModalOpen(false);
    return true;
  };

  const handleEdit = (item: Prestasi) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus prestasi ini?')) {
      deletePrestasi(id);
    }
  };

  const openAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          Total {items.length} prestasi
        </p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          <Icon name="trophy" size={16} />
          Tambah Prestasi
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Prestasi</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden md:table-cell">Bidang</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden sm:table-cell">Tahun</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider hidden lg:table-cell">Tingkat</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 dark:text-dark-text-muted text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-dark-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-bg/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <Icon name="trophy" size={15} className="text-amber-600 dark:text-amber-400" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-dark-text line-clamp-1">{item.prestasi}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 dark:text-dark-text-muted hidden md:table-cell">{item.bidang}</td>
                  <td className="px-4 py-3.5 text-gray-500 dark:text-dark-text-muted hidden sm:table-cell">
                    <span className="font-semibold">{item.tahun}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${tingkatColors[item.tingkat] || 'bg-gray-100 text-gray-700'}`}>
                      {item.tingkat}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Edit"
                        aria-label="Edit prestasi"
                      >
                        <Icon name="pen-tool" size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Hapus"
                        aria-label="Hapus prestasi"
                      >
                        <Icon name="trash-2" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 dark:text-dark-text-muted text-sm">
                    Belum ada data prestasi. Klik &quot;Tambah Prestasi&quot; untuk memulai.
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
        title={editingItem ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
        fields={formFields}
        initialData={editingItem ? {
          tahun: editingItem.tahun,
          bidang: editingItem.bidang,
          prestasi: editingItem.prestasi,
          tingkat: editingItem.tingkat,
        } : {}}
        isEditing={!!editingItem}
      />
    </div>
  );
}
