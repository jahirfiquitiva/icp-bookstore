import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { useAuthors } from '../hooks/authors';
import { BookForm } from '../components/book-form';
import { Login } from '../components/login';
import { library_app_backend } from '@/backend/index';

const New = () => {
  const { authors: initialAuthors } = Route.useLoaderData();
  const auth = useAuth();
  const { authors = initialAuthors, loading } = useAuthors();

  if (auth.loading || loading) {
    return <Loading />;
  }

  if (!auth.connected) {
    return <Login />;
  }

  return (
    <>
      <h2 className={'text-xl'}>Add a new book!</h2>
      <div>
        <BookForm authors={authors} />
      </div>
    </>
  );
};

export const Route = createFileRoute('/new')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isConnected && !context.auth.isInitializing) {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context }) => {
    if (context.auth.isConnected) {
      const authors = await library_app_backend.getAuthors();
      return { authors };
    }
    return { authors: [] };
  },
  component: New,
});
