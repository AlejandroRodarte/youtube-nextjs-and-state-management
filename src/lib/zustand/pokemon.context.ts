import { createContext } from 'react';

import { UseStoreRefApi } from './use-store-ref.hook';

// our zustand context, which simply holds what's returned by
// useStoreRef() at _app.tsx, which is an API to interact with
// the zustand store
export const PokemonContext = createContext<UseStoreRefApi | null>(null);
