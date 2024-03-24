import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { useConnect } from '@connect2ic/react';
import { Header } from '../components/header';

interface BookstoreRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: ReturnType<typeof useConnect>;
}

export const Route = createRootRouteWithContext<BookstoreRouterContext>()({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  ),
});
