import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  return (
    <div className='p-2'>
      {!auth.connected ? (
        <h2>Please login</h2>
      ) : (
        <>
          <h3>Welcome Home!</h3>
          <p>User: {auth.user?.toString()}</p>
        </>
      )}
    </div>
  );
}
