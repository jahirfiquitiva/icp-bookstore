import { createFileRoute, redirect } from '@tanstack/react-router';
import { Loading } from '../../components/loading';
import { useAuthor } from '../../hooks/authors';
import { useBook } from '../../hooks/books';

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
    <section>
      <div className={'px-2 py-4 flex flex-col gap-6 md:flex-row'}>
        <img
          src={`https://source.boringavatars.com/marble/128/${encodeURIComponent(book.title)}?square=true`}
          loading={'lazy'}
          decoding={'async'}
          className={
            'rounded-l-md rounded-r-xl aspect-[3/5] h-32 w-auto max-w-24 object-cover object-center self-start'
          }
          alt={book.title}
        />
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col gap-1.5 mb-2'}>
            <h2 className={'font-medium text-xl'}>{book.title}</h2>
            <p className={'text-md'}>{book.synopsis}</p>
          </div>
          {author ? (
            <div className={'flex flex-col gap-0.5'}>
              <small className={'text-sm'}>Author(s)</small>
              <p className={'font-medium'}>{author?.name}</p>
            </div>
          ) : loadingAuthor ? (
            <p>…</p>
          ) : null}
          <div className={'flex flex-col gap-0.5'}>
            <small className={'text-sm'}>Page count</small>
            <p className={'font-medium'}>{book.pages}</p>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <small className={'text-sm'}>Genre</small>
            <span
              className={
                'text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5 self-start'
              }>
              {book.genre}
            </span>
          </div>
        </div>
      </div>
    </section>
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
