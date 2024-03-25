import type { Book } from '@/backend/library_app_backend.did';
import { useBooks } from '../hooks/books';
import { BookItem } from './book-item';
import { Loading } from './loading';

interface BooksListProps {
  initialList?: Array<Book>;
}

export const BooksList = (props: BooksListProps) => {
  const { initialList = [] } = props;
  const { books = initialList, loading } = useBooks();

  if (loading) return <Loading />;

  if (!books.length) {
    return <p>No books found at this time.</p>;
  }

  return (
    <section id={'books'}>
      <ul className={'grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6'}>
        {books.map((b) => (
          <li>
            <BookItem book={b} key={`book-${b.id}`} />
          </li>
        ))}
      </ul>
    </section>
  );
};
