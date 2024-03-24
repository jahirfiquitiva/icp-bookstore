import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { useBackend } from '../hooks/backend';
import { useEffect } from 'react';

const New = () => {
  const auth = useAuth();
  const backend = useBackend();

  useEffect(() => {
    // backend
    //   .createAuthor({ name: 'Julio Cesar Gaitan' })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch(console.error);
  }, []);

  if (auth.loading) {
    return <Loading />;
  }

  return <p className={'py-6'}>Page to create new books</p>;
};

export const Route = createFileRoute('/new')({
  component: New,
});
