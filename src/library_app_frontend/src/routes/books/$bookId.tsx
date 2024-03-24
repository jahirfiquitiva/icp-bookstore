import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/books/$bookId')({
  beforeLoad: async ({ params }) => {
    if (typeof params.bookId === 'undefined') {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ params }) => {
    return { book: params.bookId }; // fetchPost(params.postId);
  },
  component: () => {
    return <p>Book</p>;
  },
});
