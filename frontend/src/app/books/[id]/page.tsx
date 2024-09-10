'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Book } from '../../types';
import { getBook, deleteBook } from '../../lib/api';
import BookFormModal from '../../components/BookFormModal';

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    getBook(Number(params.id))
      .then(setBook)
      .catch(() => setError('Failed to load book'))
      .finally(() => setLoading(false));
  }, [params?.id]);

  async function handleDelete() {
    if (!book || !confirm('Delete this book?')) return;
    try {
      await deleteBook(book.id);
      router.push('/books');
    } catch {
      setError('Failed to delete book');
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-gray-400">Loading...</p></div>;
  if (error || !book) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-red-400">{error || 'Book not found'}</p></div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button onClick={() => router.push('/books')} className="mb-6 text-sm text-gray-400 hover:text-white transition-colors">
          &larr; Back to Books
        </button>

        <h1 className="text-3xl font-bold text-white">{book.title}</h1>
        <p className="mt-2 text-lg text-teal-400">{book.author}</p>

        {book.description && (
          <div className="mt-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-300">Description</h2>
            <p className="text-gray-400 leading-relaxed">{book.description}</p>
          </div>
        )}

        <div className="mt-10 flex gap-3 border-t border-gray-700 pt-6">
          <button onClick={() => setEditOpen(true)} className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Edit</button>
          <button onClick={handleDelete} className="rounded-lg bg-red-900/50 px-5 py-2.5 text-sm text-red-400 hover:bg-red-800/50 transition-colors">Delete</button>
        </div>
      </div>

      <BookFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={() => { getBook(book.id).then(setBook).catch(() => {}); }}
        book={book}
      />
    </div>
  );
}
