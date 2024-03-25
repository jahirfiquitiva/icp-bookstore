import { useBooks } from '../hooks/books';
import { BookItem } from './book-item';
import { Loading } from './loading';
import { Link } from '@tanstack/react-router';

export const BooksList = () => {
  const { books = [], loading } = useBooks();

  if (loading) return <Loading />;

  if (!books.length) {
    return (
      <div className={'flex flex-col gap-2'}>
        <p>No books found at this time.</p>
        <Link to={'/new'} className={'underline'}>
          Add book
        </Link>
      </div>
    );
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
