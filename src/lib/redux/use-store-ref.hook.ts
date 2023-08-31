import { useCallback, useRef } from 'react';
import { Persistor, persistStore } from 'redux-persist';

import { RootState } from './root-state.type';
import { Store } from './store.type';
import { IS_SERVER } from '../constants/is-server.constant';
import createStore from './create-store.helper';
import { actions } from './slices/pokemon/pokemon.slice';
import { DeepPartial } from '../types/deep-partial.type';

// refs for our server-side and client-side store, plus a helpful api to
// perform storage and manual re-hydration
const useStoreRef = (preloadedState: DeepPartial<RootState>) => {
  // initialize store ref once with preloaded state from server (SSR/SSG)
  const getStore = IS_SERVER ? createStore.onServer : createStore.onClient;
  const storeRef = useRef<Store>();
  if (!storeRef.current) storeRef.current = getStore(preloadedState);

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

  // re-hydrate store with local storage data
  const rehydrateFromStorage = useCallback(async () => {
    // connect and hydrate store with storage data once
    if (!IS_SERVER && !hasConnectedToStorage.current && persistorRef.current) {
      persistorRef.current.persist();
      // hacky fix
      // (1) .persist() returns void by definition, but it seems to require some
      // time before actually being fully connected and hydrated with the storage system
      // (2) thus, we need to give .persist() some time to finish before continuing
      // (3) a 100 milliseconds waiting time worked fine for local storage, but it may need less/more
      // depending on the storage system you are working with
      // (4) this is a bug from the 'redux-persist' library itself, not our fault
      await new Promise<void>((res, rej) => setTimeout(res, 100));
      hasConnectedToStorage.current = true;
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
