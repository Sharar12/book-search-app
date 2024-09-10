'use client';

import { useState, useEffect } from 'react';
import type { Book } from '../types';
import { createBook, updateBook } from '../lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  book?: Book | null;
}

export default function BookFormModal({ open, onClose, onSaved, book }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description || '');
    } else {
      setTitle('');
      setAuthor('');
      setDescription('');
    }
  }, [book, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !author.trim()) {
      setError('Title and author are required');
      return;
    }
    try {
      setLoading(true);
      const payload = { title: title.trim(), author: author.trim(), description: description.trim() || undefined };
      if (book) {
        await updateBook(book.id, payload);
      } else {
        await createBook(payload as any);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save book');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-5 text-xl font-bold text-white">{book ? 'Edit Book' : 'Add Book'}</h2>
        <div className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-teal-500" />
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-teal-500" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description (optional)" rows={4} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-teal-500" />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-gray-700 py-2.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-teal-600 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : book ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}
