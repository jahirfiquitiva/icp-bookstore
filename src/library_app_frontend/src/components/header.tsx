import { Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/auth';
import { Button } from './button';

export const Header = () => {
  const { connected, loading, disconnect, user, connect } = useAuth();

  return (
    <header
      className={'py-8 px-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-100'}>
      <div className={'flex flex-col gap-6 max-w-3xl mx-auto'}>
        <div className={'flex flex-row gap-4 items-center justify-between'}>
          <h1 className={'text-3xl font-semibold'}>Library</h1>
          {connected ? (
            <div className={'flex flex-row gap-3 items-center'}>
              <img
                src={`https://source.boringavatars.com/beam/44/${user}`}
                loading={'lazy'}
                decoding={'async'}
                width={44}
                height={44}
                className={'rounded-full bg-emerald-400'}
              />
              <Button
                className={'bg-red-500 text-white dark:bg-red-400'}
                onClick={() => {
                  disconnect();
                }}>
                Log out
              </Button>
            </div>
          ) : !loading ? (
            <Button
              onClick={() => {
                connect('ii');
              }}>
              <span>Log in</span>
              <img
                className={'max-w-6 filter saturate-0 invert brightness-[6]'}
                alt={'II Logo'}
                src='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iLTEgLTEgMTA3LjQyNDcwNTk5OTk5OTk5IDU0LjY1OTciIHdpZHRoPSIxMDMuNDIiIGhlaWdodD0iNTAuNjYiCiAgICAgY2xhc3M9ImlubGluZSBoLTggdy04IG1sLTEiIGRhdGEtdi00NWMxNmUyOD0iIiBkYXRhLXYtNWUzMzczNjg9IiI+CiAgICA8ZGVmcyBkYXRhLXYtNDVjMTZlMjg9IiI+CiAgICAgICAgPHBhdGggZD0iTTU5LjYyIDkuMTRDNTYuNDggMTEuOTkgNTMuNzIgMTUuMDcgNTEuNzEgMTcuNTNDNTEuNzEgMTcuNTMgNTQuOTUgMjEuMTggNTguNDkgMjUuMDlDNjAuNDEgMjIuNzIgNjMuMTcgMTkuNTEgNjYuMzYgMTYuNjFDNzIuMjYgMTEuMiA3Ni4xIDEwLjExIDc4LjMzIDEwLjExQzg2LjY0IDEwLjExIDkzLjM3IDE2LjkyIDkzLjM3IDI1LjM1QzkzLjM3IDMzLjcgODYuNjQgNDAuNTEgNzguMzMgNDAuNkM3Ny45NCA0MC42IDc3LjQ2IDQwLjU1IDc2Ljg5IDQwLjQyQzc5LjI5IDQxLjUyIDgxLjkyIDQyLjMxIDg0LjM3IDQyLjMxQzk5LjU4IDQyLjMxIDEwMi41NSAzMi4wMyAxMDIuNzIgMzEuMjhDMTAzLjE2IDI5LjM5IDEwMy40MiAyNy40MiAxMDMuNDIgMjUuNEMxMDMuMzggMTEuMzggOTIuMTUgMCA3OC4zMyAwQzcyLjU2IDAgNjYuMjcgMy4wOCA1OS42MiA5LjE0WiIKICAgICAgICAgICAgICBpZD0iYTJvVENjaUh3VSIgZGF0YS12LTQ1YzE2ZTI4PSIiPjwvcGF0aD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50YzJySXZ5RGhOIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjY1LjE3IiB5MT0iMy42NyIgeDI9Ijk5LjkiIHkyPSIzOS40NCIKICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS12LTQ1YzE2ZTI4PSIiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjIxJSIgZGF0YS12LTQ1YzE2ZTI4PSIiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoMjQxLCA5MCwgMzYpOyBzdG9wLW9wYWNpdHk6IDE7Ij48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iNjguNDEwMDAwMDAwMDAwMDElIiBkYXRhLXYtNDVjMTZlMjg9IiIKICAgICAgICAgICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IHJnYigyNTEsIDE3NiwgNTkpOyBzdG9wLW9wYWNpdHk6IDE7Ij48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8cGF0aCBkPSJNNDMuOCA0MS41MkM0Ni45NSAzOC42NiA0OS43IDM1LjU5IDUxLjcxIDMzLjEzQzUxLjcxIDMzLjEzIDQ4LjQ4IDI5LjQ4IDQ0Ljk0IDI1LjU3QzQzLjAxIDI3Ljk0IDQwLjI2IDMxLjE1IDM3LjA3IDM0LjA1QzMxLjE3IDM5LjQxIDI3LjI4IDQwLjU1IDI1LjA5IDQwLjU1QzE2Ljc5IDQwLjU1IDEwLjA1IDMzLjc0IDEwLjA1IDI1LjMxQzEwLjA1IDE2Ljk2IDE2Ljc5IDEwLjE1IDI1LjA5IDEwLjA2QzI1LjQ4IDEwLjA2IDI1Ljk3IDEwLjExIDI2LjUzIDEwLjI0QzI0LjEzIDkuMTQgMjEuNTEgOC4zNSAxOS4wNiA4LjM1QzMuODUgOC4zNSAwLjg3IDE4LjYzIDAuNyAxOS4zOEMwLjI2IDIxLjI3IDAgMjMuMjQgMCAyNS4yNkMwIDM5LjI4IDExLjIzIDUwLjY2IDI1LjA5IDUwLjY2QzMwLjg2IDUwLjY2IDM3LjE2IDQ3LjU4IDQzLjggNDEuNTJaIgogICAgICAgICAgICAgIGlkPSJhRldjd0ZJYXgiIGRhdGEtdi00NWMxNmUyOD0iIj48L3BhdGg+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudGFJTXJvcjVaeiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzOC4yMiIgeTE9IjQ2Ljk3IiB4Mj0iMy41IiB5Mj0iMTEuMiIKICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS12LTQ1YzE2ZTI4PSIiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjIxJSIgZGF0YS12LTQ1YzE2ZTI4PSIiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoMjM3LCAzMCwgMTIxKTsgc3RvcC1vcGFjaXR5OiAxOyI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ijg5LjI5JSIgZGF0YS12LTQ1YzE2ZTI4PSIiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoODIsIDM5LCAxMzMpOyBzdG9wLW9wYWNpdHk6IDE7Ij48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8cGF0aCBkPSJNMTkuMSA4LjU3QzUuMjQgOC4yMyAxLjE2IDE4LjEgMC44MSAxOS4zN0MzLjQ3IDguMyAxMy4zNyAwLjA0IDI1LjE0IDBDMzQuNzMgMCA0NC40MyA5LjIxIDUxLjU5IDE3LjUzQzUxLjYgMTcuNTEgNTEuNjEgMTcuNSA1MS42MiAxNy40OUM1MS42MiAxNy40OSA1NC44NiAyMS4xMyA1OC40IDI1LjA0QzU4LjQgMjUuMDQgNjIuNDIgMjkuNyA2Ni43MSAzMy43OUM2OC4zNyAzNS4zNyA3Ni40NSA0MS43NCA4NC4yMyA0MS45NkM5OC40OSA0Mi4zNiAxMDIuNDIgMzEuOTQgMTAyLjY0IDMxLjE1QzEwMC4wMiA0Mi4yNyA5MC4wOSA1MC41NyA3OC4yOSA1MC42MkM2OC42OSA1MC42MiA1OC45OSA0MS40IDUxLjggMzMuMDhDNTEuNzggMzMuMSA1MS43NyAzMy4xMSA1MS43NiAzMy4xM0M1MS43NiAzMy4xMyA0OC41MiAyOS40OCA0NC45OCAyNS41N0M0NC45OCAyNS41NyA0MC45NiAyMC45MSAzNi42OCAxNi44M0MzNS4wMSAxNS4yNSAyNi44OCA4Ljc5IDE5LjEgOC41N1pNMC44MSAxOS4zN0MwLjggMTkuNCAwLjc5IDE5LjQzIDAuNzkgMTkuNDZDMC43OSAxOS40NCAwLjggMTkuNDEgMC44MSAxOS4zN1oiCiAgICAgICAgICAgICAgaWQ9ImUxUlpHNmJPYyIgZGF0YS12LTQ1YzE2ZTI4PSIiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGRhdGEtdi00NWMxNmUyOD0iIj4KICAgICAgICA8ZyBkYXRhLXYtNDVjMTZlMjg9IiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2Eyb1RDY2lId1UiIG9wYWNpdHk9IjEiIGZpbGw9InVybCgjZ3JhZGllbnRjMnJJdnlEaE4pIiBkYXRhLXYtNDVjMTZlMjg9IiI+PC91c2U+CiAgICAgICAgICAgIDxnIGRhdGEtdi00NWMxNmUyOD0iIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2Eyb1RDY2lId1UiIG9wYWNpdHk9IjEiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiCiAgICAgICAgICAgICAgICAgICAgIHN0cm9rZS1vcGFjaXR5PSIwIiBkYXRhLXYtNDVjMTZlMjg9IiI+PC91c2U+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgZGF0YS12LTQ1YzE2ZTI4PSIiPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNhRldjd0ZJYXgiIG9wYWNpdHk9IjEiIGZpbGw9InVybCgjZ3JhZGllbnRhSU1yb3I1WnopIiBkYXRhLXYtNDVjMTZlMjg9IiI+PC91c2U+CiAgICAgICAgICAgIDxnIGRhdGEtdi00NWMxNmUyOD0iIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2FGV2N3RklheCIgb3BhY2l0eT0iMSIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIKICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLW9wYWNpdHk9IjAiIGRhdGEtdi00NWMxNmUyOD0iIj48L3VzZT4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBkYXRhLXYtNDVjMTZlMjg9IiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2UxUlpHNmJPYyIgb3BhY2l0eT0iMSIgZmlsbD0iIzI5YWJlMiIgZmlsbC1vcGFjaXR5PSIxIiBkYXRhLXYtNDVjMTZlMjg9IiI+PC91c2U+CiAgICAgICAgICAgIDxnIGRhdGEtdi00NWMxNmUyOD0iIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2UxUlpHNmJPYyIgb3BhY2l0eT0iMSIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIKICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLW9wYWNpdHk9IjAiIGRhdGEtdi00NWMxNmUyOD0iIj48L3VzZT4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
              />
            </Button>
          ) : null}
        </div>
        {connected ? (
          <nav>
            <ul className={'flex flex-row gap-3 items-center'}>
              <li>
                <Link to={'/'} className={'px-2 py-1 [&.active]:underline'}>
                  Books
                </Link>
              </li>
              <li>
                <Link to={'/new'} className={'px-2 py-1 [&.active]:underline'}>
                  Add book
                </Link>
              </li>
              <li>
                <Link
                  to={'/authors'}
                  className={'px-2 py-1 [&.active]:underline'}>
                  Authors
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
};
