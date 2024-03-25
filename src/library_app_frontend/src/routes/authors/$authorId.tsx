import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../../hooks/auth';
import { Loading } from '../../components/loading';
import { Login } from '../../components/login';
import { BooksList } from '../../components/books-list';

const AuthorBooksPage = () => {
  const params = Route.useParams();
  const auth = useAuth();

  if (auth.loading) return <Loading />;
  if (!auth.connected) return <Login />;
  return (
    <>
      <h3>Books by author</h3>
      <BooksList authorId={Number(params.authorId)} />
    </>
  );
};

export const Route = createFileRoute('/authors/$authorId')({
  beforeLoad: async ({ params, context }) => {
    if (!context.auth.isConnected && !context.auth.isInitializing) {
      // Needs sign in
      throw redirect({ to: '/' });
    }
    if (typeof params.authorId === 'undefined') {
      // No book id
      throw redirect({ to: '/' });
    }
  },
  component: AuthorBooksPage,
});
