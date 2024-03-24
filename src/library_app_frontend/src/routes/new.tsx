import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';

const New = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  return <p className={'py-6'}>Page to create new books</p>;
};

export const Route = createFileRoute('/new')({
  component: New,
});
