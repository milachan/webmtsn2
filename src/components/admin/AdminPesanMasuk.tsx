'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface Pesan {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminPesanMasuk() {
  const [messages, setMessages] = useState<Pesan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Pesan | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pesan-masuk');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages([]);
    }
    setLoading(false);
  };

  useEffect(() => { loadMessages(); }, []);

  const markRead = async (id: number) => {
    await fetch('/api/pesan-masuk', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: true }),
    });
    loadMessages();
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Hapus pesan ini?')) return;
    await fetch(`/api/pesan-masuk?id=${id}`, { method: 'DELETE' });
    if (selected?.id === id) setSelected(null);
    loadMessages();
  };

  const unread = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 animate-pulse mx-auto mb-4" />
        <p className="text-sm">Memuat pesan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-dark-text-muted">
          {unread > 0 ? (
            <span className="text-emerald-600 font-semibold">{unread} pesan baru</span>
          ) : 'Tidak ada pesan baru'}
        </p>
        <button onClick={loadMessages} className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-600 hover:bg-gray-200 transition-all">
          <Icon name="refresh-cw" size={12} /> Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Icon name="inbox" size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message list */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selected?.id === msg.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm'
                    : msg.read
                    ? 'border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card'
                    : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                      <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate">{msg.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{msg.subject}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0">
                    <Icon name="trash-2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
            {selected ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-xs text-emerald-600 hover:underline">{selected.email}</a>
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(selected.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Subjek</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text mt-0.5">{selected.subject}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Pesan</span>
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted mt-1 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border flex gap-2">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all">
                    <Icon name="mail" size={14} /> Balas via Email
                  </a>
                  <button onClick={() => deleteMessage(selected.id)} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                    <Icon name="trash-2" size={14} /> Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Icon name="inbox" size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Klik pesan untuk melihat detail</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
