import { useRef } from 'react';

import { PokemonClientStore, PokemonStore } from './pokemon-store.type';
import { PokemonStateWithoutFunctions } from './pokemon.state';
import getPokemonStore from './get-pokemon-store.helper';
import { IS_SERVER } from '../constants/is-server.constant';

// client store singleton for second and sub-sequent client-side renders
let clientPokemonStore: PokemonClientStore | undefined = undefined;
let isClientStoreSet = false;

// (1) hook that creates a zustand store instance and saves it into a ref
// (2) why a ref? to avoid triggering unnecessary re-renders
// (3) this hook is called in BOTH server-side and client-side
const useStoreRef = (
  preloadedState?: Partial<PokemonStateWithoutFunctions>
) => {
  const storeRef = useRef<PokemonStore>();

  if (!storeRef.current) {
    // (1) zustand store not created yet; we are on server-side: create server store instance and
    // load it with pageProps.preloadedState from _app.tsx
    // (2) this code branch triggers when making the server-side render
    if (IS_SERVER) storeRef.current = getPokemonStore.onServer(preloadedState);
    // (1) zustand store not created yet: we are on client-side: create client store instance and
    // load it with pageProps.preloadedState from _app.tsx
    // (2) this code branch triggers when making the FIRST client-side render
    // (should exactly match server-side render)
    // (3) this client store instance is short-lived and will be replaced on second and sub-sequent
    // client-side renders
    else storeRef.current = getPokemonStore.onClient(preloadedState);
  }
  // (1) client-side-exclusive code branch: if store ref is defined it means we are on the client-side
  // (2) if preloadedState exists, it means we jumped to a page with getStaticProps/getServerSideProps
  // with <Link /> from 'next/link'
  // (3) this code branch triggers when making SECOND AND SUB-SEQUENT client-side renders
  else if (preloadedState) {
    const overriddenState = {
      ...storeRef.current.instance.getState(),
      ...preloadedState,
    };

    // (1) client-side store instance for second and sub-sequent client-side renders is not defined,
    // so create one
    // (2) this is executed only once during the app's lifespan
    if (!clientPokemonStore)
      clientPokemonStore = getPokemonStore.onClient(overriddenState);

    // always make store ref point to this client-side store singleton
    storeRef.current = clientPokemonStore;

    // re-hydrate by merging previous state with data from getStaticProps/getServerSideProps
    if (isClientStoreSet)
      storeRef.current.instance.getState().rehydrate(overriddenState);

    // client-side store singleton set flag
    if (!isClientStoreSet) isClientStoreSet = true;
  }
  return storeRef.current;
};

export default useStoreRef;
