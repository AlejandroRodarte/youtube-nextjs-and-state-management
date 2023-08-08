import { PokemonStoreContextProvider } from '@/lib/context/pokemon-store.context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokemonStoreContextProvider pokemons={pageProps.pokemons}>
      <Component {...pageProps} />
    </PokemonStoreContextProvider>
  );
}
