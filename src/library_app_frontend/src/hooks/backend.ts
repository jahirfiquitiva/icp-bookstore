import type { _SERVICE } from '@/backend/library_app_backend.did';
import { useCanister } from '@connect2ic/react';

export const useBackend = () => {
  const [backend] = useCanister('library_app_backend');
  return backend as unknown as _SERVICE;
};
