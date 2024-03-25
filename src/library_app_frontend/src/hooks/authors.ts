import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBackend } from './backend';
import type { Author } from '@/backend/library_app_backend.did';
import { useAuth } from './auth';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export const useAuthors = () => {
  const auth = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();

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

  return { authors, loading, error };
};

export const useAuthor = (authorId?: Author['id']) => {
  const auth = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();

  const {
    data: author,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['authors', authorId],
    queryFn: async () => {
      if (!auth.connected) throw new Error('Log in required');
      if (typeof authorId === 'undefined')
        throw new Error('Author does not exist');
      const author = await backend.getAuthorById(authorId);
      if (!author || !author.length) return null;
      return author[0];
    },
    enabled: auth.connected && typeof authorId !== 'undefined',
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

  return { author, loading, error };
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const backend = useBackend();

  const { mutate: createAuthor, error } = useMutation<
    number,
    Error,
    Author['name']
  >({
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
