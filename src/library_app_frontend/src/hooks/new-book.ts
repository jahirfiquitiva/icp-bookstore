import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './auth';
import { useBackend } from './backend';
import type { BookData } from '../types';

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const backend = useBackend();

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

  return { createBook, error, loading };
};
