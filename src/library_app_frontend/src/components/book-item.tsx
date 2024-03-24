import type { Book } from '@/backend/library_app_backend.did';
import { useAuthor } from '../hooks/authors';
import { Link } from '@tanstack/react-router';

interface BookItemProps {
  book: Book;
}

export const BookItem = (props: BookItemProps) => {
  const { author, loading: loadingAuthor } = useAuthor(props.book.author);

  return (
    <Link to={`/books/$bookId`} params={{ bookId: props.book.id.toString() }}>
      <div className={'bg-white border rounded-md px-2 py-4 flex flex-col gap-3'}>
        <img
          src={`https://source.boringavatars.com/marble/128/${encodeURIComponent(props.book.title)}?square=true`}
          loading={'lazy'}
          decoding={'async'}
          className={
            'rounded-l-md rounded-r-xl aspect-[3/5] h-32 w-auto object-cover object-center mx-auto'
          }
          alt={props.book.title}
        />
        <div className={'flex flex-col gap-1 px-2'}>
          <p className={'font-medium'}>{props.book.title}</p>
          {author ? <p className={'text-sm'}>{author?.name}</p> : loadingAuthor ? <p>…</p> : null}
        </div>
      </div>
    </Link>
  );
};
