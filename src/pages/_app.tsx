import '@/styles/globals.css';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import GlobalContext from '@/lib/rxjs/global.context';
import useStoreRef from '@/lib/rxjs/use-store-ref.hook';

export default function App({ Component, pageProps }: AppProps) {
  // get all data returned by useStoreRef (subjects, computed observables, API)
  const data = useStoreRef(pageProps.preloadedState);

  const {
    api: { stopAllPersistenceSubscriptions },
  } = data;

  // on cleanup, disconnect from storage system
  useEffect(() => {
    return () => {
      stopAllPersistenceSubscriptions();
    };
  }, [stopAllPersistenceSubscriptions]);

  // pass all data to global context
  return (
    <GlobalContext.Provider value={data}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
