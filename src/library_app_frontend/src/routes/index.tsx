import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { Login } from '../components/login';

const Index = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  if (!auth.connected) return <Login />;

  return (
    <>
      <h3>Welcome Home!</h3>
      <p>User: {auth.user?.toString()}</p>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
