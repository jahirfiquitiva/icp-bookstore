import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { useConnect } from '@connect2ic/react';
import { Header } from '../components/header';

interface BookstoreRouterContext {
  auth: ReturnType<typeof useConnect>;
}

export const Route = createRootRouteWithContext<BookstoreRouterContext>()({
  component: () => (
    <>
      <Header />
      <main className={'flex-1 flex flex-col gap-6 w-full max-w-3xl mx-auto'}>
        <Outlet />
      </main>
    </>
  ),
});
