import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">Book Search App</h1>
      <p className="max-w-md text-center text-gray-400">Search and discover your next read</p>
      <Link href="/books" className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-colors hover:bg-teal-700">Browse Books</Link>
    </div>
  );
}
