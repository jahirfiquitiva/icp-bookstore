import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/books/')({
  beforeLoad: async () => {
    throw redirect({ to: '/' });
  },
});
