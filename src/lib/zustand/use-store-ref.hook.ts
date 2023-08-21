import { useCallback, useRef } from 'react';

import { PokemonStore } from './pokemon-store.type';
import {
  PokemonFullState,
  PokemonState,
  PokemonStateWithoutFunctions,
} from './pokemon.state';
import getPokemonStore from './get-pokemon-store.helper';
import { IS_SERVER } from '../constants/is-server.constant';

export interface UseStoreRefApi {
  select: <T>(selector: (state: PokemonFullState) => T) => T;
  storage: {
    rehydrate: () => void;
  };
  rehydrate: (partialState: Partial<PokemonState>) => void;
}

// (1) hook that creates a zustand store instance and saves it into a ref
// (2) why a ref? to avoid triggering unnecessary re-renders
// (3) this hook is called in BOTH server-side and client-side
const useStoreRef = (
  preloadedState?: Partial<PokemonStateWithoutFunctions>
): UseStoreRefApi => {
  // get factory depending on context (server or client)
  const getStore = IS_SERVER
    ? getPokemonStore.onServer
    : getPokemonStore.onClient;

  // (1) initialize server-side and first client-side store instance once
  // with the same, pre-loaded state (to avoid hydration errors)
  // (2) preloadedState comes from _app.tsx (pageProps.preloadedState)
  // (3) refs are preferred as they don't trigger re-renders when mutated
  const storeRef = useRef<PokemonStore>();
  if (!storeRef.current) storeRef.current = getStore(preloadedState);

  // one-shot flag to hydrate store from storage only once
  const hasRehydratedFromStorage = useRef(false);

  // api method 1: select a piece of state data from the store ref via a selector
  const select = useCallback(
    <T>(selector: (state: PokemonFullState) => T) =>
      storeRef.current!.instance(selector),
    []
  );

  // (1) api method 2: hydrate client-side store with local-storage data
  // (2) hydration must only be executed once, hence the hasRehydratedFromStorage flag
  const rehydrateFromStorage = useCallback(() => {
    if (
      storeRef.current &&
      storeRef.current.type === 'client' &&
      !hasRehydratedFromStorage.current
    ) {
      storeRef.current.instance.persist.rehydrate();
      hasRehydratedFromStorage.current = true;
    }
  }, []);

  // (1) api method 3: re-hydrate client-side store with some partial state data
  // (2) this is useful to override current state data with page-specific data that
  // was fetched either from getStaticProps/getServerSideProps or through a client-side
  // external API request
  const rehydrate = useCallback((partialState: Partial<PokemonState>) => {
    if (storeRef.current)
      storeRef.current.instance.getState().rehydrate({
        ...storeRef.current.instance.getState(),
        ...partialState,
      });
  }, []);

  // this hook hides our zustand store and just exposes an api to interact with
  return { select, storage: { rehydrate: rehydrateFromStorage }, rehydrate };
};

export default useStoreRef;
