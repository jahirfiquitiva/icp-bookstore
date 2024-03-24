import { useConnect } from '@connect2ic/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const auth = useConnect();
  console.warn({ auth });
  return (
    <div className='p-2'>
      {!auth.isConnected ? (
        <h2>Please login</h2>
      ) : (
        <>
          <h3>Welcome Home!</h3>
          <p>User: {auth.principal.toString()}</p>
        </>
      )}
    </div>
  );
}
