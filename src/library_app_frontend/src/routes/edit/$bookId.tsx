import { createFileRoute, redirect } from '@tanstack/react-router'
import { useBook } from '../../hooks/books'

import { BookForm } from '../../components/book-form'

const BookPage = () => {
  const params = Route.useParams()
  const { book, loading } = useBook(Number(params.bookId))

  return (
    <main>
      <h1>Edit book</h1>
      {loading && <span>Loading...</span>}
      {book && <BookForm initialData={book} edit />}
    </main>
  )
}

export const Route = createFileRoute('/edit/$bookId')({
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
