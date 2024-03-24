import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/loading';

const Index = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  return (
    <div>
      {!auth.connected ? (
        <p className={'py-6'}>Please login using the button in the header</p>
      ) : (
        <>
          <h3>Welcome Home!</h3>
          <p>User: {auth.user?.toString()}</p>
        </>
      )}
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
