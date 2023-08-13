import { useRef } from 'react';

import { PokemonStore } from './pokemon-store.type';
import { PokemonStateWithoutFunctions } from './pokemon.state';
import getPokemonStore from './get-pokemon-store.helper';
import { IS_SERVER } from '../constants/is-server.constant';

// (1) hook that creates a zustand store instance and saves it into a ref
// (2) why a ref? to avoid triggering unnecessary re-renders
// (3) this hook is called in BOTH server-side and client-side
const useStoreRef = (
  preloadedState?: Partial<PokemonStateWithoutFunctions>
) => {
  const storeRef = useRef<PokemonStore>();

  // get zustand store: since this is called in both client and server,
  // getPokemonStore.onClient() is called on client-side, while
  // getPokemonStore.onServer() is called on server-side
  const getStore = getPokemonStore[IS_SERVER ? 'onServer' : 'onClient'];

  // initialize zustand store ref
  if (!storeRef.current) storeRef.current = getStore(preloadedState);
  // (1) if there is incoming state that was populated server-side (pageProps.preloadedState),
  // then update the zustand store with the new data, overriding the current zustand store data
  // (2) this code branch occurs when we navigate between pages using the <Link /> component from 'next/link'
  // and helps in preserving zustand state data between these page jumps
  else if (preloadedState)
    storeRef.current = getStore({
      ...storeRef.current.instance.getState(),
      ...preloadedState,
    });

  return storeRef.current;
};

export default useStoreRef;
