import { ConnectDialog, useDialog } from '@connect2ic/react';
import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { Button } from './button';

export const Header = () => {
  const { connected, loading, disconnect, user } = useAuth();
  const { open } = useDialog();

  useEffect(() => {
    if (connected) return;
    open();
  }, [connected]);

  return (
    <header className={'py-8 px-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100'}>
      <div className={'flex flex-col gap-6 max-w-3xl mx-auto'}>
        <div className={'flex flex-row gap-4 items-center justify-between'}>
          <h1 className={'text-3xl font-semibold'}>Bookstore</h1>
          {connected ? (
            <div className={'flex flex-row gap-3 items-center'}>
              <img
                src={`https://source.boringavatars.com/beam/44/${user}`}
                loading={'lazy'}
                decoding={'async'}
                width={44}
                height={44}
                className={'rounded-full bg-emerald-400'}
              />
              <Button
                className={'bg-red-500 text-white dark:bg-red-400'}
                onClick={() => {
                  disconnect();
                }}>
                Log out
              </Button>
            </div>
          ) : !loading ? (
            <ConnectDialog />
          ) : null}
        </div>
        {connected ? (
          <nav>
            <ul className={'flex flex-row gap-3 items-center'}>
              <li>
                <Link to={'/'} className={'px-2 py-1 [&.active]:underline'}>
                  Library
                </Link>
              </li>
              <li>
                <Link to={'/new'} className={'px-2 py-1 [&.active]:underline'}>
                  Add book
                </Link>
              </li>
              <li>
                <Link to={'/authors'} className={'px-2 py-1 [&.active]:underline'}>
                  Authors
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
};
