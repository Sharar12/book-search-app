<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        return Book::search($request->query('search'))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        return Book::create($validated);
    }

    public function show(Book $book) { return $book; }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'author' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);
        $book->update($validated);
        return $book;
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }
}
