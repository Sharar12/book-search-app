# Book Search App

A full-stack book management application that allows users to search, browse, create, edit, and delete books in a personal collection. Built with a modern dark-themed UI and a RESTful API backend.

## Features

- **Search Books** — Full-text search across book titles and authors
- **Browse Collection** — Grid view of all books, newest first
- **View Details** — See full book information including description
- **Create Books** — Add new books via a modal form
- **Edit Books** — Update book details inline
- **Delete Books** — Remove books with confirmation
- **Responsive Design** — Dark-themed UI that works on desktop and mobile

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | Next.js 16, React 19, TypeScript 5   |
| Styling    | Tailwind CSS v4                      |
| Backend    | Laravel 12, PHP 8.2+                 |
| Database   | MySQL                                |
| API Style  | RESTful (JSON)                       |

## Project Structure

```
book-search-app/
├── frontend/                   # Next.js application
│   ├── src/
│   │   └── app/
│   │       ├── books/          # Book list & detail pages
│   │       ├── components/     # Reusable UI components
│   │       ├── lib/            # API client
│   │       ├── types/          # TypeScript definitions
│   │       ├── globals.css     # Global styles
│   │       ├── layout.tsx      # Root layout
│   │       └── page.tsx        # Home page
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── BookController.php
│   │   └── Models/
│   │       └── Book.php
│   ├── database/
│   │   └── migrations/
│   │       └── create_books_table.php
│   ├── routes/
│   │   └── api.php
│   ├── composer.json
│   └── .env.example
│
└── README.md
```

## API Endpoints

| Method | Endpoint                  | Description          | Auth |
|--------|---------------------------|----------------------|------|
| GET    | `/api/books`              | List all books       | No   |
| GET    | `/api/books?search=term`  | Search books         | No   |
| POST   | `/api/books`              | Create a book        | No   |
| GET    | `/api/books/{id}`         | Get a book by ID     | No   |
| PUT    | `/api/books/{id}`         | Update a book        | No   |
| DELETE | `/api/books/{id}`         | Delete a book        | No   |

### Request / Response Examples

**Create a book:**
```json
POST /api/books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A story of the mysteriously wealthy Jay Gatsby..."
}
```

**Search books:**
```
GET /api/books?search=gatsby
```

## Setup Instructions

### Prerequisites

- Node.js 20+
- PHP 8.2+
- Composer
- MySQL
- Git

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
# Edit .env with your MySQL database credentials
php artisan key:generate
php artisan migrate
php artisan serve
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

The frontend will be available at `http://localhost:3000`.

## Environment Variables

### Backend (.env)

| Variable       | Description             | Default        |
|----------------|-------------------------|----------------|
| `DB_DATABASE`  | MySQL database name     | `book_search`  |
| `DB_USERNAME`  | MySQL username          | `root`         |
| `DB_PASSWORD`  | MySQL password          |                |
| `APP_URL`      | Application URL         | `http://localhost:8000` |

### Frontend (.env.local)

| Variable                | Description  | Default                      |
|-------------------------|--------------|------------------------------|
| `NEXT_PUBLIC_API_URL`   | Backend URL  | `http://localhost:8000/api`  |

## Database Schema

```sql
CREATE TABLE books (
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    author        VARCHAR(255) NOT NULL,
    description   TEXT NULL,
    created_at    TIMESTAMP NULL,
    updated_at    TIMESTAMP NULL
);
```

## License

[MIT](LICENSE)

<!-- [2024-09-10] feat: scaffold book search and collection manager structure -->

<!-- [2024-09-10] feat: implement title and author search with debounce filter -->
