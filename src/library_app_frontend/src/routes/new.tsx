import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { useBackend } from '../hooks/backend';
import { useEffect } from 'react';
import { useAuthors } from '../hooks/authors';

const New = () => {
  const auth = useAuth();
  const backend = useBackend();
  const { authors, loading } = useAuthors();

  if (auth.loading || loading) {
    return <Loading />;
  }

  return (
    <>
      <p className={'py-6'}>Page to create new books</p>
      <div>
        <p>Authors</p>
        {authors?.map((a) => {
          return <p key={`author-${a.id}`}>{a.name}</p>;
        })}
      </div>
    </>
  );
};

export const Route = createFileRoute('/new')({
  component: New,
});
