import { createFileRoute } from '@tanstack/react-router';
import { AuthorsList } from '../../components/authors';

const AuthorsPage = () => {
  return (
    <>
      <AuthorsList />
    </>
  );
};

export const Route = createFileRoute('/authors/')({
  component: AuthorsPage,
});
