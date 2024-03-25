import { createFileRoute } from '@tanstack/react-router';
import { AuthorsList } from '../../components/authors';
import { Loading } from '../../components/loading';
import { useAuth } from '../../hooks/auth';
import { Login } from '../../components/login';

const AuthorsPage = () => {
  const auth = useAuth();
  if (auth.loading) return <Loading />;
  if (!auth.connected) return <Login />;
  return <AuthorsList />;
};

export const Route = createFileRoute('/authors/')({
  component: AuthorsPage,
});
