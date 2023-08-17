import { useCallback, useRef } from 'react';

import { PokemonState, PokemonStore } from './pokemon.store';
import { IS_SERVER } from '../constants/is-server.constant';
import hydrate from '../constants/hydrate.constant';

export interface UseStoreRefApi {
  select: <T>(selector: (store: PokemonStore) => T) => T;
  storage: {
    rehydrate: () => void;
  };
  rehydrate: (partialState: Partial<PokemonState>) => void;
}

const useStoreRef = (preloadedState?: Partial<PokemonState>) => {
  const storeRef = useRef<PokemonStore>(new PokemonStore(preloadedState));
  const hasRehydratedFromStorage = useRef(false);
  const hasConnectedToStorage = useRef(false);

  const select = useCallback(
    <T>(selector: (store: PokemonStore) => T) => selector(storeRef.current),
    []
  );

  if (!IS_SERVER && !hasConnectedToStorage.current) {
    hydrate('pokemon-storage', storeRef.current);
    hasConnectedToStorage.current = true;
  }

  const rehydrateFromStorage = useCallback(() => {
    if (!IS_SERVER && !hasRehydratedFromStorage.current) {
      const storageStateString = window.localStorage.getItem('pokemon-storage');
      if (storageStateString) {
        const storageStateObject: PokemonState = JSON.parse(storageStateString);
        storeRef.current.rehydrate(storageStateObject);
      }
      hasRehydratedFromStorage.current = true;
    }
  }, []);

  const rehydrate = useCallback((partialState: Partial<PokemonState>) => {
    storeRef.current.rehydrate({
      ...storeRef.current.getState(),
      ...partialState,
    });
  }, []);

  return { select, storage: { rehydrate: rehydrateFromStorage }, rehydrate };
};

export default useStoreRef;
