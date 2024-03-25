import { Link } from '@tanstack/react-router';

export const NotFound = () => (
  <div
    className={
      'flex flex-col flex-1 gap-4 items-center justify-center w-full h-full mx-auto text-xl'
    }>
    <p>Page not found!</p>
    <Link to={'/'} className={'text-base underline'}>
      Go back home
    </Link>
  </div>
);
