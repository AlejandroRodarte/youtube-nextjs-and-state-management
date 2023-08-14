import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import PokemonContext from '@/lib/mobx/pokemon.context';
import useStoreRef from '@/lib/mobx/use-store-ref.hook';

export default function App({ Component, pageProps }: AppProps) {
  const store = useStoreRef(pageProps.preloadedState);
  return (
    <PokemonContext.Provider value={store}>
      <Component {...pageProps} />
    </PokemonContext.Provider>
  );
}
