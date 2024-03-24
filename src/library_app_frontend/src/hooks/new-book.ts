import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './auth';
import { useBackend } from './backend';
import type { BookData } from '../types';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import type { Book } from '@/backend/library_app_backend.did';

export const useBooks = () => {
  const auth = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();

  const {
    data: books,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      if (!auth.connected) throw new Error('Log in required');
      const books = await backend.getBooks();
      return books;
    },
    enabled: auth.connected,
  });

  if (error) {
    if ('response' in error) {
      const { message } = error;
      if (message && message.includes('403')) {
        toast.error('Please login again');
        auth.disconnect();
        navigate({ to: '/' });
      }
    }
  }

  return { books, loading, error };
};

export const useBook = (bookId: Book['id']) => {
  const auth = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['books', bookId],
    queryFn: async () => {
      if (!auth.connected) throw new Error('Log in required');
      const book = await backend.getBook(bookId);
      if (!book || !book.length) return null;
      return book[0];
    },
    enabled: auth.connected,
  });

  if (error) {
    if ('response' in error) {
      const { message } = error;
      if (message && message.includes('403')) {
        toast.error('Please login again');
        auth.disconnect();
        navigate({ to: '/' });
      }
    }
  }

  return { book, loading, error };
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();

  const {
    mutate: createBook,
    error,
    isPending: loading,
  } = useMutation<number, Error, BookData>({
    mutationKey: ['book', 'new'],
    mutationFn: async (variables) => {
      if (!auth.connected) throw new Error('Log in required');

      let authorId = variables.author;
      if (authorId === -1 && variables.authorName) {
        authorId = await backend.createAuthor(variables.authorName);
      }

      if (authorId < 0) throw new Error('Author does not exist');

      const books = await backend.createBook({
        ...variables,
        author: authorId,
        genre: variables.genre ? [variables.genre] : [],
      });
      if (!books || !books.length) throw new Error('Could not create book!');
      return books[0];
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['authors'],
      });
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });

  if (error) {
    if ('response' in error) {
      const { message } = error;
      if (message && message.includes('403')) {
        toast.error('Please login again');
        auth.disconnect();
        navigate({ to: '/' });
      }
    }
  }

  return { createBook, error, loading };
};
