import { useCallback, useRef } from 'react';
import { Persistor, persistStore } from 'redux-persist';

import { RootState, StringifiedRootState } from './root-state.type';
import { Store } from './store.type';
import { IS_SERVER } from '../constants/is-server.constant';
import createStore from './create-store.helper';
import { actions } from './slices/pokemon/pokemon.slice';
import { PokemonState } from './slices/pokemon/pokemon-state.interface';
import { ROOT_STORAGE_KEY } from '../constants/root-storage-key.constant';
import { DeepPartial } from '../types/deep-partial.type';

// refs for our server-side and client-side store, plus a helpful api to
// perform storage and manual re-hydration
const useStoreRef = (preloadedState: DeepPartial<RootState>) => {
  // initialize store ref once with preloaded state from server (SSR/SSG)
  const getStore = IS_SERVER ? createStore.onServer : createStore.onClient;
  const storeRef = useRef<Store>();
  if (!storeRef.current) storeRef.current = getStore(preloadedState);

  // one-shot flag to re-hydrate from local storage (must occur once)
  const hasRehydratedFromStorage = useRef(false);
  // one-shot flag to connect to local storage (must occur once)
  const hasConnectedToStorage = useRef(false);

  // persistor ref: if server, store nothing; if client, store persistor
  // in manual mode; we will dictate when to connect to local storage
  const persistorRef = useRef<Persistor | null>(
    storeRef.current.type === 'client'
      ? persistStore(
          storeRef.current.instance,
          // @ts-ignore: 'manualPersist' is a valid option
          // https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
          { manualPersist: true }
        )
      : null
  );

  // are we not connected to local storage yet? if so, connect to it and set flag
  // so it never runs again
  if (!IS_SERVER && !hasConnectedToStorage.current && persistorRef.current) {
    persistorRef.current.persist();
    hasConnectedToStorage.current = true;
  }

  // re-hydrate store with local storage data
  const rehydrateFromStorage = useCallback(() => {
    // are we on client and we also haven't re-hydrated from storage yet?
    if (!IS_SERVER && !hasRehydratedFromStorage.current) {
      // try to fetch root state data from local storage
      const rootStateString = window.localStorage.getItem(
        `persist:${ROOT_STORAGE_KEY}`
      );

      // there is root state data
      if (rootStateString) {
        // parse it
        const rootStateObject: StringifiedRootState & {
          _persist: string;
        } = JSON.parse(rootStateString);

        // re-parse to get first and only slice
        const pokemonState: PokemonState = JSON.parse(rootStateObject.pokemon);

        // hydrate slice
        if (storeRef.current)
          storeRef.current.instance.dispatch(actions.rehydrate(pokemonState));
      }

      // regardless of finding data in local storage or not, this task must only
      // occur once, so set one-shot flag
      hasRehydratedFromStorage.current = true;
    }
  }, []);

  // manual re-hydration by merging current state with a deeply-optional root state
  const rehydrate = useCallback((partialState: DeepPartial<RootState>) => {
    // if slice data is defined, dispatch re-hydrate action
    if (storeRef.current && partialState.pokemon)
      storeRef.current.instance.dispatch(
        actions.rehydrate(partialState.pokemon)
      );
  }, []);

  // expose ref (to be used in <Provider />) and
  // re-hydration API (to use in components through <StoreContext.Provider />)
  return {
    refs: { store: storeRef },
    api: {
      storage: { rehydrate: rehydrateFromStorage },
      rehydrate,
    },
  };
};

export default useStoreRef;
