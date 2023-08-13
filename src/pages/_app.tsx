import '@/styles/globals.css';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import { PokemonContext } from '@/lib/zustand/pokemon.context';
import useStoreRef from '@/lib/zustand/use-store-ref.hook';

export default function App({ Component, pageProps }: AppProps) {
  // get store ref (can be a server-side or client-side store)
  const store = useStoreRef(pageProps.preloadedState);

  // (1) client-side only code: re-hydrate zustand store AFTER next.js hydrates
  // (2) this avoid having hydration errors mentioned in https://github.com/pmndrs/zustand/issues/938
  useEffect(() => {
    store.type === 'client' && store.instance.persist.rehydrate();
  }, []);

  // zustand context injected with store ref: all next.js pages now have access to it
  return (
    <PokemonContext.Provider value={store}>
      <Component {...pageProps} />
    </PokemonContext.Provider>
  );
}
