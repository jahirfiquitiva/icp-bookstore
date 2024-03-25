export const Footer = () => {
  return (
    <footer
      className={
        'w-full max-w-3xl mx-auto flex flex-row gap-2 items-center justify-between py-4 px-2 md:px-0 border-t dark:border-t-slate-600'
      }>
      <p>Copyright © {new Date().getFullYear()}</p>
      <div className={'flex flex-row gap-2.5'}>
        <p className={'pt-0.5'}>Created by</p>
        <ul className={'flex flex-row items-center gap-1.5'}>
          <li>
            <a title={'Jahir Fiquitiva'} href={'https://bio.jahir.dev'} target={'_blank'}>
              <img
                src={`https://unavatar.io/jahirfiquitiva?fallback=https://source.boringavatars.com/beam/28/jahirfiquitiva`}
                loading={'lazy'}
                decoding={'async'}
                width={28}
                height={28}
                className={'rounded-full bg-emerald-400'}
              />
            </a>
          </li>
          <li>
            <a
              title={'Christian Riaño'}
              href={'https://github.com/christianrv29'}
              target={'_blank'}>
              <img
                src={`https://unavatar.io/christianrv29?fallback=https://source.boringavatars.com/beam/28/christianrv29`}
                loading={'lazy'}
                decoding={'async'}
                width={28}
                height={28}
                className={'rounded-full bg-emerald-400'}
              />
            </a>
          </li>
          <li>
            <a
              title={'Carlos Medina Riaño'}
              href={'https://www.linkedin.com/in/carlos-medinar/'}
              target={'_blank'}>
              <img
                src={`https://unavatar.io/carlos-medinar?fallback=https://source.boringavatars.com/beam/28/carlos-medinar`}
                loading={'lazy'}
                decoding={'async'}
                width={28}
                height={28}
                className={'rounded-full bg-emerald-400'}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
