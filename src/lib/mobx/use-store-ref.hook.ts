import { useCallback, useRef } from 'react';

import { PokemonState, PokemonStore } from './pokemon.store';
import { IS_SERVER } from '../constants/is-server.constant';
import hydrate from '../constants/hydrate.constant';

export interface UseStoreRefApi {
  select: <T>(selector: (store: PokemonStore) => T) => T;
  storage: {
    rehydrate: () => Promise<void>;
  };
  rehydrate: (partialState: Partial<PokemonState>) => void;
}

const useStoreRef = (preloadedState?: Partial<PokemonState>) => {
  const storeRef = useRef<PokemonStore>();
  if (!storeRef.current) storeRef.current = new PokemonStore(preloadedState);

  const hasRehydratedFromStorage = useRef(false);
  const hasConnectedToStorage = useRef(false);

  const select = useCallback(
    <T>(selector: (store: PokemonStore) => T) => selector(storeRef.current!),
    []
  );

  const rehydrateFromStorage = useCallback(async () => {
    if (!IS_SERVER && !hasConnectedToStorage.current && storeRef.current) {
      await hydrate('pokemon-storage', storeRef.current);
      hasConnectedToStorage.current = true;
    }

    if (!IS_SERVER && !hasRehydratedFromStorage.current) {
      const storageStateString = window.localStorage.getItem('pokemon-storage');
      if (storeRef.current && storageStateString) {
        const storageStateObject: PokemonState = JSON.parse(storageStateString);
        storeRef.current.rehydrate(storageStateObject);
      }
      hasRehydratedFromStorage.current = true;
    }
  }, []);

  const rehydrate = useCallback((partialState: Partial<PokemonState>) => {
    if (storeRef.current) storeRef.current.rehydrate(partialState);
  }, []);

  return { select, storage: { rehydrate: rehydrateFromStorage }, rehydrate };
};

export default useStoreRef;
