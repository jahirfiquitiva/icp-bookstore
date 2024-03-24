import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBackend } from './backend';
import type { Author } from '@/backend/library_app_backend.did';

export const useAuthors = () => {
  const backend = useBackend();

  const {
    data: authors,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const authors = await backend.getAuthors();
      return authors;
    },
  });

  return { authors, loading, error };
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const backend = useBackend();

  const { mutate: createAuthor, error } = useMutation<number, Error, Author['name']>({
    mutationKey: ['author'],
    mutationFn: async (variables) => {
      const authorId = await backend.createAuthor(variables);
      return authorId;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ['authors'],
      });
    },
  });

  return { createAuthor, error };
};
