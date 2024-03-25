import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../../hooks/auth';
import { Loading } from '../../components/loading';
import { Login } from '../../components/login';
import { BooksList } from '../../components/books-list';
import { useAuthor } from '../../hooks/authors';

const AuthorBooksPage = () => {
  const params = Route.useParams();
  const auth = useAuth();
  const { author } = useAuthor(Number(params.authorId));

  if (auth.loading) return <Loading />;
  if (!auth.connected) return <Login />;
  return (
    <>
      <h2 className={'text-xl'}>Books by {author ? author.name : 'author'}</h2>
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
