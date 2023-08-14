import { useRef } from 'react';

import { PokemonState, PokemonStore } from './pokemon.store';

const useStoreRef = (preloadedState?: Partial<PokemonState>) => {
  const store = useRef<PokemonStore>(new PokemonStore());
  if (preloadedState)
    store.current = new PokemonStore({
      ...store.current.getState(),
      ...preloadedState,
    });
  return store.current;
};

export default useStoreRef;
