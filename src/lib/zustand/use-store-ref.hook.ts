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
    ? getPokemonStore['onServer']
    : getPokemonStore['onClient'];

  // (1) initialize server-side and first client-side store instance
  // with the same, pre-loaded state (to avoid hydration errors)
  // (2) preloadedState comes from _app.tsx (pageProps.preloadedState)
  // (3) refs are preferred as they don't trigger re-renders when mutated
  const storeRef = useRef<PokemonStore>(getStore(preloadedState));
  const hasRehydratedFromStorage = useRef(false);

  // (1) client-side exclusive code branch
  // (2) if preloadedState exists, it means we jumped to a page with getStaticProps/getServerSideProps
  // either through client-side navigation (using a <Link /> for example)
  // (3) this code branch triggers when making SECOND AND SUB-SEQUENT client-side renders
  // (4) in this case, we should simply replace our client-side store with a new one that is initialized
  // by merging previous state data with the one incoming that was pre-loaded from the server
  if (!IS_SERVER && preloadedState) {
    const overriddenState = {
      ...storeRef.current.instance.getState(),
      ...preloadedState,
    };
    storeRef.current = getPokemonStore.onClient(overriddenState);
  }

  // api method 1: select a piece of state data from the store ref via a selector
  const select = useCallback(
    <T>(selector: (state: PokemonFullState) => T) =>
      storeRef.current.instance(selector),
    []
  );

  // (1) api method 2: hydrate client-side store with local-storage data
  // (2) hydration must only be executed once, hence the hasRehydratedFromStorage flag
  const rehydrateFromStorage = useCallback(() => {
    if (
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
    storeRef.current.instance.getState().rehydrate({
      ...storeRef.current.instance.getState(),
      ...partialState,
    });
  }, []);

  // this hook hides our zustand store and just exposes an api to interact with
  return { select, storage: { rehydrate: rehydrateFromStorage }, rehydrate };
};

export default useStoreRef;
