import { library_app_backend } from '@/backend/index';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useBook } from '../../hooks/new-book';
import { Loading } from '../../components/loading';
import { useAuthor } from '../../hooks/authors';

const BookPage = () => {
  const params = Route.useParams();
  const { book, loading } = useBook(Number(params.bookId));
  const { author, loading: loadingAuthor } = useAuthor(book?.author || -1);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <p>This book does not exist</p>;
  }

  return (
    <div className={'bg-white border rounded-md px-2 py-4 flex flex-col gap-3 dark:bg-slate-800'}>
      <img
        src={`https://source.boringavatars.com/marble/128/${encodeURIComponent(book.title)}?square=true`}
        loading={'lazy'}
        decoding={'async'}
        className={
          'rounded-l-md rounded-r-xl aspect-[3/5] h-32 w-auto object-cover object-center mx-auto'
        }
        alt={book.title}
      />
      <div className={'flex flex-col gap-1 px-2'}>
        <p className={'font-medium'}>{book.title}</p>
        {author ? <p className={'text-sm'}>{author?.name}</p> : loadingAuthor ? <p>…</p> : null}
      </div>
    </div>
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
  component: BookPage,
});
