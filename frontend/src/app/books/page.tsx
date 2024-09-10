'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Book } from '../types';
import { getBooks } from '../lib/api';
import BookCard from '../components/BookCard';
import BookFormModal from '../components/BookFormModal';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBooks({ search: search.trim() || undefined });
      setBooks(data);
    } catch {} finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, refreshKey]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-white">Books</h1>

        <div className="mb-8 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title or author..."
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-teal-500"
          />
          <button onClick={fetchBooks} className="rounded-lg bg-teal-600 px-5 py-3 font-medium text-white hover:bg-teal-700 transition-colors">Search</button>
          <button onClick={() => setModalOpen(true)} className="rounded-lg bg-gray-700 px-5 py-3 font-medium text-white hover:bg-gray-600 transition-colors">+ Add</button>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-400">Loading...</p>
        ) : books.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            {search.trim() ? 'No books match your search.' : 'No books yet. Add your first book!'}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </div>

      <BookFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
