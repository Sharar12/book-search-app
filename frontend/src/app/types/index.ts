export interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  description?: string;
}

export interface UpdateBookPayload {
  title?: string;
  author?: string;
  description?: string;
}
