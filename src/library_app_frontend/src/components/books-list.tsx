import { useBooks } from '../hooks/new-book';
import { BookItem } from './book-item';
import { Loading } from './loading';

export const BooksList = () => {
  const { books = [], loading } = useBooks();

  if (loading) return <Loading />;
  if (!books.length) {
    return <p>No books found at this time :c</p>;
  }

  return (
    <section id={'books'}>
      <ul className={'grid grid-cols-2 sm:grid-cols-3'}>
        {books.map((b) => (
          <li>
            <BookItem book={b} key={`book-${b.id}`} />
          </li>
        ))}
      </ul>
    </section>
  );
};
