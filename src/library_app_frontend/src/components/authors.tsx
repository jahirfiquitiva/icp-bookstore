import { Link } from '@tanstack/react-router';
import { useAuthors } from '../hooks/authors';
import { Loading } from './loading';

export const AuthorsList = () => {
  const { authors = [], loading } = useAuthors();

  if (loading) return <Loading />;

  if (!authors.length) {
    return <p>No authors found at this time.</p>;
  }

  return (
    <section id={'authors'} className={'flex flex-col gap-3'}>
      <h2>Authors:</h2>
      <ul className={'flex flex-col gap-2'}>
        {authors.map((a) => (
          <li key={a.id} className={'flex flex-row items-center self-start'}>
            <Link className={'self-start'}>
              <div className={'flex flex-row items-center gap-1 self-start'}>
                <img
                  src={`https://source.boringavatars.com/beam/28/${encodeURIComponent(a.name)}`}
                  loading={'lazy'}
                  decoding={'async'}
                  width={28}
                  height={28}
                  className={'rounded-full bg-emerald-400'}
                />
                <p>{a.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
