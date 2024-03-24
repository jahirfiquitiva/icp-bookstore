import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';
import { useAuthors } from '../hooks/authors';
import { BookForm } from '../components/book-form';

const New = () => {
  const auth = useAuth();
  const { authors, loading } = useAuthors();

  if (auth.loading || loading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className={'text-xl'}>Register a new book!</h2>
      <div>
        <BookForm authors={authors} />
      </div>
    </>
  );
};

export const Route = createFileRoute('/new')({
  component: New,
});
