import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBackend } from './backend';
import type { Author } from '@/backend/library_app_backend.did';
import { useAuth } from './auth';

export const useAuthors = () => {
  const auth = useAuth();
  const backend = useBackend();

  const {
    data: authors,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      if (!auth.connected) throw new Error('Log in required');
      const authors = await backend.getAuthors();
      return authors;
    },
    enabled: auth.connected,
  });

  return { authors, loading, error };
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const backend = useBackend();

  const { mutate: createAuthor, error } = useMutation<number, Error, Author['name']>({
    mutationKey: ['author'],
    mutationFn: async (variables) => {
      if (!auth.connected) throw new Error('Log in required');
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
