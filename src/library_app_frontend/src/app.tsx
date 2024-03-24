import { createClient } from '@connect2ic/core';
import { RouterProvider } from '@tanstack/react-router';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
// import * as library_app_backend from '@/backend/index';
import * as library_app_backend from './../../declarations/library_app_backend';
import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { router } from './router';

const client = createClient({
  canisters: {
    // @ts-expect-error idk
    library_app_backend,
  },
  providers: [
    new InternetIdentity({
      providerUrl: 'http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai',
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

const InnerApp = () => {
  const auth = useConnect();
  return <RouterProvider router={router} context={{ auth }} />;
};

export const App = () => (
  <Connect2ICProvider client={client}>
    <InnerApp />
  </Connect2ICProvider>
);
