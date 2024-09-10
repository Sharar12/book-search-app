'use client';

import Link from 'next/link';
import type { Book } from '../types';

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group block rounded-xl border border-gray-700 bg-gray-800 p-5 transition-colors hover:border-teal-600"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
        {book.title}
      </h3>
      <p className="mt-1 text-sm text-gray-400">{book.author}</p>
      {book.description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{book.description}</p>
      )}
    </Link>
  );
}
