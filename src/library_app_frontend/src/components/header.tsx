import { ConnectButton, ConnectDialog, useConnect, useDialog } from '@connect2ic/react';
import { useEffect } from 'react';

export const Header = () => {
  const { open } = useDialog();

  useEffect(() => {
    open();
  }, []);

  return (
    <header>
      <h1>Bookstore</h1>
      <nav>
        <ConnectDialog />
      </nav>
    </header>
  );
};
