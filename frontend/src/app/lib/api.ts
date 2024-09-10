import type { Book, CreateBookPayload, UpdateBookPayload } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getBooks(params?: { search?: string }): Promise<Book[]> {
  const qs = params?.search ? `?search=${encodeURIComponent(params.search)}` : '';
  return request<Book[]>(`/books${qs}`);
}

export function getBook(id: number): Promise<Book> {
  return request<Book>(`/books/${id}`);
}

export function createBook(data: CreateBookPayload): Promise<Book> {
  return request<Book>('/books', { method: 'POST', body: JSON.stringify(data) });
}

export function updateBook(id: number, data: UpdateBookPayload): Promise<Book> {
  return request<Book>(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteBook(id: number): Promise<void> {
  return request<void>(`/books/${id}`, { method: 'DELETE' });
}
