export type Book = {
  bookID: string;
  average_rating: string;
  title: string;
  authors: string;
  isbn: string;
  isbn13: string;
  language_code: string;
  num_pages: string;
  ratings_count: string;
  text_reviews_count: string;
  publication_date: string;
  publisher: string;
  stock: number;
};

export type Member = {
  id?: number;
  name: string;
  phone_no: number;
  email: string;
  address: string;
  debt: number | string;
};

export type Transaction = {
  id?: number;
  book_id: string;
  book: Book;
  member_id: number;
  member: Member;
  borrow_date: Date;
  return_date: Date | null;
};
