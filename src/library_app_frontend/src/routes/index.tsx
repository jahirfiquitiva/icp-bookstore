import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { Login } from '../components/login';
import { BooksList } from '../components/books-list';

const Index = () => {
  const auth = useAuth();
  if (auth.loading) return <Loading />;
  if (!auth.connected) return <Login />;
  return (
    <>
      <h2 className={'text-xl'}>Welcome!</h2>
      <BooksList />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
