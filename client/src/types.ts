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
  name: string;
  phone_no: number;
  email: string;
  address: string;
};
