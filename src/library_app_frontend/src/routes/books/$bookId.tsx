import { createFileRoute, redirect } from '@tanstack/react-router';

const BookPage = () => {
  const data = Route.useLoaderData();
  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};

export const Route = createFileRoute('/books/$bookId')({
  beforeLoad: async ({ params, context }) => {
    if (!context.auth.isConnected && !context.auth.isInitializing) {
      // Needs sign in
      throw redirect({ to: '/' });
    }
    if (typeof params.bookId === 'undefined') {
      // No book id
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ params }) => {
    return { book: params.bookId }; // fetchPost(params.postId);
  },
  component: BookPage,
});
