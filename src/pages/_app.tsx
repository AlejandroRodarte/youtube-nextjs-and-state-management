import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { PokemonContext } from '@/lib/zustand/pokemon.context';
import useStoreRef from '@/lib/zustand/use-store-ref.hook';

export default function App({ Component, pageProps }: AppProps) {
  // get store api
  const api = useStoreRef(pageProps.preloadedState);

  // zustand context injected with store api: all next.js pages now have access to it
  return (
    <PokemonContext.Provider value={api}>
      <Component {...pageProps} />
    </PokemonContext.Provider>
  );
}
