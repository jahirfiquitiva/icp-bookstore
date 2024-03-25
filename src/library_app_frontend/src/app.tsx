import { createClient } from '@connect2ic/core';
import { RouterProvider } from '@tanstack/react-router';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import * as library_app_backend from '@/backend';
import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const browser: 'safari' | 'others' = 'others';

const client = createClient({
  canisters: {
    // @ts-expect-error idk
    library_app_backend,
  },
  providers: [
    new InternetIdentity({
      providerUrl:
        browser === 'others'
          ? 'http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/'
          : 'http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai',
      // dev: true,
    }),
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: true,
  },
});

const queryClient = new QueryClient();

const InnerApp = () => {
  const auth = useConnect();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
      <Toaster position={'bottom-center'} />
    </QueryClientProvider>
  );
};

export const App = () => (
  <Connect2ICProvider client={client}>
    <InnerApp />
  </Connect2ICProvider>
);
