export const Loading = () => (
  <p
    className={
      'flex flex-row flex-1 gap-4 items-center justify-center w-full h-full mx-auto text-xl'
    }>
    <span className={'motion-safe:animate-spin motion-safe:[animation-duration:2s]'}>↻</span>
    <span>Loading…</span>
  </p>
);
