import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { Login } from '../components/login';
import { BooksList } from '../components/books-list';
import { library_app_backend } from '@/backend/index';

const Index = () => {
  const data = Route.useLoaderData()
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  if (!auth.connected) return <Login />;

  return (
    <>
      <h3>Welcome!</h3>
      <BooksList initialList={data.books} />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
  loader: async ({ context }) => {
    if (context.auth.isConnected) {
      const books = await library_app_backend.getBooks();
      return { books };
    }
    return { books: [] };
  },
});
