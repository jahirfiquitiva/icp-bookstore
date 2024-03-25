import { useConnect } from '@connect2ic/react';

export const useAuth = () => {
  const auth = useConnect();
  return {
    user: auth.principal,
    status: auth.status,
    connect: auth.connect,
    disconnect: auth.disconnect,
    connected: auth.isConnected && !auth.isInitializing,
    loading: auth.isConnecting || auth.isDisconnecting || auth.isInitializing,
  };
};
