import type { ComponentProps } from 'react';

export const Button = (props: ComponentProps<'button'>) => (
  <button
    {...props}
    className={[
      'flex flex-row items-center bg-emerald-500 dark:bg-emerald-400 text-black gap-2 px-3 py-2 min-h-[2.75rem] rounded-lg',
      props.className,
    ].join(' ')}
  />
);
