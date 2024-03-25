import { library_app_backend } from '@/backend/index'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Loading } from '../../components/loading'
import { useAuthor } from '../../hooks/authors'
import { useBook, useRemoveBook } from '../../hooks/books'
import { Button } from '../../components/button'

import { useNavigate } from '@tanstack/react-router'

const BookPage = () => {
  const navigate = useNavigate()

  const params = Route.useParams()
  const { book, loading } = useBook(Number(params.bookId))

  // const { updateBook, error: updateError } = useUpdateBook()
  const { removeBook, error: removeError } = useRemoveBook()

  const { author, loading: loadingAuthor } = useAuthor(book?.author || -1)

  if (loading) {
    return <Loading />
  }

  if (!book) {
    return <p>This book does not exist</p>
  }

  if (removeError) {
    return <p>It was not possible to remove the book</p>
  }

  return (
    <div
      className={
        'bg-white border rounded-md px-2 py-4 flex flex-col gap-3 dark:bg-slate-800 dark:border-slate-600'
      }
    >
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
        {author ? (
          <p className={'text-sm'}>{author?.name}</p>
        ) : loadingAuthor ? (
          <p>…</p>
        ) : null}
      </div>
      <footer className="flex flex-row gap-6 max-w-20">
        <Link to={'/edit/$bookId'} params={{ bookId: book.id.toString() }}>
          Edit
        </Link>
        <Button
          className="bg-red-700 text-white rounded-md cursor-pointer"
          onClick={() => removeBook(book.id)}
        >
          Remove
        </Button>
      </footer>
    </div>
  )
}

export const Route = createFileRoute('/books/$bookId')({
  beforeLoad: async ({ params, context }) => {
    if (!context.auth.isConnected && !context.auth.isInitializing) {
      // Needs sign in
      throw redirect({ to: '/' })
    }
    if (typeof params.bookId === 'undefined') {
      // No book id
      throw redirect({ to: '/' })
    }
  },
  component: BookPage
})
