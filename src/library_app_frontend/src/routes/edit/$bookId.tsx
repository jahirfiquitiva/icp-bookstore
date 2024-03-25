import { createFileRoute, redirect } from '@tanstack/react-router';
import { useBook } from '../../hooks/books';

import { BookForm } from '../../components/book-form';
import { useAuth } from '../../hooks/auth';
import { useAuthors } from '../../hooks/authors';
import { Loading } from '../../components/loading';
import { Login } from '../../components/login';

const BookPage = () => {
  const auth = useAuth();
  const params = Route.useParams();
  const { authors, loading } = useAuthors();
  const { book, loading: loadingBook } = useBook(Number(params.bookId));

  if (auth.loading || loading || loadingBook) return <Loading />;
  if (!auth.connected) return <Login />;
  return (
    <>
      <h2 className={'text-xl'}>Edit book</h2>
      <div>
        <BookForm authors={authors} initialData={book} edit />
      </div>
    </>
  );
};

export const Route = createFileRoute('/edit/$bookId')({
  beforeLoad: async ({ params, context }) => {
    if (!context.auth.isConnected && !context.auth.isInitializing) {
      // Needs sign in
      throw redirect({ to: '/' });
    }
    if (typeof params.bookId === 'undefined') {
      // No book id
      throw redirect({ to: '/' });
    }
  },
  component: BookPage,
});
